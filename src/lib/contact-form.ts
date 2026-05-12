import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(120, "Nome muito longo."),
  company: z.string().trim().max(120, "Empresa muito longa.").optional().default(""),
  email: z.string().trim().email("Informe um e-mail valido.").max(160, "E-mail muito longo."),
  phone: z.string().trim().min(8, "Informe um telefone valido.").max(40, "Telefone muito longo."),
  message: z.string().trim().min(10, "Descreva sua necessidade com mais detalhes.").max(2000, "Mensagem muito longa."),
});

export type ContactFormPayload = z.infer<typeof contactFormSchema>;

export function parseContactForm(input: unknown): ContactFormPayload {
  return contactFormSchema.parse(input);
}
