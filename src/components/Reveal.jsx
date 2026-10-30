"use client";
import { useEffect, useRef } from "react";

// Progressive enhancement: content is visible in the server HTML. The `js` class (set before paint)
// hides it until it scrolls into view, so nothing is lost if scripts are slow or disabled.
export function useInView(once = true) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { el.classList.add("in"); if (once) io.disconnect(); }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return ref;
}

export function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useInView();
  return (
    <Tag ref={ref} className={`rv ${className}`} style={{ "--d": `${delay}s` }} {...rest}>
      {children}
    </Tag>
  );
}

// Headline whose words rise out of a mask, one after another.
export function Words({ text, as: Tag = "h2", className = "", delay = 0 }) {
  const ref = useInView();
  return (
    <Tag ref={ref} className={`words ${className}`} aria-label={text} style={{ "--d": `${delay}s` }}>
      {text.split(" ").map((w, i) => (
        <span className="word-mask" aria-hidden="true" key={i}>
          <span className="word" style={{ "--i": i }}>{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}
