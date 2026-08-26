"use client";

import React from "react";
import type { Testimonial } from "@/lib/types";
import { Reveal } from "./Reveal";
import { ArrowRight, Quote } from "lucide-react";

interface TestimonialBannerProps {
  testimonials: Testimonial[];
}

export function TestimonialBanner({ testimonials }: TestimonialBannerProps) {
  const featured = testimonials[0];

  if (!featured) return null;

  return (
    <section aria-label="Client testimonial" className="py-20 lg:py-28 bg-canvas">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured quote */}
        <Reveal direction="up">
          <figure className="max-w-3xl mx-auto text-center">
            <span
              className="w-11 h-11 rounded-full bg-signal-tint text-signal inline-flex items-center justify-center mb-7"
              aria-hidden="true"
            >
              <Quote className="w-5 h-5 fill-current" />
            </span>
            <blockquote className="font-display italic font-semibold text-2xl sm:text-3xl lg:text-[2.5rem] leading-snug text-ink text-balance">
              &ldquo;{featured.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-7 text-sm">
              <span className="block font-semibold text-ink">
                {featured.author}
              </span>
              <span className="block text-zinc-500 mt-1">
                {featured.role}, {featured.organization} — {featured.event}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        {/* CTA banner */}
        <Reveal direction="up" delay={0.12}>
          <div className="relative overflow-hidden rounded-lg bg-signal text-white mt-16 sm:mt-20 px-6 sm:px-10 lg:px-14 py-12 sm:py-14 lg:py-16">
            {/* Decorative rings */}
            <div
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-white/15 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full border border-white/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-8">
                <h2 className="fluid-h3 font-display font-semibold text-balance">
                  Ready to create a video that gets noticed?
                </h2>
                <p className="mt-4 text-white/85 leading-relaxed max-w-xl fluid-body">
                  Tell Samir Elgammal about your idea, campaign, or upcoming
                  project. Together, you can shape a video production approach
                  that suits your objectives in Dubai and beyond.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <a
                  href="#events"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded bg-white text-signal-deep hover:bg-signal-tint font-semibold transition-colors min-h-[52px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-signal focus-visible:outline-none w-full sm:w-auto"
                >
                  See our work
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
