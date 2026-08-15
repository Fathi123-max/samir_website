"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale";
  cascade?: boolean;
  once?: boolean;
}

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.55,
  direction = "up",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-40px 0px", threshold: 0 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [reduceMotion, once]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getHiddenStyle = (): React.CSSProperties => {
    switch (direction) {
      case "up":
        return { opacity: 0, transform: "translateY(28px)" };
      case "down":
        return { opacity: 0, transform: "translateY(-28px)" };
      case "left":
        return { opacity: 0, transform: "translateX(28px)" };
      case "right":
        return { opacity: 0, transform: "translateX(-28px)" };
      case "scale":
        return { opacity: 0, transform: "scale(0.94)" };
      case "none":
      default:
        return { opacity: 0 };
    }
  };

  const style: React.CSSProperties = {
    ...(isInView
      ? { opacity: 1, transform: "none" }
      : getHiddenStyle()),
    transition: `opacity ${duration}s cubic-bezier(${EASE.join(",")}) ${delay}s, transform ${duration}s cubic-bezier(${EASE.join(",")}) ${delay}s`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
