"use client";

import React from "react";
import type { Identity, Hero as HeroData } from "@/lib/types";
import { Reveal } from "./Reveal";
import { MediaFrame } from "./MediaFrame";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  identity: Identity;
  hero: HeroData;
}

export function Hero({ identity, hero }: HeroProps) {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative bg-canvas overflow-hidden scroll-mt-20"
    >
      {/* Soft mint wash */}
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-signal-tint/60 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-14 sm:pb-20 lg:pb-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Copy — first in DOM (mobile-first) */}
          <div className="lg:col-span-7">
            {/* Eyebrow + availability */}
            <Reveal direction="up">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 sm:mb-8">
                <span className="eyebrow text-signal">
                  {hero.eyebrow}
                </span>
                <span className="h-px w-8 bg-hairline" aria-hidden="true" />
                <span className="inline-flex items-center gap-2 text-xs font-medium text-muted">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  {identity.statusTextShort} — Available
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal direction="up" delay={0.08}>
              <h1 className="fluid-h1 font-display font-semibold text-ink">
                {hero.headline}{" "}
                <em className="italic text-signal">{hero.headlineAccent}</em>.
              </h1>
            </Reveal>

            {/* Subline */}
            <Reveal direction="up" delay={0.16}>
              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed mt-6 max-w-xl fluid-body">
                {identity.tagline}
              </p>
            </Reveal>

            {/* CTAs — full-width on mobile */}
            <Reveal direction="up" delay={0.24}>
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
                <a
                  href={hero.ctaPrimaryHref}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded bg-signal hover:bg-signal-deep text-white font-semibold transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:outline-none sm:flex-none"
                >
                  {hero.ctaPrimaryLabel}
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href={hero.ctaSecondaryHref}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded border border-ink/25 hover:border-signal hover:text-signal text-ink font-semibold transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none sm:flex-none"
                >
                  {hero.ctaSecondaryLabel}
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Portrait slot — square container per design spec */}
          <Reveal direction="up" delay={0.2} className="lg:col-span-5">
            <figure className="relative max-w-sm sm:max-w-md lg:max-w-none mx-auto">
              <MediaFrame
                src={identity.portrait || undefined}
                alt={`Portrait of ${identity.name}`}
                ratio="square"
                label={`${identity.name.toUpperCase()} — PORTRAIT`}
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                className="rounded-lg ring-1 ring-black/5 shadow-[0_24px_60px_-24px_rgba(26,43,50,0.3)]"
              />
              {/* Floating experience chip */}
              <figcaption className="absolute -bottom-4 -left-3 sm:-left-6 rounded bg-white border border-hairline shadow-[0_12px_32px_-8px_rgba(26,43,50,0.18)] px-4 py-3 flex items-baseline gap-1.5">
                <span className="font-display italic font-semibold text-2xl text-signal leading-none tabular-nums">
                  {identity.experienceYears}+
                </span>
                <span className="text-[11px] text-zinc-500 whitespace-nowrap">years on-air</span>
              </figcaption>
              {/* Corner accent */}
              <span
                className="absolute -top-3 -right-3 w-20 h-20 rounded-tr-lg border-t-2 border-r-2 border-signal/30 -z-10"
                aria-hidden="true"
              />
            </figure>
          </Reveal>
        </div>

        {/* Stat row */}
        <Reveal direction="up" delay={0.32}>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 mt-16 sm:mt-24 pt-10 border-t border-hairline">
            {hero.stats.map((stat) => (
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
