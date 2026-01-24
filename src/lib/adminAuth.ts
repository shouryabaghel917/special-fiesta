import crypto from "crypto";

type SessionPayload = {
  iat: number; // issued at (unix seconds)
};

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function unb64url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

/**
 * Cookie format: base64url(json).base64url(hmac)
 */
export function signAdminSession(cookieSecret: string, payload: SessionPayload) {
  const json = JSON.stringify(payload);
  const body = b64url(json);

  const hmac = crypto.createHmac("sha256", cookieSecret).update(body).digest("base64url");
  return `${body}.${hmac}`;
}

export function verifyAdminSession(cookieSecret: string, token: string, maxAgeSeconds: number) {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false as const };

  const [body, sig] = parts;

  const expected = crypto.createHmac("sha256", cookieSecret).update(body).digest("base64url");
  // constant-time compare
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return { ok: false as const };

  let payload: SessionPayload;
  try {
    payload = JSON.parse(unb64url(body)) as SessionPayload;
  } catch {
    return { ok: false as const };
  }

  if (!payload?.iat || typeof payload.iat !== "number") return { ok: false as const };

  const now = Math.floor(Date.now() / 1000);
  const age = now - payload.iat;
  if (age < 0 || age > maxAgeSeconds) return { ok: false as const };

  return { ok: true as const, payload };
}
