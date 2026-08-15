"use client";

import React, { useState, useEffect, useRef } from "react";
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
  ChevronRight,
} from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    if (isOpen) {
      const previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
      drawerRef.current?.focus();

      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyDown);
        previouslyFocused?.focus();
      };
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "story", "simulator", "services", "events", "rack", "calculator", "contact"];
      const scrollPos = window.scrollY + 140;

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
    <>
    <header
      role="banner"
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "bg-[#07090e]/95 backdrop-blur-md border-b border-[#1c2638] shadow-2xl"
          : "bg-[#07090e]/85 backdrop-blur-sm border-b border-[#141d2b]"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo & Title */}
          <Link
            href="#hero"
            onClick={() => sound.playTallyClick()}
            aria-label="Samir Elgammal - Home"
            className="flex items-center gap-2 sm:gap-4 group focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none rounded-xl p-1"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#182335] to-[#0d1420] border border-[#2d3f5e] flex items-center justify-center font-mono font-black text-amber-400 group-hover:border-amber-500/70 transition-[border-color,box-shadow] shadow-md group-hover:shadow-amber-500/20 shrink-0">
              <span className="text-base tracking-tighter">SE</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#07090e] animate-pulse" aria-hidden="true" />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-display font-bold text-base sm:text-lg text-white group-hover:text-amber-400 transition-colors tracking-tight whitespace-nowrap">
                  {PERSONAL_INFO.name}
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/40 font-semibold shrink-0 leading-none">
                  OB / CCU / EVS
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-300 font-mono tracking-wide leading-tight whitespace-nowrap">
                System Broadcast Engineer • Dubai
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-0.5 bg-[#0c121e]/90 border border-[#1e2a3d] p-1 rounded-full text-xs font-mono">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  aria-current={isActive ? "page" : undefined}
                  className={`px-3 py-2 rounded-full whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[40px] inline-flex items-center ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/25"
                      : "text-slate-200 hover:text-white hover:bg-[#162133]"
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden xl:flex items-center gap-2.5">
            <a
              href="#contact"
              onClick={() => sound.playButtonClick()}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-colors font-mono active:scale-95 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[40px]"
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
              className="p-2.5 px-3 rounded-xl bg-[#111927] hover:bg-[#1a2538] border border-[#23334c] text-emerald-400 hover:text-emerald-300 transition-colors text-xs font-mono flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[40px]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" aria-hidden="true" />
              <span className="hidden md:inline font-semibold">WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href="#contact"
              onClick={() => sound.playButtonClick()}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs font-mono uppercase focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] flex items-center justify-center"
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
              aria-controls="mobile-navigation"
              className="p-3 rounded-xl bg-[#111927] border border-[#23334c] text-slate-200 hover:text-white focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isOpen ? <X className="w-5 h-5 shrink-0" aria-hidden="true" /> : <Menu className="w-5 h-5 shrink-0" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          tabIndex={-1}
          className="relative z-40 xl:hidden bg-[#0a0f19]/95 backdrop-blur-xl border-b border-[#1c2638] px-5 pt-4 pb-6 shadow-2xl focus:outline-none drawer-enter overscroll-contain max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col font-mono text-sm">
            <p className="px-3 pb-3 text-[10px] font-mono uppercase tracking-[0.25em] text-slate-500">
              Menu
            </p>

            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={handleNavClick}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex items-center justify-between gap-3 px-3 py-3 rounded-xl min-h-[48px] transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isActive
                        ? "bg-amber-500/[0.08] text-amber-300"
                        : "text-slate-200 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      <item.icon
                        className={`w-4 h-4 shrink-0 transition-colors ${
                          isActive ? "text-amber-400" : "text-slate-500 group-hover:text-slate-300"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="font-medium truncate">{item.label}</span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        isActive ? "text-amber-400" : "text-slate-600"
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[#1c2638]/70 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={handleNavClick}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold text-xs font-mono uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-300 transition-colors active:scale-[0.99] min-h-[48px]"
              >
                <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Book For Event</span>
              </a>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playTallyClick()}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0c1420] border border-[#1e2a3d] text-slate-200 hover:text-white hover:border-[#2a3952] hover:bg-[#111927] transition-colors text-xs font-mono font-semibold min-h-[48px]"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping shrink-0" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>

    {isOpen && (
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 xl:hidden"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    )}
    </>
  );
}
