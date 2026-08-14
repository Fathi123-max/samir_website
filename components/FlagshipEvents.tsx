"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FLAGSHIP_EVENTS } from "@/lib/data";
import { CaseStudy } from "@/lib/types";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import { EventModal } from "./EventModal";
import {
  Calendar,
  MapPin,
  Tv,
  ArrowRight,
  Eye,
  Layers,
  Sparkles,
  Flame,
  Award,
  Radio,
} from "lucide-react";

export function FlagshipEvents() {
  const [selectedEvent, setSelectedEvent] = useState<CaseStudy | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Sports", "Summit", "Heritage", "Entertainment", "Combat Sports"];

  const filteredEvents =
    selectedCategory === "All"
      ? FLAGSHIP_EVENTS
      : FLAGSHIP_EVENTS.filter((e) => e.category === selectedCategory);

  const handleOpenModal = (event: CaseStudy) => {
    sound.playButtonClick();
    setSelectedEvent(event);
  };

  return (
    <section
      id="events"
      className="py-20 lg:py-28 bg-[#090d16] border-b border-[#162133] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <Reveal direction="down">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
                <Award className="w-3.5 h-3.5" />
                <span>HIGH-STAKES BROADCAST PRODUCTIONS</span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
                Flagship Events & Engineering Case Studies.
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <p className="text-slate-300 fluid-body mt-3">
                Behind-the-scenes deep dives into major sporting leagues, global diplomatic summits, and primetime entertainment productions across the UAE and GCC.
              </p>
            </Reveal>
          </div>

          {/* Category Filter Pills */}
          <Reveal direction="left" delay={0.2}>
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#0c121e] border border-[#1e2a3f] rounded-2xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    sound.playJogClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                    selectedCategory === cat
                      ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "text-slate-400 hover:text-white hover:bg-[#131d2e]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <Reveal key={event.slug} direction="up" delay={0.1 + index * 0.08}>
              <div className="h-full rounded-3xl bg-[#0c1321] border border-[#1d2a3f] hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl hover:shadow-amber-500/5 bevel-panel">
                <div className="p-6 sm:p-7">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase">
                      {event.category}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#070b12] text-slate-400 border border-[#192436]">
                      {event.cameraCount} Cams
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-display mb-1 group-hover:text-amber-400 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 mb-3">
                    {event.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mb-6 line-clamp-3">
                    {event.summary}
                  </p>

                  {/* Metadata Row */}
                  <div className="space-y-1.5 text-xs font-mono text-slate-400 border-t border-[#182336] pt-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{event.broadcaster}</span>
                    </div>
                  </div>

                  {/* Quick Stat Pill */}
                  <div className="grid grid-cols-2 gap-2 text-center font-mono py-2 px-3 rounded-xl bg-[#080d17] border border-[#172438]">
                    <div>
                      <span className="text-sm font-bold text-amber-400 block">
                        {event.keyStats[0]?.value}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {event.keyStats[0]?.label}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-bold text-emerald-400 block">
                        {event.keyStats[1]?.value}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {event.keyStats[1]?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-4 bg-[#090f19] border-t border-[#172338] flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenModal(event)}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#111927] hover:bg-[#182338] text-slate-200 hover:text-amber-400 border border-[#23334d] font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick Engineering View</span>
                  </button>

                  <Link
                    href={`/events/${event.slug}`}
                    onClick={() => sound.playButtonClick()}
                    className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition-all text-xs font-mono"
                    title="View full case study page"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
