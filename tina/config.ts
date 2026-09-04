import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID ?? "local",
  token: process.env.TINA_TOKEN ?? "local-dev-token",

  build: {
    publicFolder: "public",
    outputFolder: "admin",
  },

  ui: {
    previewUrl: () => "https://samirelgammal.com",
  },

  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
    },
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
          router: () => "/",
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
                    ui: {
                      itemProps: (item) => ({
                        label: (item?.label as string) || "Social Profile",
                      }),
                    },
                    fields: [
                      { type: "string", name: "label", label: "Platform" },
                      { type: "string", name: "url", label: "URL" },
                    ],
                  },
              { type: "string", name: "degree", label: "Degree" },
              { type: "string", name: "degreeHonors", label: "Degree Honors" },
              { type: "string", name: "statusText", label: "Status Text" },
              { type: "string", name: "statusTextShort", label: "Status Text (Short)" },
              { type: "boolean", name: "statusActive", label: "Status Active" },
            ],
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
                  { type: "string", name: "label", label: "Label (e.g. Years on live broadcast)" },
                ],
              },
            ],
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
                  { type: "string", name: "index", label: "Number (e.g. 01)" },
                ],
              },
            ],
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
                  { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
                ],
              },
            ],
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
                list: true,
              },
            ],
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
                  { type: "string", name: "videoUrl", label: "Video embed URL (YouTube/Vimeo)" },
                ],
              },
            ],
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
                  { type: "string", name: "avatarText", label: "Avatar Text (e.g. KM)" },
                ],
              },
              { type: "string", name: "ctaHeading", label: "CTA Banner Heading" },
              { type: "string", name: "ctaBody", label: "CTA Banner Body", ui: { component: "textarea" } },
              { type: "string", name: "ctaLabel", label: "CTA Button Label" },
              { type: "string", name: "ctaHref", label: "CTA Button Link" },
            ],
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
                  { type: "string", name: "answer", label: "Answer", ui: { component: "textarea" } },
                ],
              },
            ],
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
              { type: "string", name: "ctaLabel", label: "CTA Button Label" },
              { type: "string", name: "locationHeading", label: "Location heading", description: "e.g. Location" },
              { type: "string", name: "hoursHeading", label: "Working hours heading", description: "e.g. Working hours" },
              { type: "string", name: "callHeading", label: "Call heading", description: "e.g. Call us" },
              { type: "string", name: "socialHeading", label: "Social heading", description: "e.g. Follow Samir Elgammal" },
              { type: "string", name: "copyright", label: "Copyright text", description: "e.g. All rights reserved." },
              { type: "string", name: "tagline", label: "Footer tagline", description: "e.g. Broadcast & Video Production — Dubai" },
            ],
          },

          // Header / branding
          {
            type: "object",
            name: "headerSection",
            label: "Header / Branding",
            fields: [
              { type: "string", name: "logoText", label: "Logo abbreviation", description: "Shown in the header brand mark, e.g. SE" },
              { type: "string", name: "brandSubtitle", label: "Brand subtitle", description: "Shown below name in header, e.g. Broadcast & OB Engineer" },
              { type: "string", name: "ctaLabel", label: "Desktop CTA label", description: "e.g. Start a project" },
              { type: "string", name: "mobileCtaLabel", label: "Mobile CTA label", description: "e.g. Book" },
              { type: "string", name: "drawerSectionsLabel", label: "Drawer sections label", description: "e.g. Sections" },
              { type: "string", name: "drawerContactLabel", label: "Drawer contact label", description: "e.g. Contact" },
              { type: "string", name: "drawerContactIndex", label: "Drawer contact index", description: "e.g. 05" },
              { type: "string", name: "drawerCallLabel", label: "Drawer call button", description: "e.g. Call" },
              { type: "string", name: "drawerWhatsappLabel", label: "Drawer WhatsApp button", description: "e.g. WhatsApp" },
            ],
          },

          // Hero extras
          {
            type: "object",
            name: "heroExtras",
            label: "Hero Extras",
            fields: [
              { type: "string", name: "availableSuffix", label: "Availability suffix", description: "Appended after status text, e.g. — Available" },
              { type: "string", name: "yearsLabel", label: "Years label", description: "e.g. years on-air" },
            ],
          },

          // Event Detail labels
          {
            type: "object",
            name: "eventDetailSection",
            label: "Event Detail Page Labels",
            fields: [
              { type: "string", name: "breadcrumbHome", label: "Breadcrumb: Home", description: "e.g. Home" },
              { type: "string", name: "breadcrumbCaseStudies", label: "Breadcrumb: Case Studies", description: "e.g. Case studies" },
              { type: "string", name: "roleLabel", label: "Role section label", description: "e.g. Role" },
              { type: "string", name: "specsHeading", label: "Hardware specs heading", description: "e.g. Hardware & signal architecture" },
              { type: "string", name: "approachHeading", label: "Technical approach heading", description: "e.g. Technical approach" },
              { type: "string", name: "signalFlowHeading", label: "Signal flow heading", description: "e.g. Signal flow" },
              { type: "string", name: "challengesHeading", label: "Challenges heading", description: "e.g. Live faults & engineering fixes" },
              { type: "string", name: "videoHeading", label: "Video section heading", description: "e.g. On-air footage" },
              { type: "string", name: "galleryHeading", label: "Gallery heading", description: "e.g. Production gallery" },
              { type: "string", name: "reflectionLabel", label: "Reflection label", description: "e.g. What I'd improve next time" },
              { type: "string", name: "bookingHeading", label: "Booking banner heading", description: "e.g. Planning a similar production?" },
              { type: "string", name: "bookingSubtitle", label: "Booking banner subtitle", description: "e.g. Available for OB truck..." },
              { type: "string", name: "bookingCtaLabel", label: "Booking banner CTA", description: "e.g. Inquire for dates & roles" },
              { type: "string", name: "prevLabel", label: "Previous nav label", description: "e.g. Previous" },
              { type: "string", name: "nextLabel", label: "Next nav label", description: "e.g. Next" },
            ],
          },

          // SEO / Metadata
          {
            type: "object",
            name: "meta",
            label: "SEO / Metadata",
            fields: [
              { type: "string", name: "siteTitle", label: "Site title", description: "Browser tab title" },
              { type: "string", name: "siteDescription", label: "Meta description", description: "Shown in search results", ui: { component: "textarea" } },
              { type: "string", name: "ogTitle", label: "OG title", description: "Social sharing title" },
              { type: "string", name: "ogDescription", label: "OG description", description: "Social sharing description", ui: { component: "textarea" } },
              { type: "string", name: "twitterTitle", label: "Twitter title" },
              { type: "string", name: "twitterDescription", label: "Twitter description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Keywords", list: true, description: "SEO keywords" },
            ],
          },

          // Design / Typography / Layout
          {
            type: "object",
            name: "design",
            label: "Design & Typography",
            fields: [
              {
                type: "string",
                name: "fontPreset",
                label: "Font Preset",
                options: [
                  "editorial",
                  "elegant",
                  "modern",
                  "classic",
                  "mono",
                ],
                description: "Switches display + body font pairing",
              },
              { type: "string", name: "headingFontFamily", label: "Heading font override", description: "CSS font-family for headings (leave empty for preset default)" },
              { type: "string", name: "bodyFontFamily", label: "Body font override", description: "CSS font-family for body (leave empty for preset default)" },
              { type: "string", name: "headingWeight", label: "Heading font weight", description: "e.g. 600, 700", options: ["400", "500", "600", "700", "800"] },
              { type: "string", name: "bodyWeight", label: "Body font weight", options: ["300", "400", "500", "600"] },
              {
                type: "object",
                name: "typographyScale",
                label: "Typography Scale",
                fields: [
                  { type: "string", name: "h1Min", label: "H1 min size", description: "e.g. 2.5rem" },
                  { type: "string", name: "h1Max", label: "H1 max size", description: "e.g. 5rem" },
                  { type: "string", name: "h2Min", label: "H2 min size" },
                  { type: "string", name: "h2Max", label: "H2 max size" },
                  { type: "string", name: "h3Min", label: "H3 min size" },
                  { type: "string", name: "h3Max", label: "H3 max size" },
                  { type: "string", name: "bodyMin", label: "Body min size" },
                  { type: "string", name: "bodyMax", label: "Body max size" },
                  { type: "string", name: "bodyLineHeight", label: "Body line height", description: "e.g. 1.7" },
                  { type: "string", name: "headingLineHeight", label: "Heading line height", description: "e.g. 1.1" },
                ],
              },
              {
                type: "object",
                name: "colors",
                label: "Color Palette",
                fields: [
                  { type: "string", name: "canvas", label: "Canvas background", description: "e.g. #f3f7f6" },
                  { type: "string", name: "paper", label: "Paper / card background" },
                  { type: "string", name: "ink", label: "Ink / text color" },
                  { type: "string", name: "muted", label: "Muted text color" },
                  { type: "string", name: "hairline", label: "Border / hairline color" },
                  { type: "string", name: "signal", label: "Signal / accent color" },
                  { type: "string", name: "signalBright", label: "Signal bright (hover)" },
                  { type: "string", name: "signalDeep", label: "Signal deep (pressed)" },
                  { type: "string", name: "signalTint", label: "Signal tint (backgrounds)" },
                ],
              },
              {
                type: "object",
                name: "spacing",
                label: "Spacing & Layout",
                fields: [
                  { type: "string", name: "sectionPaddingY", label: "Section vertical padding", description: "e.g. 5rem" },
                  { type: "string", name: "sectionMaxWidth", label: "Content max width", description: "e.g. 1200px" },
                  { type: "string", name: "borderRadius", label: "Card border radius", description: "e.g. 0.5rem" },
                  { type: "string", name: "cardGap", label: "Card grid gap", description: "e.g. 1.5rem" },
                ],
              },
            ],
          },
        ],
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
            options: ["Sports", "Summit", "Heritage", "Entertainment", "Combat Sports"],
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
              { type: "string", name: "audioIntercom", label: "Audio / Intercom" },
            ],
          },
          {
            type: "object",
            name: "keyStats",
            label: "Key Statistics",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "value", label: "Value" },
            ],
          },
          { type: "string", name: "technicalApproach", label: "Technical Approach", list: true },
          {
            type: "object",
            name: "signalFlow",
            label: "Signal Flow",
            list: true,
            fields: [
              { type: "string", name: "step", label: "Step" },
              { type: "string", name: "description", label: "Description" },
            ],
          },
          {
            type: "object",
            name: "challengesAndSolutions",
            label: "Challenges & Solutions",
            list: true,
            fields: [
              { type: "string", name: "challenge", label: "Challenge", ui: { component: "textarea" } },
              { type: "string", name: "solution", label: "Solution", ui: { component: "textarea" } },
              { type: "string", name: "impact", label: "Impact", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "outcomes", label: "Outcomes", list: true },
          { type: "string", name: "improvementReflection", label: "Improvement Reflection", ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
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
              { type: "boolean", name: "featured", label: "Featured" },
            ],
          },
        ],
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
            options: ["Playout & Studio", "OB & Mobile Unit", "Lead Broadcast Engineer"],
          },
          { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
          { type: "string", name: "achievements", label: "Achievements", list: true },
          { type: "string", name: "technologies", label: "Technologies", list: true },
        ],
      },
    ],
  },
});
