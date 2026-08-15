"use client";

import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import {
  MapPin,
  Mail,
  PhoneCall,
  ShieldCheck,
  ChevronUp,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    sound.playTallyClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer role="contentinfo" className="bg-[#04060a] border-t border-[#162133] text-slate-300 text-xs font-mono">
      {/* Top telemetry strip */}
      <div className="border-b border-[#121a28] px-4 sm:px-6 lg:px-8 py-4 bg-[#06090f]">
        <div className="max-w-screen-2xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-slate-200">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="font-bold text-white text-sm">{PERSONAL_INFO.name}</span>
            <span className="text-slate-600" aria-hidden="true">•</span>
            <span className="text-slate-300">SYSTEM BROADCAST & OB ENGINEER</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span>TRANSMISSION: 1080p50 HDR READY</span>
            <span className="hidden sm:inline text-slate-600" aria-hidden="true">•</span>
            <span className="hidden sm:inline text-amber-300 font-semibold">DUBAI, UAE (GMT+4)</span>
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Col 1: Bio & Reliability */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                SE
              </div>
              <span className="font-display font-bold text-white text-base">
                Samir Elgammal
              </span>
            </div>
            <p className="text-slate-300 font-sans text-xs leading-relaxed">
              18+ years of live broadcast engineering across major sports leagues, international diplomatic summits, and primetime television.
            </p>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2 pt-1">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>99.99% Transmission Reliability</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h2 className="text-white font-bold block uppercase tracking-wider text-xs">
              Command Navigation
            </h2>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>Overview & Hero</span>
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>Engineering Heritage</span>
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>Signal Flow Simulator</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>Core Capabilities</span>
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>Flagship Case Studies</span>
                </a>
              </li>
              <li>
                <a href="#rack" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>19&quot; Equipment Rack</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Deployments */}
          <div className="space-y-3">
            <h2 className="text-white font-bold block uppercase tracking-wider text-xs">
              Flagship Productions
            </h2>
            <ul className="space-y-3 text-xs text-slate-300">
              <li>
                <Link href="/events/cop28-expo-city-dubai" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>COP28 UN World Summit</span>
                </Link>
              </li>
              <li>
                <Link href="/events/uae-pro-league-adnoc" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>UAE Pro League (ADNOC)</span>
                </Link>
              </li>
              <li>
                <Link href="/events/camel-racing-heritage-festivals" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>National Camel Racing</span>
                </Link>
              </li>
              <li>
                <Link href="/events/world-snooker-masters-ksa" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>World Snooker Masters (KSA)</span>
                </Link>
              </li>
              <li>
                <Link href="/events/primetime-game-shows-emirates-draw" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <span aria-hidden="true">&bull;</span> <span>Emirates Draw & Top Chef</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Dispatch */}
          <div className="space-y-3">
            <h2 className="text-white font-bold block uppercase tracking-wider text-xs">
              Direct Dispatch
            </h2>
            <div className="space-y-3 text-xs">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-emerald-400 hover:text-emerald-300"
              >
                <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-3 text-cyan-300 hover:text-white"
              >
                <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider transition-colors min-h-[44px]"
              >
                Book For Event &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-8 border-t border-[#141e2e] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Samir Elgammal. All Rights Reserved. Built with Next.js 16 App Router & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top of page"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0b1018] border border-[#1d2a3f] text-slate-200 hover:text-amber-400 hover:border-amber-500 transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
          >
            <ChevronUp className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="font-bold">BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
