"use client";

import React from "react";
import { SERVICES } from "@/lib/data";
import { sound } from "@/lib/sound";
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
  ArrowRight,
  Shield,
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
      className="py-20 lg:py-28 bg-[#070b12] border-b border-[#162133] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>CORE ENGINEERING DISCIPLINES</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Broadcast-Grade Engineering Capabilities.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-300 fluid-body mt-3">
              Practical, field-tested engineering execution across high-adrenaline live sports, international diplomatic summits, and 24/7 master control facilities.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid Layout with varied spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.iconName] || Activity;
            const isWide = service.colSpan?.includes("col-span-2");

            return (
              <Reveal
                key={service.id}
                direction="up"
                delay={0.1 + index * 0.07}
                className={service.colSpan || "col-span-1"}
              >
                <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1b283d] hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl hover:shadow-amber-500/5 bevel-panel">
                  <div>
                    {/* Top Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-[#131d2e] border border-[#24354f] flex items-center justify-center text-amber-400 group-hover:scale-105 group-hover:border-amber-500/60 transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#070a10] border border-[#1a2538] text-slate-400">
                        {service.metrics}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2 group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400 mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans mb-6">
                      {service.summary}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
                        KEY DELIVERABLES
                      </span>
                      {service.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Tool Matrix */}
                  <div className="pt-4 border-t border-[#182336]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                      HARDWARE & PROTOCOLS
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.keyTools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded bg-[#080d15] border border-[#1d2b3f] text-[11px] font-mono text-slate-300"
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
