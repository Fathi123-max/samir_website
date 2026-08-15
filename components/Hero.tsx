"use client";

import React, { useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  CheckCircle2,
  PhoneCall,
  Activity,
  Eye,
} from "lucide-react";

export function Hero() {
  const [activeFeed, setActiveFeed] = useState<number>(0);
  const [yearsCount, setYearsCount] = useState<number>(0);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [broadcastersCount, setBroadcastersCount] = useState<number>(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const duration = 1500;
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setYearsCount(Math.min(18, Math.floor(progress * 18)));
      setEventsCount(Math.min(150, Math.floor(progress * 150)));
      setBroadcastersCount(Math.min(22, Math.floor(progress * 22)));

      if (step >= steps) {
        clearInterval(timer);
        setYearsCount(18);
        setEventsCount(150);
        setBroadcastersCount(22);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const years = shouldReduceMotion ? 18 : yearsCount;
  const events = shouldReduceMotion ? 150 : eventsCount;
  const broadcasters = shouldReduceMotion ? 22 : broadcastersCount;

  const simulatedFeeds = [
    {
      id: 0,
      label: "CAM 01: MAIN BEAUTY",
      short: "MAIN BEAUTY",
      tag: "COP28 PLENARY HALL",
      specs: "4K HDR • 50p • S-LOG3",
      aspect: "Plenary World Stage",
      status: "PROGRAM OUT",
      badge: "LIVE PGM",
    },
    {
      id: 1,
      label: "CAM 02: EVS SUPER SLOW",
      short: "EVS SLO-MO",
      tag: "ADNOC PRO LEAGUE",
      specs: "1080p300 • SONY HDC-4300",
      aspect: "Goal Line Multi-Angle",
      status: "REPLAY CUE",
      badge: "SUPER MOTION",
    },
    {
      id: 2,
      label: "CAM 03: RF TRACKING 4x4",
      short: "RF TRACKING",
      tag: "AL DHAFRA CAMEL RACE",
      specs: "VISLINK COFDM • 10km DIVERSITY",
      aspect: "High-Speed Desert Chase",
      status: "RF LOCKED",
      badge: "WIRELESS RF",
    },
    {
      id: 3,
      label: "CAM 04: CCU COLOR WAVEFORM",
      short: "CCU WAVEFORM",
      tag: "SONY RCP-1500 PAINT BOX",
      specs: "RGB PARADE • ΔE < 0.8",
      aspect: "Tektronix Vector QC",
      status: "CALIBRATED",
      badge: "CCU QC",
    },
  ];

  return (
    <section
      id="hero"
      aria-label="Hero Overview"
      className="relative min-h-[88vh] flex flex-col justify-center py-16 sm:py-20 lg:py-24 overflow-hidden bg-tech-grid border-b border-[#162133] scroll-mt-32"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-10 right-10 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top telemetry badge */}
        <Reveal direction="down" delay={0.1}>
          <div className="flex sm:inline-flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl sm:rounded-full bg-[#0d1421] border border-[#202e47] text-[11px] sm:text-xs font-mono text-slate-200 mb-8 shadow-inner">
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-amber-500" />
            </span>
            <span className="text-amber-400 font-bold uppercase tracking-wide sm:hidden">
              {PERSONAL_INFO.statusTextShort}
            </span>
            <span className="text-amber-400 font-bold uppercase tracking-wide hidden sm:inline">
              {PERSONAL_INFO.statusText}
            </span>
            <span className="text-slate-600 hidden sm:inline" aria-hidden="true">•</span>
            <span className="text-slate-300 hidden sm:inline font-medium">DUBAI / GCC BASE</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Bio, Badges & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <Reveal direction="up" delay={0.15}>
              <div className="space-y-2">
                <span className="block text-slate-300 text-xs sm:text-base font-mono font-medium tracking-normal">
                  {PERSONAL_INFO.title}
                </span>
                <h1 className="fluid-h1 font-display font-extrabold tracking-tight text-white">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
                    {PERSONAL_INFO.name}
                  </span>
                </h1>
                <span className="block text-xl sm:text-2xl lg:text-3xl text-amber-400 font-display font-semibold">
                  CCU & EVS Replay Specialist
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p className="fluid-body text-slate-200 max-w-xl font-normal leading-relaxed">
                <strong className="text-white font-bold">{PERSONAL_INFO.experienceYears}+ years</strong> keeping high-stakes live broadcasts on-air — from mobile <span className="text-amber-300 font-semibold">OB vans</span> and sports stadiums to 24/7 studio <span className="text-cyan-300 font-semibold">Master Control Rooms</span>. Precision camera shading, instant slow-motion replay, and zero-downtime routing across the UAE and Gulf region.
              </p>
            </Reveal>

            {/* Quick credentials badges */}
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-3 font-mono text-xs text-slate-200">
                <span className="px-3 py-2 rounded-lg bg-[#101827] border border-[#23344e] text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>B.Sc. Electrical Engineering (Honors)</span>
                </span>
                <span className="px-3 py-2 rounded-lg bg-[#101827] border border-[#23344e] text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
                  <span>Sony MVS / FOR-A Specialist</span>
                </span>
                <span className="px-3 py-2 rounded-lg bg-[#101827] border border-[#23344e] text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                  <span>EVS XT3 Max / XT-VIA Certified</span>
                </span>
              </div>
            </Reveal>

            {/* Primary Action Buttons */}
            <Reveal direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#contact"
                  onClick={() => sound.playButtonClick()}
                  className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold font-mono text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transition-colors flex items-center gap-3 transform active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[48px]"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Book for Next Live Event</span>
                </a>

                <a
                  href="#events"
                  onClick={() => sound.playTallyClick()}
                  className="px-6 py-4 rounded-xl bg-[#0e1624] hover:bg-[#162238] text-slate-100 hover:text-amber-400 border border-[#22324c] hover:border-amber-500/50 font-mono text-xs sm:text-sm font-semibold transition-colors flex items-center gap-3 shadow-md focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[48px]"
                >
                  <Eye className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>View 6 Flagship Case Studies</span>
                </a>
              </div>
            </Reveal>

            {/* Micro Stats Grid */}
            <Reveal direction="up" delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-[#182335]">
                <div className="p-4 rounded-2xl bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400">
                    {years}+
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-1 font-medium">
                    Years Experience
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400">
                    {events}+
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-1 font-medium">
                    Major Live Events
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    {broadcasters}+
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-1 font-medium">
                    Broadcasters Worked
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl font-extrabold text-white">
                    {PERSONAL_INFO.uptimePercentage}
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-1 font-medium">
                    On-Air Reliability
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Multiviewer Command Center Interactive Display */}
          <div className="lg:col-span-5">
            <Reveal direction="scale" delay={0.25}>
              <div className="relative rounded-3xl bg-[#090e17] border border-[#1e2c42] p-4 sm:p-6 shadow-2xl bevel-panel overflow-hidden space-y-4">
                {/* Header of Multiviewer Monitor */}
                <div className="flex items-center justify-between gap-2 px-3 py-2 bg-[#0d1522] border-b border-[#1b283d] rounded-xl text-[10px] sm:text-xs font-mono">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 animate-pulse shrink-0" aria-hidden="true" />
                    <span className="text-slate-200 font-bold tracking-wider truncate">
                      OB VAN MCR MULTIVIEWER • QUAD 1
                    </span>
                  </div>
                  <span className="text-emerald-400 font-semibold shrink-0">1080p50 HDR</span>
                </div>

                {/* Main Selected Feed Preview */}
                <div className="relative min-h-[300px] sm:aspect-video bg-[#04060a] rounded-2xl overflow-hidden border border-[#1a2538] flex flex-col justify-between p-5">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-scanlines opacity-40 pointer-events-none" aria-hidden="true" />

                  {/* Top Feed Overlay Info */}
                  <div className="relative z-10 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="inline-block px-3 py-1 rounded bg-red-950/90 border border-red-600 text-red-300 text-[11px] font-mono font-bold tracking-wider mb-2">
                        ● {simulatedFeeds[activeFeed].badge}
                      </div>
                      <div className="text-xs sm:text-base font-bold text-white font-mono whitespace-nowrap overflow-hidden text-ellipsis">
                        <span className="sm:hidden">{simulatedFeeds[activeFeed].short}</span>
                        <span className="hidden sm:inline">{simulatedFeeds[activeFeed].label}</span>
                      </div>
                      <p className="text-xs text-amber-300 font-mono mt-1 truncate">
                        {simulatedFeeds[activeFeed].tag}
                      </p>
                    </div>

                    {/* VU Meter simulation */}
                    <div className="bg-[#0b1019]/90 border border-[#1d2b40] p-2 sm:p-3 rounded-xl flex flex-col items-center gap-1 font-mono text-[9px] sm:text-[10px] shrink-0">
                      <div className="text-slate-300 font-semibold">AUDIO CH 1/2</div>
                      <div className="flex items-end gap-2 h-9" aria-hidden="true">
                        <div className="w-1.5 sm:w-2 bg-gradient-to-t from-emerald-500 via-yellow-500 to-red-500 rounded-sm h-7 sm:h-8 animate-pulse" />
                        <div className="w-1.5 sm:w-2 bg-gradient-to-t from-emerald-500 via-yellow-500 to-red-500 rounded-sm h-6 sm:h-7 animate-pulse" />
                      </div>
                      <span className="text-emerald-400 font-bold">-18 dBFS</span>
                    </div>
                  </div>

                  {/* Center Visual Waveform / Crosshair */}
                  <div className="relative z-10 flex items-center justify-center my-auto py-2">
                    <div className="text-center p-4 rounded-2xl bg-[#090f1a]/85 border border-[#1e2e47] backdrop-blur-sm max-w-xs space-y-1">
                      <Activity className="w-8 h-8 text-cyan-400 mx-auto animate-pulse" aria-hidden="true" />
                      <div className="text-xs font-mono font-bold text-white">
                        {simulatedFeeds[activeFeed].aspect}
                      </div>
                      <div className="text-[11px] font-mono text-slate-300">
                        {simulatedFeeds[activeFeed].specs}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: Status */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between font-mono text-[10px] sm:text-[11px] pt-3 border-t border-slate-800/80">
                    <div className="rounded-lg bg-[#0b1019]/80 border border-[#1d2b40] px-2.5 py-1.5 min-w-0">
                      <div className="text-slate-500 uppercase tracking-wider">STATUS</div>
                      <div className="text-emerald-400 font-bold leading-tight">{simulatedFeeds[activeFeed].status}</div>
                    </div>
                    <div className="rounded-lg bg-[#0b1019]/80 border border-[#1d2b40] px-2.5 py-1.5 min-w-0">
                      <div className="text-slate-500 uppercase tracking-wider">LOCK</div>
                      <div className="text-amber-400 font-bold leading-tight">SYNC OK</div>
                    </div>
                  </div>
                </div>

                {/* Multiviewer 4-Channel Selection Switcher */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="group" aria-label="Select multiviewer camera angle">
                  {simulatedFeeds.map((feed) => {
                    const isSelected = activeFeed === feed.id;
                    return (
                      <button
                        key={feed.id}
                        onClick={() => {
                          sound.playJogClick();
                          setActiveFeed(feed.id);
                        }}
                        aria-pressed={isSelected}
                        className={`p-3 rounded-xl border text-left font-mono transition-colors bevel-button min-h-[56px] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#182438] border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50"
                            : "bg-[#0c121d] border-[#1d2a3f] text-slate-300 hover:text-white hover:bg-[#121c2d]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="font-bold">CAM 0{feed.id + 1}</span>
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isSelected ? "bg-amber-400 animate-ping" : "bg-slate-500"
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-[10px] sm:text-[11px] font-semibold text-slate-200 leading-tight">
                          {feed.short}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate mt-1">
                          {feed.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom hardware note */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 px-2 pt-1 text-[9px] sm:text-[10px] font-mono text-slate-400">
                  <span className="min-w-0 truncate">INTERFACE: SONY MVS-8000X MULTIVIEWER</span>
                  <span className="text-amber-400 font-medium shrink-0">INTERACTIVE BUS SELECTOR</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
