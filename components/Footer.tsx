"use client";

import React from "react";
import type { Identity, FooterSection } from "@/lib/types";
import {
  Mail,
  PhoneCall,
  MapPin,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7h2.5l.5-3h-3V9.05c0-.87.24-1.46 1.5-1.46h1.6V4.85c-.28-.04-1.22-.12-2.32-.12-2.3 0-3.88 1.4-3.88 3.98V11H8v3h2.4v7h3.1Z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.23l-4.88-6.38L6.5 22H3.34l7.24-8.28L2.8 2h6.39l4.41 5.83L18.9 2Zm-1.09 18.14h1.72L7.28 3.76H5.43l12.38 16.38Z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Facebook: FacebookIcon,
  "X (Twitter)": XIcon,
};

interface FooterProps {
  identity: Identity;
  footerSection: FooterSection;
}

export function Footer({ identity, footerSection }: FooterProps) {
  return (
    <footer role="contentinfo" className="bg-ink text-zinc-300">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Heading */}
        <div className="max-w-2xl mb-12 lg:mb-14">
          <p className="eyebrow text-signal mb-4">{footerSection.eyebrow}</p>
          <h2 className="fluid-h2 font-display font-semibold text-white">
            {footerSection.heading}{" "}
            <em className="italic text-signal">{footerSection.headingAccent}</em>.
          </h2>
          <a
            href={`mailto:${identity.email}?subject=${encodeURIComponent(
              "New video project inquiry"
            )}`}
            className="mt-7 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-signal hover:bg-signal-bright text-white font-semibold transition-colors min-h-[48px] focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink focus-visible:outline-none"
          >
            {footerSection.ctaLabel}
            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 border-t border-white/10">
          {/* Location */}
          <div>
            <h3 className="eyebrow text-zinc-500 mb-4">{footerSection.locationHeading ?? "Location"}</h3>
            <p className="flex items-start gap-2.5 text-sm leading-relaxed">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-signal" aria-hidden="true" />
              <span>{identity.location}</span>
            </p>
          </div>

          {/* Working hours */}
          <div>
            <h3 className="eyebrow text-zinc-500 mb-4">{footerSection.hoursHeading ?? "Working hours"}</h3>
            <p className="flex items-start gap-2.5 text-sm leading-relaxed">
              <Clock3 className="w-4 h-4 shrink-0 mt-0.5 text-signal" aria-hidden="true" />
              <span>{identity.workingHours}</span>
            </p>
          </div>

          {/* Call / email */}
          <div>
            <h3 className="eyebrow text-zinc-500 mb-4">{footerSection.callHeading ?? "Call us"}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`tel:${identity.phone.replace(/[^+\d]/g, "")}`}
                  className="inline-flex items-center gap-2.5 hover:text-signal transition-colors focus-visible:ring-2 focus-visible:ring-signal rounded outline-none"
                >
                  <PhoneCall className="w-4 h-4 shrink-0 text-signal" aria-hidden="true" />
                  <span>{identity.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="inline-flex items-start gap-2.5 hover:text-signal transition-colors break-all focus-visible:ring-2 focus-visible:ring-signal rounded outline-none"
                >
                  <Mail className="w-4 h-4 shrink-0 mt-0.5 text-signal" aria-hidden="true" />
                  <span className="break-all">{identity.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="eyebrow text-zinc-500 mb-4">{footerSection.socialHeading ?? "Follow Samir Elgammal"}</h3>
            <ul className="flex flex-wrap items-center gap-3">
              {identity.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.label] ?? null;
                const content = (
                  <>
                    {Icon && <Icon className="w-4 h-4 shrink-0" />}
                    <span>{social.label}</span>
                  </>
                );
                return (
                  <li key={social.label}>
                    {social.url ? (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-white/15 text-sm font-medium hover:border-signal hover:text-white transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
                      >
                        {content}
                      </a>
                    ) : (
                      <span
                        title={`Add your ${social.label} profile link in lib/data.ts`}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded border border-dashed border-white/20 text-sm font-medium text-zinc-400 min-h-[44px]"
                      >
                        {content}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} {identity.name}. {footerSection.copyright ?? "All rights reserved."}</p>
          <p>{footerSection.tagline ?? `Broadcast & Video Production — ${identity.location}`}</p>
        </div>
      </div>
    </footer>
  );
}
