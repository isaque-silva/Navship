import { useState } from "react";
import welding from "@/assets/welding.jpg";
import type { ContactFormPayload } from "@/lib/contact-form";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";

const INITIAL_FORM: ContactFormPayload = {
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
};

export function Contact() {
  const [formData, setFormData] = useState<ContactFormPayload>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const updateField = (field: keyof ContactFormPayload, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        throw new Error(result?.message ?? "Nao foi possivel enviar sua solicitacao.");
      }

      setFormData(INITIAL_FORM);
      setFeedback({
        type: "success",
        message: result?.message ?? "Solicitacao enviada com sucesso.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Nao foi possivel enviar sua solicitacao.";
      setFeedback({
        type: "error",
        message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="relative isolate overflow-hidden bg-navy-deep py-28 text-white">
      <img
        src={welding}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-deep/70" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Contato</span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Vamos conversar sobre o seu próximo projeto.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-white/75">
            Nossa equipe comercial está pronta para entender sua demanda e propor a
            melhor solução técnica e logística.
          </p>

          <div className="mt-10 space-y-5">
            {[
              {
                icon: MapPin,
                label: "Endereço",
                value: "Rua Orlando Ferreira, 305 — Machados, Navegantes / SC · CEP 88371-320",
              },
              { icon: Phone, label: "Telefone", value: "+55 (47) 2104-2800" },
              { icon: Mail, label: "E-mail", value: "comercial@navship.com.br" },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-4">
                <div className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5">
                  <c.icon className="h-4 w-4 text-ember" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-white/60">{c.label}</div>
                  <div className="mt-0.5 text-base text-white">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl shadow-elegant">
          <h3 className="font-display text-2xl font-bold">Solicite um orçamento</h3>
          <p className="mt-2 text-sm text-white/70">Retornamos em até 24 horas úteis.</p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field
              label="Nome"
              placeholder="Seu nome completo"
              value={formData.name}
              onChange={(value) => updateField("name", value)}
              autoComplete="name"
              required
            />
            <Field
              label="Empresa"
              placeholder="Razao social"
              value={formData.company}
              onChange={(value) => updateField("company", value)}
              autoComplete="organization"
            />
            <Field
              label="E-mail"
              type="email"
              placeholder="voce@empresa.com"
              value={formData.email}
              onChange={(value) => updateField("email", value)}
              autoComplete="email"
              required
            />
            <Field
              label="Telefone"
              placeholder="(47) 90000-0000"
              value={formData.phone}
              onChange={(value) => updateField("phone", value)}
              autoComplete="tel"
              required
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Mensagem
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Descreva brevemente seu projeto ou necessidade"
              required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-ember"
            />
          </div>
          {feedback && (
            <p
              role="status"
              className={`mt-4 text-sm ${feedback.type === "success" ? "text-emerald-300" : "text-red-300"}`}
            >
              {feedback.message}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full gradient-ember px-7 py-3.5 text-sm font-semibold text-white shadow-ember transition-transform hover:scale-[1.02]"
          >
            {isSubmitting ? "Enviando..." : "Enviar solicitacao"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-ember"
      />
    </div>
  );
}
