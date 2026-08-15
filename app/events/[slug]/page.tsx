import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FLAGSHIP_EVENTS } from "@/lib/data";
import { BroadcastHUD } from "@/components/BroadcastHUD";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tv,
  CheckCircle2,
  AlertTriangle,
  Zap,
  RotateCcw,
  Layers,
  Cpu,
} from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return FLAGSHIP_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = FLAGSHIP_EVENTS.find((e) => e.slug === slug);
  if (!event) return { title: "Event Case Study | Samir Elgammal" };

  return {
    title: `${event.title} — Engineering Case Study | Samir Elgammal`,
    description: event.summary,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = FLAGSHIP_EVENTS.find((e) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black">
      <BroadcastHUD />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/#events"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d1421] border border-[#1e2c44] text-xs font-mono text-slate-200 hover:text-amber-400 hover:border-amber-500/50 transition-colors min-h-[40px] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Back to Command Center</span>
          </Link>
        </div>

        {/* Header */}
        <div className="pb-10 border-b border-[#182335] space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider">
              {event.category}
            </span>
            <span className="px-4 py-2 rounded-full bg-[#101826] border border-[#223147] text-slate-200 font-mono text-xs font-semibold">
              {event.cameraCount} CAMERA CHANNELS
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-[clamp(2rem,5vw+1rem,4.5rem)] font-display font-extrabold text-white tracking-tight">
              {event.title}
            </h1>
            <p className="text-base sm:text-xl font-mono text-cyan-300 font-semibold">
              {event.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#182336] text-xs font-mono text-slate-200">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-3">
              <Tv className="w-4 h-4 text-cyan-400 shrink-0" aria-hidden="true" />
              <span>{event.broadcaster}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>{event.dates}</span>
            </div>
          </div>
        </div>

        {/* Role & Summary Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1d2b42] shadow-xl space-y-3">
          <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider block">
            SAMIR&apos;S ROLE & MISSION
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-mono">
            {event.role}
          </h2>
          <p className="text-slate-200 fluid-body leading-relaxed pt-1">
            {event.summary}
          </p>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {event.keyStats.map((stat, i) => (
            <div key={i} className="p-4 sm:p-5 rounded-2xl bg-[#0a0f18] border border-[#1b263b] text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-300 font-mono font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hardware & Signal Spec Grid */}
        <div className="space-y-4">
          <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
            <span>Master Hardware & Signal Architecture</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-5 rounded-2xl bg-[#0c1320] border border-[#1d2b40] space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">VIDEO FORMAT & ENCODING</span>
              <span className="text-slate-100 font-bold text-sm block">{event.specs.format}</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0c1320] border border-[#1d2b40] space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">VISION MIXER</span>
              <span className="text-slate-100 font-bold text-sm block">{event.specs.visionMixer}</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0c1320] border border-[#1d2b40] space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">REPLAY & SLOW-MOTION</span>
              <span className="text-slate-100 font-bold text-sm block">{event.specs.replay}</span>
            </div>
            <div className="p-5 rounded-2xl bg-[#0c1320] border border-[#1d2b40] space-y-1">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">MASTER SYNC & ROUTING</span>
              <span className="text-slate-100 font-bold text-sm block">{event.specs.syncRouter}</span>
            </div>
          </div>
        </div>

        {/* Technical Approach & Signal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider flex items-center gap-3">
              <Layers className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Technical Approach</span>
            </h2>
            <div className="space-y-3 text-sm text-slate-200">
              {event.technicalApproach.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider flex items-center gap-3">
              <Zap className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
              <span>Signal Flow Chain</span>
            </h2>
            <div className="space-y-3 text-xs font-mono">
              {event.signalFlow.map((step, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0a0f19] border border-[#1a263a] flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-sm shrink-0">0{i + 1}.</span>
                  <div>
                    <span className="text-white font-bold block text-sm">{step.step}</span>
                    <span className="text-slate-300 font-sans mt-1 block">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges and Solutions */}
        <div className="space-y-4">
          <h2 className="text-base font-mono font-bold text-white uppercase tracking-wider flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" aria-hidden="true" />
            <span>High-Pressure Live Faults & Engineering Solutions</span>
          </h2>
          <div className="space-y-4">
            {event.challengesAndSolutions.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0e1424] border border-[#22334f] space-y-3">
                <div className="text-xs font-mono">
                  <span className="text-red-400 font-bold uppercase block mb-1">CHALLENGE ENCOUNTERED:</span>
                  <span className="text-slate-100 text-sm font-sans">{item.challenge}</span>
                </div>
                <div className="text-xs font-mono">
                  <span className="text-emerald-400 font-bold uppercase block mb-1">REAL-TIME ENGINEERING FIX:</span>
                  <span className="text-slate-100 text-sm font-sans">{item.solution}</span>
                </div>
                <div className="text-xs text-slate-300 pl-4 border-l-2 border-amber-500 font-sans">
                  <strong className="text-white">Impact on Broadcast:</strong> {item.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I'd Improve Next Time */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#090d16] border border-amber-500/40 shadow-xl space-y-2">
          <div className="flex items-center gap-3 text-xs font-mono text-amber-300 font-bold">
            <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>HONEST ENGINEERING RETROSPECTIVE — “WHAT I&apos;D IMPROVE NEXT TIME”</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 font-sans italic leading-relaxed pt-1">
            &ldquo;{event.improvementReflection}&rdquo;
          </p>
        </div>

        {/* Next / Prev Case Study Navigation */}
        {(() => {
          const currentIndex = FLAGSHIP_EVENTS.findIndex((e) => e.slug === event.slug);
          const prevEvent = currentIndex > 0 ? FLAGSHIP_EVENTS[currentIndex - 1] : FLAGSHIP_EVENTS[FLAGSHIP_EVENTS.length - 1];
          const nextEvent = currentIndex < FLAGSHIP_EVENTS.length - 1 ? FLAGSHIP_EVENTS[currentIndex + 1] : FLAGSHIP_EVENTS[0];

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#182438]">
              <Link
                href={`/events/${prevEvent.slug}`}
                className="p-5 rounded-2xl bg-[#0b1019] border border-[#1d2b40] hover:border-amber-500/50 transition-colors text-left group flex flex-col justify-between space-y-2"
              >
                <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>PREVIOUS CASE STUDY</span>
                </div>
                <div className="text-sm sm:text-base font-bold text-white font-display group-hover:text-amber-400 transition-colors truncate">
                  {prevEvent.title}
                </div>
                <div className="text-xs font-mono text-cyan-300">
                  {prevEvent.category} • {prevEvent.cameraCount} Cams
                </div>
              </Link>

              <Link
                href={`/events/${nextEvent.slug}`}
                className="p-5 rounded-2xl bg-[#0b1019] border border-[#1d2b40] hover:border-amber-500/50 transition-colors text-right group flex flex-col justify-between space-y-2"
              >
                <div className="text-[11px] font-mono text-slate-400 uppercase flex items-center justify-end gap-2">
                  <span>NEXT CASE STUDY</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-sm sm:text-base font-bold text-white font-display group-hover:text-amber-400 transition-colors truncate">
                  {nextEvent.title}
                </div>
                <div className="text-xs font-mono text-cyan-300">
                  {nextEvent.category} • {nextEvent.cameraCount} Cams
                </div>
              </Link>
            </div>
          );
        })()}

        {/* Bottom Booking Action Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121c2e] to-[#0a101c] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 shadow-2xl">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Planning a Similar Live Broadcast Production?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-mono">
              Samir Elgammal is available for OB Truck, CCU, and EVS operations across UAE and GCC.
            </p>
          </div>

          <Link
            href="/#contact"
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shrink-0 transition-colors shadow-lg shadow-amber-500/20 min-h-[48px] flex items-center justify-center"
          >
            Inquire For Dates & Roles &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
