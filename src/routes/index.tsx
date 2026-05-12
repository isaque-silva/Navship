import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { InstitutionalVideo } from "@/components/site/InstitutionalVideo";
import { Services } from "@/components/site/Services";
import { Values } from "@/components/site/Values";
import { Numbers } from "@/components/site/Numbers";
import { Compliance } from "@/components/site/Compliance";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NavShip — Estaleiro de construção e reparo naval" },
      {
        name: "description",
        content:
          "Estaleiro NavShip: soluções de construção e reparo naval com excelência técnica, segurança e eficiência. Localizado em Navegantes, Santa Catarina.",
      },
      { property: "og:title", content: "NavShip — Estaleiro de construção e reparo naval" },
      {
        property: "og:description",
        content:
          "Engenharia naval com precisão. Construção, reparo, conversões e apoio offshore.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <InstitutionalVideo />
      <Services />
      <Values />
      <Numbers />
      <Compliance />
      <Contact />
      <Footer />
    </main>
  );
}
