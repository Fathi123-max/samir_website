"use client";

import React from "react";
import { EQUIPMENT_STACK } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Search, X } from "lucide-react";

export function EquipmentRack() {
  const [activeCategoryId, setActiveCategoryId] = React.useState<string>("vision-mixers");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const activeCategory =
    EQUIPMENT_STACK.find((cat) => cat.id === activeCategoryId) ?? EQUIPMENT_STACK[0];

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
      aria-label="Equipment and technical stack"
      className="py-20 lg:py-28 bg-canvas scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="up">
            <p className="eyebrow text-signal mb-4">05 · Tech Stack</p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="fluid-h2 font-display font-semibold text-ink">
              Fluent on the gear that{" "}
              <em className="italic text-signal">matters</em>.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="text-zinc-600 fluid-body mt-5">
              Hands-on mastery of industry-standard vision mixers, CCU paint
              boxes, EVS replay servers, playout automation, and routing matrices.
            </p>
          </Reveal>
        </div>

        {/* Controls */}
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div
              className="flex items-center gap-2 overflow-x-auto pb-1 -mb-1"
              role="tablist"
              aria-label="Equipment categories"
            >
              {EQUIPMENT_STACK.map((cat) => {
                const isActive = activeCategoryId === cat.id && !searchQuery;
                return (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setSearchQuery("");
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[40px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none ${
                      isActive
                        ? "bg-ink text-white"
                        : "bg-paper border border-hairline text-zinc-600 hover:text-signal hover:border-signal/50"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Search */}
            <div className="relative lg:w-72 shrink-0">
              <Search
                className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="text"
                placeholder="Search gear or protocol…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search equipment by model, manufacturer, or protocol"
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-paper border border-hairline text-sm text-ink placeholder:text-zinc-400 focus:outline-none focus:border-signal focus-visible:ring-2 focus-visible:ring-signal min-h-[42px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search input"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-ink"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <p className="text-xs text-zinc-500 mb-6" role="status">
            {searchQuery.trim() ? (
              <>
                <span className="font-semibold text-signal tabular-nums">{filteredItems.length}</span>{" "}
                matching units for “{searchQuery}”
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-ink tabular-nums">{filteredItems.length}</span>{" "}
                units in {activeCategory.name.toLowerCase()}
              </>
            )}
          </p>
        </Reveal>

        {/* Equipment grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.name}
              className="card-lift p-6 rounded-2xl bg-white border border-hairline flex flex-col"
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="px-2.5 py-1 rounded-md bg-signal-tint text-signal text-[11px] font-mono uppercase tracking-wider">
                  {item.manufacturer}
                </span>
                <span className="text-xs text-zinc-400 font-mono tabular-nums">
                  {item.experienceYears}+ yrs
                </span>
              </div>

              <h3 className="font-display font-bold text-ink leading-snug mb-1">
                {item.name}
              </h3>
              <p className="text-xs text-zinc-500 font-medium mb-2">{item.model}</p>
              <p className="text-sm text-zinc-600 leading-relaxed mb-5">{item.role}</p>

              <div className="mt-auto pt-4 border-t border-hairline">
                <p className="eyebrow text-muted mb-2">Protocols</p>
                <div className="flex flex-wrap gap-1.5">
                  {item.protocols.map((proto) => (
                    <span
                      key={proto}
                      className="px-2 py-0.5 rounded bg-paper border border-hairline text-[11px] font-mono text-zinc-500"
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
          <p className="text-center py-16 text-zinc-500 text-sm">
            No equipment matching “{searchQuery}”. Try “Sony”, “EVS”, “12G”, or “Pebble Beach”.
          </p>
        )}
      </div>
    </section>
  );
}
