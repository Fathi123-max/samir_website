import React from "react";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BackToTop } from "@/components/BackToTop";
import { PERSONAL_INFO } from "@/lib/data";

// Below-the-fold sections are code-split so the initial JS payload only covers
// the above-the-fold chrome (Header, Hero). SSR stays on: full HTML is
// still delivered for SEO/LCP, only hydration JS is deferred per section.
const Services = dynamic(() => import("@/components/Services").then((m) => m.Services));
const FlagshipEvents = dynamic(() =>
  import("@/components/FlagshipEvents").then((m) => m.FlagshipEvents)
);
const Showreel = dynamic(() =>
  import("@/components/Showreel").then((m) => m.Showreel)
);
const TestimonialBanner = dynamic(() =>
  import("@/components/TestimonialBanner").then((m) => m.TestimonialBanner)
);
const Faq = dynamic(() => import("@/components/Faq").then((m) => m.Faq));
const Footer = dynamic(() => import("@/components/Footer").then((m) => m.Footer));

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: PERSONAL_INFO.title,
    description: PERSONAL_INFO.tagline,
    url: "https://samirelgammal.com",
    telephone: PERSONAL_INFO.phone,
    email: PERSONAL_INFO.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Bachelor of Electrical Engineering – Communication & Electronics",
    },
    knowsAbout: [
      "Video Production",
      "Outside Broadcast (OB) Engineering",
      "CCU Camera Control & Shading (Sony RCP-1500, Grass Valley OCP)",
      "EVS Super Slow-Motion & Live Highlights (XT3 Max, XT-VIA)",
      "Sony MVS-8000X & FOR-A Vision Switchers",
      "Pebble Beach Playout & Studio Automation",
      "Evertz Master Sync (SPG 5600) & Nevion Routing Matrices",
      "Vislink Wireless RF Camera Systems",
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main id="main" className="flex-1 w-full" tabIndex={-1}>
        <Hero />
        <Services />
        <FlagshipEvents />
        <Showreel />
        <TestimonialBanner />
        <Faq />
      </main>

      <Footer />

      {/* Floating back-to-top */}
      <BackToTop />
    </div>
  );
}
