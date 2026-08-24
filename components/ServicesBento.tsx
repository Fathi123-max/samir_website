"use client";

import React from "react";
import { SERVICES } from "@/lib/data";
import { Reveal } from "./Reveal";
import {
  Truck,
  Sliders,
  Video,
  Server,
  Radio,
  Activity,
} from "lucide-react";

const ICONS: Record<string, React.ElementType> = {
  Truck,
  Sliders,
  Video,
  Server,
  Radio,
  Activity,
};

export function ServicesBento() {
  return (
    <section
      id="services"
      aria-label="Capabilities"
      className="py-20 lg:py-28 bg-canvas scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <Reveal direction="up">
            <p className="eyebrow text-signal mb-4">02 · Capabilities</p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="fluid-h2 font-display font-semibold text-ink">
              Broadcast-grade engineering,{" "}
              <em className="italic text-signal">end to end</em>.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="text-zinc-600 fluid-body mt-5">
              Field-proven execution across live sports, international summits,
              and 24/7 master control — from first rig to final wrap.
            </p>
          </Reveal>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.iconName] ?? Activity;

            return (
              <Reveal
                key={service.id}
                direction="up"
                delay={0.08 + index * 0.06}
                className={service.colSpan || "col-span-1"}
              >
                <article className="card-lift h-full p-6 sm:p-8 rounded-2xl bg-white border border-hairline flex flex-col">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <span className="w-12 h-12 rounded-xl bg-signal-tint text-signal flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-ink text-xl mb-1.5 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-signal mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  <ul className="space-y-2.5 mb-6" aria-label={`Key deliverables for ${service.title}`}>
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700">
                        <span
                          className="mt-[9px] w-1.5 h-1.5 rounded-full bg-signal shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-hairline">
                    <p className="eyebrow text-muted mb-2.5">Tools &amp; protocols</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.keyTools.map((tool) => (
                        <span
                          key={tool}
                          className="px-2.5 py-1 rounded-md bg-paper border border-hairline text-[11px] font-mono text-zinc-600"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs font-semibold text-zinc-500 mt-4 tabular-nums">
                      {service.metrics}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
