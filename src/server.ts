import "./lib/error-capture";

import { ZodError } from "zod";
import { consumeLastCapturedError } from "./lib/error-capture";
import { sendContactEmail } from "./lib/contact-email";
import { parseContactForm } from "./lib/contact-form";
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

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
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

async function handleContactRequest(request: Request, env: WorkerEnv): Promise<Response> {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        allow: "POST, OPTIONS",
      },
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ message: "Metodo nao permitido." }, { status: 405, headers: { allow: "POST, OPTIONS" } });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ message: "Nao foi possivel ler os dados do formulario." }, { status: 400 });
  }

  try {
    const data = parseContactForm(payload);
    await sendContactEmail(data, env);

    return jsonResponse({ message: "Solicitacao enviada com sucesso. Em breve nossa equipe entrara em contato." });
  } catch (error) {
    if (error instanceof ZodError) {
      return jsonResponse(
        { message: error.issues[0]?.message ?? "Dados invalidos. Revise o formulario e tente novamente." },
        { status: 400 },
      );
    }

    console.error(error);
    return jsonResponse(
      { message: "Nao foi possivel enviar sua solicitacao agora. Tente novamente em instantes." },
      { status: 500 },
    );
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      if (url.pathname === "/api/contact") {
        return await handleContactRequest(request, getRuntimeEnv((env ?? {}) as WorkerEnv));
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
