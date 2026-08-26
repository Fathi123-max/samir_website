import fs from "fs";
import path from "path";
import type {
  CaseStudy,
  ServiceTier,
  EquipmentCategory,
  TimelineNode,
  Testimonial,
  ShowcaseVideo,
  FaqItem,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function readJsonDir<T>(dirPath: string): T[] {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".json"));
  return files.map((f) => readJson<T>(path.join(dirPath, f)));
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  heroHeadline: string;
  tagline: string;
  portrait: string;
  showreelUrl: string;
  experienceYears: number;
  eventsCount: number;
  broadcastersCount: number;
  uptimePercentage: string;
  location: string;
  phone: string;
  email: string;
  whatsappUrl: string;
  workingHours: string;
  socials: { label: string; url: string }[];
  degree: string;
  degreeHonors: string;
  statusText: string;
  statusTextShort: string;
  statusActive: boolean;
}

export function getPersonalInfo(): PersonalInfo {
  return readJson<PersonalInfo>(path.join(CONTENT_DIR, "personalInfo.json"));
}

export function getEvents(): CaseStudy[] {
  return readJsonDir<CaseStudy>(path.join(CONTENT_DIR, "events"));
}

export function getEventBySlug(slug: string): CaseStudy | undefined {
  return getEvents().find((e) => e.slug === slug);
}

export function getServices(): ServiceTier[] {
  return readJsonDir<ServiceTier>(path.join(CONTENT_DIR, "services"));
}

export function getEquipment(): EquipmentCategory[] {
  return readJsonDir<EquipmentCategory>(path.join(CONTENT_DIR, "equipment"));
}

export function getTimeline(): TimelineNode[] {
  return readJsonDir<TimelineNode>(path.join(CONTENT_DIR, "timeline"));
}

export function getTestimonials(): Testimonial[] {
  return readJsonDir<Testimonial>(path.join(CONTENT_DIR, "testimonials"));
}

export function getShowreelVideos(): ShowcaseVideo[] {
  return readJsonDir<ShowcaseVideo>(path.join(CONTENT_DIR, "showreel"));
}

export function getFaqItems(): FaqItem[] {
  return readJsonDir<FaqItem>(path.join(CONTENT_DIR, "faq"));
}
