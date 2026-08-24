"use client";

import React from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { ChevronUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    let ticking = false;

    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
      }
      aria-label="Back to top"
      className="fixed right-4 bottom-24 lg:right-6 lg:bottom-8 z-30 w-11 h-11 rounded-full bg-white border border-hairline shadow-[0_8px_24px_-8px_rgba(24,24,27,0.25)] text-zinc-500 hover:text-signal hover:border-signal/50 flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none drawer-enter"
    >
      <ChevronUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
}
