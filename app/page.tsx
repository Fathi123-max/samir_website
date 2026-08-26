import React from "react";
import { HomeClient } from "./home-client";
import { PERSONAL_INFO } from "@/lib/data";
import {
  PERSONAL_INFO_QUERY,
  SERVICES_QUERY,
  EVENTS_QUERY,
  SHOWREEL_VIDEOS_QUERY,
  TESTIMONIALS_QUERY,
  FAQ_QUERY,
} from "@/lib/tina-queries";
import {
  SERVICE_TIERS,
  FLAGSHIP_EVENTS,
  SHOWREEL_VIDEOS,
  TESTIMONIALS,
  FAQ_ITEMS,
} from "@/lib/data";

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

      <HomeClient
        personalInfoQuery={PERSONAL_INFO_QUERY}
        personalInfoVariables={{}}
        personalInfoData={PERSONAL_INFO}
        servicesQuery={SERVICES_QUERY}
        servicesVariables={{}}
        servicesData={SERVICE_TIERS}
        eventsQuery={EVENTS_QUERY}
        eventsVariables={{}}
        eventsData={FLAGSHIP_EVENTS}
        showreelQuery={SHOWREEL_VIDEOS_QUERY}
        showreelVariables={{}}
        showreelData={SHOWREEL_VIDEOS}
        testimonialsQuery={TESTIMONIALS_QUERY}
        testimonialsVariables={{}}
        testimonialsData={TESTIMONIALS}
        faqQuery={FAQ_QUERY}
        faqVariables={{}}
        faqData={FAQ_ITEMS}
      />
    </div>
  );
}
