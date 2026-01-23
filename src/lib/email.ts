import { Resend } from "resend";
import { getEventConfig } from "@/config/event";

export type RSVPEmailPayload = {
  name: string;
  email: string;
  guests: number;
  note?: string;
  createdAtISO: string;
};

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

function buildConfirmationHtml(payload: RSVPEmailPayload) {
  const cfg = getEventConfig();
  const title = `${cfg.brand.name} — RSVP Confirmed`;
  const safeName = escapeHtml(payload.name);
  const safeNote = payload.note ? escapeHtml(payload.note) : "";

  return `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; background:#0b0b12; padding:24px;">
    <div style="max-width:640px; margin:0 auto; background:#111122; border:1px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden;">
      <div style="padding:22px 22px 12px;">
        <div style="font-size:12px; color:rgba(255,255,255,0.7); letter-spacing:0.2px;">${escapeHtml(cfg.brand.name)}</div>
        <h1 style="margin:10px 0 0; font-size:22px; color:#fff;">RSVP confirmed ✅</h1>
        <p style="margin:10px 0 0; color:rgba(255,255,255,0.78); line-height:1.5;">
          Hey <strong>${safeName}</strong>, we’ve received your RSVP. See you at the fiesta ✨
        </p>
      </div>

      <div style="padding:0 22px 18px;">
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:14px;">
          <div style="color:rgba(255,255,255,0.85); font-weight:600; margin-bottom:8px;">Your RSVP</div>
          <div style="color:rgba(255,255,255,0.78); line-height:1.65; font-size:14px;">
            <div><strong>Name:</strong> ${safeName}</div>
            <div><strong>Email:</strong> ${escapeHtml(payload.email)}</div>
            <div><strong>Guests:</strong> ${payload.guests}</div>
            <div><strong>Submitted:</strong> ${escapeHtml(formatDate(payload.createdAtISO))}</div>
            ${
              safeNote
                ? `<div style="margin-top:10px;"><strong>Note:</strong><br/>${safeNote}</div>`
                : ""
            }
          </div>
        </div>

        <p style="margin:14px 0 0; color:rgba(255,255,255,0.6); font-size:12px; line-height:1.5;">
          If you didn’t make this RSVP, you can ignore this email.
        </p>
      </div>

      <div style="padding:14px 22px; border-top:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.55); font-size:12px;">
        ${escapeHtml(cfg.brand.name)} • ${escapeHtml(cfg.footer.line2)}
      </div>
    </div>
  </div>
  `;
}

function buildConfirmationText(payload: RSVPEmailPayload) {
  const cfg = getEventConfig();
  return [
    `${cfg.brand.name} — RSVP Confirmed`,
    "",
    `Hey ${payload.name}, we’ve received your RSVP. See you at the fiesta!`,
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Guests: ${payload.guests}`,
    `Submitted: ${formatDate(payload.createdAtISO)}`,
    payload.note ? `Note: ${payload.note}` : "",
    "",
    "If you didn’t make this RSVP, you can ignore this email."
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Sends attendee confirmation + optional admin notification.
 * - Enabled only if RESEND_API_KEY + RESEND_FROM are set
 * - Admin notification is sent only if RESEND_ADMIN_TO is set
 */
export async function sendRsvpEmails(payload: RSVPEmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM; // e.g. "Special Fiesta <onboarding@resend.dev>" or your verified domain sender
  const adminTo = process.env.RESEND_ADMIN_TO; // optional

  if (!apiKey || !from) {
    return { sent: false as const, reason: "missing_env" as const };
  }

  const resend = new Resend(apiKey);
  const cfg = getEventConfig();

  const subject = `${cfg.brand.name} — RSVP Confirmed ✅`;

  // attendee email
  await resend.emails.send({
    from,
    to: payload.email,
    subject,
    html: buildConfirmationHtml(payload),
    text: buildConfirmationText(payload)
  });

  // optional admin notification
  if (adminTo) {
    await resend.emails.send({
      from,
      to: adminTo,
      subject: `${cfg.brand.name} — New RSVP: ${payload.name}`,
      text: `New RSVP received\n\nName: ${payload.name}\nEmail: ${payload.email}\nGuests: ${payload.guests}\nCreated: ${payload.createdAtISO}\nNote: ${payload.note || "-"}`
    });
  }

  return { sent: true as const };
}
