"use client";

import React from "react";
import Link from "next/link";
import { FLAGSHIP_EVENTS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { MediaFrame } from "./MediaFrame";
import { ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Sports", "Summit", "Heritage", "Entertainment", "Combat Sports"];

const CATEGORY_EVENT = "samir:event-category-change";

function readEventCategory(): string {
  if (typeof window === "undefined") return "All";
  const param = new URLSearchParams(window.location.search).get("eventCategory");
  return param && CATEGORIES.includes(param) ? param : "All";
}

function subscribeEventCategory(callback: () => void): () => void {
  window.addEventListener(CATEGORY_EVENT, callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener(CATEGORY_EVENT, callback);
    window.removeEventListener("popstate", callback);
  };
}

function writeEventCategory(category: string) {
  const url = new URL(window.location.href);
  if (category === "All") {
    url.searchParams.delete("eventCategory");
  } else {
    url.searchParams.set("eventCategory", category);
  }
  window.history.replaceState(null, "", url.toString());
  window.dispatchEvent(new Event(CATEGORY_EVENT));
}

export function FlagshipEvents() {
  const selectedCategory = React.useSyncExternalStore(
    subscribeEventCategory,
    readEventCategory,
    () => "All"
  );

  const filteredEvents =
    selectedCategory === "All"
      ? FLAGSHIP_EVENTS
      : FLAGSHIP_EVENTS.filter((e) => e.category === selectedCategory);

  return (
    <section
      id="events"
      aria-label="Case studies"
      className="py-20 lg:py-28 bg-paper border-y border-hairline scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header + filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <Reveal direction="up">
              <p className="eyebrow text-signal mb-4">02 · Portfolio</p>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h2 className="fluid-h2 font-display font-semibold text-ink">
                Flagship productions,{" "}
                <em className="italic text-signal">documented</em>.
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <p className="text-zinc-600 fluid-body mt-5">
                Behind-the-scenes deep dives into major sporting leagues,
                global summits, and primetime entertainment across the UAE and GCC.
              </p>
            </Reveal>
          </div>

          {/* Category filter */}
          <Reveal direction="up" delay={0.2}>
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label="Filter case studies by category"
            >
              {CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? FLAGSHIP_EVENTS.length
                    : FLAGSHIP_EVENTS.filter((e) => e.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => writeEventCategory(cat)}
                    aria-pressed={isActive}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors min-h-[40px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none ${
                      isActive
                        ? "bg-ink text-white"
                        : "bg-white border border-hairline text-zinc-600 hover:text-signal hover:border-signal/50"
                    }`}
                  >
                    {cat}
                    <span className={`ml-1.5 text-xs ${isActive ? "text-white/60" : "text-zinc-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {filteredEvents.map((event, index) => (
            <Reveal key={event.slug} direction="up" delay={0.08 + index * 0.06}>
              <Link
                href={`/events/${event.slug}`}
                aria-label={`Read the full case study: ${event.title}`}
                className="card-lift group flex flex-col h-full rounded-lg bg-white border border-hairline overflow-hidden focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
              >
                {/* Cover media */}
                <div className="relative">
                  <MediaFrame
                    src={event.heroImage}
                    alt={`${event.title} — production photography`}
                    ratio="video"
                    label={`${event.category.toUpperCase()} COVER PHOTO`}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur text-signal text-[11px] font-mono uppercase tracking-wider shadow-sm">
                    {event.category}
                  </span>
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-ink/80 backdrop-blur text-white/90 text-[11px] font-mono tabular-nums">
                    {event.cameraCount} cams
                  </span>
                </div>

                <div className="p-6 sm:p-7 flex flex-col grow">
                  <h3 className="font-display font-semibold text-ink text-xl leading-snug mb-2 group-hover:text-signal transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3 mb-6">
                    {event.summary}
                  </p>

                  <div className="mt-auto space-y-3">
                    <p className="text-xs text-zinc-500 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                      <span className="truncate">{event.broadcaster}</span>
                      <span className="shrink-0 font-mono">{event.dates}</span>
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
                      Read the story
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
