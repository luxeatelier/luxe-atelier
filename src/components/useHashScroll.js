"use client";
import { useEffect } from "react";
import { scrollToTarget } from "../scroll";

// Scrolls to #id on arrival, for links like /about#team.
export default function useHashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const t = setTimeout(() => scrollToTarget(hash), 500);
    return () => clearTimeout(t);
  }, []);
}
