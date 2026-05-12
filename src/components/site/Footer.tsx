import { useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);
  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Estaleiro Navship LTDA — soluções de construção e reparo naval com
            qualidade, segurança e eficiência.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-navy">Navegação</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href={hrefFor("#sobre")} className="hover:text-ember">Sobre</a></li>
            <li><a href={hrefFor("#servicos")} className="hover:text-ember">Serviços</a></li>
            <li><a href={hrefFor("#valores")} className="hover:text-ember">Identidade</a></li>
            <li><a href={hrefFor("#compliance")} className="hover:text-ember">Compliance</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-navy">Contato</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Rua Orlando Ferreira, 305</li>
            <li>Machados — Navegantes / SC</li>
            <li>CEP 88371-320</li>
            <li>+55 (47) 2104-2800</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-border px-6 pt-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Estaleiro Navship LTDA · Todos os direitos reservados</div>
        <div>CNPJ — Política de Privacidade · LGPD</div>
      </div>
    </footer>
  );
}
