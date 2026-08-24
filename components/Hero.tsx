"use client";

import React from "react";
import { PERSONAL_INFO } from "@/lib/data";
import { Reveal } from "./Reveal";
import { MediaFrame } from "./MediaFrame";
import { ArrowUpRight, ArrowRight, Play } from "lucide-react";

const STATS = [
  { value: "18+", label: "Years on live broadcast" },
  { value: "150+", label: "Events engineered" },
  { value: "22", label: "Broadcasters served" },
  { value: "99.99%", label: "Transmission uptime" },
];

export function Hero() {
  return (
    <section id="hero" aria-label="Introduction" className="relative bg-canvas overflow-hidden">
      {/* Subtle paper wash */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Copy — first in DOM (mobile-first) */}
          <div className="lg:col-span-7">
            {/* Eyebrow + availability */}
            <Reveal direction="up">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 sm:mb-8">
                <span className="eyebrow text-signal">System Broadcast &amp; OB Engineer</span>
                <span className="h-px w-8 bg-hairline" aria-hidden="true" />
                <span className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {PERSONAL_INFO.statusTextShort} — Available
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal direction="up" delay={0.08}>
              <h1 className="fluid-h1 font-display font-semibold text-ink">
                Live television,
                <br />
                engineered to{" "}
                <em className="italic text-signal">never go dark</em>.
              </h1>
            </Reveal>

            {/* Subline */}
            <Reveal direction="up" delay={0.16}>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mt-6 max-w-xl">
                {PERSONAL_INFO.tagline} Based in {PERSONAL_INFO.location.split(",")[0]}, trusted across
                the GCC for OB trucks, CCU camera shading, EVS replay, and 24/7 master control.
              </p>
            </Reveal>

            {/* CTAs — full-width on mobile */}
            <Reveal direction="up" delay={0.24}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-signal hover:bg-signal-deep text-white font-semibold transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-none"
                >
                  Book for an event
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href="#events"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-zinc-300 hover:border-signal hover:text-signal text-ink font-semibold transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
                >
                  View case studies
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
                {PERSONAL_INFO.showreelUrl && (
                  <a
                    href={PERSONAL_INFO.showreelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-2 py-4 text-ink font-semibold min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal rounded-full focus-visible:outline-none"
                  >
                    <span className="w-9 h-9 rounded-full bg-signal-tint text-signal flex items-center justify-center group-hover:bg-signal group-hover:text-white transition-colors shrink-0">
                      <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                    </span>
                    Watch showreel
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Portrait slot — sits below copy on mobile, right column on desktop */}
          <Reveal direction="up" delay={0.2} className="lg:col-span-5">
            <figure className="relative max-w-sm sm:max-w-md lg:max-w-none mx-auto">
              <MediaFrame
                src={PERSONAL_INFO.portrait || undefined}
                alt={`Portrait of ${PERSONAL_INFO.name}`}
                ratio="portrait"
                label={`${PERSONAL_INFO.name.toUpperCase()} — PORTRAIT`}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                className="rounded-3xl ring-1 ring-black/5 shadow-[0_24px_60px_-24px_rgba(24,24,27,0.25)] rotate-1 hover:rotate-0 transition-transform duration-500"
              />
              {/* Floating stat chip */}
              <figcaption className="absolute -bottom-4 -left-3 sm:-left-6 rounded-2xl bg-white border border-hairline shadow-[0_12px_32px_-8px_rgba(24,24,27,0.18)] px-4 py-3">
                <p className="font-display italic font-semibold text-2xl text-signal leading-none tabular-nums">
                  18+
                </p>
                <p className="text-[11px] text-zinc-500 mt-1 whitespace-nowrap">years on-air</p>
              </figcaption>
              {/* Corner accent */}
              <span
                className="absolute -top-3 -right-3 w-20 h-20 rounded-tr-[2rem] border-t-2 border-r-2 border-signal/30 -z-10"
                aria-hidden="true"
              />
            </figure>
          </Reveal>
        </div>

        {/* Stat row */}
        <Reveal direction="up" delay={0.32}>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mt-16 sm:mt-24 pt-10 border-t border-hairline">
            {STATS.map((stat) => (
              <div key={stat.label} className="pr-6">
                <dd className="font-display italic font-semibold text-3xl sm:text-4xl lg:text-5xl text-ink tracking-tight tabular-nums">
                  {stat.value}
                </dd>
                <dt className="text-xs sm:text-sm text-zinc-500 font-medium mt-2 leading-snug pr-2">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
