"use client";
import { useRef, useState } from "react";
import { m as motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Img from "../components/Img";
import { img } from "../content";
import { Words } from "../components/Reveal";

// Slide across the photograph: a measured plan becomes the finished interior.
export default function PlanToSpace() {
  const box = useRef(null);
  const raw = useMotionValue(50);
  const pos = useSpring(raw, { stiffness: 140, damping: 22, mass: 0.4 });
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const [now, setNow] = useState(50);
  const [down, setDown] = useState(false);

  const setFromEvent = (e) => {
    const r = box.current.getBoundingClientRect();
    const v = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    raw.set(v);
    setNow(Math.round(v));
  };
  const onMove = (e) => { if (e.pointerType === "mouse" || down) setFromEvent(e); };
  const onKey = (e) => {
    const step = e.shiftKey ? 15 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const v = Math.min(100, Math.max(0, raw.get() + (e.key === "ArrowRight" ? step : -step)));
      raw.set(v); setNow(Math.round(v));
    }
  };

  return (
    <section className="sec sage planroom" id="plan">
      <div className="sec-head">
        <Words text="From sketch to space." />
        <p className="lede">Move across the image to see a measured plan become the finished interior.</p>
      </div>

      <div
        className="plan-box"
        ref={box}
        onPointerMove={onMove}
        onPointerDown={(e) => { setDown(true); setFromEvent(e); e.currentTarget.setPointerCapture?.(e.pointerId); }}
        onPointerUp={() => setDown(false)}
        onPointerCancel={() => setDown(false)}
      >
        <Img src={img.livingWide} alt="Finished living space with a linen sofa and tall garden windows" className="plan-photo" sizes="(max-width: 1400px) 100vw, 1300px" loading="lazy" />

        <motion.div className="plan-layer" style={{ clipPath: clip }} aria-hidden="true">
          <Img src={img.livingWide} alt="" className="plan-photo sketch" sizes="(max-width: 1400px) 100vw, 1300px" loading="lazy" />
          <svg className="plan-dims" viewBox="0 0 1000 462" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="#33443a" strokeWidth="1.6" vectorEffect="non-scaling-stroke">
              <path d="M70 420 H930" /><path d="M70 410 V430" /><path d="M930 410 V430" />
              <path d="M60 70 V390" /><path d="M50 70 H70" /><path d="M50 390 H70" />
              <path d="M250 230 h280 v120 h-280 z" strokeDasharray="7 6" />
              <path d="M600 110 h230 v90 h-230 z" strokeDasharray="7 6" />
            </g>
            <g fill="#33443a" fontSize="22" fontFamily="Jost, sans-serif">
              <text x="500" y="408" textAnchor="middle">6.4 m</text>
              <text x="30" y="230" textAnchor="middle" transform="rotate(-90 30 230)">3.1 m</text>
              <text x="390" y="298" textAnchor="middle">Sofa + rug</text>
              <text x="715" y="160" textAnchor="middle">Joinery wall</text>
            </g>
          </svg>
        </motion.div>

        <span className="plan-tag a">Plan, 1:50</span>
        <span className="plan-tag b">Finished interior</span>

        <motion.div
          className="plan-handle"
          style={{ left }}
          role="slider"
          tabIndex={0}
          aria-label="Reveal the finished interior"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={now}
          onKeyDown={onKey}
          whileHover={{ scale: 1.06 }}
        >
          <span className="plan-knob" aria-hidden="true"><i /><i /></span>
        </motion.div>
      </div>
    </section>
  );
}
