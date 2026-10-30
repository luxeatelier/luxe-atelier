"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m as motion } from "framer-motion";
import logoWhite from "../images/logo/luxelogowhite.png";
import logoBlack from "../images/logo/luxelogoblack.png";
import { nav, img } from "../content";
import Img from "./Img";
import { getLenis } from "../scroll";

export default function Header() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop(); else l?.start();
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className={`hdr ${solid ? "solid" : ""} ${open ? "menu-open" : ""}`}>
        <Link href="/" className="hdr-logo" aria-label="Luxe Atelier, home"><Img src={open ? logoWhite : logoBlack} alt="Luxe Atelier" priority sizes="160px" /></Link>
        <nav className="hdr-nav" aria-label="Main">
          {nav.slice(0, 4).map((n) => (<Link key={n.to} href={n.to} className={pathname.startsWith(n.to) ? "active" : ""}>{n.label}</Link>))}
        </nav>
        <Link className="hdr-cta" href="/contact">Book a consultation</Link>
        <button className={`hdr-burger ${open ? "open" : ""}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          <span /><span />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} exit={{ clipPath: "inset(0 0 100% 0)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
            <div className="menu-grid">
              <ul className="menu-links">
                {[{ label: "Home", to: "/" }, ...nav].map((n, i) => (
                  <motion.li key={n.to} initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.2, 0.7, 0.1, 1] }}>
                    <Link href={n.to}>{n.label}</Link>
                  </motion.li>
                ))}
              </ul>
              <div className="menu-side">
                <div className="menu-arch"><Img src={img.archesB} alt="" sizes="280px" /></div>
                <p>Ernakulam, Kerala</p>
                <a href="mailto:luxeatelierpvtltd@gmail.com">luxeatelierpvtltd@gmail.com</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
