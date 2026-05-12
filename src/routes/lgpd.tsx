import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/lgpd")({
  component: LGPDPage,
  head: () => ({
    meta: [
      { title: "Política de Privacidade e Segurança de Dados (LGPD) — NavShip" },
      {
        name: "description",
        content:
          "Política de Privacidade e Segurança de Dados do Estaleiro NavShip em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
      },
      {
        property: "og:title",
        content: "Política de Privacidade e Segurança de Dados (LGPD) — NavShip",
      },
      {
        property: "og:description",
        content:
          "Conheça como o Estaleiro NavShip trata e protege seus dados pessoais conforme a LGPD.",
      },
    ],
  }),
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h3 className="font-display text-xl font-semibold text-navy">{title}</h3>
      <div className="mt-3 space-y-3 text-foreground/80">{children}</div>
    </div>
  );
}

function LGPDPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar solid />
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ember hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à página inicial
          </Link>

          <span className="mt-8 block text-xs font-bold uppercase tracking-[0.2em] text-ember">
            Governança e privacidade
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-navy md:text-5xl">
            Política de Privacidade e Segurança de Dados
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            A presente Política de Privacidade e Segurança de Dados do Estaleiro Navship LTDA,
            em acordo com a LGPD (Lei Geral de Proteção de Dados — Lei nº 13.709, de agosto
            de 2018), contém diretrizes e informações sobre como os dados são tratados e
            como são protegidas as informações capturadas por meio deste web site, e serão
            regidas pelas condições abaixo transcritas.
          </p>
          <p className="mt-4 text-foreground/80">
            O web site do Estaleiro Navship é referenciado, neste documento, de duas formas:
            como www.navship.com.br ou como web site. Classificam-se como "usuário" todas as
            pessoas que se cadastram neste web site e recebem uma identificação individual
            e exclusiva. Entende-se por identificação individual toda informação que não
            está disponível para o público em geral. É exemplo de dado de identificação
            individual o nº de CPF. Criptografia é o nome dado ao processo de codificação de
            informações. As informações são codificadas (embaralhadas) na origem e
            decodificadas no destino, dificultando, dessa forma, que as informações que
            trafegam na internet sejam decifradas.
          </p>

          <Section title="Compromisso Estaleiro NavShip">
            <p>O Estaleiro Navship está comprometido em:</p>
            <ul className="ml-6 list-disc space-y-2">
              <li>
                Coletar em seu web site apenas as informações sobre identificação individual
                necessárias à viabilização do cadastro de currículo;
              </li>
              <li>
                Cumprir rigorosamente todas as determinações desta Política de Privacidade
                e Segurança de Dados.
              </li>
            </ul>
          </Section>

          <Section title="Privacidade de Dados">
            <Sub title="Captura de Dados">
              <p>
                Ao se cadastrar e navegar em www.navship.com.br, dependendo da ação
                realizada, serão requisitadas informações sobre:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Identificação individual do usuário;</li>
                <li>Acesso do internauta (exemplo: data e horário de realização do acesso).</li>
              </ul>
            </Sub>

            <Sub title="Utilização e Tratamento dos Dados">
              <p>
                As informações capturadas por meio do web site serão utilizadas pelo
                Estaleiro Navship com a finalidade de:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>
                  Permitir aos internautas navegar ou realizar as operações disponibilizadas
                  no web site;
                </li>
                <li>Viabilizar o cadastro do currículo do usuário no web site;</li>
                <li>Realizar estatísticas genéricas.</li>
              </ul>
            </Sub>

            <Sub title="Divulgação de Dados">
              <p>
                O Estaleiro Navship não divulga dados sobre a identificação individual de
                internautas a terceiros. Excetuam-se os casos em que:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>Exista determinação judicial para fornecimento de dados;</li>
                <li>
                  Para empresas do mesmo grupo econômico do Estaleiro Navship, quando
                  devidamente solicitado;
                </li>
                <li>
                  Exista a necessidade de identificar ou revelar dados do internauta que
                  esteja utilizando o seu web site com propósitos ilícitos (intencionalmente
                  ou não).
                </li>
              </ul>
            </Sub>

            <Sub title="Garantia de Privacidade">
              <p>
                É possível acessar web sites e portais de outras empresas a partir do site
                www.navship.com.br, sendo que cada empresa possui políticas próprias para
                garantir o sigilo e a proteção de dados. Dessa forma, ressaltamos que esta
                Política se aplica apenas ao web site do Estaleiro Navship LTDA, cabendo
                exclusivamente ao internauta a responsabilidade de se informar sobre as
                políticas para preservação e proteção vigentes para os demais web sites.
              </p>
              <p>
                O Estaleiro Navship se empenha expressivamente para prover segurança e
                sigilo das informações que capta. Contudo, para que as medidas adotadas
                tenham eficácia, faz-se necessário que cada internauta também tenha atitude
                responsável, sendo cuidadoso com os dados de sua identificação individual
                sempre que acessar a internet, informando-os somente em operações em que
                exista a proteção de dados, nunca divulgando sua identificação de usuário.
              </p>
            </Sub>
          </Section>

          <Section title="Segurança de Dados">
            <Sub title="Proteção de Dados">
              <p>
                Em alguns pontos do site www.navship.com.br são coletadas informações de
                identificação individual e/ou cadastrais (como nome completo, endereço,
                telefones, etc.) necessárias à navegação ou utilização dos serviços
                disponíveis. Como medida de proteção, as informações de identificação
                individual e/ou cadastral, coletadas pelo Estaleiro Navship, passam por
                processo de criptografia antes de tramitarem pela internet. As informações
                passam por processo de criptografia em todas as páginas de coleta de dados.
              </p>
              <p>
                As informações identificáveis, coletadas pelo Estaleiro Navship, são
                manipuladas apenas por pessoal autorizado.
              </p>
              <p>
                As operações realizadas no www.navship.com.br por um usuário, bem como as
                informações associadas a estas operações, são exclusivas e só podem ser
                acessadas por este usuário.
              </p>
            </Sub>

            <Sub title="Identificação do Usuário">
              <p>
                Ao se cadastrar no www.navship.com.br cada usuário recebe uma identificação
                única (seu CPF), identificação esta que passa a ser requerida e autenticada
                nos demais acessos ao site, sendo certo que essa identificação, para os fins
                de direito, serve como assinatura de concordância com qualquer ação feita
                neste web site.
              </p>
              <p>
                A identificação de usuário é exclusiva, intransferível e criptografada para
                ser transmitida ao servidor do Estaleiro Navship.
              </p>
            </Sub>
          </Section>

          <Section title="Alterações na Política">
            <p>
              O Estaleiro Navship poderá alterar esta Política de Privacidade e Segurança
              de Dados a qualquer momento.
            </p>
            <p>
              Toda alteração na presente Política de Privacidade e Segurança de Dados será
              veiculada neste espaço. Portanto, solicitamos a leitura periódica desta
              Política como meio de se cientificar sobre a forma que o Estaleiro Navship
              coleta, trata e protege as suas informações.
            </p>
          </Section>

          <Section title="Considerações Finais">
            <p>
              O preenchimento dos dados curriculares pelo usuário não é uma garantia de
              contratação, sendo que os dados serão analisados pela NAVSHIP e qualquer
              outro contato com o usuário será realizado por telefone ou e-mail cadastrado
              ao site.
            </p>
            <p>
              O Estaleiro NAVSHIP não cobra e não autoriza qualquer tipo de cobrança pela
              utilização do website e o cadastro do currículo.
            </p>
          </Section>

          <Section title="Canal de Contato">
            <p>
              O Estaleiro Navship oferece os seguintes canais de contato para o titular dos
              dados:
            </p>
            <div className="rounded-2xl border border-border bg-secondary p-6">
              <p className="font-semibold text-navy">
                Naikow Krueger — DPO do Estaleiro Navship
              </p>
              <p className="mt-2">
                E-mail:{" "}
                <a
                  href="mailto:navship.it@chouest.com"
                  className="font-semibold text-ember hover:underline"
                >
                  navship.it@chouest.com
                </a>
              </p>
              <p>
                Telefone:{" "}
                <a
                  href="tel:+554721042800"
                  className="font-semibold text-ember hover:underline"
                >
                  +55 47 2104-2800
                </a>
              </p>
            </div>
          </Section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
