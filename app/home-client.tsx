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
import type {
  PersonalInfo,
  ServiceTier,
  CaseStudy,
  ShowcaseVideo,
  Testimonial,
  FaqItem,
} from "@/lib/types";
import type { TinaTuple } from "@/lib/cms";

type TinaNode = {
  _sys?: { filename?: string };
  __typename?: string;
  id?: string;
} & Record<string, unknown>;

const flatten = (root: unknown): TinaNode[] => {
  const edges = (root as { edges?: { node?: TinaNode }[] })?.edges ?? [];
  return edges.map((e) => e.node).filter((n): n is TinaNode => !!n);
};

export interface HomeClientProps {
  personalInfo: TinaTuple<{ personalInfo: PersonalInfo }>;
  services: TinaTuple<{ serviceConnection: unknown }>;
  events: TinaTuple<{ eventConnection: unknown }>;
  showreel: TinaTuple<{ showreelVideoConnection: unknown }>;
  testimonials: TinaTuple<{ testimonialConnection: unknown }>;
  faq: TinaTuple<{ faqConnection: unknown }>;
  personalInfoValue: PersonalInfo;
  servicesValue: ServiceTier[];
  eventsValue: CaseStudy[];
  showreelValue: ShowcaseVideo[];
  testimonialsValue: Testimonial[];
  faqValue: FaqItem[];
}

export function HomeClient(props: HomeClientProps) {
  const personalInfoTina = useTina(props.personalInfo);
  const servicesTina = useTina(props.services);
  const eventsTina = useTina(props.events);
  const showreelTina = useTina(props.showreel);
  const testimonialsTina = useTina(props.testimonials);
  const faqTina = useTina(props.faq);

  const personalInfo: PersonalInfo =
    personalInfoTina.data?.personalInfo ?? props.personalInfoValue;

  const services: ServiceTier[] = flatten(servicesTina.data?.serviceConnection).map((n) => ({
    id: n._sys?.filename ?? "",
    title: String(n.title ?? ""),
    description: String(n.description ?? ""),
  }));

  const events: CaseStudy[] = flatten(eventsTina.data?.eventConnection).map((n) => {
    const copy = { ...n };
    delete copy._sys;
    delete copy.__typename;
    delete copy.id;
    return copy as unknown as CaseStudy;
  });

  const showreelVideos: ShowcaseVideo[] = flatten(showreelTina.data?.showreelVideoConnection).map(
    (n) => ({
      id: n._sys?.filename ?? "",
      title: String(n.title ?? ""),
      caption: String(n.caption ?? ""),
      thumb: (n.thumb as string | undefined) ?? "",
      videoUrl: (n.videoUrl as string | undefined) ?? "",
    })
  );

  const testimonials: Testimonial[] = flatten(
    testimonialsTina.data?.testimonialConnection
  ).map((n) => ({
    id: n._sys?.filename ?? "",
    quote: String(n.quote ?? ""),
    author: String(n.author ?? ""),
    role: String(n.role ?? ""),
    organization: String(n.organization ?? ""),
    event: String(n.event ?? ""),
    avatarText: String(n.avatarText ?? ""),
  }));

  const faqItems: FaqItem[] = flatten(faqTina.data?.faqConnection).map((n) => ({
    id: n._sys?.filename ?? "",
    question: String(n.question ?? ""),
    answer: String(n.answer ?? ""),
  }));

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
