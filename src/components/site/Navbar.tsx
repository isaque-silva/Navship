import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#valores", label: "Identidade" },
  { href: "#numeros", label: "Estaleiro" },
  { href: "#compliance", label: "Compliance" },
  { href: "#contato", label: "Contato" },
];

export function Navbar({ solid = false }: { solid?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const isSolid = solid || scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isSolid
          ? "bg-background/85 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={isHome ? "#top" : "/"} aria-label="NavShip — início">
          <Logo invert={!isSolid} />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={hrefFor(l.href)}
              className={`text-sm font-medium transition-colors hover:text-ember ${
                isSolid ? "text-foreground/80" : "text-white/85"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={hrefFor("#contato")}
          className="hidden rounded-full gradient-ember px-5 py-2.5 text-sm font-semibold text-white shadow-ember transition-transform hover:scale-105 md:inline-flex"
        >
          Fale conosco
        </a>
        <button
          className={`md:hidden rounded-md p-2 ${isSolid ? "text-foreground" : "text-white"}`}
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={hrefFor(l.href)}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-foreground/80 hover:text-ember"
              >
                {l.label}
              </a>
            ))}
            <a
              href={hrefFor("#contato")}
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full gradient-ember px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Fale conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
