"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PERSONAL_INFO } from "@/lib/data";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Services", href: "#services", id: "services", index: "01" },
  { label: "Portfolio", href: "#events", id: "events", index: "02" },
  { label: "Showreel", href: "#showreel", id: "showreel", index: "03" },
  { label: "FAQ", href: "#faq", id: "faq", index: "04" },
];

const SPY_SECTIONS = ["hero", "services", "events", "showreel", "faq", "contact"];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
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
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Page scroll progress (0..1)
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0);

      // Scroll-spy
      const scrollPos = scrollY + 140;
      for (let i = SPY_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SPY_SECTIONS[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(SPY_SECTIONS[i]);
          break;
        }
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const closeDrawer = () => setIsOpen(false);

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-hairline shadow-[0_1px_2px_rgba(24,24,27,0.05)]"
          : "bg-white/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-[height] duration-200 ${
            scrolled ? "h-14 sm:h-16" : "h-16 sm:h-[4.5rem]"
          }`}
        >
          {/* Brand */}
          <Link
            href="#hero"
            onClick={closeDrawer}
            aria-label="Samir Elgammal — Home"
            className="flex items-center gap-3 group focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none rounded p-1 -m-1"
          >
            <span className="w-9 h-9 rounded bg-signal text-white flex items-center justify-center font-mono font-bold text-sm tracking-tight shrink-0 group-hover:bg-signal-deep transition-colors">
              SE
            </span>
            <span className="hidden sm:flex flex-col leading-tight">
              <span className="font-display font-semibold text-[15px] text-ink tracking-tight whitespace-nowrap">
                {PERSONAL_INFO.name}
              </span>
              <span className="eyebrow text-muted text-[10px] whitespace-nowrap">
                Broadcast &amp; OB Engineer
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1 text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={closeDrawer}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-2 rounded font-medium transition-colors min-h-[40px] inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none ${
                    isActive ? "text-signal" : "text-zinc-600 hover:text-ink hover:bg-paper"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-signal shrink-0" aria-hidden="true" />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded bg-signal hover:bg-signal-deep text-white text-sm font-semibold transition-colors min-h-[40px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Start a project
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile actions */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#contact"
              className="px-4 py-2.5 rounded bg-signal text-white text-xs font-semibold uppercase tracking-wide focus-visible:ring-2 focus-visible:ring-signal min-h-[44px] flex items-center justify-center"
            >
              Book
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="p-3 rounded border border-hairline bg-white text-ink hover:bg-paper focus-visible:ring-2 focus-visible:ring-signal min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll progress */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-signal transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ width: `${progress * 100}%` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          ref={drawerRef}
          id="mobile-navigation"
          tabIndex={-1}
          className="lg:hidden absolute inset-x-0 top-full z-40 bg-white border-b border-hairline px-5 pt-4 pb-6 shadow-[0_24px_48px_-16px_rgba(24,24,27,0.18)] focus:outline-none drawer-enter overscroll-contain max-h-[calc(100dvh-4rem)] overflow-y-auto"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col text-sm">
            <p className="eyebrow text-muted pb-3">Sections</p>
            <ul className="divide-y divide-hairline">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={closeDrawer}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center gap-4 py-3.5 min-h-[52px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-signal rounded-lg px-2 ${
                        isActive ? "text-signal" : "text-ink hover:text-signal"
                      }`}
                    >
                      <span className="font-mono text-xs text-zinc-400 tabular-nums w-6">
                        {item.index}
                      </span>
                      <span className="grow">{item.label}</span>
                      {isActive ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-signal shrink-0" aria-hidden="true" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 opacity-30" aria-hidden="true" />
                      )}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href="#contact"
                  onClick={closeDrawer}
                  aria-current={activeSection === "contact" ? "page" : undefined}
                  className="flex items-center gap-4 py-3.5 min-h-[52px] font-medium text-ink hover:text-signal transition-colors focus-visible:ring-2 focus-visible:ring-signal rounded px-2"
                >
                  <span className="font-mono text-xs text-zinc-400 tabular-nums w-6">05</span>
                  <span className="grow">Contact</span>
                  <ArrowUpRight className="w-4 h-4 opacity-30" aria-hidden="true" />
                </a>
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/[^+\d]/g, "")}`}
                onClick={closeDrawer}
                className="flex items-center justify-center px-4 py-3.5 rounded border border-hairline bg-paper text-ink font-semibold text-sm min-h-[48px] hover:border-signal hover:text-signal transition-colors focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
              >
                Call
              </a>
              <a
                href={PERSONAL_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeDrawer}
                className="flex items-center justify-center px-4 py-3.5 rounded bg-ink text-white font-semibold text-sm min-h-[48px] hover:bg-signal transition-colors focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
              >
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-ink/20 backdrop-blur-[2px] cursor-default"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
    </header>
  );
}
