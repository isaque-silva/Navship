import hero from "@/assets/hero-shipyard.jpg";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={hero}
        alt="Estaleiro NavShip — navio em construção em dique seco ao entardecer"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,oklch(0.18_0.08_265/0.9),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-20 pt-40 md:pb-32">
        <div className="max-w-3xl">
          <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-white md:text-7xl lg:text-[5.5rem]">
            Engenharia naval <span className="text-ember">construída</span> com precisão.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
            Soluções completas para construção e reparo naval. Excelência técnica, segurança operacional e compromisso
            com cada cliente — há mais de duas décadas no coração do litoral catarinense.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 rounded-full gradient-ember px-7 py-3.5 text-sm font-semibold text-white shadow-ember transition-all hover:scale-[1.03]"
            >
              Conheça nossas soluções
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md md:grid-cols-4">
          {[
            { k: "20+", v: "Anos de operação" },
            { k: "97m", v: "Docagem máxima" },
            { k: "500+", v: "Embarcações atendidas" },
            { k: "ISO", v: "Padrão de qualidade" },
          ].map((s) => (
            <div key={s.v} className="bg-navy-deep/40 p-6">
              <div className="font-display text-3xl font-bold text-ember md:text-4xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
