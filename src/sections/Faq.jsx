"use client";
import { useState } from "react";
import { m as motion } from "framer-motion";
import faq from "../faq/faqData.json";
import { Words } from "../components/Reveal";

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec light faq" id="faq">
      <div className="faq-head">
        <Words text="Questions, answered." />
        <p className="lede">Not here? Write to us and a director will reply personally.</p>
      </div>
      <ul className="faq-list">
        {faq.map((f, n) => (
          <li key={f.q} className={n === open ? "on" : ""}>
            <button onClick={() => setOpen(n === open ? -1 : n)} aria-expanded={n === open}>
              <span>{f.q}</span><i aria-hidden="true" />
            </button>
            <motion.div initial={false} animate={{ height: n === open ? "auto" : 0, opacity: n === open ? 1 : 0 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }} style={{ overflow: "hidden" }}>
              <p>{f.a}</p>
            </motion.div>
          </li>
        ))}
      </ul>
    </section>
  );
}
