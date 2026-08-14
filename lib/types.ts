export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  category: "Sports" | "Summit" | "Heritage" | "Entertainment" | "Combat Sports";
  venue: string;
  broadcaster: string;
  dates: string;
  role: string;
  heroImage?: string;
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

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  summary: string;
  deliverables: string[];
  keyTools: string[];
  metrics: string;
  colSpan?: string;
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
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  event: string;
  avatarText: string;
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
