"use client";
import { LazyMotion } from "framer-motion";

// Animation features arrive in a separate chunk after hydration, which keeps the first load light.
const features = () => import("./motionFeatures").then((m) => m.default);

export default function MotionProvider({ children }) {
  return <LazyMotion features={features} strict={false}>{children}</LazyMotion>;
}
