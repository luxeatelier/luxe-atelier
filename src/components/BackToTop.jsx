"use client";
import { BsArrowUp } from "react-icons/bs";
import { getLenis } from "../scroll";

export default function BackToTop() {
  return (
    <button type="button" className="to-top" onClick={() => (getLenis() ? getLenis().scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}>
      Back to top <BsArrowUp />
    </button>
  );
}
