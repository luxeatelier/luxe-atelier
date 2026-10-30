import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import Intro from "../sections/Intro";
import PlanToSpace from "../sections/PlanToSpace";
import Projects from "../sections/Projects";
import Voices from "../sections/Voices";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Intro />
      <PlanToSpace />
      <Projects />
      <Voices />
    </main>
  );
}
