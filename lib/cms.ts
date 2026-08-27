import client from "@/tina/__generated__/client";
import type {
  Homepage,
  CaseStudy,
  ShowcaseVideo,
  Testimonial,
  FaqItem,
  ServiceTier,
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

/** Flatten nested-list items that carry _sys metadata (index-based, no per-item id). */
export interface CmsData {
  homepage: TinaTuple<{ homepage: Homepage }>;
  homepageValue: Homepage;
}

export async function getEventSlugs(): Promise<string[]> {
  const ev = await client.queries.eventConnection();
  const nodes = (ev.data?.eventConnection as { edges?: { node?: TinaNode }[] } | undefined)
    ?.edges ?? [];
  return nodes.map((e) => String(e.node?.slug ?? "")).filter(Boolean);
}

export async function getEvents(): Promise<CaseStudy[]> {
  const ev = await client.queries.eventConnection();
  const nodes = (ev.data?.eventConnection as { edges?: { node?: TinaNode }[] } | undefined)
    ?.edges ?? [];
  return nodes.map((e) => cleanEvent(e.node as TinaNode)).filter((e) => e.slug);
}

export async function getEventBySlug(slug: string): Promise<{
  tuple: TinaTuple<{ event: CaseStudy }>;
  homepage: TinaTuple<{ homepage: Homepage }>;
  homepageValue: Homepage;
} | null> {
  const [ev, hp, allEventsRes] = await Promise.all([
    client.queries.event({ relativePath: `${slug}.json` }),
    client.queries.homepage({ relativePath: "home.json" }),
    getEvents(),
  ]);
  const raw = ev.data?.event as TinaNode | undefined;
  if (!raw) return null;

  const homepage = flattenHomepage(hp.data?.homepage, allEventsRes);

  return {
    tuple: {
      query: ev.query,
      variables: ev.variables ?? { relativePath: `${slug}.json` },
      data: { event: raw as unknown as CaseStudy },
    },
    homepage: {
      query: hp.query,
      variables: hp.variables ?? { relativePath: "home.json" },
      data: { homepage: hp.data?.homepage as unknown as Homepage },
    },
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
  }>(node.footerSection as TinaNode);

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
  } as Homepage;
}

export async function getCmsData(): Promise<CmsData> {
  const [hp, eventsRes] = await Promise.all([
    client.queries.homepage({ relativePath: "home.json" }),
    getEvents(),
  ]);
  const homepage = flattenHomepage(hp.data?.homepage, eventsRes);
  return {
    homepage: {
      query: hp.query,
      variables: hp.variables ?? { relativePath: "home.json" },
      data: { homepage: hp.data?.homepage as unknown as Homepage },
    },
    homepageValue: homepage,
  };
}
