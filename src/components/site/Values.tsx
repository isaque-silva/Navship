import { Target, Eye, Gem } from "lucide-react";

const items = [
  {
    icon: Target,
    label: "Missão",
    title: "Construir e reparar com excelência.",
    desc: "Oferecer soluções para construção e reparo naval, primando pela qualidade, eficiência e satisfação dos nossos clientes — em um ambiente seguro e sustentável.",
  },
  {
    icon: Eye,
    label: "Visão",
    title: "Ser referência no setor naval brasileiro.",
    desc: "Crescer de forma consistente, ampliando capacidade técnica e tornando-se a primeira escolha para armadores e operadores que buscam qualidade.",
  },
  {
    icon: Gem,
    label: "Valores",
    title: "Integridade, segurança e responsabilidade.",
    desc: "Integridade, Segurança, Criatividade, Igualdade, Comprometimento com a sociedade e respeito ao meio ambiente.",
  },
];

export function Values() {
  return (
    <section id="valores" className="bg-background py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
            Identidade
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">
            O que nos move.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map(({ icon: Icon, label, title, desc }) => (
            <article
              key={label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-ember/5 transition-all group-hover:scale-125" />
              <div className="relative">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-ember">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-ember">
                  {label}
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-navy">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
