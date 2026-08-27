import client from "@/tina/__generated__/client";
import type {
  PersonalInfo,
  ServiceTier,
  CaseStudy,
  ShowcaseVideo,
  Testimonial,
  FaqItem,
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

function connectionNodes(root: unknown): TinaNode[] {
  const edges = (root as { edges?: { node?: TinaNode }[] })?.edges ?? [];
  return edges.map((e) => e.node).filter((n): n is TinaNode => !!n);
}

export type TinaTuple<TData> = {
  query: string;
  variables: Record<string, unknown>;
  data: TData;
};

export interface CmsData {
  personalInfo: TinaTuple<{ personalInfo: PersonalInfo }>;
  services: TinaTuple<{ serviceConnection: unknown }>;
  events: TinaTuple<{ eventConnection: unknown }>;
  showreel: TinaTuple<{ showreelVideoConnection: unknown }>;
  testimonials: TinaTuple<{ testimonialConnection: unknown }>;
  faq: TinaTuple<{ faqConnection: unknown }>;
  personalInfoValue: PersonalInfo;
  servicesValue: ServiceTier[];
  eventsValue: CaseStudy[];
  showreelValue: ShowcaseVideo[];
  testimonialsValue: Testimonial[];
  faqValue: FaqItem[];
}

export async function getEventSlugs(): Promise<string[]> {
  const ev = await client.queries.eventConnection();
  return connectionNodes(ev.data?.eventConnection).map((n) => String(n.slug ?? ""));
}

export async function getEvents(): Promise<CaseStudy[]> {
  const ev = await client.queries.eventConnection();
  return connectionNodes(ev.data?.eventConnection).map((n) => ownData<CaseStudy>(n));
}

export async function getEventBySlug(slug: string): Promise<{
  tuple: TinaTuple<{ event: CaseStudy }>;
  personalInfo: TinaTuple<{ personalInfo: PersonalInfo }>;
  personalInfoValue: PersonalInfo;
} | null> {
  const [ev, pi] = await Promise.all([
    client.queries.event({ relativePath: `${slug}.json` }),
    client.queries.personalInfo({ relativePath: "personalInfo.json" }),
  ]);
  const raw = ev.data?.event as TinaNode | undefined;
  if (!raw) return null;

  const personalInfoRaw = pi.data?.personalInfo as TinaNode;
  const personalInfo = ownData<PersonalInfo>(personalInfoRaw);

  return {
    tuple: {
      query: ev.query,
      variables: ev.variables ?? { relativePath: `${slug}.json` },
      data: { event: raw as unknown as CaseStudy },
    },
    personalInfo: {
      query: pi.query,
      variables: pi.variables ?? { relativePath: "personalInfo.json" },
      data: { personalInfo },
    },
    personalInfoValue: personalInfo,
  };
}

export async function getCmsData(): Promise<CmsData> {
  const [pi, svc, ev, sr, tm, fq] = await Promise.all([
    client.queries.personalInfo({ relativePath: "personalInfo.json" }),
    client.queries.serviceConnection(),
    client.queries.eventConnection(),
    client.queries.showreelVideoConnection(),
    client.queries.testimonialConnection(),
    client.queries.faqConnection(),
  ]);

  const personalInfoRaw = pi.data?.personalInfo as TinaNode;
  const servicesRaw = svc.data?.serviceConnection;
  const eventsRaw = ev.data?.eventConnection;
  const showreelRaw = sr.data?.showreelVideoConnection;
  const testimonialsRaw = tm.data?.testimonialConnection;
  const faqRaw = fq.data?.faqConnection;

  const personalInfo = ownData<PersonalInfo>(personalInfoRaw);
  const services = connectionNodes(servicesRaw).map(
    (n) => ({ id: n._sys.filename ?? "", ...ownData<Omit<ServiceTier, "id">>(n) }) as ServiceTier
  );
  const events = connectionNodes(eventsRaw).map((n) => ownData<CaseStudy>(n));
  const showreel = connectionNodes(showreelRaw).map(
    (n) => ({ id: n._sys.filename ?? "", ...ownData<Omit<ShowcaseVideo, "id">>(n) }) as ShowcaseVideo
  );
  const testimonials = connectionNodes(testimonialsRaw).map(
    (n) => ({ id: n._sys.filename ?? "", ...ownData<Omit<Testimonial, "id">>(n) }) as Testimonial
  );
  const faq = connectionNodes(faqRaw).map(
    (n) => ({ id: n._sys.filename ?? "", ...ownData<Omit<FaqItem, "id">>(n) }) as FaqItem
  );

  return {
    personalInfo: { query: pi.query, variables: pi.variables ?? {}, data: { personalInfo } },
    services: { query: svc.query, variables: svc.variables ?? {}, data: { serviceConnection: servicesRaw } },
    events: { query: ev.query, variables: ev.variables ?? {}, data: { eventConnection: eventsRaw } },
    showreel: { query: sr.query, variables: sr.variables ?? {}, data: { showreelVideoConnection: showreelRaw } },
    testimonials: { query: tm.query, variables: tm.variables ?? {}, data: { testimonialConnection: testimonialsRaw } },
    faq: { query: fq.query, variables: fq.variables ?? {}, data: { faqConnection: faqRaw } },
    personalInfoValue: personalInfo,
    servicesValue: services,
    eventsValue: events,
    showreelValue: showreel,
    testimonialsValue: testimonials,
    faqValue: faq,
  };
}
