"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m as motion } from "framer-motion";
import { BsArrowLeft, BsArrowRight, BsArrowUpRight, BsX } from "react-icons/bs";
import Img from "../components/Img";
import { Reveal, Words } from "../components/Reveal";
import { projects, categories, spaceLabel } from "../projectImages";
import ReelEmbed from "../components/ReelEmbed";
import { films, profileUrl } from "../reels";
import { getLenis } from "../scroll";

const STEP = 12;
// Frame shapes repeat in a pattern so the wall reads as a hand-hung collection (span = grid rows).
const shapes = [
  { k: "arch", span: 62 }, { k: "sq", span: 44 }, { k: "port", span: 54 }, { k: "land", span: 36 },
  { k: "tall", span: 68 }, { k: "sq", span: 44 }, { k: "port", span: 54 }, { k: "arch", span: 62 },
];
const ease = [0.2, 0.7, 0.1, 1];

// Frames below the first row fade in as they scroll into view; the first row is always visible.
function Wrap({ on, delay, children }) {
  return on ? <Reveal className="gal-reveal" delay={delay}>{children}</Reveal> : <div className="gal-reveal">{children}</div>;
}
const pad = (n) => String(n).padStart(2, "0");

function Viewer({ list, index, setIndex, onClose }) {
  const cur = list[index];
  const [dir, setDir] = useState(1);
  const closeRef = useRef(null);
  const go = useCallback((d) => { setDir(d); setIndex((i) => (i + d + list.length) % list.length); }, [list.length, setIndex]);

  useEffect(() => {
    getLenis()?.stop();
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    const key = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    return () => { getLenis()?.start(); window.removeEventListener("keydown", key); prevFocus?.focus?.(); };
  }, [go, onClose]);

  // Warm the next and previous photographs so paging feels instant.
  useEffect(() => {
    [1, -1, 2].forEach((d) => { const p = list[(index + d + list.length) % list.length]; if (p) { const i = new window.Image(); i.src = p.full.src; } });
  }, [index, list]);

  const strip = useMemo(() => {
    const out = [];
    for (let d = -6; d <= 6; d++) { const i = index + d; if (i >= 0 && i < list.length) out.push([i, list[i]]); }
    return out;
  }, [index, list]);

  return (
    <motion.div className="vw" role="dialog" aria-modal="true" aria-label={`${cur.name}, ${spaceLabel(cur.cat)}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
      <div className="vw-bg" aria-hidden="true" style={{ backgroundImage: `url(${cur.thumb.src})` }} />
      <div className="vw-top">
        <span className="vw-count"><b>{pad(index + 1)}</b> / {pad(list.length)}</span>
        <button ref={closeRef} className="vw-btn" onClick={onClose} aria-label="Close gallery"><BsX /></button>
      </div>

      <div className="vw-stage" onClick={onClose}>
        <button className="vw-btn vw-prev" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photograph"><BsArrowLeft /></button>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.figure
            key={cur.id}
            className="vw-frame"
            custom={dir}
            variants={{ enter: (d) => ({ opacity: 0, x: d * 70 }), center: { opacity: 1, x: 0 }, exit: (d) => ({ opacity: 0, x: d * -70 }) }}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.45, ease }}
            drag="x" dragSnapToOrigin dragElastic={0.2} dragMomentum={false}
            onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
            onClick={(e) => e.stopPropagation()}
          >
            <Img src={cur.full} alt={`${cur.name}, ${spaceLabel(cur.cat).toLowerCase()} interior by Luxe Atelier`} unoptimized placeholder="blur" priority className="vw-img" draggable={false} />
            <figcaption><b>{cur.name}</b><span>{spaceLabel(cur.cat)}</span></figcaption>
          </motion.figure>
        </AnimatePresence>
        <button className="vw-btn vw-next" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photograph"><BsArrowRight /></button>
      </div>

      <ul className="vw-strip" aria-label="Photographs">
        {strip.map(([i, p]) => (
          <li key={p.id}>
            <button className={i === index ? "on" : ""} onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }} aria-label={`Show ${p.name}`} aria-current={i === index}>
              <Img src={p.thumb} alt="" unoptimized sizes="64px" />
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [cat, setCat] = useState("All");
  const [count, setCount] = useState(STEP);
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);
  const sentinel = useRef(null);
  const wall = useRef(null);

  const list = useMemo(() => (cat === "All" ? projects : projects.filter((p) => p.cat === cat)), [cat]);
  const shown = list.slice(0, count);
  const tabs = useMemo(() => ["All", ...categories].map((c) => [c, c === "All" ? projects.length : projects.filter((p) => p.cat === c).length]), []);

  useEffect(() => setMounted(true), []);
  useEffect(() => { setCount(STEP); }, [cat]);

  // Keep adding frames as the visitor nears the end of the wall, so only what is needed is downloaded.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    let io;
    // Wait for the new frames to lay out before watching again, so one scroll adds one batch.
    const t = setTimeout(() => {
      io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setCount((c) => Math.min(c + STEP, list.length)); }, { rootMargin: "500px 0px" });
      io.observe(el);
    }, 350);
    return () => { clearTimeout(t); io?.disconnect(); };
  }, [list.length, count]);

  // The wall is lit by a soft light that follows the pointer.
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = wall.current;
    if (!el) return;
    el.style.setProperty("--mx", `${e.clientX}px`);
    el.style.setProperty("--my", `${e.clientY}px`);
  };

  const close = useCallback(() => setOpen(null), []);

  return (
    <main className="page gallery" ref={wall} onPointerMove={onMove}>
      <div className="gal-light" aria-hidden="true" />
      <header className="gal-head">
        <Words as="h1" text="Our projects." />
        <p className="lede">Complete homes and individual spaces we have designed and built across Kerala, hung as a collection.</p>
        <div className="gal-tabs" role="tablist" aria-label="Type of space">
          {tabs.map(([c, n]) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
              {spaceLabel(c)}<sup>{n}</sup>
              {cat === c && <motion.span className="gal-underline" layoutId="gal-underline" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            </button>
          ))}
        </div>
      </header>

      <section className="films" aria-labelledby="films-title">
        <div className="films-head">
          <h2 id="films-title">Walk through our work.</h2>
          <a className="textlink" href={profileUrl} target="_blank" rel="noopener noreferrer">Follow @luxeatelierinteriors <BsArrowUpRight aria-hidden="true" /></a>
        </div>
        <div className="films-row">
          {films.map((r, n) => (<Reveal key={r.id} delay={n * 0.08}><ReelEmbed reel={r} /></Reveal>))}
        </div>
      </section>

      <div className="gal-wall">
      <AnimatePresence mode="wait" initial={false}>
        <motion.ul key={cat} className="gal-grid" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
          {shown.map((p, n) => {
            const s = shapes[n % shapes.length];
            return (
              <li key={p.id} className={`gal-item ${s.k}`} style={{ "--span": s.span }}>
                <Wrap on={n >= 3} delay={(n % 3) * 0.07}>
                  <button className="gal-frame" onClick={() => setOpen(n)} data-cursor="View">
                    <span className="gal-photo">
                      <Img src={p.thumb} alt={`${p.name}, ${spaceLabel(p.cat).toLowerCase()} interior by Luxe Atelier`} unoptimized placeholder="blur" priority={n < 3} sizes="(max-width: 700px) 50vw, 33vw" />
                    </span>
                    <span className="gal-plaque"><b>{p.name}</b><i>{pad(n + 1)} · {spaceLabel(p.cat)}</i></span>
                  </button>
                </Wrap>
              </li>
            );
          })}
        </motion.ul>
      </AnimatePresence>
      </div>

      <div className="gal-more" ref={sentinel}>
        {count < list.length ? (
          <button className="btn ghost on-wall" onClick={() => setCount((c) => Math.min(c + STEP, list.length))}>Show more <BsArrowRight /></button>
        ) : (
          <p>Showing all {list.length} {cat === "All" ? "projects" : `${spaceLabel(cat).toLowerCase()} projects`}.</p>
        )}
      </div>

      {mounted && createPortal(
        <AnimatePresence>
          {open !== null && <Viewer list={list} index={open} setIndex={setOpen} onClose={close} />}
        </AnimatePresence>,
        document.body
      )}
    </main>
  );
}
