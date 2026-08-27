"use client";

import React from "react";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MediaFrame } from "@/components/MediaFrame";
import { BackToTop } from "@/components/BackToTop";
import { toEmbedUrl } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Tv,
  CheckCircle2,
  Clapperboard,
} from "lucide-react";
import type { PersonalInfo, CaseStudy } from "@/lib/types";
import type { TinaTuple } from "@/lib/cms";

function cleanEvent(node: Record<string, unknown>): CaseStudy {
  const copy = { ...node };
  delete copy._sys;
  delete copy.__typename;
  delete copy.id;
  return copy as unknown as CaseStudy;
}

export interface EventDetailProps {
  eventTuple: TinaTuple<{ event: CaseStudy }>;
  personalInfoTuple: TinaTuple<{ personalInfo: PersonalInfo }>;
  personalInfoValue: PersonalInfo;
  events: CaseStudy[];
}

export function EventDetail({
  eventTuple,
  personalInfoTuple,
  personalInfoValue,
  events,
}: EventDetailProps) {
  const eventTina = useTina({
    ...eventTuple,
    experimental___selectFormByFormId: () => {
      const raw = eventTuple.data?.event as unknown as {
        _sys?: { path?: string };
      } | undefined;
      return raw?._sys?.path ?? "content/events";
    },
  });
  const personalInfo = useTina(personalInfoTuple).data?.personalInfo ?? personalInfoValue;

  const eventNode =
    (eventTina.data?.event as unknown as Record<string, unknown> | undefined) ?? null;
  const event: CaseStudy = eventNode
    ? cleanEvent(eventNode)
    : events.find((e) => e.slug === eventTuple.data.event.slug)!;

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-canvas text-ink">
        <Header personalInfo={personalInfo} />
        <main className="flex-1 w-full flex items-center justify-center py-32">
          <p className="eyebrow text-muted">Event not found</p>
        </main>
        <Footer personalInfo={personalInfo} />
      </div>
    );
  }

  const currentIndex = events.findIndex((e) => e.slug === event.slug);
  const prevEvent = currentIndex > 0 ? events[currentIndex - 1] : events[events.length - 1];
  const nextEvent = currentIndex < events.length - 1 ? events[currentIndex + 1] : events[0];

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Header personalInfo={personalInfo} />

      <main className="flex-1 w-full">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 space-y-12 sm:space-y-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li>
                <Link
                  href="/"
                  className="text-zinc-500 hover:text-signal transition-colors focus-visible:ring-2 focus-visible:ring-signal rounded px-1 py-1 min-h-[36px] inline-flex items-center"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-zinc-300">/</li>
              <li>
                <Link
                  href="/#events"
                  className="text-zinc-500 hover:text-signal transition-colors focus-visible:ring-2 focus-visible:ring-signal rounded px-1 py-1 min-h-[36px] inline-flex items-center"
                >
                  Case studies
                </Link>
              </li>
              <li aria-hidden="true" className="text-zinc-300">/</li>
              <li aria-current="page" className="text-ink font-medium truncate max-w-[55vw] sm:max-w-md">
                {event.title}
              </li>
            </ol>
          </nav>

          {/* Header */}
          <header className="space-y-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-signal-tint text-signal text-[11px] font-mono uppercase tracking-wider font-medium">
                {event.category}
              </span>
              <span className="px-3.5 py-1.5 rounded-full border border-hairline text-zinc-600 text-xs font-medium tabular-nums">
                {event.cameraCount} camera channels
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="fluid-h1 font-display font-semibold text-ink">
                {event.title}
              </h1>
              <p className="text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-3xl">
                {event.subtitle}
              </p>
            </div>

            <dl className="flex flex-wrap gap-x-8 gap-y-3 pt-2 text-sm text-zinc-600">
              <div className="inline-flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
                <dt className="sr-only">Venue</dt>
                <dd>{event.venue}</dd>
              </div>
              <div className="inline-flex items-center gap-2.5">
                <Tv className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
                <dt className="sr-only">Broadcaster</dt>
                <dd>{event.broadcaster}</dd>
              </div>
              <div className="inline-flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-signal shrink-0" aria-hidden="true" />
                <dt className="sr-only">Dates</dt>
                <dd>{event.dates}</dd>
              </div>
            </dl>
          </header>

          {/* Hero media */}
          <MediaFrame
            src={event.heroImage}
            alt={`${event.title} — cover photograph`}
            ratio="video"
            label="COVER PHOTO / VIDEO STILL"
            priority
            sizes="(min-width: 896px) 56rem, 100vw"
            className="rounded-3xl ring-1 ring-black/5 shadow-[0_24px_60px_-24px_rgba(24,24,27,0.25)]"
          />

          {/* Role & summary */}
          <section className="border-t border-hairline pt-10 space-y-3">
            <p className="eyebrow text-muted">Role</p>
            <h2 className="font-display italic font-semibold text-xl sm:text-2xl text-signal">
              {event.role}
            </h2>
            <p className="fluid-body text-zinc-600 leading-relaxed">{event.summary}</p>
          </section>

          {/* Key stats */}
          <section aria-label="Key statistics">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(event.keyStats ?? []).map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-paper border border-hairline p-5"
                >
                  <dd className="font-display italic font-semibold text-2xl xl:text-3xl text-ink tracking-tight tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="text-xs text-zinc-500 mt-1.5 leading-snug">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </section>

          {/* Hardware specs */}
          <section className="border-t border-hairline pt-10 space-y-6">
            <h2 className="font-display font-semibold text-ink fluid-h3">
              Hardware &amp; signal architecture
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Video format", event.specs.format],
                ["Vision mixer", event.specs.visionMixer],
                ["Replay & slow-motion", event.specs.replay],
                ["Master sync & routing", event.specs.syncRouter],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-hairline p-5">
                  <dt className="eyebrow text-muted mb-2">{label}</dt>
                  <dd className="text-sm font-semibold text-ink leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Approach + signal flow */}
          <section className="border-t border-hairline pt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-5">
              <h2 className="font-display font-semibold text-lg text-ink">Technical approach</h2>
              <ul className="space-y-3.5">
                {(event.technicalApproach ?? []).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-signal shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <h2 className="font-display font-semibold text-lg text-ink">Signal flow</h2>
              <ol className="relative space-y-4 before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-px before:bg-zinc-200">
                {(event.signalFlow ?? []).map((step, i) => (
                  <li key={i} className="relative pl-8">
                    <span className="absolute left-0 top-1 w-5 h-5 rounded-full bg-white border border-zinc-300 flex items-center justify-center font-mono text-[9px] font-bold text-signal">
                      {i + 1}
                    </span>
                    <p className="text-sm font-semibold text-ink">{step.step}</p>
                    <p className="text-sm text-zinc-600 leading-relaxed">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Challenges */}
          <section className="border-t border-hairline pt-10 space-y-5">
            <h2 className="font-display font-semibold text-ink fluid-h3">
              Live faults &amp; engineering fixes
            </h2>
            {(event.challengesAndSolutions ?? []).map((item, i) => (
              <article key={i} className="rounded-2xl border border-hairline p-6 sm:p-7 space-y-4">
                <div>
                  <p className="eyebrow text-red-600 mb-1.5">Challenge</p>
                  <p className="text-sm text-zinc-700 leading-relaxed">{item.challenge}</p>
                </div>
                <div>
                  <p className="eyebrow text-emerald-700 mb-1.5">Fix</p>
                  <p className="text-sm text-zinc-700 leading-relaxed">{item.solution}</p>
                </div>
                <div className="pt-1 border-l-2 border-signal pl-4">
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    <strong className="text-ink font-semibold">Impact:</strong> {item.impact}
                  </p>
                </div>
              </article>
            ))}
          </section>

          {/* Video section */}
          <section className="border-t border-hairline pt-10 space-y-5">
            <h2 className="font-display font-semibold text-ink fluid-h3">On-air footage</h2>
            {event.videoUrl ? (
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink ring-1 ring-black/5">
                <iframe
                  src={toEmbedUrl(event.videoUrl)}
                  title={`${event.title} — broadcast footage`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            ) : (
              <div className="relative aspect-video rounded-2xl border border-dashed border-zinc-300 bg-paper flex flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="w-12 h-12 rounded-full bg-white border border-hairline shadow-sm flex items-center justify-center text-zinc-400">
                  <Clapperboard className="w-5 h-5" aria-hidden="true" />
                </span>
                <p className="eyebrow text-zinc-400">Video slot</p>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Set <code className="font-mono">videoUrl</code> for this case study in the CMS to
                  embed footage here.
                </p>
              </div>
            )}
          </section>

          {/* Photo gallery */}
          {(() => {
            const hasGallery = !!event.gallery && event.gallery.length > 0;
            const photos = hasGallery ? event.gallery! : Array.from({ length: 4 }, () => "");

            return (
              <section className="border-t border-hairline pt-10 space-y-5">
                <h2 className="font-display font-semibold text-ink fluid-h3">Production gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {photos.map((photo, i) => (
                    <MediaFrame
                      key={`photo-${i}`}
                      src={photo || undefined}
                      alt={
                        photo
                          ? `${event.title} — behind-the-scenes photo ${i + 1}`
                          : `${event.title} — production photo slot ${i + 1}`
                      }
                      ratio={hasGallery ? (i % 3 === 0 ? "video" : "square") : "video"}
                      label={photo ? undefined : `PRODUCTION PHOTO SLOT ${String(i + 1).padStart(2, "0")}`}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className={`rounded-2xl ring-1 ring-black/5 ${hasGallery && i % 3 === 0 ? "sm:col-span-2" : ""}`}
                    />
                  ))}
                </div>
                {!hasGallery && (
                  <p className="text-xs text-zinc-500">
                    Add paths to the <code className="font-mono">gallery</code> array for this case
                    study in the CMS to replace these slots.
                  </p>
                )}
              </section>
            );
          })()}

          {/* Retrospective */}
          <section className="rounded-2xl bg-paper border border-hairline p-6 sm:p-8">
            <p className="eyebrow text-signal mb-3">What I&apos;d improve next time</p>
            <blockquote className="font-display italic text-lg sm:text-xl text-zinc-700 leading-relaxed">
              “{event.improvementReflection}”
            </blockquote>
          </section>

          {/* Prev / next */}
          <nav
            aria-label="Case study navigation"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-hairline"
          >
            <Link
              href={`/events/${prevEvent.slug}`}
              className="group rounded-2xl border border-hairline hover:border-signal/50 p-5 transition-colors focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
            >
              <span className="eyebrow text-muted flex items-center gap-2 mb-2">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                Previous
              </span>
              <span className="font-display font-semibold text-ink group-hover:text-signal transition-colors block truncate">
                {prevEvent.title}
              </span>
            </Link>

            <Link
              href={`/events/${nextEvent.slug}`}
              className="group rounded-2xl border border-hairline hover:border-signal/50 p-5 transition-colors text-right focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
            >
              <span className="eyebrow text-muted inline-flex items-center gap-2 mb-2">
                Next
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="font-display font-semibold text-ink group-hover:text-signal transition-colors block truncate">
                {nextEvent.title}
              </span>
            </Link>
          </nav>

          {/* Booking banner */}
          <section className="rounded-3xl bg-ink text-white p-8 sm:p-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="space-y-2 max-w-md">
              <h2 className="font-display italic font-semibold text-2xl sm:text-3xl leading-snug">
                Planning a similar production?
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Available for OB truck, CCU, and EVS operations across the UAE and GCC.
              </p>
            </div>

            <Link
              href="/#contact"
              className="shrink-0 px-6 py-3.5 rounded bg-signal hover:bg-signal-deep text-white font-semibold text-sm transition-colors min-h-[50px] inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
            >
              Inquire for dates &amp; roles
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </section>
        </article>
      </main>

      <Footer personalInfo={personalInfo} />

      {/* Floating back-to-top */}
      <BackToTop />
    </div>
  );
}
