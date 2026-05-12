import aerial from "@/assets/aerial.jpg";

export function Numbers() {
  return (
    <section id="numeros" className="relative isolate overflow-hidden py-28 text-white">
      <img
        src={aerial}
        alt="Vista aérea do estaleiro"
        width={1280}
        height={960}
        loading="lazy"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-navy-deep/85" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">
            Estrutura
          </span>
          <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Capacidade industrial à altura dos maiores projetos.
          </h2>
          <p className="mt-6 text-lg text-white/75">
            Localizado estrategicamente em Navegantes, no litoral norte de Santa
            Catarina, nosso estaleiro reúne infraestrutura, equipe técnica e
            processos para atender desde manutenções pontuais até obras de grande porte.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { k: "2005", v: "Ano de fundação" },
            { k: "≈400", v: "Profissionais" },
            { k: "97m", v: "Capacidade máx. de docagem" },
            { k: "ECO", v: "Grupo Edison Chouest Offshore" },
          ].map((s) => (
            <div key={s.v} className="border-l-2 border-ember pl-5">
              <div className="font-display text-4xl font-bold md:text-5xl">{s.k}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
