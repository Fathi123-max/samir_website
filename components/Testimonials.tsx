"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Testimonials() {
  return (
    <section
      aria-label="Testimonials"
      className="py-20 lg:py-28 bg-paper border-y border-hairline"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <Reveal direction="up">
            <p className="eyebrow text-signal mb-4">06 · Endorsements</p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="fluid-h2 font-display font-semibold text-ink">
              Trusted under live television{" "}
              <em className="italic text-signal">pressure</em>.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="text-zinc-600 fluid-body mt-5">
              What directors, technical heads, and OB production managers say
              about working with Samir on tier-1 broadcasts.
            </p>
          </Reveal>
        </div>

        {/* Quote cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.id} direction="up" delay={0.08 + index * 0.08}>
              <figure className="card-lift h-full p-6 sm:p-8 rounded-2xl bg-white border border-hairline flex flex-col">
                <span
                  className="font-display text-4xl leading-none text-signal select-none mb-5"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>

                <blockquote className="text-sm sm:text-[15px] text-zinc-700 leading-relaxed grow">
                  {item.quote}
                </blockquote>

                <figcaption className="mt-auto pt-7">
                  <div className="flex items-center gap-3.5 pt-5 border-t border-hairline">
                    <span className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center font-mono font-semibold text-xs shrink-0" aria-hidden="true">
                      {item.avatarText}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-sm text-ink leading-tight">
                        {item.author}
                      </p>
                      <p className="text-xs text-zinc-500 mt-0.5 leading-snug">
                        {item.role}, {item.organization}
                      </p>
                      <p className="eyebrow text-signal mt-1.5 text-[10px]">{item.event}</p>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
