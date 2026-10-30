"use client";
import { process } from "../content";
import { Words, Reveal } from "../components/Reveal";

export default function Process() {
  return (
    <section className="sec dark process" id="process">
      <Words text="How a project unfolds." />
      <Reveal className="process-line"><i /></Reveal>
      <ol>
        {process.map(([t, d], n) => (
          <Reveal as="li" key={t} delay={n * 0.15}>
            <h3>{t}</h3>
            <p>{d}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
