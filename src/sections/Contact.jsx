"use client";
import { useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import VCardDownload from "../vcfCardDownload";
import { Words, useInView } from "../components/Reveal";

export default function Contact({ h1 = false }) {
  const form = useRef();
  const inView = useInView();
  const [snack, setSnack] = useState({ open: false, severity: "success", message: "" });
  const [sending, setSending] = useState(false);

  const send = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSnack({ open: false, severity: "success", message: "" });
    try {
      const data = Object.fromEntries(new FormData(form.current).entries());
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const out = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(out.error || "Failed sending message.");
      setSnack({ open: true, severity: "success", message: "Thank you. Your message has been sent and a director will reply soon." });
      form.current.reset();
    } catch (err) {
      setSnack({ open: true, severity: "error", message: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="sec dark contact first" id="contact">
      <div className="contact-side">
        <Words as={h1 ? "h1" : "h2"} text="Let us design your next home." />
        <ul className="contact-details">
          <li><span>Email</span><a href="mailto:luxeatelierpvtltd@gmail.com">luxeatelierpvtltd@gmail.com</a></li>
          <li><span>Studio</span>Ernakulam, Kerala</li>
          <li><span>Contact card</span><button type="button" onClick={() => new VCardDownload().downloadVCard()}>Save Luxe Atelier to contacts</button></li>
          <li><span>Links</span><a href="https://linktr.ee/luxeatelier">linktr.ee/luxeatelier</a></li>
        </ul>
      </div>
      <form className="contact-form rv" ref={(el) => { form.current = el; inView.current = el; }} onSubmit={send}>
        <label>Name<input type="text" name="fullname" autoComplete="name" required /></label>
        <label>Email<input type="email" name="mail" autoComplete="email" required /></label>
        <label>Subject<input type="text" name="subject" /></label>
        <label>Phone<input type="tel" name="phone" autoComplete="tel" /></label>
        <label className="wide">How can we help?<textarea name="interested" rows="4" placeholder="Tell us about your home, the spaces you have in mind and the timeline."></textarea></label>
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <button type="submit" className="btn" disabled={sending}>{sending ? "Sending…" : "Send message"} <BsArrowRight /></button>
        <p className={`form-status ${snack.severity}`} role="status" aria-live="polite">{snack.open ? snack.message : ""}</p>
      </form>
      <div className="map">
        <iframe title="Map to the Luxe Atelier studio" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.34322249298!2d76.59773757385591!3d10.070937490038148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07e7a88b9b72b9%3A0x6118d0ea4e865bdc!2sNekz%20Concepts%20Private%20Limited!5e0!3m2!1sen!2sin!4v1714322463981!5m2!1sen!2sin"></iframe>
      </div>
    </section>
  );
}
