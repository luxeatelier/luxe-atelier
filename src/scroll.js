// Shared handle on the Lenis instance so header links and route changes can scroll smoothly.
let instance = null;
export const setLenis = (l) => { instance = l; };
export const getLenis = () => instance;

export function scrollToTarget(target, opts = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return false;
  if (instance) instance.scrollTo(el, { offset: -70, duration: 1.6, ...opts });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}
