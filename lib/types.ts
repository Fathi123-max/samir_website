export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: "Sports" | "Summit" | "Heritage" | "Entertainment" | "Combat Sports";
  venue: string;
  broadcaster: string;
  dates: string;
  role: string;
  /** Card + page-hero image, path under /public (e.g. "/images/cop28/cover.jpg"). Empty = styled placeholder. */
  heroImage?: string;
  /** Additional photos shown in the detail-page gallery. */
  gallery?: string[];
  /** Embeddable video URL (YouTube/Vimeo) shown on the detail page. */
  videoUrl?: string;
  summary: string;
  cameraCount: number;
  specs: {
    format: string;
    visionMixer: string;
    replay: string;
    cameras: string;
    syncRouter: string;
    audioIntercom: string;
  };
  keyStats: {
    label: string;
    value: string;
  }[];
  technicalApproach: string[];
  signalFlow: {
    step: string;
    description: string;
  }[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
    impact: string;
  }[];
  outcomes: string[];
  improvementReflection: string;
  tags: string[];
}

export interface ServiceTier {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface EquipmentItem {
  name: string;
  model: string;
  manufacturer: string;
  role: string;
  protocols: string[];
  experienceYears: number;
  featured?: boolean;
}

export interface EquipmentCategory {
  id: string;
  name: string;
  iconName: string;
  description: string;
  items: EquipmentItem[];
}

export interface TimelineNode {
  period: string;
  role: string;
  company: string;
  location: string;
  type: "Playout & Studio" | "OB & Mobile Unit" | "Lead Broadcast Engineer";
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  event: string;
  avatarText: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

/** Identity — used by Header, Hero, Showreel, Footer, and JSON-LD. */
export interface Identity {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  portrait: string;
  showreelUrl: string;
  experienceYears: number;
  uptimePercentage: string;
  location: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  workingHours: string;
  socials: SocialLink[];
  degree: string;
  degreeHonors: string;
  statusText: string;
  statusTextShort: string;
  statusActive: boolean;
}

export interface HomeStat {
  value: string;
  label: string;
}

/** Hero section data. */
export interface Hero {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
  stats: HomeStat[];
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
  index: string;
}

/** One tile in the homepage showreel gallery. */
export interface ShowcaseVideo {
  title: string;
  caption: string;
  /** Poster frame path under /public (e.g. "/images/showreel/cop28.jpg"). Empty = styled placeholder. */
  thumb?: string;
  /** YouTube/Vimeo URL. Empty = placeholder player slot. */
  videoUrl?: string;
}

export interface ServicesSection {
  visible?: boolean;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  items: ServiceTier[];
}

export interface EventsSection {
  visible?: boolean;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  categories: string[];
  featuredEvents: CaseStudy[];
}

export interface ShowreelSection {
  visible?: boolean;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  openLabel: string;
  videos: ShowcaseVideo[];
}

export interface TestimonialSection {
  visible?: boolean;
  testimonials: Testimonial[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FaqSection {
  visible?: boolean;
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  items: FaqItem[];
}

export interface FooterSection {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  ctaLabel: string;
  locationHeading: string;
  hoursHeading: string;
  callHeading: string;
  socialHeading: string;
  copyright: string;
  tagline: string;
}

export interface HeaderSection {
  logoText: string;
  brandSubtitle: string;
  ctaLabel: string;
  mobileCtaLabel: string;
  drawerSectionsLabel: string;
  drawerContactLabel: string;
  drawerContactIndex: string;
  drawerCallLabel: string;
  drawerWhatsappLabel: string;
}

export interface HeroExtras {
  availableSuffix: string;
  yearsLabel: string;
}

export interface EventDetailSection {
  breadcrumbHome: string;
  breadcrumbCaseStudies: string;
  roleLabel: string;
  specsHeading: string;
  approachHeading: string;
  signalFlowHeading: string;
  challengesHeading: string;
  videoHeading: string;
  galleryHeading: string;
  reflectionLabel: string;
  bookingHeading: string;
  bookingSubtitle: string;
  bookingCtaLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export interface SiteMeta {
  siteTitle: string;
  siteDescription: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
  keywords: string[];
}

export interface DesignTokens {
  themePreset?: "mint" | "amber" | "cyber" | "emerald" | "monochrome" | string;
  fontPreset?: string;
  headingFontFamily?: string;
  bodyFontFamily?: string;
  headingWeight?: string;
  bodyWeight?: string;
  buttonShape?: "pill" | "rounded" | "sharp" | string;
  cardStyle?: "lift" | "border-glow" | "minimal" | string;
  showBackdropMesh?: boolean;
  typographyScale?: {
    h1Min?: string;
    h1Max?: string;
    h2Min?: string;
    h2Max?: string;
    h3Min?: string;
    h3Max?: string;
    bodyMin?: string;
    bodyMax?: string;
    bodyLineHeight?: string;
    headingLineHeight?: string;
  };
  colors?: {
    canvas?: string;
    paper?: string;
    ink?: string;
    muted?: string;
    hairline?: string;
    signal?: string;
    signalBright?: string;
    signalDeep?: string;
    signalTint?: string;
  };
  spacing?: {
    sectionPaddingY?: string;
    sectionMaxWidth?: string;
    borderRadius?: string;
    cardGap?: string;
  };
}

/** The single homepage document — the runtime source of truth. */
export interface Homepage {
  identity: Identity;
  hero: Hero;
  navigation: {
    items: NavItem[];
  };
  servicesSection: ServicesSection;
  eventsSection: EventsSection;
  showreelSection: ShowreelSection;
  testimonialSection: TestimonialSection;
  faqSection: FaqSection;
  footerSection: FooterSection;
  headerSection: HeaderSection;
  heroExtras: HeroExtras;
  eventDetailSection: EventDetailSection;
  meta: SiteMeta;
  design: DesignTokens;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  productionType: string;
  location: string;
  startDate: string;
  endDate: string;
  roles: string[];
  notes: string;
}
