import { copyFileSync, existsSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const clientDir = join(process.cwd(), "dist/client");
const indexHtml = join(clientDir, "index.html");
const shellHtml = join(clientDir, "_shell.html");
const fallback = existsSync(indexHtml) ? indexHtml : shellHtml;

if (!existsSync(fallback)) {
  throw new Error(
    "Build estatico incompleto: dist/client nao tem index.html nem _shell.html.",
  );
}

copyFileSync(fallback, join(clientDir, "404.html"));
writeFileSync(join(clientDir, ".nojekyll"), "");

console.log(`GitHub Pages pronto: ${fallback} copiado para dist/client/404.html`);
