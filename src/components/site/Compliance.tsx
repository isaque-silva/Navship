import { Link } from "@tanstack/react-router";
import { Briefcase, FileText, Megaphone, ArrowUpRight } from "lucide-react";

const cards = [
  {
    icon: Briefcase,
    title: "Trabalhe Conosco",
    desc: "Faça parte de uma equipe que valoriza pessoas, segurança e excelência técnica.",
    cta: "Ver oportunidades",
    href: "https://jobs.recrutei.com.br/estaleiro-navship",
    internal: false,
    external: true,
  },
  {
    icon: FileText,
    title: "LGPD",
    desc: "Conheça nossa política de privacidade e o tratamento dos seus dados pessoais.",
    cta: "Acessar política",
    href: "/lgpd",
    internal: true,
  },
  {
    icon: Megaphone,
    title: "Canal de Ética",
    desc: "Hotline para denúncias confidenciais, com tratamento sigiloso e independente.",
    cta: "Acessar canal",
    href: "https://secure.ethicspoint.com/domain/media/pt/gui/34094/issues.html?clientid=34094&locationid=-1",
    internal: false,
    external: true,
  },
];

export function Compliance() {
  return (
    <section id="compliance" className="bg-secondary py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
              Pessoas e governança
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">
              Compromisso com integridade.
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Em conformidade com a Lei nº 14.611/2023, publicamos semestralmente nosso
            Relatório de Transparência e Igualdade Salarial.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, desc, cta, href, internal, external }) => {
            const className =
              "group flex flex-col rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-ember hover:shadow-elegant";
            const inner = (
              <>
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-navy text-ember transition-colors group-hover:gradient-ember group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-bold text-navy">{title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ember">
                  {cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </>
            );
            if (internal) {
              return (
                <Link key={title} to={href} className={className}>
                  {inner}
                </Link>
              );
            }
            return (
              <a
                key={title}
                href={href}
                className={className}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
