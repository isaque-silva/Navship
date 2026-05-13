import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type WorkerEnv = Record<string, unknown>;

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => ((m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit): Response {
  return Response.json(body, {
    ...init,
    headers: {
      "cache-control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

function getRuntimeEnv(env: WorkerEnv): WorkerEnv {
  return {
    ...(typeof process !== "undefined" ? process.env : {}),
    ...env,
  };
}

function getEnvString(env: WorkerEnv, key: string): string | undefined {
  const value = env[key];

  if (value === undefined || value === null) {
    return undefined;
  }

  const asString = typeof value === "string" ? value : String(value);
  const trimmed = asString.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function handleInstitutionalVideoRequest(env: WorkerEnv): Response {
  const videoUrl = getEnvString(env, "INSTITUTIONAL_VIDEO_URL");

  if (!videoUrl) {
    return jsonResponse(
      { message: "Video institucional nao configurado. Defina INSTITUTIONAL_VIDEO_URL no ambiente." },
      { status: 404 },
    );
  }

  return Response.redirect(videoUrl, 302);
}

function handlePublicConfigRequest(env: WorkerEnv): Response {
  const institutionalVideoUrl = getEnvString(env, "INSTITUTIONAL_VIDEO_URL") ?? null;

  return Response.json(
    { institutionalVideoUrl },
    {
      status: 200,
      headers: {
        "cache-control": "public, max-age=120",
        "content-type": "application/json; charset=utf-8",
      },
    },
  );
}

/**
 * Quando o proxy (Dokploy) aponta o dominio direto para navship-app e nao para o nginx,
 * o pedido POST /api/contact chega aqui. Encaminhamos ao servico Node de e-mail na rede Docker.
 */
async function handleContactProxyRequest(request: Request, env: WorkerEnv): Promise<Response> {
  const runtimeEnv = getRuntimeEnv(env);
  const base = getEnvString(runtimeEnv, "MAIL_BACKEND_INTERNAL_URL");

  if (!base) {
    return jsonResponse(
      {
        message:
          "Formulario de contato indisponivel nesta configuracao. Defina MAIL_BACKEND_INTERNAL_URL no servico navship-app ou aponte o dominio para navship-gateway.",
      },
      { status: 503 },
    );
  }

  let targetUrl: string;
  try {
    const u = new URL(base.includes("://") ? base : `http://${base}`);
    u.pathname = "/api/contact";
    u.search = "";
    u.hash = "";
    targetUrl = u.toString();
  } catch {
    return jsonResponse({ message: "MAIL_BACKEND_INTERNAL_URL invalida." }, { status: 503 });
  }

  if (request.method === "OPTIONS") {
    const origin = request.headers.get("origin") ?? "";
    const r = await fetch(targetUrl, {
      method: "OPTIONS",
      headers: origin ? { origin } : undefined,
    });
    const headers = new Headers();
    headers.set("cache-control", "no-store");
    const copy = ["access-control-allow-origin", "access-control-allow-methods", "access-control-allow-headers", "access-control-max-age"] as const;
    for (const key of copy) {
      const v = r.headers.get(key);
      if (v) {
        headers.set(key, v);
      }
    }
    if (!headers.has("access-control-allow-origin")) {
      headers.set("access-control-allow-origin", "*");
    }
    return new Response(null, { status: r.status === 204 ? 204 : r.status, headers });
  }

  if (request.method !== "POST") {
    return jsonResponse({ message: "Metodo nao permitido." }, { status: 405, headers: { allow: "POST, OPTIONS" } });
  }

  const body = await request.text();
  let r: Response;
  try {
    r = await fetch(targetUrl, {
      method: "POST",
      headers: {
        "content-type": request.headers.get("content-type") ?? "application/json",
        accept: "application/json",
      },
      body,
    });
  } catch (err) {
    console.error("[api/contact] proxy para backend:", err);
    return jsonResponse(
      {
        message:
          "Nao foi possivel contactar o servico de e-mail interno. Verifique MAIL_BACKEND_INTERNAL_URL e se navship-backend esta a correr.",
      },
      { status: 502 },
    );
  }

  const outHeaders = new Headers();
  outHeaders.set("cache-control", "no-store");
  const ct = r.headers.get("content-type");
  if (ct) {
    outHeaders.set("content-type", ct);
  }
  const allowOrigin = r.headers.get("access-control-allow-origin");
  if (allowOrigin) {
    outHeaders.set("access-control-allow-origin", allowOrigin);
  }
  const text = await r.text();
  return new Response(text, { status: r.status, headers: outHeaders });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      const runtimeEnv = getRuntimeEnv((env ?? {}) as WorkerEnv);

      if (url.pathname === "/media/institutional-video") {
        return handleInstitutionalVideoRequest(runtimeEnv);
      }

      if (url.pathname === "/api/public-config" && request.method === "GET") {
        return handlePublicConfigRequest(runtimeEnv);
      }

      if (url.pathname === "/api/contact") {
        return await handleContactProxyRequest(request, runtimeEnv);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
