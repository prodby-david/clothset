export const ADMIN_TOKEN_COOKIE = "clothset_admin_token";

export function getAdminTokenFromCookies(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${ADMIN_TOKEN_COOKIE}=`));

  if (!match) return null;

  return decodeURIComponent(match.split("=")[1] || "");
}

export function setAdminTokenCookie(token: string, maxAgeSeconds: number = 86400): void {
  if (typeof document === "undefined") return;

  const isSecure = window.location.protocol === "https:";
  const secureFlag = isSecure ? "; Secure" : "";

  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(
    token
  )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${secureFlag}`;
}

export function clearAdminTokenCookie(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${ADMIN_TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
