// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "local",
  token: process.env.TINA_TOKEN ?? "local-dev-token",
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  },
  ui: {
    previewUrl: () => "https://samirelgammal.com"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images"
    }
  },
  schema: {
    collections: [
      // ── Homepage (single document, runtime source of truth) ───
      {
        name: "homepage",
        label: "Homepage",
        path: "content/pages",
        format: "json",
        match: { include: "home" },
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => "/"
        },
        fields: [
          // Identity (global)
          {
            type: "object",
            name: "identity",
            label: "Identity",
            fields: [
              { type: "string", name: "name", label: "Full Name", isTitle: true, required: true },
              { type: "string", name: "title", label: "Job Title" },
              { type: "string", name: "subtitle", label: "Subtitle" },
              { type: "string", name: "tagline", label: "Tagline / Intro", ui: { component: "textarea" } },
              { type: "string", name: "portrait", label: "Portrait image path (relative to /public)" },
              { type: "string", name: "showreelUrl", label: "Showreel YouTube/Vimeo embed URL" },
              { type: "number", name: "experienceYears", label: "Years of Experience (floating chip)" },
              { type: "string", name: "uptimePercentage", label: "Uptime Percentage" },
              { type: "string", name: "location", label: "Location" },
              { type: "string", name: "phone", label: "Phone" },
              { type: "string", name: "email", label: "Email" },
              { type: "string", name: "whatsappUrl", label: "WhatsApp URL" },
              { type: "string", name: "workingHours", label: "Working Hours" },
              {
                type: "object",
                name: "socials",
                label: "Social Profiles",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Platform" },
                  { type: "string", name: "url", label: "URL" }
                ]
              },
              { type: "string", name: "degree", label: "Degree" },
              { type: "string", name: "degreeHonors", label: "Degree Honors" },
              { type: "string", name: "statusText", label: "Status Text" },
              { type: "string", name: "statusTextShort", label: "Status Text (Short)" },
              { type: "boolean", name: "statusActive", label: "Status Active" }
            ]
          },
          // Hero
          {
            type: "object",
            name: "hero",
            label: "Hero",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "headline", label: "Headline (before accent)" },
              { type: "string", name: "headlineAccent", label: "Headline Accent (italic)" },
              { type: "string", name: "ctaPrimaryLabel", label: "Primary CTA Label" },
              { type: "string", name: "ctaPrimaryHref", label: "Primary CTA Link", description: "Anchor or URL, e.g. #services" },
              { type: "string", name: "ctaSecondaryLabel", label: "Secondary CTA Label" },
              { type: "string", name: "ctaSecondaryHref", label: "Secondary CTA Link" },
              {
                type: "object",
                name: "stats",
                label: "Stat Row",
                list: true,
                fields: [
                  { type: "string", name: "value", label: "Value (e.g. 18+)" },
                  { type: "string", name: "label", label: "Label (e.g. Years on live broadcast)" }
                ]
              }
            ]
          },
          // Navigation (header)
          {
            type: "object",
            name: "navigation",
            label: "Navigation",
            fields: [
              {
                type: "object",
                name: "items",
                label: "Nav Items",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "href", label: "Link" },
                  { type: "string", name: "id", label: "Section id (scroll-spy)" },
                  { type: "string", name: "index", label: "Number (e.g. 01)" }
                ]
              }
            ]
          },
          // Services section
          {
            type: "object",
            name: "servicesSection",
            label: "Services Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (italic)" },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Service Tiers",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title", ui: { component: "text" } },
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // Events (featured portfolio) section
          {
            type: "object",
            name: "eventsSection",
            label: "Events / Portfolio Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (italic)" },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              { type: "string", name: "categories", label: "Category Filters", list: true },
              {
                type: "string",
                name: "featuredEvents",
                label: "Featured Case Studies",
                description: "File paths of case-study documents to feature, e.g. content/events/<slug>.json",
                list: true
              }
            ]
          },
          // Showreel section
          {
            type: "object",
            name: "showreelSection",
            label: "Showreel Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (italic)" },
              { type: "string", name: "openLabel", label: "Open full showreel label" },
              {
                type: "object",
                name: "videos",
                label: "Showreel Videos",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title", isTitle: true, required: true },
                  { type: "string", name: "caption", label: "Caption" },
                  { type: "string", name: "thumb", label: "Thumbnail image path (relative to /public)" },
                  { type: "string", name: "videoUrl", label: "Video embed URL (YouTube/Vimeo)" }
                ]
              }
            ]
          },
          // Testimonials section
          {
            type: "object",
            name: "testimonialSection",
            label: "Testimonials Section",
            fields: [
              {
                type: "object",
                name: "testimonials",
                label: "Testimonials",
                list: true,
                fields: [
                  { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
                  { type: "string", name: "author", label: "Author" },
                  { type: "string", name: "role", label: "Role" },
                  { type: "string", name: "organization", label: "Organization" },
                  { type: "string", name: "event", label: "Event" },
                  { type: "string", name: "avatarText", label: "Avatar Text (e.g. KM)" }
                ]
              },
              { type: "string", name: "ctaHeading", label: "CTA Banner Heading" },
              { type: "string", name: "ctaBody", label: "CTA Banner Body", ui: { component: "textarea" } },
              { type: "string", name: "ctaLabel", label: "CTA Button Label" },
              { type: "string", name: "ctaHref", label: "CTA Button Link" }
            ]
          },
          // FAQ section
          {
            type: "object",
            name: "faqSection",
            label: "FAQ Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (italic)" },
              { type: "string", name: "body", label: "Body", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "FAQ Items",
                list: true,
                fields: [
                  { type: "string", name: "question", label: "Question", isTitle: true, required: true },
                  { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // Footer section
          {
            type: "object",
            name: "footerSection",
            label: "Footer Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow" },
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent (italic)" },
              { type: "string", name: "ctaLabel", label: "CTA Button Label" }
            ]
          }
        ]
      },
      // ── Case Studies ───────────────────────────────────────────
      {
        name: "event",
        label: "Case Studies",
        path: "content/events",
        format: "json",
        fields: [
          { type: "string", name: "slug", label: "Slug", isTitle: true, required: true },
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "subtitle", label: "Subtitle" },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["Sports", "Summit", "Heritage", "Entertainment", "Combat Sports"]
          },
          { type: "string", name: "venue", label: "Venue" },
          { type: "string", name: "broadcaster", label: "Broadcaster" },
          { type: "string", name: "dates", label: "Dates" },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "heroImage", label: "Hero image path (relative to /public)" },
          { type: "string", name: "gallery", label: "Gallery image paths", list: true },
          { type: "string", name: "videoUrl", label: "Video embed URL (YouTube/Vimeo)" },
          { type: "string", name: "summary", label: "Summary", ui: { component: "textarea" } },
          { type: "number", name: "cameraCount", label: "Camera Count" },
          {
            type: "object",
            name: "specs",
            label: "Technical Specifications",
            fields: [
              { type: "string", name: "format", label: "Format" },
              { type: "string", name: "visionMixer", label: "Vision Mixer" },
              { type: "string", name: "replay", label: "Replay" },
              { type: "string", name: "cameras", label: "Cameras" },
              { type: "string", name: "syncRouter", label: "Sync / Router" },
              { type: "string", name: "audioIntercom", label: "Audio / Intercom" }
            ]
          },
          {
            type: "object",
            name: "keyStats",
            label: "Key Statistics",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "value", label: "Value" }
            ]
          },
          { type: "string", name: "technicalApproach", label: "Technical Approach", list: true },
          {
            type: "object",
            name: "signalFlow",
            label: "Signal Flow",
            list: true,
            fields: [
              { type: "string", name: "step", label: "Step" },
              { type: "string", name: "description", label: "Description" }
            ]
          },
          {
            type: "object",
            name: "challengesAndSolutions",
            label: "Challenges & Solutions",
            list: true,
            fields: [
              { type: "string", name: "challenge", label: "Challenge", ui: { component: "textarea" } },
              { type: "string", name: "solution", label: "Solution", ui: { component: "textarea" } },
              { type: "string", name: "impact", label: "Impact", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "outcomes", label: "Outcomes", list: true },
          { type: "string", name: "improvementReflection", label: "Improvement Reflection", ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "Tags", list: true }
        ]
      },
      // ── Equipment ──────────────────────────────────────────────
      {
        name: "equipment",
        label: "Equipment",
        path: "content/equipment",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Category Name", isTitle: true, required: true },
          { type: "string", name: "iconName", label: "Icon Name (lucide)" },
          { type: "string", name: "description", label: "Description" },
          {
            type: "object",
            name: "items",
            label: "Equipment Items",
            list: true,
            fields: [
              { type: "string", name: "name", label: "Name" },
              { type: "string", name: "model", label: "Model" },
              { type: "string", name: "manufacturer", label: "Manufacturer" },
              { type: "string", name: "role", label: "Role" },
              { type: "string", name: "protocols", label: "Protocols", list: true },
              { type: "number", name: "experienceYears", label: "Years of Experience" },
              { type: "boolean", name: "featured", label: "Featured" }
            ]
          }
        ]
      },
      // ── Timeline ───────────────────────────────────────────────
      {
        name: "timeline",
        label: "Timeline",
        path: "content/timeline",
        format: "json",
        fields: [
          { type: "string", name: "period", label: "Period", isTitle: true, required: true },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "company", label: "Company" },
          { type: "string", name: "location", label: "Location" },
          {
            type: "string",
            name: "type",
            label: "Type",
            options: ["Playout & Studio", "OB & Mobile Unit", "Lead Broadcast Engineer"]
          },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "achievements", label: "Achievements", list: true },
          { type: "string", name: "technologies", label: "Technologies", list: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
