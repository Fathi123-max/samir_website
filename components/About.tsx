"use client";

import React, { useState } from "react";
import { TIMELINE, PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  GraduationCap,
  Award,
  Layers,
  Zap,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Building,
  MapPin,
} from "lucide-react";

export function About() {
  const [selectedTimelineIndex, setSelectedTimelineIndex] = useState(0);

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Zero-Downtime Signal Redundancy",
      description: "Designing parallel optical trunks, dual-redundant Evertz master syncs, and secondary router clean-switches so no live broadcast ever goes black.",
      accent: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20",
    },
    {
      icon: Zap,
      title: "Sub-Minute Emergency Triage",
      description: "Trained instinct under intense live pressure to diagnose optical fiber breaks, Genlock drift, or switcher GPU lockups in seconds.",
      accent: "text-amber-400 border-amber-500/30 bg-amber-950/20",
    },
    {
      icon: Layers,
      title: "Master Colorimetry (ΔE < 0.8)",
      description: "Scientific calibration across multi-vendor cameras (Sony & Grass Valley) preserving visual harmony across harsh Arabian sun, night floodlights, and LED sets.",
      accent: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20",
    },
    {
      icon: Flame,
      title: "Ultra-Fast EVS Replay Precision",
      description: "Split-second multi-angle clipping and slow-motion packages for referee VAR decisions and director highlight cuts in under 60 seconds.",
      accent: "text-red-400 border-red-500/30 bg-red-950/20",
    },
  ];

  return (
    <section
      id="story"
      aria-label="Engineering Heritage"
      className="py-20 lg:py-28 bg-[#090d16] border-b border-[#162133] relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
              <GraduationCap className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>ENGINEERING HERITAGE & CREDENTIALS</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              18+ Years at the Nexus of Live Adrenaline & Precision Engineering.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-200 fluid-body mt-4 font-normal">
              Holding a Bachelor of Electrical Engineering in Communication & Electronics (Graduated with Honors), Samir combines deep RF/baseband theoretical physics with hands-on mastery of tier-1 OB truck deployments and 24/7 master control playout facilities.
            </p>
          </Reveal>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-20">
          {pillars.map((pillar, index) => (
            <Reveal key={pillar.title} direction="up" delay={0.1 + index * 0.08}>
              <div className="h-full p-6 sm:p-8 rounded-3xl bg-[#0c1320] border border-[#1b283d] hover:border-slate-600 transition-all flex flex-col justify-between group shadow-xl bevel-panel">
                <div>
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shrink-0 ${pillar.accent}`}>
                    <pillar.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-3 group-hover:text-amber-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#162133] flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>STANDARD PROTOCOL</span>
                  <span className="text-emerald-400 font-bold">ACTIVE</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Academic & Career Micro Timeline Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Academic Degree & Philosophy Tile */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="left" delay={0.2}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0d1522] border border-[#202f47] shadow-xl relative overflow-hidden space-y-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" aria-hidden="true" />

                <div className="flex items-center gap-2.5 text-amber-300 font-mono text-xs">
                  <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="font-bold tracking-wider">ACADEMIC FOUNDATION</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display">
                  {PERSONAL_INFO.degree}
                </h3>
                <div className="inline-block px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-xs font-semibold">
                  {PERSONAL_INFO.degreeHonors}
                </div>

                <p className="text-sm text-slate-200 leading-relaxed pt-2">
                  Rigorous engineering training in electromagnetics, signal modulation, digital signal processing (DSP), and high-frequency communication protocols provides the scientific bedrock for solving complex broadcast matrix failures in real-time.
                </p>

                <div className="mt-6 pt-6 border-t border-[#1d2b40] grid grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">CORE FOCUS</span>
                    <span className="text-white font-semibold mt-0.5 block">Telecom & Electronics</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">CAREER SCOPE</span>
                    <span className="text-white font-semibold mt-0.5 block">OB Vans • MCR • Flyaways</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Quick Quote Card */}
            <Reveal direction="left" delay={0.25}>
              <div className="p-6 rounded-2xl bg-[#090e18] border border-[#1a2538] text-xs font-mono text-slate-200 space-y-2">
                <div className="text-amber-300 font-bold tracking-wider uppercase">“ZERO SILENT FAILURES”</div>
                <p className="text-slate-300 italic font-sans text-sm leading-relaxed">
                  “A true broadcast engineer never hopes for luck. We design triple redundancy, monitor signal eye-patterns continuously, and stay completely calm when the red tally light turns on.”
                </p>
                <div className="pt-2 text-right text-slate-400 font-mono">— Samir Elgammal</div>
              </div>
            </Reveal>
          </div>

          {/* Right: Interactive Career Milestone Chronology */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.2}>
              <div className="rounded-3xl bg-[#0c121e] border border-[#1e2c42] p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#1b283d] pb-5 mb-6">
                  <div className="flex items-center gap-2 text-slate-200 font-mono text-xs">
                    <Building className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                    <span className="font-bold tracking-wider uppercase">CAREER TRACK RECORD & MILESTONES</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">2008 — PRESENT</span>
                </div>

                <div className="space-y-5">
                  {TIMELINE.map((node, idx) => {
                    const isSelected = selectedTimelineIndex === idx;
                    return (
                      <div
                        key={node.company}
                        onClick={() => {
                          sound.playButtonClick();
                          setSelectedTimelineIndex(idx);
                        }}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#131d2e] border-amber-500/70 shadow-lg ring-1 ring-amber-500/30"
                            : "bg-[#090e17] border-[#1a263a] hover:border-slate-600 hover:bg-[#0e1624]"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-amber-500/15 border border-amber-500/30 text-amber-300">
                              {node.period}
                            </span>
                            <span className="text-xs font-mono text-cyan-300 font-semibold">
                              {node.type}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-mono text-slate-300">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                            <span>{node.location}</span>
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-1">
                          {node.role}
                        </h3>
                        <div className="text-xs sm:text-sm font-mono text-slate-300 font-semibold mb-3">
                          {node.company}
                        </div>

                        <p className="text-sm text-slate-300 leading-relaxed mb-4 font-sans">
                          {node.description}
                        </p>

                        {/* Achievements list */}
                        <div className="space-y-2 mb-5">
                          {node.achievements.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1b283d]">
                          {node.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded bg-[#070b12] border border-[#1c283c] text-[11px] font-mono text-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
