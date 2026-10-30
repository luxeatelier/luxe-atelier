import { Resend } from "resend";
import { site } from "../../../site";

export const runtime = "nodejs";

const json = (body, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const clean = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Basic per-IP throttle (per server instance): 5 enquiries per 10 minutes.
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (limited(ip)) return json({ error: "Too many messages. Please try again later." }, 429);

  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid request." }, 400); }

  if (body?.website) return json({ ok: true }); // honeypot: bots fill this in, people never see it

  const name = clean(body?.fullname, 100);
  const email = clean(body?.mail, 160);
  const subject = clean(body?.subject, 150);
  const phone = clean(body?.phone, 30);
  const message = clean(body?.interested, 5000);

  if (name.length < 2) return json({ error: "Please enter your name." }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Please enter a valid email address." }, 400);
  if (message.length < 5) return json({ error: "Please tell us a little about your home." }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ error: "Email is not configured yet. Please email us directly." }, 503);

  const resend = new Resend(apiKey);
  const to = (process.env.CONTACT_TO || site.email).split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.CONTACT_FROM || "Luxe Atelier <onboarding@resend.dev>";

  const text = `New enquiry from the website\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone || "-"}\nSubject: ${subject || "-"}\n\n${message}`;
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222">
    <h2 style="margin:0 0 16px">New enquiry from the website</h2>
    <p><b>Name:</b> ${esc(name)}<br><b>Email:</b> <a href="mailto:${esc(email)}">${esc(email)}</a><br><b>Phone:</b> ${esc(phone || "-")}<br><b>Subject:</b> ${esc(subject || "-")}</p>
    <p style="white-space:pre-wrap;border-left:3px solid #c4a468;padding-left:12px">${esc(message)}</p></div>`;

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `New enquiry: ${subject || name}`,
    text,
    html,
  });

  if (error) {
    console.error("Resend error", error);
    return json({ error: "We could not send your message. Please try again or email us directly." }, 502);
  }
  return json({ ok: true });
}
