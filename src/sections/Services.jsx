"use client";
import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import services from "../servicesPage/services.json";
import { serviceImages } from "../content";
import { Words } from "../components/Reveal";

export default function Services({ h1 = false }) {
  const [on, setOn] = useState(0);
  return (
    <section className="sec dark services first" id="services">
      <div className="services-pic">
        <div className="arch-frame sticky">
          <AnimatePresence mode="sync" initial={false}>
            <motion.img key={on} src={serviceImages[on].src} alt="" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1, ease: [0.2, 0.7, 0.1, 1] }} />
          </AnimatePresence>
        </div>
      </div>
      <div className="services-list">
        <Words as={h1 ? "h1" : "h2"} text="Everything under one roof." />
        <p className="lede">From the first conversation to the last cushion, one team carries your project.</p>
        <ul>
          {services.services.map((s, n) => (
            <li key={s.service_name} className={n === on ? "on" : ""}>
              <button onClick={() => setOn(n)} onMouseEnter={() => setOn(n)} aria-expanded={n === on}>
                <span className="svc-name">{s.service_name}</span>
                <span className="svc-plus" aria-hidden="true" />
              </button>
              <motion.div className="svc-body" initial={false} animate={{ height: n === on ? "auto" : 0, opacity: n === on ? 1 : 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}>
                <p>{s.service_content}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
