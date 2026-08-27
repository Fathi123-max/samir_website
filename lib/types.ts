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
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  items: ServiceTier[];
}

export interface EventsSection {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  body: string;
  categories: string[];
  featuredEvents: CaseStudy[];
}

export interface ShowreelSection {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  openLabel: string;
  videos: ShowcaseVideo[];
}

export interface TestimonialSection {
  testimonials: Testimonial[];
  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FaqSection {
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
