import { sendOnce } from "@ryyr/worker-mailer/convenience";
import type { ContactFormPayload } from "./contact-form";

type ContactEmailEnv = Record<string, unknown> & {
  CONTACT_TO_EMAIL?: string;
  SMTP_FROM?: string;
  SMTP_FROM_NAME?: string;
  SMTP_HOST?: string;
  SMTP_PASS?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
};

function readEnvString(env: ContactEmailEnv, key: keyof ContactEmailEnv): string | undefined {
  const value = env[key];

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function requireEnvString(env: ContactEmailEnv, key: keyof ContactEmailEnv, label: string): string {
  const value = readEnvString(env, key);

  if (!value) {
    throw new Error(`Configuracao ausente: ${label}.`);
  }

  return value;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildPlainTextEmail(data: ContactFormPayload): string {
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

function buildHtmlEmail(data: ContactFormPayload): string {
  const messageLines = escapeHtml(data.message).replaceAll("\n", "<br />");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #102235;">
      <h2 style="margin-bottom: 16px;">Nova solicitacao enviada pelo site da NavShip</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 720px;">
        <tbody>
          <tr>
            <td style="padding: 8px 0; font-weight: 700; width: 140px;">Nome</td>
            <td style="padding: 8px 0;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Empresa</td>
            <td style="padding: 8px 0;">${escapeHtml(data.company || "Nao informado")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">E-mail</td>
            <td style="padding: 8px 0;">${escapeHtml(data.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Telefone</td>
            <td style="padding: 8px 0;">${escapeHtml(data.phone)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Mensagem</td>
            <td style="padding: 8px 0;">${messageLines}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `.trim();
}

export async function sendContactEmail(data: ContactFormPayload, env: ContactEmailEnv): Promise<void> {
  requireEnvString(env, "SMTP_HOST", "SMTP_HOST");
  requireEnvString(env, "SMTP_PORT", "SMTP_PORT");

  const to = requireEnvString(env, "CONTACT_TO_EMAIL", "CONTACT_TO_EMAIL");
  const from = readEnvString(env, "SMTP_FROM") ?? requireEnvString(env, "SMTP_USER", "SMTP_USER ou SMTP_FROM");
  const fromName = readEnvString(env, "SMTP_FROM_NAME") ?? "Site NavShip";

  await sendOnce(env, {
    from: { name: fromName, email: from },
    to,
    reply: { name: data.name, email: data.email },
    subject: `Novo contato do site - ${data.name}`,
    text: buildPlainTextEmail(data),
    html: buildHtmlEmail(data),
  });
}
