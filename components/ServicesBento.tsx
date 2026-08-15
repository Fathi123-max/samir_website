"use client";

import React from "react";
import { SERVICES } from "@/lib/data";
import { Reveal } from "./Reveal";
import {
  Truck,
  Sliders,
  Video,
  Server,
  Radio,
  Activity,
  CheckCircle2,
  Cpu,
} from "lucide-react";

export function ServicesBento() {
  const iconMap: Record<string, React.ElementType> = {
    Truck,
    Sliders,
    Video,
    Server,
    Radio,
    Activity,
  };

  return (
    <section
      id="services"
      aria-label="Engineering Capabilities"
      className="py-20 lg:py-28 bg-[#070b12] border-b border-[#162133] relative overflow-hidden scroll-mt-32"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
              <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>CORE ENGINEERING DISCIPLINES</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Broadcast-Grade Engineering Capabilities.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-200 fluid-body mt-4 font-normal">
              Practical, field-tested engineering execution across high-adrenaline live sports, international diplomatic summits, and 24/7 master control facilities.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid Layout with varied spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconName] || Activity;

            return (
              <Reveal
                key={service.id}
                direction="up"
                delay={0.1 + index * 0.07}
                className={service.colSpan || "col-span-1"}
              >
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1b283d] hover:border-amber-500/50 transition-colors duration-300 flex flex-col justify-between group shadow-xl bevel-panel space-y-6">
                  <div>
                    {/* Top Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#131d2e] border border-[#24354f] flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-500/60 transition-[transform,border-color] shrink-0">
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <span className="text-[11px] font-mono px-3 py-2 rounded-lg bg-[#070a10] border border-[#1a2538] text-slate-300 font-semibold">
                        {service.metrics}
                      </span>
                    </div>

                    <h3 className={`text-xl sm:text-2xl font-bold text-white font-display mb-2 group-hover:text-amber-400 transition-colors ${
                      service.colSpan?.includes("lg:col-span-2") ? "max-w-2xl" : ""
                    }`}>
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-300 mb-4 font-semibold">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-200 leading-relaxed font-sans mb-6">
                      {service.summary}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-3">
                      <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                        KEY DELIVERABLES
                      </span>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Tool Matrix */}
                  <div className="pt-5 border-t border-[#182336] mt-auto">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                      HARDWARE & PROTOCOLS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.keyTools.map((tool) => (
                        <span
                          key={tool}
                          className="px-3 py-1 rounded-lg bg-[#080d15] border border-[#1d2b3f] text-[11px] font-mono text-slate-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
