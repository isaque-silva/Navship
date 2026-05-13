import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, ".env") });

const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120, "Nome muito longo."),
  company: z.string().trim().max(120, "Empresa muito longa.").optional().default(""),
  email: z.string().trim().email("Informe um e-mail valido.").max(160, "E-mail muito longo."),
  phone: z.string().trim().min(8, "Informe um telefone valido.").max(40, "Telefone muito longo."),
  message: z.string().trim().min(10, "Descreva sua necessidade com mais detalhes.").max(2000, "Mensagem muito longa."),
});

function diagnosticsEnabled() {
  const raw = process.env.CONTACT_DIAGNOSTICS?.trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes";
}

function safeDiagnosticDetail(message) {
  return String(message)
    .trim()
    .slice(0, 400)
    .replace(/pass(word)?[=:]\s*\S+/gi, "password=***");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildPlainTextEmail(data) {
  return [
    "Nova solicitacao enviada pelo site da NavShip",
    "",
    `Nome: ${data.name}`,
    `Empresa: ${data.company || "Nao informado"}`,
    `E-mail: ${data.email}`,
    `Telefone: ${data.phone}`,
    "",
    "Mensagem:",
    data.message,
  ].join("\n");
}

function buildHtmlEmail(data) {
  const messageLines = escapeHtml(data.message).replaceAll("\n", "<br />");
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #102235;">
      <h2 style="margin-bottom: 16px;">Nova solicitacao enviada pelo site da NavShip</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr><td style="padding: 8px 0; font-weight: 700; width: 140px;">Nome</td><td style="padding: 8px 0;">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Empresa</td><td style="padding: 8px 0;">${escapeHtml(data.company || "Nao informado")}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">E-mail</td><td style="padding: 8px 0;">${escapeHtml(data.email)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700;">Telefone</td><td style="padding: 8px 0;">${escapeHtml(data.phone)}</td></tr>
          <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Mensagem</td><td style="padding: 8px 0;">${messageLines}</td></tr>
        </tbody>
      </table>
    </div>
  `.trim();
}

function requireEnv(name) {
  const v = process.env[name]?.trim();
  if (!v) {
    throw new Error(`Configuracao ausente: ${name}.`);
  }
  return v;
}

function createTransporter() {
  const host = requireEnv("SMTP_HOST");
  const port = Number.parseInt(requireEnv("SMTP_PORT"), 10);
  const secure = process.env.SMTP_SECURE?.trim().toLowerCase() === "true";
  const startTlsRaw = process.env.SMTP_START_TLS?.trim().toLowerCase();
  const requireTLS = startTlsRaw === undefined || startTlsRaw === "" || startTlsRaw === "true" || startTlsRaw === "1";

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const auth = user && pass ? { user, pass } : undefined;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: secure ? false : requireTLS,
    auth,
  });
}

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "128kb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.post("/api/contact", async (req, res) => {
  res.setHeader("cache-control", "no-store");

  let data;
  try {
    data = contactFormSchema.parse(req.body ?? {});
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.issues[0]?.message ?? "Dados invalidos. Revise o formulario e tente novamente.",
      });
    }
    throw err;
  }

  try {
    const to = requireEnv("CONTACT_TO_EMAIL");
    const fromEmail = process.env.SMTP_FROM?.trim() || requireEnv("SMTP_USER");
    const fromName = process.env.SMTP_FROM_NAME?.trim() || "Site NavShip";

    const transporter = createTransporter();
    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to,
      replyTo: `${data.name} <${data.email}>`,
      subject: `Novo contato do site - ${data.name}`,
      text: buildPlainTextEmail(data),
      html: buildHtmlEmail(data),
    });

    return res.status(200).json({
      message: "Solicitacao enviada com sucesso. Em breve nossa equipe entrara em contato.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);

    if (message.startsWith("Configuracao ausente:")) {
      console.error("[api/contact]", message);
      return res.status(503).json({
        message: "O envio de e-mail nao esta configurado no servidor. Verifique backend/.env (SMTP_* e CONTACT_TO_EMAIL).",
      });
    }

    const code = err && typeof err === "object" && "code" in err ? String(err.code) : "";
    const responseCode = err && typeof err === "object" && "responseCode" in err ? Number(err.responseCode) : 0;

    if (code === "ETIMEDOUT" || code === "ECONNREFUSED" || code === "ENOTFOUND") {
      console.error("[api/contact] conexao SMTP:", err);
      const body = {
        message:
          "Nao foi possivel conectar ao servidor SMTP. Verifique host, porta, firewall (saida TCP) e se o provedor permite o envio a partir deste servidor.",
      };
      if (diagnosticsEnabled()) {
        body.detail = safeDiagnosticDetail(message);
      }
      return res.status(502).json(body);
    }

    if (responseCode === 535 || /Invalid login|authentication failed|535/i.test(message)) {
      console.error("[api/contact] autenticacao SMTP:", err);
      const body = { message: "Falha na autenticacao SMTP. Verifique SMTP_USER e SMTP_PASS." };
      if (diagnosticsEnabled()) {
        body.detail = safeDiagnosticDetail(message);
      }
      return res.status(502).json(body);
    }

    if (responseCode >= 400 || /MAIL FROM|RCPT TO|550|554|553/i.test(message)) {
      console.error("[api/contact] comando SMTP:", err);
      const body = {
        message: "O servidor SMTP rejeitou o envio. Verifique remetente, destinatario e politicas do provedor.",
      };
      if (diagnosticsEnabled()) {
        body.detail = safeDiagnosticDetail(message);
      }
      return res.status(502).json(body);
    }

    console.error("[api/contact]", err);
    const body = {
      message: "Nao foi possivel enviar sua solicitacao agora. Tente novamente em instantes.",
    };
    if (diagnosticsEnabled()) {
      body.detail = safeDiagnosticDetail(message);
    }
    return res.status(500).json(body);
  }
});

const port = Number.parseInt(process.env.PORT ?? "4000", 10);
app.listen(port, "0.0.0.0", () => {
  console.log(`[navship-mail] escutando em http://0.0.0.0:${port}`);
});
