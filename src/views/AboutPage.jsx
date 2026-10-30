"use client";
import About from "../sections/About";
import Process from "../sections/Process";
import Team from "../sections/Team";
import useHashScroll from "../components/useHashScroll";

export default function AboutPage() {
  useHashScroll();
  return (
    <main>
      <About h1 />
      <Process />
      <Team />
    </main>
  );
}
