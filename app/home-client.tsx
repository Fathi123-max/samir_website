"use client";

import React from "react";
import { useTina } from "tinacms/dist/react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BackToTop } from "@/components/BackToTop";
import { Services } from "@/components/Services";
import { FlagshipEvents } from "@/components/FlagshipEvents";
import { Showreel } from "@/components/Showreel";
import { TestimonialBanner } from "@/components/TestimonialBanner";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import type { Homepage } from "@/lib/types";
import type { TinaTuple } from "@/lib/cms";

export interface HomeClientProps {
  homepage: TinaTuple<{ homepage: Homepage }>;
  homepageValue: Homepage;
}

export function HomeClient(props: HomeClientProps) {
  const homepageTina = useTina({
    ...props.homepage,
    experimental___selectFormByFormId: () => "content/pages/home.json",
  });

  const rawHome = homepageTina.data?.homepage ?? props.homepageValue;
  const base = props.homepageValue;

  // `featuredEvents` on the raw data is a plain list of event file paths; the server-resolved
  // CaseStudy[] (base) is authoritative and preserved so re-hydration never wipes it.
  const homepage: Homepage = {
    ...base,
    ...(rawHome as Homepage),
    eventsSection: {
      ...base.eventsSection,
      ...(rawHome.eventsSection as Homepage["eventsSection"] | undefined),
      featuredEvents: base.eventsSection.featuredEvents,
    },
  };

  const identity = homepage.identity;
  const hero = homepage.hero;
  const navItems = homepage.navigation.items;
  const services = homepage.servicesSection;
  const eventsSection = homepage.eventsSection;
  const showreel = homepage.showreelSection;
  const testimonials = homepage.testimonialSection;
  const faq = homepage.faqSection;
  const footerSection = homepage.footerSection;
  const headerSection = homepage.headerSection;
  const heroExtras = homepage.heroExtras;
  const design = homepage.design;

  // Resolve font-display family based on fontPreset or explicit override
  const fontDisplayMap: Record<string, string> = {
    editorial: "var(--font-fraunces), Georgia, serif",
    modern: "var(--font-outfit), system-ui, sans-serif",
    elegant: "var(--font-playfair), Georgia, serif",
    classic: "var(--font-space-grotesk), system-ui, sans-serif",
    humanist: "var(--font-dm-sans), system-ui, sans-serif",
    mono: "var(--font-jetbrains-mono), monospace",
  };

  const activeDisplayFont =
    design?.headingFontFamily ||
    fontDisplayMap[design?.fontPreset || "editorial"] ||
    fontDisplayMap.editorial;

  const dynamicStyles: Record<string, string> = {
    "--font-display": activeDisplayFont,
  };

  if (design?.headingWeight) {
    dynamicStyles["--heading-weight"] = design.headingWeight;
  }
  if (design?.bodyWeight) {
    dynamicStyles["--body-weight"] = design.bodyWeight;
  }
  if (design?.colors?.canvas) {
    dynamicStyles["--color-canvas"] = design.colors.canvas;
    dynamicStyles["--bg-main"] = design.colors.canvas;
  }
  if (design?.colors?.paper) {
    dynamicStyles["--color-paper"] = design.colors.paper;
    dynamicStyles["--bg-paper"] = design.colors.paper;
  }
  if (design?.colors?.ink) {
    dynamicStyles["--color-ink"] = design.colors.ink;
    dynamicStyles["--ink"] = design.colors.ink;
  }
  if (design?.colors?.muted) {
    dynamicStyles["--color-muted"] = design.colors.muted;
    dynamicStyles["--muted"] = design.colors.muted;
  }
  if (design?.colors?.hairline) {
    dynamicStyles["--color-hairline"] = design.colors.hairline;
    dynamicStyles["--hairline"] = design.colors.hairline;
  }
  if (design?.colors?.signal) {
    dynamicStyles["--color-signal"] = design.colors.signal;
    dynamicStyles["--signal"] = design.colors.signal;
  }
  if (design?.colors?.signalBright) {
    dynamicStyles["--color-signal-bright"] = design.colors.signalBright;
  }
  if (design?.colors?.signalDeep) {
    dynamicStyles["--color-signal-deep"] = design.colors.signalDeep;
  }
  if (design?.colors?.signalTint) {
    dynamicStyles["--color-signal-tint"] = design.colors.signalTint;
  }
  if (design?.spacing?.borderRadius) {
    dynamicStyles["--card-radius"] = design.spacing.borderRadius;
  }

  return (
    <div style={dynamicStyles as React.CSSProperties} className="contents">
      <Header identity={identity} navItems={navItems} headerSection={headerSection} />
      <main id="main" className="flex-1 w-full" tabIndex={-1}>
        <Hero identity={identity} hero={hero} heroExtras={heroExtras} />
        <Services services={services} />
        <FlagshipEvents eventsSection={eventsSection} />
        <Showreel identity={identity} showreel={showreel} />
        <TestimonialBanner testimonials={testimonials} />
        <Faq faq={faq} />
      </main>
      <Footer identity={identity} footerSection={footerSection} />
      <BackToTop />
    </div>
  );
}
