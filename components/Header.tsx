"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import {
  Menu,
  X,
  Radio,
  Calendar,
  Layers,
  Sliders,
  Cpu,
  Calculator,
  PhoneCall,
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "story", "simulator", "services", "events", "rack", "calculator", "contact"];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Experience", href: "#story", id: "story", icon: Layers },
    { label: "Live Routing", href: "#simulator", id: "simulator", icon: Radio },
    { label: "Capabilities", href: "#services", id: "services", icon: Sliders },
    { label: "Case Studies", href: "#events", id: "events", icon: Calendar },
    { label: "Tech Stack", href: "#rack", id: "rack", icon: Cpu },
    { label: "Calculators", href: "#calculator", id: "calculator", icon: Calculator },
  ];

  const handleNavClick = () => {
    sound.playButtonClick();
    setIsOpen(false);
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#07090e]/95 backdrop-blur-md border-b border-[#1c2638] shadow-2xl"
          : "bg-[#07090e]/85 backdrop-blur-sm border-b border-[#141d2b]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Title */}
          <Link
            href="#hero"
            onClick={() => sound.playTallyClick()}
            aria-label="Samir Elgammal - Home"
            className="flex items-center gap-3.5 group focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded-xl p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#182335] to-[#0d1420] border border-[#2d3f5e] flex items-center justify-center font-mono font-black text-amber-400 group-hover:border-amber-500/70 transition-all shadow-md group-hover:shadow-amber-500/20 shrink-0">
              <span className="text-base tracking-tighter">SE</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#07090e] animate-pulse" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors tracking-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold">
                  OB / CCU / EVS
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono tracking-wide leading-tight">
                System Broadcast Engineer • Dubai
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1.5 bg-[#0c121e]/90 border border-[#1e2a3d] p-1.5 rounded-full text-xs font-mono">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[36px] ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/25"
                      : "text-slate-200 hover:text-white hover:bg-[#162133]"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              onClick={() => sound.playButtonClick()}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all font-mono active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[44px]"
            >
              <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Book For Event</span>
            </a>

            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTallyClick()}
              aria-label="Direct message Samir on WhatsApp"
              className="p-2.5 px-3.5 rounded-xl bg-[#111927] hover:bg-[#1a2538] border border-[#23334c] text-emerald-400 hover:text-emerald-300 transition-all text-xs font-mono flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[44px]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" aria-hidden="true" />
              <span className="hidden md:inline font-semibold">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={() => sound.playButtonClick()}
              className="px-3.5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs font-mono uppercase focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] flex items-center justify-center"
            >
              Book
            </a>
            <button
              onClick={() => {
                sound.playButtonClick();
                setIsOpen(!isOpen);
              }}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="p-2.5 rounded-xl bg-[#111927] border border-[#23334c] text-slate-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isOpen ? <X className="w-5 h-5 shrink-0" aria-hidden="true" /> : <Menu className="w-5 h-5 shrink-0" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 top-[104px] sm:top-[120px] bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-40 lg:hidden bg-[#0a0f19] border-b border-[#1c2638] px-4 pt-4 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-2xl">
            <nav aria-label="Mobile Navigation" className="grid grid-cols-1 gap-2 font-mono text-sm">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-200 hover:text-amber-400 hover:bg-[#141e30] transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[48px]"
                >
                  <item.icon className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span className="font-semibold">{item.label}</span>
                </a>
              ))}
              <a
                href="#contact"
                onClick={handleNavClick}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-amber-300 bg-amber-500/15 border border-amber-500/40 mt-2 font-bold min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                <span>Contact & Booking Form</span>
              </a>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
