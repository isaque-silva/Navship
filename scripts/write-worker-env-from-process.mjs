#!/usr/bin/env node
/**
 * Grava dist/server/.dev.vars a partir de process.env.
 *
 * No preview com @cloudflare/vite-plugin, o Worker lê variáveis desse arquivo
 * (gerado no build). No Docker/Dokploy as variaveis do site (ex.: video) chegam em
 * runtime; regravamos o arquivo na subida. SMTP fica em backend/.env (servico separado).
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const outPath = resolve(root, "dist/server/.dev.vars");

const KEYS = ["INSTITUTIONAL_VIDEO_URL", "MAIL_BACKEND_INTERNAL_URL"];

function quoteValue(value) {
  if (value.includes("\n") || value.includes("\r")) {
    throw new Error("Valor de variavel nao pode conter quebra de linha.");
  }
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function main() {
  const serverDir = resolve(root, "dist/server");
  if (!existsSync(serverDir)) {
    console.warn("[write-worker-env-from-process] dist/server inexistente, ignorando.");
    return;
  }

  const lines = [];
  for (const key of KEYS) {
    const raw = process.env[key];
    if (raw === undefined || raw === "") continue;
    lines.push(`${key}=${quoteValue(raw)}`);
  }

  mkdirSync(dirname(outPath), { recursive: true });
  const body = lines.length > 0 ? `${lines.join("\n")}\n` : "";
  writeFileSync(outPath, body, "utf8");
  console.log(`[write-worker-env-from-process] ${outPath} (${lines.length} variaveis).`);
}

main();
