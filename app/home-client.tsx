"use client";

import React, { useMemo } from "react";
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
import type {
  PersonalInfo,
  ServiceTier,
  CaseStudy,
  ShowcaseVideo,
  Testimonial,
  FaqItem,
} from "@/lib/types";

export interface HomeClientProps {
  personalInfoQuery: string;
  personalInfoVariables: Record<string, unknown>;
  personalInfoData: PersonalInfo;
  servicesQuery: string;
  servicesVariables: Record<string, unknown>;
  servicesData: ServiceTier[];
  eventsQuery: string;
  eventsVariables: Record<string, unknown>;
  eventsData: CaseStudy[];
  showreelQuery: string;
  showreelVariables: Record<string, unknown>;
  showreelData: ShowcaseVideo[];
  testimonialsQuery: string;
  testimonialsVariables: Record<string, unknown>;
  testimonialsData: Testimonial[];
  faqQuery: string;
  faqVariables: Record<string, unknown>;
  faqData: FaqItem[];
}

export function HomeClient({
  personalInfoQuery,
  personalInfoVariables,
  personalInfoData,
  servicesQuery,
  servicesVariables,
  servicesData,
  eventsQuery,
  eventsVariables,
  eventsData,
  showreelQuery,
  showreelVariables,
  showreelData,
  testimonialsQuery,
  testimonialsVariables,
  testimonialsData,
  faqQuery,
  faqVariables,
  faqData,
}: HomeClientProps) {
  // Memoize all Tina data objects to avoid infinite re-renders
  const servicesTinaData = useMemo(
    () => ({
      serviceConnection: {
        edges: servicesData.map((s) => ({ node: { data: s, id: `service-${s.id}` } })),
      },
    }),
    [servicesData]
  );

  const eventsTinaData = useMemo(
    () => ({
      eventConnection: {
        edges: eventsData.map((e) => ({ node: { data: e, id: `event-${e.slug}` } })),
      },
    }),
    [eventsData]
  );

  const showreelTinaData = useMemo(
    () => ({
      showreelVideoConnection: {
        edges: showreelData.map((v) => ({ node: { data: v, id: `showreel-${v.id}` } })),
      },
    }),
    [showreelData]
  );

  const testimonialsTinaData = useMemo(
    () => ({
      testimonialConnection: {
        edges: testimonialsData.map((t) => ({ node: { data: t, id: `testimonial-${t.id}` } })),
      },
    }),
    [testimonialsData]
  );

  const faqTinaData = useMemo(
    () => ({
      faqConnection: {
        edges: faqData.map((f) => ({ node: { data: f, id: `faq-${f.id}` } })),
      },
    }),
    [faqData]
  );

  const { data: pi } = useTina({
    query: personalInfoQuery,
    variables: personalInfoVariables,
    data: personalInfoData,
  });

  const { data: svc } = useTina({
    query: servicesQuery,
    variables: servicesVariables,
    data: servicesTinaData,
  });

  const { data: ev } = useTina({
    query: eventsQuery,
    variables: eventsVariables,
    data: eventsTinaData,
  });

  const { data: sr } = useTina({
    query: showreelQuery,
    variables: showreelVariables,
    data: showreelTinaData,
  });

  const { data: tm } = useTina({
    query: testimonialsQuery,
    variables: testimonialsVariables,
    data: testimonialsTinaData,
  });

  const { data: fq } = useTina({
    query: faqQuery,
    variables: faqVariables,
    data: faqTinaData,
  });

  // Extract live data from Tina responses
  const personalInfo = pi as PersonalInfo;
  const services: ServiceTier[] = svc?.serviceConnection?.edges?.map((e: { node: { data: ServiceTier } }) => e.node.data) ?? servicesData;
  const events: CaseStudy[] = ev?.eventConnection?.edges?.map((e: { node: { data: CaseStudy } }) => e.node.data) ?? eventsData;
  const showreelVideos: ShowcaseVideo[] = sr?.showreelVideoConnection?.edges?.map((e: { node: { data: ShowcaseVideo } }) => e.node.data) ?? showreelData;
  const testimonials: Testimonial[] = tm?.testimonialConnection?.edges?.map((e: { node: { data: Testimonial } }) => e.node.data) ?? testimonialsData;
  const faqItems: FaqItem[] = fq?.faqConnection?.edges?.map((e: { node: { data: FaqItem } }) => e.node.data) ?? faqData;

  return (
    <>
      <Header personalInfo={personalInfo} />
      <main id="main" className="flex-1 w-full" tabIndex={-1}>
        <Hero personalInfo={personalInfo} />
        <Services services={services} />
        <FlagshipEvents events={events} />
        <Showreel personalInfo={personalInfo} videos={showreelVideos} />
        <TestimonialBanner testimonials={testimonials} />
        <Faq items={faqItems} />
      </main>
      <Footer personalInfo={personalInfo} />
      <BackToTop />
    </>
  );
}
