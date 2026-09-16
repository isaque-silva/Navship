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
