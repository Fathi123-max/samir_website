"use client";

import React, { useEffect } from "react";
import { CaseStudy } from "@/lib/types";
import { sound } from "@/lib/sound";
import {
  X,
  MapPin,
  Calendar,
  Tv,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Layers,
  ArrowRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";

interface EventModalProps {
  event: CaseStudy | null;
  onClose: () => void;
}

export function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0f19] border border-[#22334d] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl bevel-panel text-slate-200 custom-scrollbar">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playButtonClick();
            onClose();
          }}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2.5 rounded-full bg-[#121c2c] border border-[#26374f] text-slate-300 hover:text-white hover:bg-[#1a273d] transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#101826] border border-[#223147] text-slate-300 font-mono text-xs">
              {event.cameraCount} CAMERA CHANNELS
            </span>
          </div>

          <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
            {event.title}
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyan-400 mt-1">
            {event.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#1a2538] text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" />
              <span>{event.broadcaster}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>{event.dates}</span>
            </div>
          </div>
        </div>

        {/* Role & Summary */}
        <div className="p-4 rounded-2xl bg-[#0f1726] border border-[#22334f] mb-8">
          <div className="text-xs font-mono text-amber-400 font-bold mb-1">
            SAMIR&apos;S ENGINEERING ROLE:
          </div>
          <div className="text-base font-bold text-white font-mono mb-2">
            {event.role}
          </div>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            {event.summary}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {event.keyStats.map((stat, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#070b12] border border-[#1b273b] text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">
                {stat.value}
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hardware Specifications Matrix */}
        <div className="mb-8">
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Core Hardware & Signal Specifications</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[10px]">VIDEO FORMAT & COLOR</span>
              <span className="text-slate-100 font-semibold">{event.specs.format}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[10px]">VISION MIXER</span>
              <span className="text-slate-100 font-semibold">{event.specs.visionMixer}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[10px]">REPLAY SERVERS & SLOW-MO</span>
              <span className="text-slate-100 font-semibold">{event.specs.replay}</span>
            </div>
            <div className="p-3 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[10px]">MASTER SYNC & ROUTING</span>
              <span className="text-slate-100 font-semibold">{event.specs.syncRouter}</span>
            </div>
          </div>
        </div>

        {/* Technical Approach & Signal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Technical Approach</span>
            </h3>
            <div className="space-y-2 text-xs text-slate-300">
              {event.technicalApproach.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Signal Flow Chain</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {event.signalFlow.map((step, i) => (
                <div key={i} className="p-2 rounded-lg bg-[#070b12] border border-[#1a2638] flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">0{i + 1}.</span>
                  <div>
                    <span className="text-white font-bold block">{step.step}</span>
                    <span className="text-slate-400 text-[11px] font-sans">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-World Challenges & Live Solutions */}
        <div className="mb-8">
          <h3 className="text-sm font-mono font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span>High-Pressure Obstacles & Real-Time Engineering Solutions</span>
          </h3>
          <div className="space-y-3">
            {event.challengesAndSolutions.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#111726] border border-[#24354f] space-y-2">
                <div className="flex items-start gap-2 text-xs text-red-300 font-mono">
                  <span className="font-bold text-red-400 uppercase">CHALLENGE:</span>
                  <span>{item.challenge}</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-emerald-300 font-mono">
                  <span className="font-bold text-emerald-400 uppercase">SOLUTION:</span>
                  <span>{item.solution}</span>
                </div>
                <div className="text-[11px] text-slate-400 pl-4 border-l-2 border-amber-500 font-sans">
                  <strong>Outcome:</strong> {item.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I'd Improve Next Time */}
        <div className="p-5 rounded-2xl bg-[#090d16] border border-amber-500/30 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
            <RotateCcw className="w-4 h-4" />
            <span>HONEST ENGINEERING RETROSPECTIVE — “WHAT I&apos;D IMPROVE NEXT TIME”</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-sans italic leading-relaxed">
            &ldquo;{event.improvementReflection}&rdquo;
          </p>
        </div>

        {/* CTA in Modal */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1a2538]">
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-[#101826] border border-[#202f47] text-[11px] font-mono text-slate-300">
                #{tag}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => {
              sound.playButtonClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all"
          >
            Inquire For Similar Production &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
