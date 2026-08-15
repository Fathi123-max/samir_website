import React from "react";
import { BroadcastHUD } from "@/components/BroadcastHUD";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { SignalFlowSimulator } from "@/components/SignalFlowSimulator";
import { ServicesBento } from "@/components/ServicesBento";
import { FlagshipEvents } from "@/components/FlagshipEvents";
import { EquipmentRack } from "@/components/EquipmentRack";
import { BroadcastCalculator } from "@/components/BroadcastCalculator";
import { Testimonials } from "@/components/Testimonials";
import { ContactBooking } from "@/components/ContactBooking";
import { Footer } from "@/components/Footer";
import { PERSONAL_INFO } from "@/lib/data";

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
