"use client";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import thoughts from "../home/peopleThoughts.json";
import { Words } from "../components/Reveal";
import ReelEmbed from "../components/ReelEmbed";
import { reels } from "../reels";

const people = thoughts.people;

// Client testimonials: one at a time, advancing on its own, with arrows and dots.
export default function Voices() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n) => setIdx((n + people.length) % people.length);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(idx + 1), 7000);
    return () => clearTimeout(t);
  }, [idx, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="sec light voices" id="voices" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="voices-film"><ReelEmbed reel={reels.kothamangalam} /></div>
      <div className="voices-words">
      <Words text="In their words." />
      <div className="voice-view">
        <ul className="voice-track" style={{ transform: `translateX(-${idx * 100}%)` }} aria-live="off">
          {people.map((p, n) => (
            <li className="voice" key={p.fullname} aria-hidden={n !== idx} inert={n !== idx ? "" : undefined}>
              <blockquote>“{p.thoughts}”</blockquote>
              <p><b>{p.fullname}</b><span>{p.country}</span></p>
            </li>
          ))}
        </ul>
      </div>
      <div className="car-controls">
        <div className="dots">{people.map((p, n) => (<button key={p.fullname} className={n === idx ? "on" : ""} onClick={() => go(n)} aria-label={`Show ${p.fullname}`} aria-current={n === idx} />))}</div>
        <button onClick={() => go(idx - 1)} aria-label="Previous testimonial"><BsArrowLeft /></button>
        <button onClick={() => go(idx + 1)} aria-label="Next testimonial"><BsArrowRight /></button>
      </div>
      </div>
    </section>
  );
}
