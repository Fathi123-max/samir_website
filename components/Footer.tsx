"use client";

import React from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import {
  Radio,
  Tv,
  MapPin,
  Mail,
  PhoneCall,
  ShieldCheck,
  ChevronUp,
  Award,
} from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    sound.playTallyClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#04060a] border-t border-[#162133] text-slate-400 text-xs font-mono select-none">
      {/* Top telemetry strip */}
      <div className="border-b border-[#121a28] px-4 py-3 bg-[#06090f]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-slate-100">{PERSONAL_INFO.name}</span>
            <span className="text-slate-600">•</span>
            <span>SYSTEM BROADCAST & OB ENGINEER</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>TRANSMISSION: 1080p50 HDR READY</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-amber-400">DUBAI, UAE (GMT+4)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
                SE
              </div>
              <span className="font-display font-bold text-white text-sm">
                Samir Elgammal
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs leading-relaxed">
              18+ years of live broadcast engineering across major sports leagues, international diplomatic summits, and primetime television.
            </p>
            <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>99.99% Transmission Reliability</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2">
            <span className="text-slate-200 font-bold block mb-2 uppercase tracking-wider text-[11px]">
              Command Navigation
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <a href="#hero" className="hover:text-amber-400 transition-colors">
                  &bull; Overview & Hero
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-amber-400 transition-colors">
                  &bull; Engineering Heritage
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-amber-400 transition-colors">
                  &bull; Signal Flow Simulator
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  &bull; Core Capabilities
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-400 transition-colors">
                  &bull; Flagship Case Studies
                </a>
              </li>
              <li>
                <a href="#rack" className="hover:text-amber-400 transition-colors">
                  &bull; 19&quot; Equipment Rack
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Deployments */}
          <div className="space-y-2">
            <span className="text-slate-200 font-bold block mb-2 uppercase tracking-wider text-[11px]">
              Flagship Productions
            </span>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <Link href="/events/cop28-expo-city-dubai" className="hover:text-cyan-400 transition-colors">
                  &bull; COP28 UN World Summit
                </Link>
              </li>
              <li>
                <Link href="/events/uae-pro-league-adnoc" className="hover:text-cyan-400 transition-colors">
                  &bull; UAE Pro League (ADNOC)
                </Link>
              </li>
              <li>
                <Link href="/events/camel-racing-heritage-festivals" className="hover:text-cyan-400 transition-colors">
                  &bull; National Camel Racing (Al Dhafra)
                </Link>
              </li>
              <li>
                <Link href="/events/world-snooker-masters-ksa" className="hover:text-cyan-400 transition-colors">
                  &bull; World Snooker Masters (KSA)
                </Link>
              </li>
              <li>
                <Link href="/events/primetime-game-shows-emirates-draw" className="hover:text-cyan-400 transition-colors">
                  &bull; Emirates Draw & Top Chef
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Dispatch */}
          <div className="space-y-2">
            <span className="text-slate-200 font-bold block mb-2 uppercase tracking-wider text-[11px]">
              Direct Dispatch
            </span>
            <div className="space-y-2 text-xs">
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="pt-3">
              <a
                href="#contact"
                className="inline-block px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold font-mono text-[11px] uppercase transition-all"
              >
                Book For Event &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-6 border-t border-[#141e2e] flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Samir Elgammal. All Rights Reserved. Built with Next.js 15 App Router & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#0b1018] border border-[#1d2a3f] text-slate-300 hover:text-amber-400 hover:border-amber-500 transition-all"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            <span>BACK TO TOP</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
