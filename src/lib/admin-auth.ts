// Uses Web Crypto (not node:crypto) so this also works in the Edge middleware runtime.
export const ADMIN_COOKIE = "admin_session";

function secret() {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD is not set — add it to .env");
  return pw;
}

export function checkPassword(password: string) {
  return password === secret();
}

/** Deterministic token derived from the password — no session storage needed. */
export async function sessionToken() {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode("admin-session"));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidSession(token: string | undefined) {
  if (!token) return false;
  return token === (await sessionToken());
}
