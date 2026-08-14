"use client";

import React, { useState } from "react";
import { EQUIPMENT_STACK } from "@/lib/data";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  Cpu,
  LayoutGrid,
  Camera,
  Film,
  Monitor,
  Radio,
  Volume2,
  CheckCircle2,
  Sliders,
  Search,
  Sparkles,
} from "lucide-react";

export function EquipmentRack() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>("vision-mixers");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const iconMap: Record<string, React.ElementType> = {
    LayoutGrid,
    Camera,
    Film,
    Monitor,
    Cpu,
    Radio,
    Volume2,
  };

  const activeCategory =
    EQUIPMENT_STACK.find((cat) => cat.id === activeCategoryId) || EQUIPMENT_STACK[0];

  const filteredItems = searchQuery.trim()
    ? EQUIPMENT_STACK.flatMap((c) => c.items).filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.manufacturer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.protocols.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
          item.role.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : activeCategory.items;

  return (
    <section
      id="rack"
      className="py-20 lg:py-28 bg-[#060910] border-b border-[#162133] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>BROADCAST HARDWARE & PROTOCOL MATRIX</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Interactive 19&quot; Equipment Rack.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-300 fluid-body mt-3">
              Hands-on mastery over industry-standard vision mixers, CCU paint boxes, EVS replay servers, Pebble Beach automation, and baseband routing matrices.
            </p>
          </Reveal>
        </div>

        {/* Category Selector Tabs & Search */}
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {EQUIPMENT_STACK.map((cat) => {
                const Icon = iconMap[cat.iconName] || Cpu;
                const isSelected = activeCategoryId === cat.id && !searchQuery;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playJogClick();
                      setActiveCategoryId(cat.id);
                      setSearchQuery("");
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-mono whitespace-nowrap flex items-center gap-2 border transition-all ${
                      isSelected
                        ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20"
                        : "bg-[#0d1421] border-[#1d2a3f] text-slate-300 hover:text-white hover:bg-[#152033]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search gear or protocol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0d1421] border border-[#1d2a3f] text-xs font-mono text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </Reveal>

        {/* 19-inch Rack Cabinet Enclosure */}
        <Reveal direction="scale" delay={0.25}>
          <div className="rounded-3xl bg-[#090e18] border-2 border-[#1e2d42] p-4 sm:p-6 lg:p-8 shadow-2xl bevel-panel relative">
            {/* Cabinet Rail Screw Visuals */}
            <div className="hidden sm:flex justify-between px-2 mb-4 text-[10px] font-mono text-slate-600 border-b border-[#182538] pb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full border border-slate-600 bg-slate-800" />
                RACK UNIT 01-16 (OB VAN BAY 4)
              </span>
              <span className="text-cyan-400">12G-SDI / SMPTE 2110 HYBRID READY</span>
              <span className="flex items-center gap-1.5">
                ACTIVE LOAD: 42%
                <span className="w-2 h-2 rounded-full border border-slate-600 bg-slate-800" />
              </span>
            </div>

            {/* Hardware Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="p-5 rounded-2xl bg-[#0c1322] border border-[#1d2c44] hover:border-cyan-500/60 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-800/70 text-cyan-300 text-[10px] font-mono font-bold uppercase">
                        {item.manufacturer}
                      </span>
                      <span className="text-[11px] font-mono text-amber-400 font-semibold">
                        {item.experienceYears}+ Yrs Mastery
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h4>
                    <div className="text-xs text-slate-400 font-mono mb-2">
                      {item.model}
                    </div>

                    <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
                      {item.role}
                    </p>
                  </div>

                  {/* Protocols tags */}
                  <div className="pt-3 border-t border-[#172438]">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1.5">
                      SUPPORTED PROTOCOLS
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {item.protocols.map((proto) => (
                        <span
                          key={proto}
                          className="px-2 py-0.5 rounded bg-[#060a12] border border-[#1a273c] text-[10px] font-mono text-slate-300"
                        >
                          {proto}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 text-slate-400 font-mono text-xs">
                No equipment matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Sony&rdquo;, &ldquo;EVS&rdquo;, &ldquo;12G-SDI&rdquo;, or &ldquo;Pebble Beach&rdquo;.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
