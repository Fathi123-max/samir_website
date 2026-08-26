"use client";

import React from "react";
import type { ServiceTier } from "@/lib/types";
import { Reveal } from "./Reveal";
import {
  Clapperboard,
  Film,
  Briefcase,
  Building2,
  ArrowRight,
} from "lucide-react";

const TIER_ICONS = [Clapperboard, Film, Briefcase, Building2];

interface ServicesProps {
  services: ServiceTier[];
}

export function Services({ services }: ServicesProps) {
  return (
    <section
      id="services"
      aria-label="Video production services"
      className="py-20 lg:py-28 bg-canvas scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="up">
            <p className="eyebrow text-signal mb-4">01 · Services</p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="fluid-h2 font-display font-semibold text-ink">
              Video production services{" "}
              <em className="italic text-signal">for every vision</em>.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="text-zinc-600 fluid-body mt-5 max-w-2xl">
              From focused personal projects to full-scale commercial
              productions, choose a level of creative support that fits your
              goals, timeline, and audience.
            </p>
          </Reveal>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {services.map((tier, index) => {
            const Icon = TIER_ICONS[index % TIER_ICONS.length];
            return (
              <Reveal key={tier.id} direction="up" delay={0.08 + index * 0.06} className="h-full">
                <article className="card-lift group flex flex-col h-full rounded-lg bg-paper border border-hairline p-6 sm:p-7 focus-within:border-signal/50">
                  <span className="w-11 h-11 rounded bg-signal-tint text-signal flex items-center justify-center mb-5 transition-colors group-hover:bg-signal group-hover:text-white">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-display font-semibold text-ink text-xl leading-snug mb-3 group-hover:text-signal transition-colors">
                    {tier.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-7">
                    {tier.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded border border-hairline text-sm font-semibold text-ink hover:bg-signal hover:border-signal hover:text-white transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
                    aria-label={`Read more about ${tier.title}`}
                  >
                    Read more
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
