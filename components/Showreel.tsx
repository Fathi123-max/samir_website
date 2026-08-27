"use client";

import React from "react";
import type { Identity, ShowreelSection } from "@/lib/types";
import { Reveal } from "./Reveal";
import { MediaFrame } from "./MediaFrame";
import { toEmbedUrl } from "@/lib/utils";
import { Clapperboard, Play } from "lucide-react";

interface ShowreelProps {
  identity: Identity;
  showreel: ShowreelSection;
}

export function Showreel({ identity, showreel }: ShowreelProps) {
  const videos = showreel.videos;
  const [selectedIndex, setSelectedIndex] = React.useState(() => {
    const firstWithUrl = videos.findIndex((v) => v.videoUrl);
    return firstWithUrl >= 0 ? firstWithUrl : 0;
  });

  const selected = videos[selectedIndex];

  return (
    <section
      id="showreel"
      aria-label="Showreel"
      className="py-20 lg:py-28 bg-canvas scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14">
          <div className="max-w-2xl">
            <Reveal direction="up">
              <p className="eyebrow text-signal mb-4">{showreel.eyebrow}</p>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h2 className="fluid-h2 font-display font-semibold text-ink">
                {showreel.heading}{" "}
                <em className="italic text-signal">{showreel.headingAccent}</em>.
              </h2>
            </Reveal>
          </div>
          {identity.showreelUrl && (
            <Reveal direction="up" delay={0.12}>
              <a
                href={identity.showreelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-signal rounded focus-visible:outline-none min-h-[44px]"
              >
                {showreel.openLabel} ↗
              </a>
            </Reveal>
          )}
        </div>

        {/* Featured player */}
        <Reveal direction="up" delay={0.16}>
          {selected?.videoUrl ? (
            <figure className="relative aspect-video rounded-lg overflow-hidden bg-ink ring-1 ring-black/5 shadow-[0_32px_80px_-32px_rgba(26,43,50,0.35)]">
              <iframe
                key={selectedIndex}
                src={toEmbedUrl(selected.videoUrl)}
                title={`${selected.title} — broadcast footage`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </figure>
          ) : (
            <div
              aria-live="polite"
              className="relative aspect-video rounded-lg border border-dashed border-zinc-300 bg-paper flex flex-col items-center justify-center gap-4 p-6 text-center"
            >
              <span className="w-14 h-14 rounded-full bg-white border border-hairline shadow-sm flex items-center justify-center text-zinc-400">
                <Clapperboard className="w-6 h-6" aria-hidden="true" />
              </span>
              <p className="eyebrow text-zinc-400">Video slot — {selected?.title}</p>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                Add the YouTube/Vimeo link to{" "}
                <code className="font-mono bg-white border border-hairline rounded px-1.5 py-0.5">
                  showreelSection.videos
                </code>{" "}
                in the homepage content and it plays right here.
              </p>
            </div>
          )}
        </Reveal>

        {/* Video gallery grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mt-5 sm:mt-8"
          role="group"
          aria-label="Showreel videos — select one to play"
        >
          {videos.map((video, index) => {
            const isSelected = index === selectedIndex;
            return (
              <Reveal key={index} direction="up" delay={0.08 + index * 0.06}>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-pressed={isSelected}
                  aria-label={`Play video: ${video.title}`}
                  className={`group w-full text-left rounded overflow-hidden border transition-all focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none ${
                    isSelected
                      ? "border-signal shadow-[0_12px_32px_-12px_rgba(35,155,167,0.4)]"
                      : "border-hairline card-lift"
                  }`}
                >
                  <span className="relative block">
                    <MediaFrame
                      src={video.thumb}
                      alt={`${video.title} — poster frame`}
                      ratio="video"
                      label={video.title.split("—")[0].trim().toUpperCase()}
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                    {/* Play badge */}
                    <span
                      className={`absolute inset-0 flex items-center justify-center ${
                        video.thumb ? "bg-ink/10 group-hover:bg-ink/25 transition-colors" : ""
                      }`}
                    >
                      <span
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-signal text-white"
                            : "bg-white/90 backdrop-blur text-ink group-hover:bg-signal group-hover:text-white"
                        }`}
                        aria-hidden="true"
                      >
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </span>
                    </span>
                  </span>

                  <span className="block p-3.5 sm:p-4 bg-white border-t border-hairline">
                    <span className="block text-sm font-semibold text-ink leading-snug line-clamp-1">
                      {video.title}
                    </span>
                    <span className="block text-xs text-zinc-500 mt-1 leading-snug line-clamp-2">
                      {video.caption}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
