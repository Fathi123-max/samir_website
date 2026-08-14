"use client";

import React, { useEffect, useRef } from "react";
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
  Cpu,
} from "lucide-react";

interface EventModalProps {
  event: CaseStudy | null;
  onClose: () => void;
}

export function EventModal({ event, onClose }: EventModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (event) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [event, onClose]);

  if (!event) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playButtonClick();
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-event-title"
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0f19] border border-[#22334d] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl bevel-panel text-slate-100 custom-scrollbar"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          onClick={() => {
            sound.playButtonClick();
            onClose();
          }}
          aria-label="Close case study dialog"
          className="absolute top-5 right-5 p-3 rounded-full bg-[#121c2c] border border-[#26374f] text-slate-200 hover:text-white hover:bg-[#1a273d] transition-all z-10 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Top Header */}
        <div className="mb-6 pr-12 sm:pr-14">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#101826] border border-[#223147] text-slate-200 font-mono text-xs">
              {event.cameraCount} CAMERA CHANNELS
            </span>
          </div>

          <h2 id="modal-event-title" className="fluid-h2 font-display font-extrabold text-white tracking-tight">
            {event.title}
          </h2>
          <p className="text-sm sm:text-base font-mono text-cyan-300 mt-1">
            {event.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[#1a2538] text-xs font-mono text-slate-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>{event.broadcaster}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>{event.dates}</span>
            </div>
          </div>
        </div>

        {/* Role & Summary */}
        <div className="p-5 rounded-2xl bg-[#0f1726] border border-[#22334f] mb-8">
          <div className="text-xs font-mono text-amber-300 font-bold mb-1 uppercase tracking-wider">
            SAMIR&apos;S ENGINEERING ROLE:
          </div>
          <div className="text-base font-bold text-white font-mono mb-2">
            {event.role}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans">
            {event.summary}
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {event.keyStats.map((stat, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-[#070b12] border border-[#1b273b] text-center">
              <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hardware Specifications Matrix */}
        <div className="mb-8">
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" aria-hidden="true" />
            <span>Core Hardware & Signal Specifications</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">VIDEO FORMAT & COLOR</span>
              <span className="text-slate-100 font-semibold text-sm">{event.specs.format}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">VISION MIXER</span>
              <span className="text-slate-100 font-semibold text-sm">{event.specs.visionMixer}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">REPLAY SERVERS & SLOW-MO</span>
              <span className="text-slate-100 font-semibold text-sm">{event.specs.replay}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0d1422] border border-[#1d2b40]">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">MASTER SYNC & ROUTING</span>
              <span className="text-slate-100 font-semibold text-sm">{event.specs.syncRouter}</span>
            </div>
          </div>
        </div>

        {/* Technical Approach & Signal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <span>Technical Approach</span>
            </h3>
            <div className="space-y-2.5 text-xs text-slate-200">
              {event.technicalApproach.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Signal Flow Chain</span>
            </h3>
            <div className="space-y-2 text-xs font-mono">
              {event.signalFlow.map((step, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-[#070b12] border border-[#1a2638] flex items-start gap-2">
                  <span className="text-amber-400 font-bold shrink-0">0{i + 1}.</span>
                  <div>
                    <span className="text-white font-bold block">{step.step}</span>
                    <span className="text-slate-300 text-[11px] font-sans">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-World Challenges & Live Solutions */}
        <div className="mb-8">
          <h3 className="text-sm font-mono font-bold text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" aria-hidden="true" />
            <span>High-Pressure Obstacles & Real-Time Engineering Solutions</span>
          </h3>
          <div className="space-y-3">
            {event.challengesAndSolutions.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#111726] border border-[#24354f] space-y-2">
                <div className="flex items-start gap-2 text-xs font-mono">
                  <span className="font-bold text-red-400 uppercase shrink-0">CHALLENGE:</span>
                  <span className="text-slate-200 font-sans">{item.challenge}</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-mono">
                  <span className="font-bold text-emerald-400 uppercase shrink-0">SOLUTION:</span>
                  <span className="text-slate-200 font-sans">{item.solution}</span>
                </div>
                <div className="text-xs text-slate-300 pl-4 border-l-2 border-amber-500 font-sans">
                  <strong className="text-white">Outcome:</strong> {item.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I'd Improve Next Time */}
        <div className="p-5 rounded-2xl bg-[#090d16] border border-amber-500/40 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-bold mb-1">
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>HONEST ENGINEERING RETROSPECTIVE — “WHAT I&apos;D IMPROVE NEXT TIME”</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 font-sans italic leading-relaxed">
            &ldquo;{event.improvementReflection}&rdquo;
          </p>
        </div>

        {/* CTA in Modal */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#1a2538]">
          <div className="flex flex-wrap gap-1.5">
            {event.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 rounded bg-[#101826] border border-[#202f47] text-[11px] font-mono text-slate-200">
                #{tag}
              </span>
            ))}
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              sound.playButtonClick();
              onClose();
              setTimeout(() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }, 120);
            }}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[44px] flex items-center"
          >
            Inquire For Similar Production &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
