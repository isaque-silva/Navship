import drydock from "@/assets/drydock.jpg";

export function About() {
  return (
    <section id="sobre" className="relative bg-background py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl gradient-ember opacity-20 blur-2xl" />
          <img
            src={drydock}
            alt="Casco de navio em manutenção dentro de hangar do estaleiro"
            width={1280}
            height={960}
            loading="lazy"
            className="rounded-2xl object-cover shadow-elegant"
          />
          <div className="absolute -bottom-8 -right-6 hidden max-w-xs rounded-xl border border-border bg-card p-5 shadow-elegant md:block">
            <div className="font-display text-3xl font-bold text-navy">2005</div>
            <div className="mt-1 text-sm text-muted-foreground">Início das operações em Navegantes</div>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Sobre a NavShip</span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">
            Construção e reparo naval com <span className="text-ember">padrão internacional</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Fundado em 2005 em Navegantes, no litoral norte de Santa Catarina, o Estaleiro Navship integra o grupo
            Edison Chouest Offshore (ECO), uma das maiores operadoras de embarcações de apoio offshore do mundo. Atuamos
            na construção, reparo e manutenção de embarcações, priorizando a mão de obra local e o desenvolvimento
            sustentável da região.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { t: "Segurança em primeiro lugar", d: "Cultura SMS rigorosa, com treinamento contínuo da equipe." },
              { t: "Engenharia certificada", d: "Projetos validados sob normas nacionais e internacionais." },
              { t: "Capacidade industrial", d: "Diques, oficinas e infraestrutura para grandes obras." },
              { t: "Parceria de longo prazo", d: "Atendimento próximo, do orçamento à entrega." },
            ].map((item) => (
              <div key={item.t} className="border-l-2 border-ember pl-4">
                <div className="font-semibold text-navy">{item.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{item.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
