"use client";

import React, { useState, useEffect } from "react";
import { PERSONAL_INFO, FLAGSHIP_EVENTS } from "@/lib/data";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  Radio,
  Tv,
  Calendar,
  Layers,
  Sliders,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Play,
  RotateCw,
  Activity,
  Signal,
  Eye,
} from "lucide-react";

export function Hero() {
  const [activeFeed, setActiveFeed] = useState<number>(0);
  const [yearsCount, setYearsCount] = useState<number>(0);
  const [eventsCount, setEventsCount] = useState<number>(0);
  const [broadcastersCount, setBroadcastersCount] = useState<number>(0);

  // Animated counters on mount
  useEffect(() => {
    const duration = 1600;
    const steps = 40;
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
  }, []);

  const simulatedFeeds = [
    {
      id: 0,
      label: "CAM 01: MAIN BEAUTY",
      tag: "COP28 PLENARY HALL",
      specs: "4K HDR • 50p • S-LOG3",
      aspect: "Plenary World Stage",
      status: "PROGRAM OUT",
      color: "border-red-500/80 bg-red-950/20 text-red-400",
      badge: "LIVE PGM",
    },
    {
      id: 1,
      label: "CAM 02: EVS 6X SUPER SLOW",
      tag: "ADNOC PRO LEAGUE",
      specs: "1080p300 • SONY HDC-4300",
      aspect: "Goal Line Multi-Angle",
      status: "REPLAY CUE",
      color: "border-amber-500/80 bg-amber-950/20 text-amber-400",
      badge: "SUPER MOTION",
    },
    {
      id: 2,
      label: "CAM 03: RF TRACKING 4x4",
      tag: "AL DHAFRA CAMEL RACE",
      specs: "VISLINK COFDM • 10km DIVERSITY",
      aspect: "High-Speed Desert Chase",
      status: "RF LOCKED",
      color: "border-cyan-500/80 bg-cyan-950/20 text-cyan-400",
      badge: "WIRELESS RF",
    },
    {
      id: 3,
      label: "CAM 04: CCU COLOR WAVEFORM",
      tag: "SONY RCP-1500 PAINT BOX",
      specs: "RGB PARADE • ΔE < 0.8",
      aspect: "Tektronix Vector QC",
      status: "CALIBRATED",
      color: "border-emerald-500/80 bg-emerald-950/20 text-emerald-400",
      badge: "CCU QC",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center pt-8 pb-16 lg:py-20 overflow-hidden bg-tech-grid border-b border-[#162133]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        {/* Top telemetry bar */}
        <Reveal direction="down" delay={0.1}>
          <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d1421] border border-[#202e47] text-xs font-mono text-slate-300 mb-6 shadow-inner">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span className="text-amber-400 font-semibold uppercase tracking-wider">
              {PERSONAL_INFO.statusText}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">DUBAI / GCC BASE</span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Bio & Primary CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal direction="up" delay={0.15}>
              <h1 className="fluid-h1 font-display font-extrabold tracking-tight text-white">
                <span className="block text-slate-400 text-lg sm:text-2xl font-mono font-medium tracking-normal mb-1">
                  {PERSONAL_INFO.title}
                </span>
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {PERSONAL_INFO.name}
                </span>
                <span className="block text-xl sm:text-2xl lg:text-3xl text-amber-400 font-display font-semibold mt-2">
                  CCU & EVS Specialist
                </span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.25}>
              <p className="fluid-body text-slate-300 max-w-2xl font-normal leading-relaxed">
                <span className="text-white font-semibold">{PERSONAL_INFO.experienceYears}+ years</span> keeping high-stakes live broadcasts on-air — from mobile <span className="text-amber-300">OB vans</span> and sports stadiums to 24/7 studio <span className="text-cyan-300">Master Control Rooms</span>. Precision camera shading, instant slow-motion replay, and zero-downtime routing across the UAE and Gulf region.
              </p>
            </Reveal>

            {/* Quick credentials badges */}
            <Reveal direction="up" delay={0.3}>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-slate-300">
                <span className="px-2.5 py-1 rounded bg-[#101827] border border-[#23344e] text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  B.Sc. Electrical Engineering (Honors)
                </span>
                <span className="px-2.5 py-1 rounded bg-[#101827] border border-[#23344e] text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  Sony MVS / FOR-A Specialist
                </span>
                <span className="px-2.5 py-1 rounded bg-[#101827] border border-[#23344e] text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  EVS XT3 Max / XT-VIA Certified
                </span>
              </div>
            </Reveal>

            {/* Primary Action Buttons */}
            <Reveal direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <a
                  href="#contact"
                  onClick={() => sound.playButtonClick()}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold font-mono text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center gap-2.5 transform active:scale-98"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Book for Next Live Event</span>
                </a>

                <a
                  href="#events"
                  onClick={() => sound.playTallyClick()}
                  className="px-6 py-3.5 rounded-xl bg-[#0e1624] hover:bg-[#162238] text-slate-100 hover:text-amber-400 border border-[#22324c] hover:border-amber-500/50 font-mono text-sm font-semibold transition-all flex items-center gap-2 shadow-md"
                >
                  <Eye className="w-4 h-4 text-amber-400" />
                  <span>Explore Flagship Events</span>
                </a>
              </div>
            </Reveal>

            {/* Micro Stats Grid */}
            <Reveal direction="up" delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#182335]">
                <div className="p-3 rounded-lg bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-amber-400">
                    {yearsCount}+
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Years Experience
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan-400">
                    {eventsCount}+
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Major Live Events
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-emerald-400">
                    {broadcastersCount}+
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    Broadcasters & Channels
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#0c121e] border border-[#1d2a3f]">
                  <div className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    {PERSONAL_INFO.uptimePercentage}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    On-Air Reliability
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Multiviewer Command Center Interactive Display */}
          <div className="lg:col-span-5">
            <Reveal direction="scale" delay={0.25}>
              <div className="relative rounded-2xl bg-[#090e17] border border-[#1e2c42] p-3 shadow-2xl bevel-panel overflow-hidden">
                {/* Header of Multiviewer Monitor */}
                <div className="flex items-center justify-between px-3 py-2 bg-[#0d1522] border-b border-[#1b283d] rounded-t-lg text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-slate-200 font-bold tracking-wider">
                      OB VAN MCR MULTIVIEWER • QUAD 1
                    </span>
                  </div>
                  <span className="text-emerald-400 font-semibold">1080p50 HDR</span>
                </div>

                {/* Main Selected Feed Preview */}
                <div className="relative aspect-video bg-[#04060a] rounded-lg mt-2 overflow-hidden border border-[#1a2538] flex flex-col justify-between p-4">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-scanlines opacity-40 pointer-events-none" />

                  {/* Top Feed Overlay Info */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <div className="inline-block px-2 py-0.5 rounded bg-red-950/80 border border-red-700/80 text-red-400 text-[11px] font-mono font-bold tracking-wider mb-1">
                        ● {simulatedFeeds[activeFeed].badge}
                      </div>
                      <h4 className="text-sm font-bold text-white font-mono">
                        {simulatedFeeds[activeFeed].label}
                      </h4>
                      <p className="text-xs text-amber-400 font-mono">
                        {simulatedFeeds[activeFeed].tag}
                      </p>
                    </div>

                    {/* VU Meter simulation */}
                    <div className="bg-[#0b1019]/90 border border-[#1d2b40] p-2 rounded flex flex-col items-center gap-1 font-mono text-[10px]">
                      <div className="text-slate-400">AUDIO CH 1/2</div>
                      <div className="flex items-end gap-1 h-10">
                        <div className="w-1.5 bg-gradient-to-t from-emerald-500 via-yellow-500 to-red-500 rounded-sm h-8 animate-pulse" />
                        <div className="w-1.5 bg-gradient-to-t from-emerald-500 via-yellow-500 to-red-500 rounded-sm h-7 animate-pulse" />
                      </div>
                      <span className="text-emerald-400">-18 dBFS</span>
                    </div>
                  </div>

                  {/* Center Visual Waveform / Crosshair */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <div className="text-center p-4 rounded-xl bg-[#090f1a]/80 border border-[#1e2e47] backdrop-blur-sm max-w-xs">
                      <Activity className="w-8 h-8 text-cyan-400 mx-auto mb-1 animate-pulse" />
                      <div className="text-xs font-mono font-bold text-white">
                        {simulatedFeeds[activeFeed].aspect}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                        {simulatedFeeds[activeFeed].specs}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar: Status */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-300 pt-2 border-t border-slate-800/80">
                    <span className="text-slate-400">
                      STATUS: <strong className="text-emerald-400">{simulatedFeeds[activeFeed].status}</strong>
                    </span>
                    <span className="text-amber-400">LOCK: SYNC OK</span>
                  </div>
                </div>

                {/* Multiviewer 4-Channel Selection Switcher */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  {simulatedFeeds.map((feed) => {
                    const isSelected = activeFeed === feed.id;
                    return (
                      <button
                        key={feed.id}
                        onClick={() => {
                          sound.playJogClick();
                          setActiveFeed(feed.id);
                        }}
                        className={`p-2 rounded-lg border text-left font-mono transition-all bevel-button ${
                          isSelected
                            ? "bg-[#182438] border-amber-400 text-amber-300 shadow-md ring-1 ring-amber-400/50"
                            : "bg-[#0c121d] border-[#1d2a3f] text-slate-400 hover:text-slate-200 hover:bg-[#121c2d]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] mb-1">
                          <span className="font-bold">CAM 0{feed.id + 1}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isSelected ? "bg-amber-400 animate-ping" : "bg-slate-600"
                            }`}
                          />
                        </div>
                        <div className="text-[11px] font-semibold text-slate-200 truncate">
                          {feed.label.split(":")[1] || feed.label}
                        </div>
                        <div className="text-[9px] text-slate-400 truncate mt-0.5">
                          {feed.badge}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom hardware note */}
                <div className="flex items-center justify-between px-2 pt-2.5 text-[10px] font-mono text-slate-500">
                  <span>INTERFACE: SONY MVS-8000X MULTIVIEWER</span>
                  <span className="text-amber-500/80">INTERACTIVE BUS SELECTOR</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
