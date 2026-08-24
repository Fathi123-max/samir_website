"use client";

import React from "react";
import { FAQ_ITEMS } from "@/lib/data";
import { Reveal } from "./Reveal";
import { Plus, Minus } from "lucide-react";

export function Faq() {
  const [openId, setOpenId] = React.useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="py-20 lg:py-28 bg-canvas scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Section header */}
          <div className="lg:col-span-5">
            <Reveal direction="up">
              <p className="eyebrow text-signal mb-4">04 · FAQ</p>
            </Reveal>
            <Reveal direction="up" delay={0.08}>
              <h2 className="fluid-h2 font-display font-semibold text-ink">
                Frequently asked{" "}
                <em className="italic text-signal">questions</em>.
              </h2>
            </Reveal>
            <Reveal direction="up" delay={0.16}>
              <p className="text-zinc-600 fluid-body mt-5 max-w-md">
                Find helpful answers about the video production process,
                project planning, timelines, and working with Samir Elgammal in
                Dubai, United Arab Emirates.
              </p>
            </Reveal>
          </div>

          {/* Accordion */}
          <Reveal direction="up" delay={0.2} className="lg:col-span-7">
            <div className="border-t border-hairline">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openId === item.id;
                return (
                  <div key={item.id} className="border-b border-hairline">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${item.id}`}
                        id={`faq-trigger-${item.id}`}
                        className="group w-full flex items-center justify-between gap-4 text-left py-5 sm:py-6 min-h-[56px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded -mx-1 px-1"
                      >
                        <span
                          className={`font-semibold text-base sm:text-lg leading-snug transition-colors ${
                            isOpen ? "text-signal" : "text-ink group-hover:text-signal"
                          }`}
                        >
                          {item.question}
                        </span>
                        {/* Circular toggle — right aligned per design spec */}
                        <span
                          aria-hidden="true"
                          className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                            isOpen
                              ? "bg-signal border-signal text-white"
                              : "border-hairline text-muted group-hover:border-signal group-hover:text-signal"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                    </h3>
                    <div
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      className="faq-panel"
                      data-open={isOpen}
                    >
                      <div>
                        <p className="text-zinc-600 leading-relaxed pb-6 pr-14 max-w-prose">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
