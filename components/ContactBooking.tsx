"use client";

import React from "react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/lib/data";
import { Reveal } from "./Reveal";
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from "lucide-react";

export function ContactBooking() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productionType: "Live Sports Championship",
    dates: "",
    location: "Dubai / UAE",
    selectedRoles: ["OB Systems Lead", "CCU Camera Shader"],
    message: "",
  });

  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const availableRoles = [
    "OB Systems Lead",
    "CCU Camera Shader",
    "EVS XT3/VIA Replay",
    "MCR Playout Engineer",
    "RF Wireless Specialist",
    "Master Sync & Routing",
  ];

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedRoles: prev.selectedRoles.includes(role)
        ? prev.selectedRoles.filter((r) => r !== role)
        : [...prev.selectedRoles, role],
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (!formData.company.trim())
      newErrors.company = "Please enter your company or channel name";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      const firstInvalid = ["client-name", "client-email", "client-company"].find(
        (id) => document.getElementById(id)
      );
      const el = firstInvalid ? document.getElementById(firstInvalid) : null;
      if (el) (el as HTMLElement).focus();
      return;
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ea580c", "#fb923c", "#18181b", "#ffffff"],
      });
    }

    setSubmitted(true);
  };

  const generateWhatsAppInquiry = () => {
    const rolesText = formData.selectedRoles.join(", ");
    const text = encodeURIComponent(
      `Hello Samir, my name is ${formData.name || "[Name]"} from ${
        formData.company || "[Company]"
      }.\n\nWe would like to book you for a ${formData.productionType} in ${
        formData.location || "UAE"
      }.\nTarget Dates: ${formData.dates || "Upcoming"}\nRequired Roles: ${rolesText}\n\nMessage: ${
        formData.message || "Please share your availability."
      }`
    );
    return `https://wa.me/971505639015?text=${text}`;
  };

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-white border text-ink placeholder:text-zinc-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal min-h-[48px] transition-colors ${
      hasError ? "border-red-400" : "border-hairline focus:border-signal"
    }`;

  return (
    <section
      id="contact"
      aria-label="Contact and booking"
      className="py-20 lg:py-28 bg-canvas scroll-mt-20"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-14 lg:mb-20">
          <Reveal direction="up">
            <p className="eyebrow text-signal mb-4">07 · Contact</p>
          </Reveal>
          <Reveal direction="up" delay={0.08}>
            <h2 className="fluid-h2 font-display font-semibold text-ink">
              Book Samir for your{" "}
              <em className="italic text-signal">next live broadcast</em>.
            </h2>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="text-zinc-600 fluid-body mt-5">
              Available for OB truck deployments, sports championships, studio
              playout, and international flyaways across Dubai, Abu Dhabi,
              Saudi Arabia, and the GCC.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left column — direct contact */}
          <div className="lg:col-span-5 space-y-8">
            <Reveal direction="up" delay={0.1}>
              <div className="rounded-2xl border border-hairline bg-paper p-6 sm:p-8">
                <p className="inline-flex items-center gap-2.5 text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-5">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Currently available
                </p>

                <h3 className="font-display font-bold text-xl text-ink leading-snug mb-1.5">
                  Open for UAE, GCC &amp; flyaway deployments
                </h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-7">
                  Immediate dispatch capability for sports OB trucks,
                  international summits, and studio playout facilities.
                </p>

                <ul className="divide-y divide-hairline border-y border-hairline">
                  <li>
                    <a
                      href={PERSONAL_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat directly on WhatsApp with Samir"
                      className="group flex items-center gap-4 py-4 focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none rounded-lg"
                    >
                      <span className="w-9 h-9 rounded-full bg-white border border-hairline flex items-center justify-center shrink-0 group-hover:border-signal group-hover:text-signal text-ink transition-colors">
                        <PhoneCall className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow text-muted block">Phone &amp; WhatsApp</span>
                        <span className="font-semibold text-ink text-sm">{PERSONAL_INFO.phone}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      aria-label="Send email to Samir"
                      className="group flex items-center gap-4 py-4 focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none rounded-lg"
                    >
                      <span className="w-9 h-9 rounded-full bg-white border border-hairline flex items-center justify-center shrink-0 group-hover:border-signal group-hover:text-signal text-ink transition-colors">
                        <Mail className="w-4 h-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow text-muted block">Email</span>
                        <span className="font-semibold text-ink text-sm break-all">{PERSONAL_INFO.email}</span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-4 py-4">
                    <span className="w-9 h-9 rounded-full bg-white border border-hairline flex items-center justify-center shrink-0 text-ink">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="eyebrow text-muted block">Based in</span>
                      <span className="font-semibold text-ink text-sm">{PERSONAL_INFO.location}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.16}>
              <p className="text-sm text-zinc-500 leading-relaxed px-1">
                Prefer email? Send production specs directly to{" "}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-semibold text-signal hover:underline focus-visible:ring-2 focus-visible:ring-signal rounded"
                >
                  {PERSONAL_INFO.email}
                </a>{" "}
                — replies within two hours during UAE business days.
              </p>
            </Reveal>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.14}>
              <div className="card-lift p-6 sm:p-8 lg:p-10 rounded-2xl bg-white border border-hairline">
                {submitted ? (
                  <div className="text-center py-12 space-y-5" role="status" aria-live="polite">
                    <span className="inline-flex w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 items-center justify-center text-emerald-600 mx-auto">
                      <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                    </span>
                    <h3 className="font-display font-semibold text-2xl text-ink">
                      Booking request received
                    </h3>
                    <p className="text-sm text-zinc-600 max-w-md mx-auto leading-relaxed">
                      Thank you, <strong className="text-ink">{formData.name || "there"}</strong>.
                      Your inquiry for the {formData.productionType.toLowerCase()} has been noted —
                      send it straight through on WhatsApp for the fastest reply.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3 pt-3">
                      <a
                        href={generateWhatsAppInquiry()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-full bg-signal hover:bg-signal-deep text-white font-semibold text-sm transition-colors min-h-[50px] inline-flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Send via WhatsApp
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3.5 rounded-full border border-hairline hover:border-signal hover:text-signal text-ink font-semibold text-sm transition-colors min-h-[50px]"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="client-name" className="block text-sm font-semibold text-ink mb-2">
                          Name <span className="text-signal">*</span>
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "client-name-error" : undefined}
                          autoComplete="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={inputClass(!!errors.name)}
                        />
                        {errors.name && (
                          <span id="client-name-error" className="text-red-600 text-xs mt-1.5 block">
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="client-company" className="block text-sm font-semibold text-ink mb-2">
                          Company / broadcaster <span className="text-signal">*</span>
                        </label>
                        <input
                          id="client-company"
                          type="text"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.company}
                          aria-describedby={errors.company ? "client-company-error" : undefined}
                          autoComplete="organization"
                          placeholder="e.g. Abu Dhabi Sports"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={inputClass(!!errors.company)}
                        />
                        {errors.company && (
                          <span id="client-company-error" className="text-red-600 text-xs mt-1.5 block">
                            {errors.company}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="client-email" className="block text-sm font-semibold text-ink mb-2">
                          Email <span className="text-signal">*</span>
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "client-email-error" : undefined}
                          autoComplete="email"
                          spellCheck={false}
                          placeholder="you@network.ae"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={inputClass(!!errors.email)}
                        />
                        {errors.email && (
                          <span id="client-email-error" className="text-red-600 text-xs mt-1.5 block">
                            {errors.email}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="client-phone" className="block text-sm font-semibold text-ink mb-2">
                          Phone / WhatsApp
                        </label>
                        <input
                          id="client-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+971 …"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={inputClass()}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="prod-type" className="block text-sm font-semibold text-ink mb-2">
                          Type of production
                        </label>
                        <select
                          id="prod-type"
                          value={formData.productionType}
                          onChange={(e) =>
                            setFormData({ ...formData, productionType: e.target.value })
                          }
                          className={`${inputClass()} appearance-none`}
                        >
                          <option value="Live Sports Championship">Live Sports Championship</option>
                          <option value="Diplomatic / UN Summit">Diplomatic / UN Summit</option>
                          <option value="Heritage / Camel Festival">Heritage / Camel Festival</option>
                          <option value="Primetime TV / Studio Game Show">Primetime TV / Studio Game Show</option>
                          <option value="Concert / Entertainment Event">Concert / Entertainment Event</option>
                          <option value="Flyaway Mobile OB Operation">Flyaway Mobile OB Operation</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="event-dates" className="block text-sm font-semibold text-ink mb-2">
                          Location &amp; dates
                        </label>
                        <input
                          id="event-dates"
                          type="text"
                          placeholder="e.g. Dubai / Oct 15 – 22"
                          value={formData.dates}
                          onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                          className={inputClass()}
                        />
                      </div>
                    </div>

                    <fieldset>
                      <legend className="block text-sm font-semibold text-ink mb-2.5">
                        Required engineering roles
                      </legend>
                      <div className="flex flex-wrap gap-2" role="group" aria-label="Select roles needed">
                        {availableRoles.map((role) => {
                          const isSelected = formData.selectedRoles.includes(role);
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleRoleToggle(role)}
                              aria-pressed={isSelected}
                              className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-colors min-h-[38px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none ${
                                isSelected
                                  ? "bg-signal-tint border-signal/40 text-signal"
                                  : "bg-white border-hairline text-zinc-500 hover:text-signal hover:border-signal/50"
                              }`}
                            >
                              {role}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div>
                      <label htmlFor="event-message" className="block text-sm font-semibold text-ink mb-2">
                        Event notes
                      </label>
                      <textarea
                        id="event-message"
                        rows={4}
                        placeholder="Camera count, transmission requirements, anything else…"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className={`${inputClass()} resize-none min-h-[110px]`}
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3.5 px-6 rounded-full bg-signal hover:bg-signal-deep text-white font-semibold transition-colors inline-flex items-center justify-center gap-2 min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:outline-none"
                      >
                        <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Send booking inquiry
                      </button>
                      <a
                        href={generateWhatsAppInquiry()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-3.5 px-6 rounded-full border border-hairline hover:border-signal hover:text-signal text-ink font-semibold transition-colors inline-flex items-center justify-center gap-2 min-h-[52px] focus-visible:ring-2 focus-visible:ring-signal focus-visible:outline-none"
                      >
                        <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                        Instant WhatsApp
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
