export function getBasePath(): string {
  const base = import.meta.env.BASE_URL || "/";
  return base.endsWith("/") ? base : `${base}/`;
}

export function withBase(path: string): string {
  if (!path || path.startsWith("#") || /^https?:\/\//i.test(path)) {
    return path;
  }

  return `${getBasePath()}${path.replace(/^\//, "")}`;
}

/** URL publica do video institucional (fallback quando nao ha env no build). */
export const DEFAULT_INSTITUTIONAL_VIDEO_URL =
  "https://stream.vidhosting.in/videos/c546daf3.mp4";

export function getInstitutionalVideoUrl(): string {
  const baked = import.meta.env.VITE_INSTITUTIONAL_VIDEO_URL?.trim();
  return baked && baked.length > 0 ? baked : DEFAULT_INSTITUTIONAL_VIDEO_URL;
}

export function getContactApiUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configured) {
    return `${configured.replace(/\/$/, "")}/api/contact`;
  }

  return "/api/contact";
}

export function getPublicConfigUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL?.trim();
  if (configured) {
    return `${configured.replace(/\/$/, "")}/api/public-config`;
  }

  return "/api/public-config";
}
