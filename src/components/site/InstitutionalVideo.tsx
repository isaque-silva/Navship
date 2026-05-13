import { useEffect, useRef, useState } from "react";
import drydockPoster from "@/assets/drydock.jpg";

type PublicConfigResponse = {
  institutionalVideoUrl?: string | null;
};

export function InstitutionalVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const response = await fetch("/api/public-config");
        if (!response.ok) {
          return;
        }
        const data = (await response.json()) as PublicConfigResponse;
        const url = typeof data.institutionalVideoUrl === "string" ? data.institutionalVideoUrl.trim() : "";
        if (!cancelled && url.length > 0) {
          setVideoSrc(url);
        }
      } catch {
        /* Mantém player sem src se a API falhar. */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !videoSrc) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          if (video.ended) {
            video.currentTime = 0;
          }

          video.muted = false;
          video.volume = 1;

          void video.play().catch(() => {
            video.muted = true;

            void video.play().catch(() => {
              /* Ignora bloqueios ocasionais do navegador no autoplay. */
            });
          });
          return;
        }

        video.pause();
      },
      {
        threshold: [0.25, 0.55, 0.8],
      },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <section id="institucional" className="bg-background py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.95fr_1.25fr] lg:items-center">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-ember">NavShip em operação</span>
          <h2 className="mt-4 text-4xl font-bold leading-tight text-navy md:text-5xl">
            Estrutura, engenharia e capacidade naval em Navegantes.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Este institucional apresenta a NavShip em sua essência: um estaleiro com infraestrutura industrial,
            excelência técnica e compromisso com segurança, qualidade e desempenho em cada etapa da construção,
            manutenção e reparo de embarcações.
          </p>
          <div className="mt-8 inline-flex rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-sm font-medium text-navy">
            Conheça de perto a operação e a estrutura do estaleiro
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-navy-deep p-3 shadow-elegant">
          <div className="pointer-events-none absolute inset-x-3 top-3 z-10 flex items-center justify-between rounded-2xl bg-navy-deep/75 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">
            <span>NavShip</span>
            <span>Navegantes/SC</span>
          </div>

          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={drydockPoster}
              controls
              muted
              playsInline
              preload="metadata"
              className="aspect-video w-full rounded-[1.4rem] bg-black object-cover"
            >
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-[1.4rem] bg-black/40 px-6 text-center text-sm text-white/80">
              <p>Vídeo institucional indisponível neste ambiente.</p>
              <p className="text-xs text-white/60">Configure INSTITUTIONAL_VIDEO_URL no painel de deploy.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
