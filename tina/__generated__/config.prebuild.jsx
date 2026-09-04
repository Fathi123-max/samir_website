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
            label: "Identity & Profile",
            fields: [
              { type: "string", name: "name", label: "Full Name", isTitle: true, required: true },
              { type: "string", name: "title", label: "Primary Job Title" },
              { type: "string", name: "subtitle", label: "Secondary Subtitle / Specialization" },
              { type: "string", name: "tagline", label: "Tagline / Bio Intro", ui: { component: "textarea" } },
              { type: "image", name: "portrait", label: "Hero Portrait Image (Select from Media Library)" },
              { type: "string", name: "showreelUrl", label: "Showreel YouTube or Vimeo Embed URL" },
              { type: "number", name: "experienceYears", label: "Years of Experience (Floating Badge)" },
              { type: "string", name: "uptimePercentage", label: "Uptime SLA / Percentage (e.g. 99.98%)" },
              { type: "string", name: "location", label: "Location (e.g. Dubai, United Arab Emirates)" },
              { type: "string", name: "phone", label: "Direct Phone Number (e.g. +971 50 563 9015)" },
              { type: "string", name: "email", label: "Professional Email Address" },
              { type: "string", name: "whatsappUrl", label: "WhatsApp Direct Chat Link" },
              { type: "string", name: "workingHours", label: "Working / Operational Hours" },
              {
                type: "object",
                name: "socials",
                label: "Social Media & Professional Profiles",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label || "Social Profile"
                  })
                },
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Platform Name",
                    options: ["LinkedIn", "WhatsApp", "GitHub", "YouTube", "Vimeo", "X (Twitter)", "Facebook", "Instagram", "Behance"]
                  },
                  { type: "string", name: "url", label: "Profile / Channel URL" }
                ]
              },
              { type: "string", name: "degree", label: "Academic Degree" },
              { type: "string", name: "degreeHonors", label: "Degree Honors / Distinction" },
              { type: "string", name: "statusText", label: "Availability Status Text (Long)" },
              { type: "string", name: "statusTextShort", label: "Availability Badge (Short Header Tag)" },
              { type: "boolean", name: "statusActive", label: "Availability Beacon Active (Pulsing Green Light)" }
            ]
          },
          // Hero
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Eyebrow Pre-Title (Mono Label)" },
              { type: "string", name: "headline", label: "Headline (Lead Words)" },
              { type: "string", name: "headlineAccent", label: "Headline Accent (Italicized & Highlighted)" },
              { type: "string", name: "ctaPrimaryLabel", label: "Primary Action Button Label" },
              { type: "string", name: "ctaPrimaryHref", label: "Primary Action Button Link (e.g. #services)" },
              { type: "string", name: "ctaSecondaryLabel", label: "Secondary Action Button Label" },
              { type: "string", name: "ctaSecondaryHref", label: "Secondary Action Button Link (e.g. #events)" },
              {
                type: "object",
                name: "stats",
                label: "Key Metrics Row",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.value ? `${item.value} \u2014 ${item.label || "Stat"}` : "Metric Item"
                  })
                },
                fields: [
                  { type: "string", name: "value", label: "Metric Value (e.g. 18+, 150+, 99.99%)" },
                  { type: "string", name: "label", label: "Metric Description" }
                ]
              }
            ]
          },
          // Navigation (header)
          {
            type: "object",
            name: "navigation",
            label: "Header Navigation",
            fields: [
              {
                type: "object",
                name: "items",
                label: "Menu Links",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.label ? `${item.index ? item.index + " " : ""}${item.label}` : "Nav Item"
                  })
                },
                fields: [
                  { type: "string", name: "label", label: "Link Display Name" },
                  { type: "string", name: "href", label: "Destination Anchor (#id) or URL" },
                  { type: "string", name: "id", label: "Section Scroll-Spy ID (matches anchor)" },
                  { type: "string", name: "index", label: "Index Number (e.g. 01, 02)" }
                ]
              }
            ]
          },
          // Services section
          {
            type: "object",
            name: "servicesSection",
            label: "Services & Capabilities Section",
            fields: [
              {
                type: "boolean",
                name: "visible",
                label: "Section Visibility",
                description: "Toggle on to display this section, or off to hide it",
                ui: {
                  component: "toggle",
                  toggleLabels: { true: "Visible", false: "Hidden" }
                }
              },
              { type: "string", name: "eyebrow", label: "Section Eyebrow (e.g. 01 \xB7 Services)" },
              { type: "string", name: "heading", label: "Section Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent Word" },
              { type: "string", name: "body", label: "Introductory Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Service Offering Cards",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.title || "Service Card"
                  })
                },
                fields: [
                  { type: "string", name: "title", label: "Service Title", ui: { component: "text" } },
                  { type: "string", name: "description", label: "Detailed Description", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // Events (featured portfolio) section
          {
            type: "object",
            name: "eventsSection",
            label: "Flagship Portfolio / Case Studies Section",
            fields: [
              {
                type: "boolean",
                name: "visible",
                label: "Section Visibility",
                description: "Toggle on to display this section, or off to hide it",
                ui: {
                  component: "toggle",
                  toggleLabels: { true: "Visible", false: "Hidden" }
                }
              },
              { type: "string", name: "eyebrow", label: "Section Eyebrow (e.g. 02 \xB7 Flagship Productions)" },
              { type: "string", name: "heading", label: "Section Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent Word" },
              { type: "string", name: "body", label: "Section Subtitle", ui: { component: "textarea" } },
              {
                type: "string",
                name: "categories",
                label: "Category Filter Tabs",
                list: true,
                description: "Tabs shown to filter events (e.g. Sports, Summit, Heritage, Entertainment)"
              },
              {
                type: "string",
                name: "featuredEvents",
                label: "Featured Case Studies Ordered List",
                description: "File paths of case-study documents to feature on homepage (e.g. content/events/cop28-expo-city-dubai.json)",
                list: true
              }
            ]
          },
          // Showreel section
          {
            type: "object",
            name: "showreelSection",
            label: "Showreel & Video Gallery Section",
            fields: [
              {
                type: "boolean",
                name: "visible",
                label: "Section Visibility",
                description: "Toggle on to display this section, or off to hide it",
                ui: {
                  component: "toggle",
                  toggleLabels: { true: "Visible", false: "Hidden" }
                }
              },
              { type: "string", name: "eyebrow", label: "Section Eyebrow (e.g. 03 \xB7 Showreel)" },
              { type: "string", name: "heading", label: "Section Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent Word" },
              { type: "string", name: "openLabel", label: "Watch Showreel Button Text" },
              {
                type: "object",
                name: "videos",
                label: "Showcase Video Clips",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.title || "Showreel Clip"
                  })
                },
                fields: [
                  { type: "string", name: "title", label: "Video Title", isTitle: true, required: true },
                  { type: "string", name: "caption", label: "Production Caption / Venue" },
                  { type: "image", name: "thumb", label: "Poster Thumbnail (Media Picker)" },
                  { type: "string", name: "videoUrl", label: "YouTube or Vimeo Video Link" }
                ]
              }
            ]
          },
          // Testimonials section
          {
            type: "object",
            name: "testimonialSection",
            label: "Testimonials & Client Endorsements",
            fields: [
              {
                type: "boolean",
                name: "visible",
                label: "Section Visibility",
                description: "Toggle on to display this section, or off to hide it",
                ui: {
                  component: "toggle",
                  toggleLabels: { true: "Visible", false: "Hidden" }
                }
              },
              {
                type: "object",
                name: "testimonials",
                label: "Client Quotes & Reviews",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.author ? `${item.author} (${item.organization || "Endorsement"})` : "Review Item"
                  })
                },
                fields: [
                  { type: "string", name: "quote", label: "Endorsement Quote", ui: { component: "textarea" } },
                  { type: "string", name: "author", label: "Client / Colleague Name" },
                  { type: "string", name: "role", label: "Professional Role" },
                  { type: "string", name: "organization", label: "Company / Network / Broadcaster" },
                  { type: "string", name: "event", label: "Associated Event / Production" },
                  { type: "string", name: "avatarText", label: "Avatar Initials (e.g. SE)" }
                ]
              },
              { type: "string", name: "ctaHeading", label: "CTA Banner Headline" },
              { type: "string", name: "ctaBody", label: "CTA Banner Supporting Text", ui: { component: "textarea" } },
              { type: "string", name: "ctaLabel", label: "CTA Banner Button Label" },
              { type: "string", name: "ctaHref", label: "CTA Banner Button Link" }
            ]
          },
          // FAQ section
          {
            type: "object",
            name: "faqSection",
            label: "Frequently Asked Questions (FAQ)",
            fields: [
              {
                type: "boolean",
                name: "visible",
                label: "Section Visibility",
                description: "Toggle on to display this section, or off to hide it",
                ui: {
                  component: "toggle",
                  toggleLabels: { true: "Visible", false: "Hidden" }
                }
              },
              { type: "string", name: "eyebrow", label: "Section Eyebrow (e.g. 04 \xB7 FAQ)" },
              { type: "string", name: "heading", label: "Section Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent Word" },
              { type: "string", name: "body", label: "Section Description", ui: { component: "textarea" } },
              {
                type: "object",
                name: "items",
                label: "Questions & Answers",
                list: true,
                ui: {
                  itemProps: (item) => ({
                    label: item?.question || "FAQ Item"
                  })
                },
                fields: [
                  { type: "string", name: "question", label: "Question Title", isTitle: true, required: true },
                  { type: "string", name: "answer", label: "Detailed Answer", ui: { component: "textarea" } }
                ]
              }
            ]
          },
          // Footer section
          {
            type: "object",
            name: "footerSection",
            label: "Footer & Contact Section",
            fields: [
              { type: "string", name: "eyebrow", label: "Section Eyebrow (e.g. 05 \xB7 Contact)" },
              { type: "string", name: "heading", label: "Footer Heading" },
              { type: "string", name: "headingAccent", label: "Heading Accent Word" },
              { type: "string", name: "ctaLabel", label: "Direct Action Button Label" },
              { type: "string", name: "locationHeading", label: "Location Label Heading" },
              { type: "string", name: "hoursHeading", label: "Working Hours Heading" },
              { type: "string", name: "callHeading", label: "Call Heading" },
              { type: "string", name: "socialHeading", label: "Social Media Block Heading" },
              { type: "string", name: "copyright", label: "Copyright Notice" },
              { type: "string", name: "tagline", label: "Footer Tagline" }
            ]
          },
          // Header / branding
          {
            type: "object",
            name: "headerSection",
            label: "Header & Brand Bar",
            fields: [
              { type: "string", name: "logoText", label: "Logo Monogram (e.g. SE)" },
              { type: "string", name: "brandSubtitle", label: "Brand Subtitle (Below Name)" },
              { type: "string", name: "ctaLabel", label: "Desktop Header Action Button Label" },
              { type: "string", name: "mobileCtaLabel", label: "Mobile Header Action Button Label" },
              { type: "string", name: "drawerSectionsLabel", label: "Mobile Navigation Drawer Header" },
              { type: "string", name: "drawerContactLabel", label: "Mobile Drawer Contact Header" },
              { type: "string", name: "drawerContactIndex", label: "Mobile Drawer Contact Index (e.g. 05)" },
              { type: "string", name: "drawerCallLabel", label: "Mobile Drawer Quick Call Button" },
              { type: "string", name: "drawerWhatsappLabel", label: "Mobile Drawer Quick WhatsApp Button" }
            ]
          },
          // Hero extras
          {
            type: "object",
            name: "heroExtras",
            label: "Hero Extra Badges",
            fields: [
              { type: "string", name: "availableSuffix", label: "Availability Suffix (e.g. \u2014 Available)" },
              { type: "string", name: "yearsLabel", label: "Years Experience Label (e.g. years on-air)" }
            ]
          },
          // Event Detail labels
          {
            type: "object",
            name: "eventDetailSection",
            label: "Case Study Detail Page Labels",
            fields: [
              { type: "string", name: "breadcrumbHome", label: "Breadcrumb: Home" },
              { type: "string", name: "breadcrumbCaseStudies", label: "Breadcrumb: Case Studies" },
              { type: "string", name: "roleLabel", label: "Role Badge Label" },
              { type: "string", name: "specsHeading", label: "Hardware & Specs Heading" },
              { type: "string", name: "approachHeading", label: "Technical Approach Heading" },
              { type: "string", name: "signalFlowHeading", label: "Signal Flow Diagram Heading" },
              { type: "string", name: "challengesHeading", label: "Challenges & Engineering Fixes Heading" },
              { type: "string", name: "videoHeading", label: "On-Air Footage Heading" },
              { type: "string", name: "galleryHeading", label: "Production Gallery Heading" },
              { type: "string", name: "reflectionLabel", label: "Retrospective Reflection Label" },
              { type: "string", name: "bookingHeading", label: "Inquiry Banner Headline" },
              { type: "string", name: "bookingSubtitle", label: "Inquiry Banner Subtitle" },
              { type: "string", name: "bookingCtaLabel", label: "Inquiry Banner Action Button Label" },
              { type: "string", name: "prevLabel", label: "Previous Project Link Text" },
              { type: "string", name: "nextLabel", label: "Next Project Link Text" }
            ]
          },
          // SEO / Metadata
          {
            type: "object",
            name: "meta",
            label: "SEO & Search Engine Metadata",
            fields: [
              { type: "string", name: "siteTitle", label: "Global Browser Tab Title" },
              { type: "string", name: "siteDescription", label: "Search Engine Description (Snippet)", ui: { component: "textarea" } },
              { type: "string", name: "ogTitle", label: "Open Graph (Facebook / LinkedIn) Title" },
              { type: "string", name: "ogDescription", label: "Open Graph Description", ui: { component: "textarea" } },
              { type: "string", name: "twitterTitle", label: "Twitter / X Card Title" },
              { type: "string", name: "twitterDescription", label: "Twitter / X Card Description", ui: { component: "textarea" } },
              { type: "string", name: "keywords", label: "Search Engine Keywords", list: true }
            ]
          },
          // Design / Typography / Theme Engine
          {
            type: "object",
            name: "design",
            label: "Design, Typography & Color Palette",
            fields: [
              {
                type: "string",
                name: "themePreset",
                label: "Atmosphere & Color Theme Preset",
                description: "Instantly switch the color personality of the entire website",
                options: [
                  { label: "Signature Mint & Slate (#239ba7 / #f3f7f6)", value: "mint" },
                  { label: "Warm Editorial & Signal Orange (#ea580c / #faf9f7)", value: "amber" },
                  { label: "Cyber Tech & Electric Cyan (#06b6d4 / #0f172a)", value: "cyber" },
                  { label: "Broadcast Master Emerald (#059669 / #f0fdf4)", value: "emerald" },
                  { label: "Monochrome & Ink (#18181b / #ffffff)", value: "monochrome" }
                ],
                ui: {
                  component: "select"
                }
              },
              {
                type: "string",
                name: "fontPreset",
                label: "Typography & Font Preset",
                options: [
                  { label: "Editorial (Fraunces Display Serif + Inter)", value: "editorial" },
                  { label: "Modern Geometric (Outfit + Inter)", value: "modern" },
                  { label: "High Fashion / Luxury (Playfair Display + Inter)", value: "elegant" },
                  { label: "Tech / Cyber (Space Grotesk + Inter)", value: "classic" },
                  { label: "Clean Humanist (DM Sans + Inter)", value: "humanist" },
                  { label: "Terminal / Engineer (JetBrains Mono)", value: "mono" }
                ],
                description: "Switches heading display font and typography atmosphere across the site"
              },
              { type: "string", name: "headingFontFamily", label: "Custom Heading Font Override", description: "Direct CSS font-family string (leave empty for preset default)" },
              { type: "string", name: "bodyFontFamily", label: "Custom Body Font Override", description: "Direct CSS font-family string (leave empty for preset default)" },
              {
                type: "string",
                name: "headingWeight",
                label: "Heading Font Weight",
                options: [
                  { label: "400 - Normal", value: "400" },
                  { label: "500 - Medium", value: "500" },
                  { label: "600 - Semi-Bold", value: "600" },
                  { label: "700 - Bold", value: "700" },
                  { label: "800 - Extra Bold", value: "800" }
                ]
              },
              {
                type: "string",
                name: "bodyWeight",
                label: "Body Font Weight",
                options: [
                  { label: "300 - Light", value: "300" },
                  { label: "400 - Normal", value: "400" },
                  { label: "500 - Medium", value: "500" },
                  { label: "600 - Semi-Bold", value: "600" }
                ]
              },
              {
                type: "string",
                name: "buttonShape",
                label: "Button & Badge Curvature",
                description: "Choose the curvature of buttons and interactive badges",
                options: [
                  { label: "Full Pill", value: "pill" },
                  { label: "Modern Clean (0.5rem)", value: "rounded" },
                  { label: "Sharp Technical (0.125rem)", value: "sharp" }
                ],
                ui: {
                  component: "radio-group",
                  direction: "horizontal"
                }
              },
              {
                type: "string",
                name: "cardStyle",
                label: "Card Elevation & Hover",
                description: "Visual response when hovering cards",
                options: [
                  { label: "Lift & Elevation Shadow", value: "lift" },
                  { label: "Accent Border Glow", value: "border-glow" },
                  { label: "Minimal Hairline", value: "minimal" }
                ],
                ui: {
                  component: "select"
                }
              },
              {
                type: "boolean",
                name: "showBackdropMesh",
                label: "Ambient Background Mesh & Dots",
                ui: {
                  component: "toggle",
                  toggleLabels: { true: "Active", false: "Off" }
                }
              },
              {
                type: "object",
                name: "typographyScale",
                label: "Typography Scaling (Fluid Rem)",
                fields: [
                  { type: "string", name: "h1Min", label: "H1 Minimum Size (e.g. 2.5rem)" },
                  { type: "string", name: "h1Max", label: "H1 Maximum Size (e.g. 5rem)" },
                  { type: "string", name: "h2Min", label: "H2 Minimum Size (e.g. 1.8rem)" },
                  { type: "string", name: "h2Max", label: "H2 Maximum Size (e.g. 3.25rem)" },
                  { type: "string", name: "h3Min", label: "H3 Minimum Size (e.g. 1.3rem)" },
                  { type: "string", name: "h3Max", label: "H3 Maximum Size (e.g. 2rem)" },
                  { type: "string", name: "bodyMin", label: "Body Minimum Size (e.g. 1.05rem)" },
                  { type: "string", name: "bodyMax", label: "Body Maximum Size (e.g. 1.2rem)" },
                  { type: "string", name: "bodyLineHeight", label: "Body Line Height (e.g. 1.7)" },
                  { type: "string", name: "headingLineHeight", label: "Heading Line Height (e.g. 1.1)" }
                ]
              },
              {
                type: "object",
                name: "colors",
                label: "Theme Color Palette (Visual Color Picker)",
                fields: [
                  { type: "string", name: "canvas", label: "Canvas Background Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "paper", label: "Paper / Card Background Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "ink", label: "Ink / Body Text Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "muted", label: "Muted Text Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "hairline", label: "Hairline Border Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "signal", label: "Primary Accent / Signal Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "signalBright", label: "Signal Bright / Hover Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "signalDeep", label: "Signal Deep / Active Color", ui: { component: "color", colorFormat: "hex" } },
                  { type: "string", name: "signalTint", label: "Signal Tint / Wash Color", ui: { component: "color", colorFormat: "hex" } }
                ]
              },
              {
                type: "object",
                name: "spacing",
                label: "Spacing & Border Radius",
                fields: [
                  { type: "string", name: "sectionPaddingY", label: "Section Vertical Padding (e.g. 5rem, 6rem)" },
                  { type: "string", name: "sectionMaxWidth", label: "Content Container Max Width (e.g. 1280px)" },
                  {
                    type: "string",
                    name: "borderRadius",
                    label: "Card Border Radius Style",
                    options: [
                      { label: "Sharp Modern (0.25rem)", value: "0.25rem" },
                      { label: "Subtle Rounded (0.5rem)", value: "0.5rem" },
                      { label: "Smooth Rounded (0.75rem)", value: "0.75rem" },
                      { label: "Soft Pill (1rem)", value: "1rem" }
                    ]
                  },
                  { type: "string", name: "cardGap", label: "Card Grid Gap (e.g. 1.5rem)" }
                ]
              }
            ]
          }
        ]
      },
      // ── Case Studies ───────────────────────────────────────────
      {
        name: "event",
        label: "Case Studies & Portfolio",
        path: "content/events",
        format: "json",
        fields: [
          { type: "string", name: "slug", label: "URL Slug", isTitle: true, required: true },
          { type: "string", name: "title", label: "Event Title" },
          { type: "string", name: "subtitle", label: "Subtitle / Production Scope" },
          {
            type: "string",
            name: "category",
            label: "Production Category",
            options: ["Sports", "Summit", "Heritage", "Entertainment", "Combat Sports"]
          },
          { type: "string", name: "venue", label: "Venue & Location" },
          { type: "string", name: "broadcaster", label: "Broadcaster / Host Client" },
          { type: "string", name: "dates", label: "Production Dates / Year" },
          { type: "string", name: "role", label: "Samir's Role" },
          { type: "image", name: "heroImage", label: "Hero Cover Image (Media Library)" },
          { type: "image", name: "gallery", label: "Production Gallery Photos (Media Library)", list: true },
          { type: "string", name: "videoUrl", label: "Video Embed URL (YouTube or Vimeo)" },
          { type: "string", name: "summary", label: "Executive Summary", ui: { component: "textarea" } },
          { type: "number", name: "cameraCount", label: "Total Camera Rig Count" },
          {
            type: "object",
            name: "specs",
            label: "Technical Specifications",
            fields: [
              { type: "string", name: "format", label: "Signal Format (e.g. 1080p50 HDR / 12G-SDI)" },
              { type: "string", name: "visionMixer", label: "Vision Mixer / Switcher (e.g. Sony MVS-8000X)" },
              { type: "string", name: "replay", label: "Replay Server (e.g. EVS XT-VIA & XT3)" },
              { type: "string", name: "cameras", label: "Camera Chain (e.g. Sony HDC-4300)" },
              { type: "string", name: "syncRouter", label: "Sync & Routing Core (e.g. Evertz 5600SPG)" },
              { type: "string", name: "audioIntercom", label: "Intercom & Audio Matrix (e.g. RTS ADAM / Dante)" }
            ]
          },
          {
            type: "object",
            name: "keyStats",
            label: "Key Production Statistics",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.label ? `${item.label}: ${item.value || ""}` : "Key Statistic"
              })
            },
            fields: [
              { type: "string", name: "label", label: "Metric Label (e.g. Global Audience)" },
              { type: "string", name: "value", label: "Metric Value (e.g. 1.2B+)" }
            ]
          },
          { type: "string", name: "technicalApproach", label: "Technical Approach & Execution Steps", list: true },
          {
            type: "object",
            name: "signalFlow",
            label: "Signal Flow Stages",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.step || "Signal Flow Stage"
              })
            },
            fields: [
              { type: "string", name: "step", label: "Stage Name" },
              { type: "string", name: "description", label: "Detailed Signal Description" }
            ]
          },
          {
            type: "object",
            name: "challengesAndSolutions",
            label: "Live Challenges & Solutions",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.challenge ? `Challenge: ${item.challenge.slice(0, 40)}...` : "Challenge & Solution"
              })
            },
            fields: [
              { type: "string", name: "challenge", label: "Live Fault / Problem", ui: { component: "textarea" } },
              { type: "string", name: "solution", label: "Engineering Fix Applied", ui: { component: "textarea" } },
              { type: "string", name: "impact", label: "Result / Broadcast Impact", ui: { component: "textarea" } }
            ]
          },
          { type: "string", name: "outcomes", label: "Key Production Outcomes", list: true },
          { type: "string", name: "improvementReflection", label: "Engineer's Reflection & Future Improvement", ui: { component: "textarea" } },
          { type: "string", name: "tags", label: "Broadcast Tags", list: true }
        ]
      },
      // ── Equipment ──────────────────────────────────────────────
      {
        name: "equipment",
        label: "Broadcast Equipment & Gear",
        path: "content/equipment",
        format: "json",
        fields: [
          { type: "string", name: "name", label: "Equipment Category Name", isTitle: true, required: true },
          { type: "string", name: "iconName", label: "Icon Name (Lucide icon)" },
          { type: "string", name: "description", label: "Category Summary" },
          {
            type: "object",
            name: "items",
            label: "Hardware / Software Systems",
            list: true,
            ui: {
              itemProps: (item) => ({
                label: item?.name ? `${item.name} (${item.model || ""})` : "Hardware Item"
              })
            },
            fields: [
              { type: "string", name: "name", label: "System Name" },
              { type: "string", name: "model", label: "Hardware Model" },
              { type: "string", name: "manufacturer", label: "Manufacturer" },
              { type: "string", name: "role", label: "Engineering Role" },
              { type: "string", name: "protocols", label: "Supported Protocols", list: true },
              { type: "number", name: "experienceYears", label: "Years Operating" },
              { type: "boolean", name: "featured", label: "Featured in Top Capabilities" }
            ]
          }
        ]
      },
      // ── Timeline ───────────────────────────────────────────────
      {
        name: "timeline",
        label: "Career Timeline & Roles",
        path: "content/timeline",
        format: "json",
        fields: [
          { type: "string", name: "period", label: "Time Period (e.g. 2019 \u2013 Present)", isTitle: true, required: true },
          { type: "string", name: "role", label: "Job Title / Role" },
          { type: "string", name: "company", label: "Company / Network / Unit" },
          { type: "string", name: "location", label: "Location" },
          {
            type: "string",
            name: "type",
            label: "Operational Type",
            options: ["Playout & Studio", "OB & Mobile Unit", "Lead Broadcast Engineer"]
          },
          { type: "string", name: "description", label: "Role Overview", ui: { component: "textarea" } },
          { type: "string", name: "achievements", label: "Key Achievements & Milestones", list: true },
          { type: "string", name: "technologies", label: "Core Technologies & Systems Deployed", list: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
