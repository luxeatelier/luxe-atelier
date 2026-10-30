"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m as motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import Img from "../components/Img";
import { projects, categories } from "../projectImages";
import { Words } from "../components/Reveal";

const label = (c) => (c === "Living Area" ? "Living" : c);
const shapes = ["arch tall", "wide", "wide", "arch tall off"];
const sizes = ["(max-width: 700px) 50vw, 26vw", "(max-width: 700px) 50vw, 26vw", "(max-width: 700px) 50vw, 26vw", "(max-width: 700px) 50vw, 26vw"];

// An editorial mosaic of finished interiors, switchable by type of space. The full set lives on /projects.
export default function Projects() {
  const [cat, setCat] = useState("Kitchen");
  const list = useMemo(() => projects.filter((p) => p.cat === cat).slice(0, 4), [cat]);

  return (
    <section className="sec light projects" id="projects">
      <div className="sec-head">
        <Words text="Homes we have designed." />
        <div className="chips" role="tablist" aria-label="Type of space">
          {categories.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>{label(c)}</button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.ul
          key={cat}
          className="mosaic"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.2, 0.7, 0.1, 1] }}
        >
          {list.map((p, n) => (
            <li key={p.name + p.cat} className={`tile ${shapes[n]}`}>
              <Link href="/projects" data-cursor="View" aria-label={`${p.name}, ${label(p.cat)}`}>
                <span className="tile-img"><Img src={p.img} alt={`${p.name}, ${label(p.cat).toLowerCase()} interior by Luxe Atelier`} sizes={sizes[n]} unoptimized placeholder="blur" loading="lazy" /></span>
                <span className="tile-cap"><b>{p.name}</b><i>{label(p.cat)}</i></span>
              </Link>
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>

      <div className="mosaic-foot">
        <Link href="/projects" className="textlink">See every project <BsArrowRight /></Link>
      </div>
    </section>
  );
}
