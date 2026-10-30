"use client";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { Words, Reveal } from "../components/Reveal";
import { Count } from "./About";

export default function Intro() {
  return (
    <section className="sec light intro">
      <div>
        <Words text="A studio for homes with a point of view." />
        <Reveal as="p" delay={0.1}>We craft interiors that defy labeling: spaces that speak to individuality and sophistication, where every space tells a unique story.</Reveal>
        <Reveal delay={0.15}><Link href="/about" className="textlink">Meet the studio <BsArrowRight /></Link></Reveal>
      </div>
      <ul className="stats">
        <li><b><Count end={250} />+</b><span>projects delivered</span></li>
        <li><b><Count end={7} />+</b><span>years of practice</span></li>
        <li><b><Count end={11} />+</b><span>homes in progress</span></li>
      </ul>
    </section>
  );
}
