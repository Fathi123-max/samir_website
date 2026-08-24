"use client";

import React from "react";
import { TIMELINE, PERSONAL_INFO } from "@/lib/data";
import { Reveal } from "./Reveal";
import { MediaFrame } from "./MediaFrame";
import {
  ShieldCheck,
  Zap,
  Layers,
  Flame,
  CheckCircle2,
} from "lucide-react";

/**
 * Field photos — set paths under /public (e.g. "/images/about/ob-compound.jpg").
 * Missing entries render as styled placeholder slots.
 * NOTE: current images are stand-in demo assets (Unsplash) — replace with
 * Samir's own production photos at the same paths.
 */
const ABOUT_PHOTOS: Record<string, string | undefined> = {
  "OB COMPOUND — FIBER PATCH WALL": "/images/about/ob-compound.jpg",
  "CCU PAINT RACK": "/images/about/ccu-rack.jpg",
  "LIVE ON SET": "/images/about/on-set.jpg",
};

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Zero-downtime redundancy",
    description:
      "Parallel optical trunks, dual-redundant master sync, and secondary router clean-switches designed so no live broadcast ever goes black.",
  },
  {
    icon: Zap,
    title: "Sub-minute fault triage",
    description:
      "Trained instinct under live pressure to isolate fiber breaks, Genlock drift, or switcher lockups in seconds — not minutes.",
  },
  {
    icon: Layers,
    title: "Master colorimetry",
    description:
      "Scientific multi-camera calibration to ΔE < 0.8 across desert sun, stadium floodlights, and LED studio walls.",
  },
  {
    icon: Flame,
    title: "EVS replay precision",
    description:
      "Split-second multi-angle clipping and super slow-motion packages for VAR decisions and director highlight cuts.",
  },
];

export function About() {
  return (
    <section
      id="story"
      aria-label="Experience and credentials"
      className="py-20 lg:py-28 bg-paper border-y border-hairline scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <Reveal direction="up">
            <p className="eyebrow text-signal mb-4">01 · The Engineer</p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="fluid-h2 font-display font-semibold text-ink">
              18 years at the intersection of live adrenaline and{" "}
              <em className="italic text-signal">precision engineering</em>.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="text-zinc-600 fluid-body mt-5">
              Holding a Bachelor of Electrical Engineering in Communication &amp;
              Electronics ({PERSONAL_INFO.degreeHonors}), Samir pairs deep RF and baseband theory with hands-on mastery of tier-1 OB truck deployments and 24/7 master control facilities.
            </p>
          </Reveal>
        </div>

        {/* Field photography strip */}
        <Reveal direction="up" delay={0.1}>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-5 mb-14 lg:mb-20">
            {[
              { label: "OB COMPOUND — FIBER PATCH WALL", alt: "Outside broadcast compound and fiber patch wall" },
              { label: "CCU PAINT RACK", alt: "CCU camera control paint rack" },
              { label: "LIVE ON SET", alt: "Samir on set during a live production" },
            ].map((photo) => (
              <MediaFrame
                key={photo.label}
                src={ABOUT_PHOTOS[photo.label]}
                alt={photo.alt}
                ratio="video"
                label={photo.label}
                sizes="(min-width: 640px) 33vw, 33vw"
                className="rounded-xl sm:rounded-2xl ring-1 ring-black/5 shadow-sm"
              />
            ))}
          </div>
        </Reveal>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16 lg:mb-24">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} direction="up" delay={0.1 + index * 0.07}>
              <div className="card-lift h-full p-6 rounded-2xl bg-white border border-hairline">
                <span className="w-11 h-11 rounded-full bg-signal-tint text-signal flex items-center justify-center mb-5 shrink-0">
                  <pillar.icon className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="font-display font-bold text-ink text-lg leading-snug mb-2.5">
                  {pillar.title}
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Career timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal direction="up">
              <h3 className="font-display font-semibold text-ink fluid-h3 mb-4">
                Career track record.
              </h3>
              <p className="text-zinc-600 leading-relaxed mb-8">
                From national playout centers in Cairo to world-feed summits in
                Dubai — a steady climb toward higher-stakes live production.
              </p>
              <blockquote className="border-l-2 border-signal pl-5 py-1">
                <p className="text-sm italic text-zinc-600 leading-relaxed">
                  “A true broadcast engineer never hopes for luck. We design
                  triple redundancy, monitor signal health continuously, and stay
                  calm when the red tally turns on.”
                </p>
                <footer className="eyebrow text-muted mt-3">— Samir Elgammal</footer>
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ol className="relative space-y-10 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
              {TIMELINE.map((node, idx) => (
                <li key={node.company} className="relative pl-8">
                  <span
                    className={`absolute left-0 top-2 w-[15px] h-[15px] rounded-full border-2 ${
                      idx === 0
                        ? "bg-signal border-signal"
                        : "bg-white border-zinc-300"
                    }`}
                    aria-hidden="true"
                  />
                  <Reveal direction="up" delay={0.08 * idx}>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <span className="font-mono text-xs font-medium text-signal">
                        {node.period}
                      </span>
                      <span className="text-xs text-zinc-400">{node.location}</span>
                    </div>
                    <h4 className="font-display font-bold text-ink text-lg leading-snug">
                      {node.role}
                    </h4>
                    <p className="text-sm font-semibold text-zinc-500 mb-4">
                      {node.company}
                    </p>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-4 max-w-prose">
                      {node.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {node.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-700">
                          <CheckCircle2
                            className="w-4 h-4 text-signal shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {node.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white border border-hairline text-[11px] font-mono text-zinc-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
