import { V as jsxRuntimeExports } from "./server-s-qwSZVY.js";
import { L as Link } from "./router-Dj7QNkyv.js";
import { c as createLucideIcon, N as Navbar, F as Footer } from "./Footer-DbfBPr-y.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode);
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-navy md:text-3xl", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-4 text-base leading-relaxed text-foreground/80", children })
  ] });
}
function Sub({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-navy", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 space-y-3 text-foreground/80", children })
  ] });
}
function LGPDPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { solid: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("article", { className: "pt-32 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm font-semibold text-ember hover:underline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        "Voltar à página inicial"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-8 block text-xs font-bold uppercase tracking-[0.2em] text-ember", children: "Governança e privacidade" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-4xl font-bold leading-tight text-navy md:text-5xl", children: "Política de Privacidade e Segurança de Dados" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg leading-relaxed text-muted-foreground", children: "A presente Política de Privacidade e Segurança de Dados do Estaleiro Navship LTDA, em acordo com a LGPD (Lei Geral de Proteção de Dados — Lei nº 13.709, de agosto de 2018), contém diretrizes e informações sobre como os dados são tratados e como são protegidas as informações capturadas por meio deste web site, e serão regidas pelas condições abaixo transcritas." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/80", children: 'O web site do Estaleiro Navship é referenciado, neste documento, de duas formas: como www.navship.com.br ou como web site. Classificam-se como "usuário" todas as pessoas que se cadastram neste web site e recebem uma identificação individual e exclusiva. Entende-se por identificação individual toda informação que não está disponível para o público em geral. É exemplo de dado de identificação individual o nº de CPF. Criptografia é o nome dado ao processo de codificação de informações. As informações são codificadas (embaralhadas) na origem e decodificadas no destino, dificultando, dessa forma, que as informações que trafegam na internet sejam decifradas.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Compromisso Estaleiro NavShip", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O Estaleiro Navship está comprometido em:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-6 list-disc space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Coletar em seu web site apenas as informações sobre identificação individual necessárias à viabilização do cadastro de currículo;" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Cumprir rigorosamente todas as determinações desta Política de Privacidade e Segurança de Dados." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Privacidade de Dados", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sub, { title: "Captura de Dados", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ao se cadastrar e navegar em www.navship.com.br, dependendo da ação realizada, serão requisitadas informações sobre:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-6 list-disc space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identificação individual do usuário;" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Acesso do internauta (exemplo: data e horário de realização do acesso)." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sub, { title: "Utilização e Tratamento dos Dados", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "As informações capturadas por meio do web site serão utilizadas pelo Estaleiro Navship com a finalidade de:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-6 list-disc space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Permitir aos internautas navegar ou realizar as operações disponibilizadas no web site;" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Viabilizar o cadastro do currículo do usuário no web site;" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Realizar estatísticas genéricas." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sub, { title: "Divulgação de Dados", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O Estaleiro Navship não divulga dados sobre a identificação individual de internautas a terceiros. Excetuam-se os casos em que:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "ml-6 list-disc space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Exista determinação judicial para fornecimento de dados;" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Para empresas do mesmo grupo econômico do Estaleiro Navship, quando devidamente solicitado;" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Exista a necessidade de identificar ou revelar dados do internauta que esteja utilizando o seu web site com propósitos ilícitos (intencionalmente ou não)." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sub, { title: "Garantia de Privacidade", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "É possível acessar web sites e portais de outras empresas a partir do site www.navship.com.br, sendo que cada empresa possui políticas próprias para garantir o sigilo e a proteção de dados. Dessa forma, ressaltamos que esta Política se aplica apenas ao web site do Estaleiro Navship LTDA, cabendo exclusivamente ao internauta a responsabilidade de se informar sobre as políticas para preservação e proteção vigentes para os demais web sites." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O Estaleiro Navship se empenha expressivamente para prover segurança e sigilo das informações que capta. Contudo, para que as medidas adotadas tenham eficácia, faz-se necessário que cada internauta também tenha atitude responsável, sendo cuidadoso com os dados de sua identificação individual sempre que acessar a internet, informando-os somente em operações em que exista a proteção de dados, nunca divulgando sua identificação de usuário." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Segurança de Dados", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sub, { title: "Proteção de Dados", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Em alguns pontos do site www.navship.com.br são coletadas informações de identificação individual e/ou cadastrais (como nome completo, endereço, telefones, etc.) necessárias à navegação ou utilização dos serviços disponíveis. Como medida de proteção, as informações de identificação individual e/ou cadastral, coletadas pelo Estaleiro Navship, passam por processo de criptografia antes de tramitarem pela internet. As informações passam por processo de criptografia em todas as páginas de coleta de dados." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "As informações identificáveis, coletadas pelo Estaleiro Navship, são manipuladas apenas por pessoal autorizado." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "As operações realizadas no www.navship.com.br por um usuário, bem como as informações associadas a estas operações, são exclusivas e só podem ser acessadas por este usuário." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sub, { title: "Identificação do Usuário", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Ao se cadastrar no www.navship.com.br cada usuário recebe uma identificação única (seu CPF), identificação esta que passa a ser requerida e autenticada nos demais acessos ao site, sendo certo que essa identificação, para os fins de direito, serve como assinatura de concordância com qualquer ação feita neste web site." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "A identificação de usuário é exclusiva, intransferível e criptografada para ser transmitida ao servidor do Estaleiro Navship." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Alterações na Política", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O Estaleiro Navship poderá alterar esta Política de Privacidade e Segurança de Dados a qualquer momento." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Toda alteração na presente Política de Privacidade e Segurança de Dados será veiculada neste espaço. Portanto, solicitamos a leitura periódica desta Política como meio de se cientificar sobre a forma que o Estaleiro Navship coleta, trata e protege as suas informações." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Considerações Finais", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O preenchimento dos dados curriculares pelo usuário não é uma garantia de contratação, sendo que os dados serão analisados pela NAVSHIP e qualquer outro contato com o usuário será realizado por telefone ou e-mail cadastrado ao site." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O Estaleiro NAVSHIP não cobra e não autoriza qualquer tipo de cobrança pela utilização do website e o cadastro do currículo." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Canal de Contato", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "O Estaleiro Navship oferece os seguintes canais de contato para o titular dos dados:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-secondary p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-navy", children: "Naikow Krueger — DPO do Estaleiro Navship" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2", children: [
            "E-mail:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:navship.it@chouest.com", className: "font-semibold text-ember hover:underline", children: "navship.it@chouest.com" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Telefone:",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "tel:+554721042800", className: "font-semibold text-ember hover:underline", children: "+55 47 2104-2800" })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  LGPDPage as component
};
