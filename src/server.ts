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

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
