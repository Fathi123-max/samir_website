"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import {
  Menu,
  X,
  Radio,
  Tv,
  Calendar,
  Layers,
  Sliders,
  Cpu,
  Calculator,
  PhoneCall,
  Download,
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ["hero", "story", "simulator", "services", "events", "rack", "calculator", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Overview", href: "#hero", id: "hero", icon: Tv },
    { label: "Engineering Story", href: "#story", id: "story", icon: Layers },
    { label: "Signal Router", href: "#simulator", id: "simulator", icon: Radio },
    { label: "Capabilities", href: "#services", id: "services", icon: Sliders },
    { label: "Flagship Events", href: "#events", id: "events", icon: Calendar },
    { label: "Equipment Rack", href: "#rack", id: "rack", icon: Cpu },
    { label: "Calc Tool", href: "#calculator", id: "calculator", icon: Calculator },
  ];

  const handleNavClick = () => {
    sound.playButtonClick();
    setIsOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-[#07090e]/95 backdrop-blur-md border-b border-[#1c2638] shadow-2xl"
          : "bg-[#07090e]/80 backdrop-blur-sm border-b border-[#141d2b]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand / Logo */}
          <Link
            href="#hero"
            onClick={() => sound.playTallyClick()}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#182335] to-[#0d1420] border border-[#2d3f5e] flex items-center justify-center font-mono font-black text-amber-400 group-hover:border-amber-500/70 transition-all shadow-md group-hover:shadow-amber-500/20">
              <span className="text-sm sm:text-base tracking-tighter">SE</span>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#07090e] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-base sm:text-lg text-slate-100 group-hover:text-amber-400 transition-colors tracking-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden md:inline-block px-1.5 py-0.2 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  OB / CCU / EVS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono tracking-wide">
                System Broadcast Engineer • Dubai
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#0c121e]/80 border border-[#1e2a3d] p-1 rounded-full text-xs font-mono">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                      : "text-slate-300 hover:text-white hover:bg-[#162133]"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
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
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-semibold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all font-mono active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book For Event</span>
            </a>

            <a
              href={PERSONAL_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playTallyClick()}
              title="Chat directly on WhatsApp"
              className="p-2 rounded-lg bg-[#111927] hover:bg-[#1a2538] border border-[#23334c] text-emerald-400 hover:text-emerald-300 transition-all text-xs font-mono flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="hidden md:inline">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={() => sound.playButtonClick()}
              className="px-3 py-1.5 rounded bg-amber-500 text-slate-950 font-semibold text-xs font-mono uppercase"
            >
              Book
            </a>
            <button
              onClick={() => {
                sound.playButtonClick();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg bg-[#111927] border border-[#23334c] text-slate-300 hover:text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-[#0a0f19] border-b border-[#1c2638] px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1 font-mono text-sm">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-amber-400 hover:bg-[#141e30] transition-colors"
              >
                <item.icon className="w-4 h-4 text-amber-500" />
                <span>{item.label}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleNavClick}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-amber-300 bg-amber-500/10 border border-amber-500/30 mt-2 font-bold"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Contact & Booking Form</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
