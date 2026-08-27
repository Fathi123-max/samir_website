import React from "react";
import { HomeClient } from "./home-client";
import { getCmsData } from "@/lib/cms";

export const dynamic = "force-static";

export default async function HomePage() {
  const cms = await getCmsData();
  const identity = cms.homepageValue.identity;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: identity.title,
    description: identity.tagline,
    url: "https://samirelgammal.com",
    telephone: identity.phone,
    email: identity.email,
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

      <HomeClient {...cms} />
    </div>
  );
}
