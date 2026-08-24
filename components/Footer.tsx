"use client";

import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { Mail, PhoneCall } from "lucide-react";

const NAV_LINKS = [
  { label: "Overview", href: "#hero" },
  { label: "Experience", href: "#story" },
  { label: "Capabilities", href: "#services" },
  { label: "Case Studies", href: "#events" },
  { label: "Showreel", href: "#showreel" },
  { label: "Tech Stack", href: "#rack" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="bg-ink text-zinc-400">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16 pb-28 lg:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-14">
          {/* Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-white text-ink flex items-center justify-center font-mono font-bold text-sm shrink-0">
                SE
              </span>
              <div className="leading-tight">
                <p className="font-display font-bold text-white">{PERSONAL_INFO.name}</p>
                <p className="eyebrow text-zinc-500 text-[10px] mt-0.5">
                  Broadcast &amp; OB Engineer — Dubai, UAE
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              18+ years of live broadcast engineering across major sports leagues,
              international summits, and primetime television.
            </p>
          </div>

          {/* Site nav */}
          <nav aria-label="Footer navigation" className="md:col-span-3">
            <h2 className="eyebrow text-zinc-500 mb-4">Site</h2>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Case studies */}
          <nav aria-label="Case studies" className="md:col-span-2">
            <h2 className="eyebrow text-zinc-500 mb-4">Work</h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/events/cop28-expo-city-dubai" className="hover:text-white transition-colors">
                  COP28 Summit
                </Link>
              </li>
              <li>
                <Link href="/events/uae-pro-league-adnoc" className="hover:text-white transition-colors">
                  UAE Pro League
                </Link>
              </li>
              <li>
                <Link href="/events/camel-racing-heritage-festivals" className="hover:text-white transition-colors">
                  Desert Racing
                </Link>
              </li>
              <li>
                <Link href="/events/world-snooker-masters-ksa" className="hover:text-white transition-colors">
                  Snooker Masters
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div className="md:col-span-2">
            <h2 className="eyebrow text-zinc-500 mb-4">Contact</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={PERSONAL_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="inline-flex items-start gap-2 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="break-all">{PERSONAL_INFO.email}</span>
                </a>
              </li>
            </ul>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center px-5 py-3 rounded-full bg-signal hover:bg-signal-deep text-white font-semibold text-xs uppercase tracking-wide transition-colors min-h-[44px]"
            >
              Book for an event
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Samir Elgammal. All rights reserved.</p>
          <p className="text-zinc-500">Broadcast &amp; OB Engineering — Dubai, UAE</p>
        </div>
      </div>
    </footer>
  );
}
