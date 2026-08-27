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

  return (
    <>
      <Header identity={identity} navItems={navItems} />
      <main id="main" className="flex-1 w-full" tabIndex={-1}>
        <Hero identity={identity} hero={hero} />
        <Services services={services} />
        <FlagshipEvents eventsSection={eventsSection} />
        <Showreel identity={identity} showreel={showreel} />
        <TestimonialBanner testimonials={testimonials} />
        <Faq faq={faq} />
      </main>
      <Footer identity={identity} footerSection={footerSection} />
      <BackToTop />
    </>
  );
}
