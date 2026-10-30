"use client";
import { useEffect, useRef, useState } from "react";
import Img from "../components/Img";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { m as motion, useScroll, useTransform } from "framer-motion";
import { Words, Reveal } from "../components/Reveal";
import LensHost from "../components/LensHost";
import { img } from "../content";

export function Count({ end }) {
  const ref = useRef(null);
  const [n, setN] = useState(end);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 2200, 1);
        setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [end]);
  return <span ref={ref}>{n}</span>;
}

export default function About({ h1 = false, link = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["6%", "-10%"]);

  return (
    <section className={`sec light about ${h1 ? "first" : ""}`} id="about" ref={ref}>
      <div className="about-media">
        <motion.div className="about-arch-wrap" style={{ y: yA }}>
          <LensHost ratio={0.5} zoom={2.4} rest={{ x: 0.9, y: 0.82 }} lens={<Img src={img.kitchenDark} alt="" className="lens-fill" sizes="(max-width: 900px) 70vw, 36vw" />}>
            <div className="about-arch">
              <Img src={img.kitchenDark} alt="Timber and black-fluted kitchen with a brass pendant" sizes="(max-width: 900px) 70vw, 36vw" priority={h1} loading={h1 ? undefined : "lazy"} />
            </div>
          </LensHost>
        </motion.div>
      </div>
      <div className="about-copy">
        <Words as={h1 ? "h1" : "h2"} text="A studio for homes with a point of view." />
        <Reveal as="p" delay={0.1}>We believe in crafting interiors that defy labeling. Our aim is to create spaces that speak to individuality and sophistication, where every space tells a unique story.</Reveal>
        {h1 && <Reveal as="p" delay={0.15}>Luxe Atelier designs interiors that exude elegance and charm. Our experienced team makes sure every space is carefully curated to reflect your tastes and preferences, and we shape each one to look stunning and work harder for you, with attention to detail and a commitment to quality that outlasts handover.</Reveal>}
        {link && <Link href="/about" className="textlink about-link">Our story <BsArrowRight /></Link>}
        <ul className="stats">
          <li><b><Count end={250} />+</b><span>projects delivered</span></li>
          <li><b><Count end={7} />+</b><span>years of practice</span></li>
          <li><b><Count end={11} />+</b><span>homes in progress</span></li>
        </ul>
      </div>
    </section>
  );
}
