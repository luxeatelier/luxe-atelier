"use client";
import Contact from "../sections/Contact";
import Faq from "../sections/Faq";
import useHashScroll from "../components/useHashScroll";

export default function ContactPage() {
  useHashScroll();
  return (
    <main>
      <Contact h1 />
      <Faq />
    </main>
  );
}
