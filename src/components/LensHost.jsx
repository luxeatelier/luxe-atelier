"use client";
import { useEffect, useRef, useState } from "react";
import { m as motion, useAnimationFrame, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

// A magnifying lens over a photograph. At rest it drifts slowly; with a mouse it follows the pointer.
// `children` is the photograph itself; `lens` is the same photograph (cover-fitted) shown magnified inside the lens.
export default function LensHost({ children, lens, ratio = 0.36, zoom = 2.3, rest = { x: 0.1, y: 0.72 }, className = "" }) {
  const reduce = useReducedMotion();
  const host = useRef(null);
  const active = useRef(false);
  const dimRef = useRef({ w: 0, h: 0 });
  const [dim, setDim] = useState({ w: 0, h: 0 });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 130, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 130, damping: 20, mass: 0.5 });
  const innerT = useTransform([sx, sy], ([a, b]) => `translate(${-a * zoom}px, ${-b * zoom}px) scale(${zoom})`);

  useEffect(() => {
    const el = host.current;
    const ro = new ResizeObserver(([e]) => { dimRef.current = { w: e.contentRect.width, h: e.contentRect.height }; setDim(dimRef.current); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Start at the resting spot straight away, so the lens never flashes in a corner.
  const placed = useRef(false);
  useEffect(() => {
    if (!dim.w || placed.current) return;
    placed.current = true;
    x.set(rest.x * dim.w); y.set(rest.y * dim.h);
    sx.jump(rest.x * dim.w); sy.jump(rest.y * dim.h);
  }, [dim]); // eslint-disable-line react-hooks/exhaustive-deps

  useAnimationFrame((t) => {
    const { w, h } = dimRef.current;
    if (!w || active.current) return;
    const drift = reduce ? 0 : 1;
    x.set(rest.x * w + Math.sin(t / 1800) * w * 0.07 * drift);
    y.set(rest.y * h + Math.cos(t / 2300) * h * 0.05 * drift);
  });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = host.current.getBoundingClientRect();
    active.current = true;
    x.set(Math.min(r.width, Math.max(0, e.clientX - r.left)));
    y.set(Math.min(r.height, Math.max(0, e.clientY - r.top)));
  };

  const D = Math.max(104, dim.w * ratio);
  return (
    <div className={`lens-host ${className}`} ref={host} onPointerMove={onMove} onPointerLeave={() => { active.current = false; }}>
      {children}
      {dim.w > 0 && (
        <motion.div className="lens" aria-hidden="true" style={{ x: sx, y: sy, width: D, height: D, marginLeft: -D / 2, marginTop: -D / 2 }}>
          <motion.div className="lens-inner" style={{ width: dim.w, height: dim.h, transform: innerT }}>{lens}</motion.div>
          <span className="lens-shine" />
        </motion.div>
      )}
    </div>
  );
}
