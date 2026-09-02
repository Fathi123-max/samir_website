import fs from "node:fs";
import path from "node:path";
import client from "@/tina/__generated__/client";
import type {
  Homepage,
  CaseStudy,
  ShowcaseVideo,
  Testimonial,
  FaqItem,
  ServiceTier,
  HeaderSection,
  HeroExtras,
  EventDetailSection,
  SiteMeta,
} from "@/lib/types";

type TinaNode = {
  _sys: { filename?: string; basename?: string; relativePath?: string };
  id?: string;
  __typename?: string;
} & Record<string, unknown>;

function ownData<T>(node: TinaNode): T {
  const copy: Record<string, unknown> = { ...node };
  delete copy._sys;
  delete copy.__typename;
  delete copy.id;
  return copy as T;
}

export type TinaTuple<TData> = {
  query: string;
  variables: Record<string, unknown>;
  data: TData;
};

/** Strip graphql metadata from a referenced event node into a CaseStudy. */
function cleanEvent(node: TinaNode): CaseStudy {
  const copy: Record<string, unknown> = { ...node };
  delete copy._sys;
  delete copy.__typename;
  delete copy.id;
  return copy as unknown as CaseStudy;
}

/** Map a raw referenced-event node (may be a string path or a node) to a CaseStudy. */
function mapReferencedEvent(node: unknown): CaseStudy | null {
  if (!node || typeof node !== "object") return null;
  const n = node as TinaNode;
  if (!n.slug) return null;
  return cleanEvent(n);
}

/** Resolve a featured reference (string file path or node) against the event list. */
function resolveFeatured(
  ref: unknown,
  events: CaseStudy[]
): CaseStudy | null {
  if (!ref) return null;
  if (typeof ref === "string") {
    const slug = ref.split("/").pop()?.replace(/\.json$/, "") ?? "";
    return events.find((e) => e.slug === slug) ?? null;
  }
  return mapReferencedEvent(ref);
}

function readLocalJson<T>(relativePath: string): T | null {
  try {
    const fullPath = path.join(process.cwd(), "content", relativePath);
    if (!fs.existsSync(fullPath)) return null;
    const content = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(content) as T;
  } catch {
    return null;
  }
}

function readAllEventsLocal(): CaseStudy[] {
  try {
    const eventsDir = path.join(process.cwd(), "content", "events");
    if (!fs.existsSync(eventsDir)) return [];
    const files = fs.readdirSync(eventsDir).filter((f) => f.endsWith(".json"));
    return files
      .map((file) => readLocalJson<CaseStudy>(`events/${file}`))
      .filter((e): e is CaseStudy => !!e && !!e.slug);
  } catch {
    return [];
  }
}

/** Flatten nested-list items that carry _sys metadata (index-based, no per-item id). */
export interface CmsData {
  homepage: TinaTuple<{ homepage: Homepage }>;
  homepageValue: Homepage;
}

export async function getEventSlugs(): Promise<string[]> {
  try {
    const ev = await client.queries.eventConnection();
    const nodes = (ev.data?.eventConnection as { edges?: { node?: TinaNode }[] } | undefined)
      ?.edges ?? [];
    const slugs = nodes.map((e) => String(e.node?.slug ?? "")).filter(Boolean);
    if (slugs.length > 0) return slugs;
  } catch (err) {
    console.warn("Tina getEventSlugs falling back to local files:", err);
  }
  return readAllEventsLocal().map((e) => e.slug).filter(Boolean);
}

export async function getEvents(): Promise<CaseStudy[]> {
  try {
    const ev = await client.queries.eventConnection();
    const nodes = (ev.data?.eventConnection as { edges?: { node?: TinaNode }[] } | undefined)
      ?.edges ?? [];
    const result = nodes.map((e) => cleanEvent(e.node as TinaNode)).filter((e) => e.slug);
    if (result.length > 0) return result;
  } catch (err) {
    console.warn("Tina getEvents falling back to local files:", err);
  }
  return readAllEventsLocal();
}

export async function getEventBySlug(slug: string): Promise<{
  tuple: TinaTuple<{ event: CaseStudy }>;
  homepage: TinaTuple<{ homepage: Homepage }>;
  homepageValue: Homepage;
} | null> {
  let evTuple: TinaTuple<{ event: CaseStudy }> | null = null;
  let hpTuple: TinaTuple<{ homepage: Homepage }> | null = null;
  let allEventsRes: CaseStudy[] = [];

  try {
    const [ev, hp, events] = await Promise.all([
      client.queries.event({ relativePath: `${slug}.json` }),
      client.queries.homepage({ relativePath: "home.json" }),
      getEvents(),
    ]);
    allEventsRes = events;
    const raw = ev.data?.event as TinaNode | undefined;
    if (raw) {
      evTuple = {
        query: ev.query,
        variables: ev.variables ?? { relativePath: `${slug}.json` },
        data: { event: raw as unknown as CaseStudy },
      };
    }
    if (hp.data?.homepage) {
      hpTuple = {
        query: hp.query,
        variables: hp.variables ?? { relativePath: "home.json" },
        data: { homepage: hp.data.homepage as unknown as Homepage },
      };
    }
  } catch (err) {
    console.warn(`Tina getEventBySlug('${slug}') falling back to local files:`, err);
  }

  if (!allEventsRes || allEventsRes.length === 0) {
    allEventsRes = readAllEventsLocal();
  }

  if (!evTuple) {
    const localEvent = readLocalJson<CaseStudy>(`events/${slug}.json`);
    if (!localEvent) return null;
    evTuple = {
      query: "",
      variables: { relativePath: `${slug}.json` },
      data: { event: localEvent },
    };
  }

  if (!hpTuple) {
    const localHp = readLocalJson<Homepage>("pages/home.json");
    if (!localHp) return null;
    hpTuple = {
      query: "",
      variables: { relativePath: "home.json" },
      data: { homepage: localHp },
    };
  }

  const homepage = flattenHomepage(hpTuple.data?.homepage, allEventsRes);

  return {
    tuple: evTuple,
    homepage: hpTuple,
    homepageValue: homepage,
  };
}

/** Flatten the raw homepage node (with _sys + referenced event nodes) into the typed Homepage.
 *  `events` is the full case-study list used to resolve `featuredEvents` path references. */
export function flattenHomepage(
  raw: unknown,
  events: CaseStudy[] = []
): Homepage {
  const node = (raw ?? {}) as TinaNode;

  const identity = ownData<{
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
    socials: { label: string; url: string }[];
    degree: string;
    degreeHonors: string;
    statusText: string;
    statusTextShort: string;
    statusActive: boolean;
  }>(node.identity as TinaNode);

  const hero = ownData<{
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
    stats: { value: string; label: string }[];
  }>(node.hero as TinaNode);

  const navigation = ownData<{
    items: { label: string; href: string; id: string; index: string }[];
  }>(node.navigation as TinaNode);

  const servicesSection = ownData<{
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    items: ServiceTier[];
  }>(node.servicesSection as TinaNode);

  const eventsSection = ownData<{
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    categories: string[];
    featuredEvents: unknown;
  }>(node.eventsSection as TinaNode);

  const showreelSection = ownData<{
    eyebrow: string;
    heading: string;
    headingAccent: string;
    openLabel: string;
    videos: ShowcaseVideo[];
  }>(node.showreelSection as TinaNode);

  const testimonialSection = ownData<{
    testimonials: Testimonial[];
    ctaHeading: string;
    ctaBody: string;
    ctaLabel: string;
    ctaHref: string;
  }>(node.testimonialSection as TinaNode);

  const faqSection = ownData<{
    eyebrow: string;
    heading: string;
    headingAccent: string;
    body: string;
    items: FaqItem[];
  }>(node.faqSection as TinaNode);

  const footerSection = ownData<{
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
  }>(node.footerSection as TinaNode);

  const headerSection = ownData<HeaderSection>(node.headerSection as TinaNode);
  const heroExtras = ownData<HeroExtras>(node.heroExtras as TinaNode);
  const eventDetailSection = ownData<EventDetailSection>(node.eventDetailSection as TinaNode);
  const meta = ownData<SiteMeta>(node.meta as TinaNode);

  // Featured events arrive either via a `reference` field (node objects) or as plain string paths.
  const featured: CaseStudy[] = Array.isArray(eventsSection.featuredEvents)
    ? eventsSection.featuredEvents
        .map((ref) => resolveFeatured(ref, events))
        .filter((e): e is CaseStudy => !!e)
    : [];

  return {
    identity,
    hero: {
      ...hero,
      stats: hero.stats ?? [],
    },
    navigation: {
      items: navigation?.items ?? [],
    },
    servicesSection: {
      ...servicesSection,
      items: servicesSection.items ?? [],
    },
    eventsSection: {
      ...eventsSection,
      categories: eventsSection.categories ?? [],
      featuredEvents: featured,
    },
    showreelSection: {
      ...showreelSection,
      videos: showreelSection.videos ?? [],
    },
    testimonialSection: {
      ...testimonialSection,
      testimonials: testimonialSection.testimonials ?? [],
    },
    faqSection: {
      ...faqSection,
      items: faqSection.items ?? [],
    },
    footerSection: footerSection ?? {},
    headerSection: headerSection ?? {},
    heroExtras: heroExtras ?? {},
    eventDetailSection: eventDetailSection ?? {},
    meta: meta ?? {},
  } as Homepage;
}

export async function getCmsData(): Promise<CmsData> {
  let hpTuple: TinaTuple<{ homepage: Homepage }> | null = null;
  let eventsRes: CaseStudy[] = [];

  try {
    const [hp, events] = await Promise.all([
      client.queries.homepage({ relativePath: "home.json" }),
      getEvents(),
    ]);
    eventsRes = events;
    if (hp.data?.homepage) {
      hpTuple = {
        query: hp.query,
        variables: hp.variables ?? { relativePath: "home.json" },
        data: { homepage: hp.data.homepage as unknown as Homepage },
      };
    }
  } catch (err) {
    console.warn("Tina getCmsData falling back to local files:", err);
  }

  if (!eventsRes || eventsRes.length === 0) {
    eventsRes = readAllEventsLocal();
  }

  if (!hpTuple) {
    const localHp = readLocalJson<Homepage>("pages/home.json");
    hpTuple = {
      query: "",
      variables: { relativePath: "home.json" },
      data: { homepage: (localHp ?? {}) as Homepage },
    };
  }

  const homepage = flattenHomepage(hpTuple.data?.homepage, eventsRes);
  return {
    homepage: hpTuple,
    homepageValue: homepage,
  };
}
