"use client";

import React from "react";
import { TESTIMONIALS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Quote, Star, Award, ShieldCheck } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-[#070b12] border-b border-[#162133] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
              <Award className="w-3.5 h-3.5" />
              <span>DIRECTOR & PRODUCTION ENDORSEMENTS</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Trusted Under Live Television Pressure.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-300 fluid-body mt-3">
              What TV Directors, Technical Heads, and OB Production Managers say about working with Samir on tier-1 broadcasts.
            </p>
          </Reveal>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.id} direction="up" delay={0.1 + index * 0.1}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1b283d] hover:border-slate-600 transition-all flex flex-col justify-between shadow-xl bevel-panel">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-8 h-8 text-amber-400/60" />
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#070a10] border border-[#1b273b] text-amber-300">
                      {item.event}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-sans mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#182335] flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#182438] border border-[#2b3d5b] flex items-center justify-center font-mono font-bold text-amber-400 text-xs">
                    {item.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-display">
                      {item.author}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {item.role}
                    </p>
                    <p className="text-[11px] text-cyan-400 font-mono">
                      {item.organization}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
