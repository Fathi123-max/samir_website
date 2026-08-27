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
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images"
    }
  },
  schema: {
    collections: [
      // ── Personal Info (singleton) ──────────────────────────────
      {
        name: "personalInfo",
        label: "Personal Info",
        path: "content",
        format: "json",
        match: { include: "personalInfo" },
        fields: [
          { type: "string", name: "name", label: "Full Name" },
          { type: "string", name: "title", label: "Title" },
          { type: "string", name: "subtitle", label: "Subtitle" },
          { type: "string", name: "heroHeadline", label: "Hero Headline" },
          { type: "string", name: "tagline", label: "Tagline", ui: { component: "textarea" } },
          { type: "string", name: "portrait", label: "Portrait image path (relative to /public)" },
          { type: "string", name: "showreelUrl", label: "Showreel YouTube/Vimeo embed URL" },
          { type: "number", name: "experienceYears", label: "Years of Experience" },
          { type: "number", name: "eventsCount", label: "Events Count" },
          { type: "number", name: "broadcastersCount", label: "Broadcasters Count" },
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
      // ── Services ───────────────────────────────────────────────
      {
        name: "service",
        label: "Services",
        path: "content/services",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } }
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
      },
      // ── Testimonials ───────────────────────────────────────────
      {
        name: "testimonial",
        label: "Testimonials",
        path: "content/testimonials",
        format: "json",
        fields: [
          { type: "string", name: "quote", label: "Quote", isTitle: true, required: true, ui: { component: "textarea" } },
          { type: "string", name: "author", label: "Author" },
          { type: "string", name: "role", label: "Role" },
          { type: "string", name: "organization", label: "Organization" },
          { type: "string", name: "event", label: "Event" },
          { type: "string", name: "avatarText", label: "Avatar Text (e.g. KM)" }
        ]
      },
      // ── Showreel Videos ────────────────────────────────────────
      {
        name: "showreelVideo",
        label: "Showreel Videos",
        path: "content/showreel",
        format: "json",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "caption", label: "Caption" },
          { type: "string", name: "thumb", label: "Thumbnail image path (relative to /public)" },
          { type: "string", name: "videoUrl", label: "Video embed URL (YouTube/Vimeo)" }
        ]
      },
      // ── FAQ ────────────────────────────────────────────────────
      {
        name: "faq",
        label: "FAQ",
        path: "content/faq",
        format: "json",
        fields: [
          { type: "string", name: "question", label: "Question", isTitle: true, required: true },
          { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
