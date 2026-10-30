"use client";
import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import LogoMark from "./LogoMark";
import { site } from "../site";

export function WhatsApp() {
  const href = `https://wa.me/${site.phone.replace(/\D/g, "")}?text=${encodeURIComponent("Hello! I would like to talk about an interior project.")}`;
  return (
    <a className="wa" href={href} target="_blank" rel="noopener noreferrer" aria-label="Chat with Luxe Atelier on WhatsApp">
      <FaWhatsapp aria-hidden="true" />
    </a>
  );
}

// Brand intro, once per session: the logo is drawn in outline while loading, then flies into the navbar.
export function Loader() {
  const [phase, setPhase] = useState("show");
  const [pct, setPct] = useState(0);
  const [fly, setFly] = useState(null);
  const logo = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (root.classList.contains("seen") || reduce) { root.classList.remove("intro"); setPhase("gone"); return; }
    try { sessionStorage.setItem("la-seen", "1"); } catch (e) {}

    const t0 = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min((t - t0) / 1500, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => {
      const target = document.querySelector(".hdr-logo img")?.getBoundingClientRect();
      const from = logo.current?.getBoundingClientRect();
      if (target && from) {
        setFly({
          dx: target.left + target.width / 2 - window.innerWidth / 2,
          dy: target.top + target.height / 2 - window.innerHeight / 2,
          s: target.width / from.width,
        });
      }
      setPhase("fly");
    }, 1700);
    const t2 = setTimeout(() => root.classList.remove("intro"), 3250);
    const t3 = setTimeout(() => setPhase("gone"), 3700);
    return () => { cancelAnimationFrame(raf); [t1, t2, t3].forEach(clearTimeout); };
  }, []);

  const flying = phase === "fly";
  return (
    <div className={`loader ${flying ? "fly" : ""} ${phase === "gone" ? "gone" : ""}`} aria-hidden="true">
      <div className="loader-bg" />
      <div
        className="loader-logo"
        ref={logo}
        style={fly ? { transform: `translate(calc(-50% + ${fly.dx}px), calc(-50% + ${fly.dy}px)) scale(${fly.s})` } : undefined}
      >
        <LogoMark darkText={flying} />
      </div>
      <div className="loader-meta">
        <span>Loading</span>
        <i><b style={{ transform: `scaleX(${pct / 100})` }} /></i>
        <span className="pct">{pct}%</span>
      </div>
    </div>
  );
}

// A deep-green curtain that sweeps across when you move between pages.
export function Curtain() {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState("idle");
  const timers = useRef([]);
  const target = useRef(null);

  const later = (fn, ms) => { const t = setTimeout(fn, ms); timers.current.push(t); };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onClick = (e) => {
      if (reduce || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.("a[href]");
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      e.preventDefault();
      target.current = url.pathname + url.search + url.hash;
      setState("cover");
      later(() => router.push(target.current), 650);
      later(() => setState("idle"), 4000); // safety net
    };
    document.addEventListener("click", onClick, true);
    return () => { document.removeEventListener("click", onClick, true); timers.current.forEach(clearTimeout); };
  }, [router]);

  useEffect(() => {
    if (state !== "cover") return;
    later(() => setState("out"), 250);
    later(() => setState("idle"), 1100);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`curtain ${state}`} aria-hidden="true">
      <div className="curtain-mark"><LogoMark /></div>
    </div>
  );
}
