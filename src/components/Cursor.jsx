"use client";
import { useEffect, useRef, useState } from "react";

const MAGNETIC = ".btn, .hdr-cta, .ftr-social a, .car-controls > button, .vw-btn, .to-top, .wa, .hdr-burger";

// Pointer effects: a small tag that names what a region does ("View", "Read"), and a gentle magnetic pull on buttons.
export default function Cursor() {
  const ring = useRef(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setOn(true);
    let x = 0, y = 0, cx = 0, cy = 0, raf, lastLabel = "";
    const pulls = new Map(); // element -> { x, y, tx, ty }
    let hovered = null;

    const move = (e) => {
      x = e.clientX; y = e.clientY;
      const t = e.target.closest?.("[data-cursor]");
      const next = t ? t.dataset.cursor : "";
      if (next !== lastLabel) { lastLabel = next; setLabel(next); }

      if (reduce) return;
      const el = e.target.closest?.(MAGNETIC) || null;
      if (hovered && hovered !== el) { const s = pulls.get(hovered); if (s) { s.tx = 0; s.ty = 0; } }
      hovered = el;
      if (el) {
        const r = el.getBoundingClientRect();
        const s = pulls.get(el) || { x: 0, y: 0, tx: 0, ty: 0 };
        // Measure from the element's resting centre (rect minus its current pull), so the pull never feeds back on itself.
        s.tx = (e.clientX - (r.left + r.width / 2 - s.x)) * 0.24;
        s.ty = (e.clientY - (r.top + r.height / 2 - s.y)) * 0.32;
        pulls.set(el, s);
      }
    };
    const leave = () => { pulls.forEach((s) => { s.tx = 0; s.ty = 0; }); hovered = null; };

    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      if (ring.current) ring.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      pulls.forEach((s, el) => {
        s.x += (s.tx - s.x) * 0.16; s.y += (s.ty - s.y) * 0.16;
        if (Math.abs(s.x) < 0.05 && Math.abs(s.y) < 0.05 && s.tx === 0 && s.ty === 0) { el.style.translate = ""; pulls.delete(el); }
        else el.style.translate = `${s.x.toFixed(2)}px ${s.y.toFixed(2)}px`;
      });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); document.documentElement.removeEventListener("mouseleave", leave); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="cursor" ref={ring} aria-hidden="true" hidden={!on}>
      <span className={`cursor-dot ${label ? "label" : ""}`}>{label}</span>
    </div>
  );
}
