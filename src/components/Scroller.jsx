"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { setLenis, getLenis } from "../scroll";

// Smooth scrolling for the whole site.
export default function Scroller() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis, raf, cancelled = false;
    // Start smooth scrolling once the page has settled, so it never competes with the first paint.
    const start = () => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: reduce ? 1 : 0.085, wheelMultiplier: 0.9 });
      setLenis(lenis);
      const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    };
    const idle = window.requestIdleCallback ? window.requestIdleCallback(start, { timeout: 2500 }) : setTimeout(start, 1200);
    return () => { cancelled = true; if (window.cancelIdleCallback && window.requestIdleCallback) window.cancelIdleCallback(idle); else clearTimeout(idle); cancelAnimationFrame(raf); lenis?.destroy(); setLenis(null); };
  }, []);
  useEffect(() => {
    if (!window.location.hash) getLenis()?.scrollTo(0, { immediate: true });
  }, [pathname]);

  // Photographs unveil as they enter the viewport.
  useEffect(() => {
    const sel = ".proj-img, .j-img, .team-card .arch-frame, .about-arch, .about-round, .services-pic .arch-frame, .post-cover, .post-gallery img, .masonry button, .map";
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.08 });
    const t = setTimeout(() => document.querySelectorAll(sel).forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return; /* already on screen: never hide it */ el.classList.add("media"); io.observe(el); }), 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [pathname]);
  return null;
}
