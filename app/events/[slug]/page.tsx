import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FLAGSHIP_EVENTS, PERSONAL_INFO } from "@/lib/data";
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
  PhoneCall,
  ShieldCheck,
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
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100">
      <BroadcastHUD />
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Back Link */}
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0d1421] border border-[#1e2c44] text-xs font-mono text-slate-300 hover:text-amber-400 hover:border-amber-500/50 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Command Center</span>
        </Link>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-[#182335]">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
              {event.category}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#101826] border border-[#223147] text-slate-300 font-mono text-xs">
              {event.cameraCount} CAMERA CHANNELS
            </span>
          </div>

          <h1 className="fluid-h1 font-display font-extrabold text-white tracking-tight">
            {event.title}
          </h1>
          <p className="text-base sm:text-xl font-mono text-cyan-400 mt-2">
            {event.subtitle}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#182336] text-xs font-mono text-slate-300">
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

        {/* Role & Summary Card */}
        <div className="p-6 rounded-3xl bg-[#0c121e] border border-[#1d2b42] mb-10 shadow-xl">
          <span className="text-xs font-mono text-amber-400 font-bold block mb-1">
            SAMIR&apos;S ROLE & MISSION
          </span>
          <h2 className="text-xl font-bold text-white font-mono mb-3">
            {event.role}
          </h2>
          <p className="text-slate-300 fluid-body leading-relaxed">
            {event.summary}
          </p>
        </div>

        {/* Stats Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {event.keyStats.map((stat, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b263b] text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Hardware & Signal Spec Grid */}
        <div className="mb-12">
          <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>Master Hardware & Signal Architecture</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-[#0c1320] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[11px] mb-1">VIDEO FORMAT & ENCODING</span>
              <span className="text-slate-100 font-bold text-sm">{event.specs.format}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0c1320] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[11px] mb-1">VISION MIXER</span>
              <span className="text-slate-100 font-bold text-sm">{event.specs.visionMixer}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0c1320] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[11px] mb-1">REPLAY & SLOW-MOTION</span>
              <span className="text-slate-100 font-bold text-sm">{event.specs.replay}</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#0c1320] border border-[#1d2b40]">
              <span className="text-slate-500 block text-[11px] mb-1">MASTER SYNC & ROUTING</span>
              <span className="text-slate-100 font-bold text-sm">{event.specs.syncRouter}</span>
            </div>
          </div>
        </div>

        {/* Technical Approach & Signal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <span>Technical Approach</span>
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              {event.technicalApproach.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>Signal Flow Chain</span>
            </h3>
            <div className="space-y-2.5 text-xs font-mono">
              {event.signalFlow.map((step, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#0a0f19] border border-[#1a263a] flex items-start gap-3">
                  <span className="text-amber-400 font-bold text-sm shrink-0">0{i + 1}.</span>
                  <div>
                    <span className="text-white font-bold block text-sm">{step.step}</span>
                    <span className="text-slate-400 font-sans mt-0.5 block">{step.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges and Solutions */}
        <div className="mb-12">
          <h3 className="text-base font-mono font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>High-Pressure Live Faults & Engineering Solutions</span>
          </h3>
          <div className="space-y-4">
            {event.challengesAndSolutions.map((item, i) => (
              <div key={i} className="p-5 rounded-2xl bg-[#0e1424] border border-[#22334f] space-y-3">
                <div className="text-xs font-mono">
                  <span className="text-red-400 font-bold uppercase block mb-1">CHALLENGE ENCOUNTERED:</span>
                  <span className="text-slate-200 text-sm font-sans">{item.challenge}</span>
                </div>
                <div className="text-xs font-mono">
                  <span className="text-emerald-400 font-bold uppercase block mb-1">REAL-TIME ENGINEERING FIX:</span>
                  <span className="text-slate-200 text-sm font-sans">{item.solution}</span>
                </div>
                <div className="text-xs text-slate-400 pl-4 border-l-2 border-amber-500 font-sans">
                  <strong>Impact on Broadcast:</strong> {item.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What I'd Improve Next Time */}
        <div className="p-6 rounded-3xl bg-[#090d16] border border-amber-500/40 mb-12 shadow-xl">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-2">
            <RotateCcw className="w-4 h-4" />
            <span>HONEST ENGINEERING RETROSPECTIVE — “WHAT I&apos;D IMPROVE NEXT TIME”</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 font-sans italic leading-relaxed">
            &ldquo;{event.improvementReflection}&rdquo;
          </p>
        </div>

        {/* Bottom Booking Action Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121c2e] to-[#0a101c] border border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              Planning a Similar Live Broadcast Production?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Samir Elgammal is available for OB Truck, CCU, and EVS operations across UAE and GCC.
            </p>
          </div>

          <a
            href="/#contact"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shrink-0 transition-all shadow-lg shadow-amber-500/20"
          >
            Inquire For Dates & Roles &rarr;
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
