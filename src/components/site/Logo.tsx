import logoSrc from "@/assets/navship-logo.png";

export function Logo({ className = "", invert = false }: { className?: string; invert?: boolean }) {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="NavShip"
        className={`h-9 w-auto md:h-10 ${invert ? "brightness-0 invert" : ""}`}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
