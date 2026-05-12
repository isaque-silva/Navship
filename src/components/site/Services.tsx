import { Wrench, Hammer, Ship, Shield, Cog, Waves } from "lucide-react";

const services = [
  { icon: Hammer, title: "Construção naval", desc: "Projetos completos de novas embarcações, do desenho ao lançamento." },
  { icon: Wrench, title: "Reparo e manutenção", desc: "Dockagem, manutenção preventiva e corretiva com agilidade." },
  { icon: Ship, title: "Conversões e modernizações", desc: "Adaptação de embarcações existentes a novas operações." },
  { icon: Cog, title: "Engenharia integrada", desc: "Time multidisciplinar para projetos navais e industriais." },
  { icon: Shield, title: "Inspeção e certificação", desc: "Apoio a vistorias classificadas e auditorias técnicas." },
  { icon: Waves, title: "Apoio offshore", desc: "Suporte operacional a embarcações de apoio marítimo." },
];

export function Services() {
  return (
    <section id="servicos" className="relative overflow-hidden bg-navy-deep py-28 text-white">
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
              O que fazemos
            </span>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              Soluções navais de ponta a ponta.
            </h2>
          </div>
          <p className="max-w-md text-white/70">
            Da prancheta ao mar — entregamos cada etapa com excelência técnica e
            governança de projeto.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative bg-navy-deep p-8 transition-colors hover:bg-navy"
            >
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg gradient-ember shadow-ember">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{desc}</p>
              <div className="absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-ember to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
