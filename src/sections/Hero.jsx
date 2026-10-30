"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m as motion, useAnimationControls, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Img from "../components/Img";
import { heroSlides } from "../content";
import LensHost from "../components/LensHost";

const DURATION = 6500;
const STAGE_SIZES = "(max-width: 900px) 90vw, 500px"; // lens reuses the same files as the main photo
const ease = [0.2, 0.7, 0.1, 1];

// Finishes you can try on the interior: each one tints the photograph.
const finishes = [
  { name: "Natural light", color: null, swatch: "#efe9de" },
  { name: "Smoked walnut", color: "#5a3d2b", swatch: "#5a3d2b" },
  { name: "Brushed brass", color: "#b08d4f", swatch: "#b08d4f" },
  { name: "Forest green", color: "#2f4a3a", swatch: "#2f4a3a" },
  { name: "Clay rose", color: "#b98a78", swatch: "#b98a78" },
];

function Pendant({ on, onToggle }) {
  const controls = useAnimationControls();
  const sway = () => controls.start({ rotate: [-1.6, 1.6], transition: { repeat: Infinity, repeatType: "mirror", duration: 3.4, ease: "easeInOut" } });
  useEffect(() => { sway(); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const kick = async () => {
    onToggle();
    await controls.start({ rotate: [0, 11, -8, 5, -2, 0], transition: { duration: 1.5, ease: "easeOut" } });
    sway();
  };
  return (
    <motion.button
      type="button"
      className={`pendant ${on ? "lit" : ""}`}
      onClick={kick}
      aria-pressed={on}
      aria-label={on ? "Switch the evening lights off" : "Switch the evening lights on"}
      animate={controls}
      style={{ originX: 0.5, originY: 0 }}
      whileHover={{ scale: 1.04 }}
    >
      <svg viewBox="0 0 120 230" width="100%" aria-hidden="true">
        <line x1="60" y1="0" x2="60" y2="118" stroke="#2b2621" strokeWidth="2" />
        <circle cx="60" cy="118" r="5" fill="#2b2621" />
        <path d="M60 112 C 28 112 10 142 6 182 L114 182 C110 142 92 112 60 112 Z" fill="#33443a" />
        <path d="M60 112 C 34 114 20 140 15 176" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="60" cy="184" rx="52" ry="7" className="bulb" />
      </svg>
      <span className="pendant-hint">{on ? "Lights on" : "Switch on the lamp"}</span>
    </motion.button>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [finish, setFinish] = useState(0);
  const [evening, setEvening] = useState(false);
  const [ready, setReady] = useState(false); // secondary images load after the first paint

  useEffect(() => {
    const go = () => setTimeout(() => setReady(true), 1200);
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setI((i + 1) % heroSlides.length), DURATION);
    return () => clearTimeout(t);
  }, [i]);

  // Pointer-driven depth: the interior tilts toward you, the layers drift apart.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : -7, reduce ? 0 : 7]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [reduce ? 0 : 6, reduce ? 0 : -6]);
  const ghostX = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : -48, reduce ? 0 : 48]);
  const ghostY = useTransform(sy, [-0.5, 0.5], [reduce ? 0 : -30, reduce ? 0 : 30]);
  const copyX = useTransform(sx, [-0.5, 0.5], [reduce ? 0 : 10, reduce ? 0 : -10]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  const tint = finishes[finish].color;

  return (
    <section className="hero" id="top" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div className="hero-ghost" aria-hidden="true" style={{ x: ghostX, y: ghostY }} />

      <motion.div className="hero-copy" style={{ x: copyX }}>
        <h1 className="hero-in" style={{ "--d": "0.2s" }}>Homes composed for the way you live.</h1>
        <p className="hero-in" style={{ "--d": "0.5s" }}>
          Luxe Atelier designs and builds complete residential interiors across Kerala, from the first sketch to the final handover, with every space made to work as one.
        </p>
        <div className="hero-actions hero-in" style={{ "--d": "0.7s" }}>
          <Link className="btn" href="/contact">Book a consultation</Link>
          <Link className="btn ghost" href="/projects">View our work</Link>
        </div>
        <div className="hero-note hero-in" style={{ "--d": "0.9s" }}>
          <b>Try it:</b> hold the lens over the interior, pick a finish, switch the lamp on.
        </div>
      </motion.div>

      <div className="hero-stage">
        <LensHost ratio={0.4} zoom={2.4} rest={{ x: 0.08, y: 0.74 }} lens={<>{heroSlides.map((s, n) => (n > 0 && !ready ? null : <Img key={s.label} src={s.src} alt="" className={`lens-fill ${n === i ? "on" : ""}`} sizes={STAGE_SIZES} />))}</>}>
        <motion.div className="tilt" style={{ rotateX, rotateY, transformPerspective: 1100 }}>
          <div className="arch-frame">
            {heroSlides.map((s, n) => (n > 0 && !ready ? null : <Img key={s.label} src={s.src} alt={n === i ? s.alt : ""} className={n === i ? "on" : ""} priority={n === 0} sizes={STAGE_SIZES} />
            ))}
            <motion.div className="finish-tint" aria-hidden="true" initial={false} animate={{ opacity: tint ? 0.42 : 0, backgroundColor: tint || "#000000" }} transition={{ duration: 0.8, ease }} />
            <motion.div className="dusk" aria-hidden="true" initial={false} animate={{ opacity: evening ? 1 : 0 }} transition={{ duration: 1.4, ease }} />
            <motion.div className="light-pool" aria-hidden="true" initial={false} style={{ originX: 0.62, originY: 0 }} animate={{ opacity: evening ? 1 : 0, scale: evening ? 1 : 0.55 }} transition={{ duration: 1.8, ease }} />
            <motion.div className="light-cone" aria-hidden="true" initial={false} style={{ originX: 0.62, originY: 0 }} animate={{ opacity: evening ? 1 : 0, scaleY: evening ? 1 : 0.3, scaleX: evening ? 1 : 0.5 }} transition={{ duration: 1.6, ease }} />
          </div>
        </motion.div>
        </LensHost>


        <motion.div className="bloom" aria-hidden="true" initial={false} animate={evening ? { opacity: [0.85, 1, 0.9, 1], scale: [1, 1.06, 1] } : { opacity: 0, scale: 0.6 }} transition={evening ? { duration: 4.5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" } : { duration: 0.8 }} />
        <Pendant on={evening} onToggle={() => setEvening((v) => !v)} />

        <div className="finish-pick" role="group" aria-label="Try a finish on the interior">
          <ul>
            {finishes.map((f, n) => (
              <li key={f.name}>
                <motion.button
                  type="button"
                  aria-label={f.name}
                  aria-pressed={finish === n}
                  onClick={() => setFinish(n)}
                  whileHover={{ scale: 1.18 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ background: f.swatch }}
                >
                  {finish === n && <motion.span className="ring" layoutId="finish-ring" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </motion.button>
              </li>
            ))}
          </ul>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={finish} className="finish-name" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              {finishes[finish].name}
            </motion.span>
          </AnimatePresence>
        </div>

        <ul className="hero-rooms" aria-label="Choose an interior view">
          {heroSlides.map((s, n) => (
            <li key={s.label}>
              <button className={n === i ? "on" : ""} onClick={() => setI(n)} aria-label={s.label}>
                <span>{s.label}</span>
                <i style={n === i ? { animationDuration: `${DURATION}ms` } : undefined} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
