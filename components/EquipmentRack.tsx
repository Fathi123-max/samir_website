"use client";

import React, { useEffect, useState } from "react";
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
  Search,
  X,
} from "lucide-react";

export function EquipmentRack() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const param = new URLSearchParams(window.location.search).get("category");
      if (param && EQUIPMENT_STACK.some((cat) => cat.id === param)) return param;
    }
    return "vision-mixers";
  });
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const url = new URL(window.location.href);
    if (activeCategoryId === "vision-mixers") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", activeCategoryId);
    }
    window.history.replaceState(null, "", url.toString());
  }, [activeCategoryId]);

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
      aria-label="Equipment Rack"
      className="py-20 lg:py-28 bg-[#060910] border-b border-[#162133] relative overflow-hidden scroll-mt-32"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>BROADCAST HARDWARE & PROTOCOLS</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Interactive 19&quot; Equipment Rack.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-200 fluid-body mt-4 font-normal">
              Hands-on mastery over industry-standard vision mixers, CCU paint boxes, EVS replay servers, Pebble Beach automation, and baseband routing matrices.
            </p>
          </Reveal>
        </div>

        {/* Category Selector Tabs & Search */}
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-4">
            {/* Category Tabs */}
            <div className="relative flex-1 min-w-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0" role="tablist" aria-label="Equipment categories">
                {EQUIPMENT_STACK.map((cat) => {
                  const Icon = iconMap[cat.iconName] || Cpu;
                  const isSelected = activeCategoryId === cat.id && !searchQuery;
                  return (
                    <button
                      key={cat.id}
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => {
                        sound.playJogClick();
                        setActiveCategoryId(cat.id);
                        setSearchQuery("");
                      }}
                      className={`px-4 py-3 rounded-xl text-xs font-mono whitespace-nowrap flex items-center gap-2 border transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                        isSelected
                          ? "bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20"
                          : "bg-[#0d1421] border-[#1d2a3f] text-slate-200 hover:text-white hover:bg-[#152033]"
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-2 lg:bottom-0 w-10 bg-gradient-to-l from-[#060910] to-transparent"
                aria-hidden="true"
              />
            </div>

            {/* Quick Search with Clear button */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 shrink-0 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search gear or protocol (e.g. Sony, 12G)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search equipment by model, manufacturer, or protocol"
                className="w-full pl-10 pr-9 py-3 rounded-xl bg-[#0d1421] border border-[#1d2a3f] text-xs font-mono text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 min-h-[40px]"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    sound.playButtonClick();
                    setSearchQuery("");
                  }}
                  aria-label="Clear search input"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Result count indicator */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-6 px-1">
            <span>
              {searchQuery.trim() ? (
                <>Found <strong className="text-cyan-400">{filteredItems.length}</strong> matching units for &ldquo;{searchQuery}&rdquo;</>
              ) : (
                <>Showing <strong className="text-cyan-400">{filteredItems.length}</strong> units in {activeCategory.name}</>
              )}
            </span>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-amber-400 hover:underline text-[11px] rounded px-2 py-1 min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              >
                Reset Filter
              </button>
            )}
          </div>
        </Reveal>

        {/* 19-inch Rack Cabinet Enclosure */}
        <Reveal direction="scale" delay={0.25}>
          <div className="rounded-3xl bg-[#090e18] border-2 border-[#1e2d42] p-6 sm:p-8 lg:p-10 shadow-2xl bevel-panel space-y-6">
            {/* Cabinet Rail Screw Visuals */}
            <div className="hidden sm:flex justify-between px-2 pb-4 text-xs font-mono text-slate-400 border-b border-[#182538]">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full border border-slate-600 bg-slate-800" aria-hidden="true" />
                RACK UNIT 01-16 (OB VAN BAY 4)
              </span>
              <span className="text-cyan-400 font-semibold">12G-SDI / SMPTE 2110 HYBRID READY</span>
              <span className="flex items-center gap-2">
                ACTIVE LOAD: 42%
                <span className="w-3 h-3 rounded-full border border-slate-600 bg-slate-800" aria-hidden="true" />
              </span>
            </div>

            {/* Hardware Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="p-6 sm:p-7 rounded-3xl bg-[#0c1322] border border-[#1d2c44] hover:border-cyan-500/60 transition-colors flex flex-col justify-between group shadow-lg space-y-5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded bg-cyan-950/70 border border-cyan-700 text-cyan-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {item.manufacturer}
                      </span>
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        {item.experienceYears}+ Yrs Mastery
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-mono group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </h3>
                    <div className="text-xs text-slate-300 font-mono mb-2 font-semibold">
                      {item.model}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                      {item.role}
                    </p>
                  </div>

                  {/* Protocols tags */}
                  <div className="pt-4 border-t border-[#172438] mt-auto">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                      SUPPORTED PROTOCOLS
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.protocols.map((proto) => (
                        <span
                          key={proto}
                          className="px-3 py-1 rounded-lg bg-[#060a12] border border-[#1a273c] text-[11px] font-mono text-slate-200"
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
              <div className="text-center py-16 text-slate-300 font-mono text-sm">
                No equipment matching &ldquo;{searchQuery}&rdquo;. Try searching for &ldquo;Sony&rdquo;, &ldquo;EVS&rdquo;, &ldquo;12G-SDI&rdquo;, or &ldquo;Pebble Beach&rdquo;.
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
