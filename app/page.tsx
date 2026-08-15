import React from "react";
import dynamic from "next/dynamic";
import { BroadcastHUD } from "@/components/BroadcastHUD";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PERSONAL_INFO } from "@/lib/data";

// Below-the-fold sections are code-split so the initial JS payload only covers
// the above-the-fold chrome (HUD, Header, Hero). SSR stays on: full HTML is
// still delivered for SEO/LCP, only hydration JS is deferred per section.
const About = dynamic(() => import("@/components/About").then((m) => m.About));
const SignalFlowSimulator = dynamic(() =>
  import("@/components/SignalFlowSimulator").then((m) => m.SignalFlowSimulator)
);
const ServicesBento = dynamic(() =>
  import("@/components/ServicesBento").then((m) => m.ServicesBento)
);
const FlagshipEvents = dynamic(() =>
  import("@/components/FlagshipEvents").then((m) => m.FlagshipEvents)
);
const EquipmentRack = dynamic(() =>
  import("@/components/EquipmentRack").then((m) => m.EquipmentRack)
);
const BroadcastCalculator = dynamic(() =>
  import("@/components/BroadcastCalculator").then((m) => m.BroadcastCalculator)
);
const Testimonials = dynamic(() =>
  import("@/components/Testimonials").then((m) => m.Testimonials)
);
const ContactBooking = dynamic(() =>
  import("@/components/ContactBooking").then((m) => m.ContactBooking)
);
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
    <div className="min-h-screen flex flex-col bg-[#07090e] text-slate-100 selection:bg-amber-500 selection:text-black">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Real-Time Broadcast Telemetry HUD */}
      <BroadcastHUD />

      {/* Fixed Sticky Navigation */}
      <Header />

      {/* Main Content Assembly */}
      <main id="main" className="flex-1 w-full" tabIndex={-1}>
        <Hero />
        <About />
        <SignalFlowSimulator />
        <ServicesBento />
        <FlagshipEvents />
        <EquipmentRack />
        <BroadcastCalculator />
        <Testimonials />
        <ContactBooking />
      </main>

      {/* Broadcast Footer */}
      <Footer />
    </div>
  );
}
