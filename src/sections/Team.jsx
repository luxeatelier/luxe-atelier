"use client";
import { useEffect, useState } from "react";
import Img from "../components/Img";
import { AnimatePresence, m as motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import data from "../team/team_members.json";
import m0 from "../images/team/Jasil.jpg";
import m1 from "../images/team/shahul1.jpg";
import m2 from "../images/team/ashif.jpg";
import { getLenis } from "../scroll";
import { Words, Reveal } from "../components/Reveal";

const photos = [m0, m1, m2];

export default function Team() {
  const [open, setOpen] = useState(null);
  const m = open === null ? null : data.members[open];

  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const key = (e) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", key);
    return () => { getLenis()?.start(); window.removeEventListener("keydown", key); };
  }, [open]);

  return (
    <section className="sec dark team" id="team">
      <div className="sec-head">
        <Words text="The people who answer your calls." />
        <p className="lede">Every Luxe Atelier project is led by one of our three directors, from the first sketch to the last handover.</p>
      </div>
      <ul className="team-row">
        {data.members.map((p, n) => (
          <Reveal as="li" key={p.fullname} delay={n * 0.12}>
            <button className="team-card" onClick={() => setOpen(n)} data-cursor="View">
              <span className="arch-frame"><Img src={photos[n]} alt={p.fullname} loading="lazy" /></span>
              <b>{p.fullname}</b>
              <span>{p.job}</span>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {m && (
          <motion.div className="modal" role="dialog" aria-modal="true" aria-label={m.fullname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="modal-card" initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }} onClick={(e) => e.stopPropagation()}>
              <div className="arch-frame"><Img src={photos[open]} alt={m.fullname} /></div>
              <div className="modal-text">
                <h3>{m.fullname}</h3>
                <p className="role">{m.job}, {m.country}</p>
                <p>{m.description}</p>
                <ul className="modal-contact">
                  <li><a href={`mailto:${m.mail}`}>{m.mail}</a></li>
                  <li><a href={`tel:+91${m.phone}`}>+91 {m.phone}</a></li>
                </ul>
                <ul className="ftr-social">
                  <li><a href={m.facebook} aria-label="Facebook"><FaFacebookF /></a></li>
                  <li><a href={m.instagram} aria-label="Instagram"><FaInstagram /></a></li>
                  <li><a href={m.whatsapp} aria-label="WhatsApp"><FaWhatsapp /></a></li>
                </ul>
              </div>
              <button className="modal-close" onClick={() => setOpen(null)} aria-label="Close"><BsX /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
