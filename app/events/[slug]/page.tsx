import React from "react";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/EventDetail";
import { getEventBySlug, getEventSlugs, getEvents } from "@/lib/cms";
import type { Metadata } from "next";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const slugs = await getEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getEventBySlug(slug);
  if (!data) return { title: "Event Case Study | Samir Elgammal" };

  const event = (data.tuple.data.event as { title?: string; summary?: string }) ?? {};
  return {
    title: `${event.title ?? "Event"} — Engineering Case Study | Samir Elgammal`,
    description: event.summary ?? "",
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getEventBySlug(slug);

  if (!data) {
    notFound();
  }

  const events = await getEvents();

  return (
    <EventDetail
      eventTuple={data.tuple}
      personalInfoTuple={data.personalInfo}
      personalInfoValue={data.personalInfoValue}
      events={events}
    />
  );
}
