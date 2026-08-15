"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { PERSONAL_INFO } from "@/lib/data";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  Download,
  FileText,
} from "lucide-react";

export function ContactBooking() {
  const [formData, setFormData] = useState({
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

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableRoles = [
    "OB Systems Lead",
    "CCU Camera Shader",
    "EVS XT3/VIA Replay",
    "MCR Playout Engineer",
    "RF Wireless Specialist",
    "Master Sync & Routing",
  ];

  const handleRoleToggle = (role: string) => {
    sound.playJogClick();
    if (formData.selectedRoles.includes(role)) {
      setFormData({
        ...formData,
        selectedRoles: formData.selectedRoles.filter((r) => r !== role),
      });
    } else {
      setFormData({
        ...formData,
        selectedRoles: [...formData.selectedRoles, role],
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim() || !formData.email.includes("@"))
      newErrors.email = "Please enter a valid email address";
    if (!formData.company.trim()) newErrors.company = "Please enter your company or channel name";
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
      if (el) {
        (el as HTMLElement).focus();
      } else {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }
      return;
    }

    sound.playTallyClick();

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#06b6d4", "#10b981", "#ffffff"],
    });

    setSubmitted(true);
  };

  const generateWhatsAppInquiry = () => {
    const rolesText = formData.selectedRoles.join(", ");
    const text = encodeURIComponent(
      `Hello Samir, my name is ${formData.name || "[Name]"} from ${formData.company || "[Company]"}.\n\nWe would like to book you for a ${formData.productionType} in ${formData.location || "UAE"}.\nTarget Dates: ${formData.dates || "Upcoming"}\nRequired Roles: ${rolesText}\n\nMessage: ${formData.message || "Please share your availability."}`
    );
    return `https://wa.me/971505639015?text=${text}`;
  };

  return (
    <section
      id="contact"
      aria-label="Contact and Production Booking"
      className="py-20 lg:py-28 bg-[#06090f] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-4">
              <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>PRODUCTION BOOKING & DISPATCH</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Book Samir for Your Next Live Broadcast.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-200 fluid-body mt-4 font-normal">
              Available for tier-1 OB truck deployments, sports championships, studio playout setups, and international flyaways across Dubai, Abu Dhabi, Saudi Arabia, and the GCC.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Details & Live Availability */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Status Card */}
            <Reveal direction="left" delay={0.2}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1f2d44] shadow-xl bevel-panel space-y-6">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3" aria-hidden="true">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    CURRENT AVAILABILITY STATUS
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-mono mb-2">
                    Open for UAE, GCC & Flyaway Deployments
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    Immediate dispatch capability for sports OB trucks, international summits, and studio playout facilities.
                  </p>
                </div>

                <div className="space-y-4 border-t border-[#182438] pt-6 text-xs font-mono">
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTallyClick()}
                    aria-label="Chat directly on WhatsApp with Samir"
                    className="flex items-center justify-between p-4 rounded-2xl bg-emerald-950/50 border border-emerald-700/80 text-emerald-300 hover:bg-emerald-900/60 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[52px]"
                  >
                    <div className="flex items-center gap-4">
                      <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-[10px] text-slate-300 block font-medium">PHONE & WHATSAPP</span>
                        <span className="font-bold text-white text-sm">{PERSONAL_INFO.phone}</span>
                      </div>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-lg bg-emerald-800 text-white font-bold">
                      CHAT &rarr;
                    </span>
                  </a>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onClick={() => sound.playButtonClick()}
                    aria-label="Send email to Samir"
                    className="flex items-center justify-between p-4 rounded-2xl bg-[#090e17] border border-[#1d2a3f] text-slate-200 hover:text-white hover:bg-[#121c2d] transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none min-h-[52px]"
                  >
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">DIRECT EMAIL</span>
                        <span className="font-bold text-slate-100">{PERSONAL_INFO.email}</span>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#090e17] border border-[#1d2a3f] text-slate-200 min-h-[52px]">
                    <MapPin className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">OPERATIONAL BASE</span>
                      <span className="font-bold text-slate-100">{PERSONAL_INFO.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ATS CV & Spec Sheet Download Tile */}
            <Reveal direction="left" delay={0.25}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1f2d44] shadow-xl space-y-4">
                <div className="flex items-center gap-3 text-amber-300 font-mono text-xs">
                  <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="font-bold tracking-wider uppercase">OFFICIAL ENGINEERING PROFILE</span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  ATS-Optimized CV & Technical Dossier
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Download Samir’s full engineering curriculum vitae detailing 18+ years of vision mixer, CCU, and EVS event assignments.
                </p>

                <a
                  href={`${PERSONAL_INFO.whatsappUrl}?text=${encodeURIComponent("Hi Samir, I'd like to request your ATS CV and technical dossier for review.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playButtonClick()}
                  aria-label="Request Samir's ATS CV via WhatsApp"
                  className="w-full py-4 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 font-mono text-xs font-bold transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[48px]"
                >
                  <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Request CV via WhatsApp</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.2}>
              <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0c121e] border border-[#1f2d44] shadow-2xl bevel-panel space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#182336] pb-5">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-mono">
                      Production Booking Dispatch
                    </h3>
                    <p className="text-xs text-slate-300 font-mono mt-1">
                      Submit project parameters for immediate availability confirmation
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold px-3 py-1 rounded-lg bg-emerald-950/70 border border-emerald-700">
                    DISPATCH READY
                  </span>
                </div>

                {submitted ? (
                  <div className="text-center py-12 space-y-5" role="status" aria-live="polite">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8 shrink-0" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white font-mono">
                        Booking Request Received!
                      </h4>
                      <p className="text-sm text-slate-200 max-w-md mx-auto font-sans leading-relaxed">
                        Thank you, <strong className="text-amber-400">{formData.name || "Client"}</strong>. Samir Elgammal has received your inquiry for the {formData.productionType} and will reply within 2 hours.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-wrap justify-center gap-4">
                      <a
                        href={generateWhatsAppInquiry()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-colors flex items-center gap-2 min-h-[48px]"
                      >
                        <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Send via WhatsApp Directly</span>
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-4 rounded-xl bg-[#131d2e] hover:bg-[#1a273d] text-slate-200 border border-[#24354f] font-mono text-xs font-semibold min-h-[48px]"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5 text-xs font-mono">
                    {/* Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="client-name" className="block text-slate-200 mb-2 font-semibold">
                          YOUR NAME / CONTACT <span className="text-amber-400">*</span>
                        </label>
                        <input
                          id="client-name"
                          type="text"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "client-name-error" : undefined}
                          autoComplete="name"
                          placeholder="e.g. Tariq Al-Hashimi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-[#080d17] border text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[48px] ${
                            errors.name ? "border-red-500 focus:border-red-400" : "border-[#1b283d] focus:border-amber-400"
                          }`}
                        />
                        {errors.name && <span id="client-name-error" className="text-red-400 text-[11px] mt-1 block font-medium">{errors.name}</span>}
                      </div>

                      <div>
                        <label htmlFor="client-company" className="block text-slate-200 mb-2 font-semibold">
                          BROADCASTER / COMPANY <span className="text-amber-400">*</span>
                        </label>
                        <input
                          id="client-company"
                          type="text"
                          required
                          aria-required="true"
                          aria-invalid={!!errors.company}
                          aria-describedby={errors.company ? "client-company-error" : undefined}
                          autoComplete="organization"
                          placeholder="e.g. Abu Dhabi Sports / Media City"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-[#080d17] border text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[48px] ${
                            errors.company ? "border-red-500 focus:border-red-400" : "border-[#1b283d] focus:border-amber-400"
                          }`}
                        />
                        {errors.company && <span id="client-company-error" className="text-red-400 text-[11px] mt-1 block font-medium">{errors.company}</span>}
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="client-email" className="block text-slate-200 mb-2 font-semibold">
                          EMAIL ADDRESS <span className="text-amber-400">*</span>
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
                          placeholder="tariq@network.ae"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl bg-[#080d17] border text-slate-100 placeholder:text-slate-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[48px] ${
                            errors.email ? "border-red-500 focus:border-red-400" : "border-[#1b283d] focus:border-amber-400"
                          }`}
                        />
                        {errors.email && <span id="client-email-error" className="text-red-400 text-[11px] mt-1 block font-medium">{errors.email}</span>}
                      </div>

                      <div>
                        <label htmlFor="client-phone" className="block text-slate-200 mb-2 font-semibold">
                          PHONE / WHATSAPP NUMBER
                        </label>
                        <input
                          id="client-phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+971 50 …"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[48px]"
                        />
                      </div>
                    </div>

                    {/* Production Type & Target Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="prod-type" className="block text-slate-200 mb-2 font-semibold">
                          TYPE OF PRODUCTION
                        </label>
                        <select
                          id="prod-type"
                          value={formData.productionType}
                          onChange={(e) => {
                            sound.playJogClick();
                            setFormData({ ...formData, productionType: e.target.value });
                          }}
                          className="w-full px-4 py-3 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 focus:outline-none focus:border-amber-400 min-h-[48px]"
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
                        <label htmlFor="event-dates" className="block text-slate-200 mb-2 font-semibold">
                          EVENT LOCATION & DATES
                        </label>
                        <input
                          id="event-dates"
                          type="text"
                          placeholder="e.g. Dubai / Oct 15 – 22"
                          value={formData.dates}
                          onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[48px]"
                        />
                      </div>
                    </div>

                    {/* Required Engineering Roles Multi-Select */}
                    <fieldset className="space-y-2">
                      <legend className="block text-slate-200 mb-2 font-semibold">
                        REQUIRED ENGINEERING ROLES:
                      </legend>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-label="Select roles needed">
                        {availableRoles.map((role) => {
                          const isSelected = formData.selectedRoles.includes(role);
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleRoleToggle(role)}
                              aria-pressed={isSelected}
                              className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-400 text-amber-300"
                                  : "bg-[#080d17] border-[#1b283d] text-slate-300 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? "bg-amber-400" : "bg-slate-600"}`} aria-hidden="true" />
                                <span className="min-w-0 leading-tight">{role}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {/* Message / Technical Specs */}
                    <div>
                      <label htmlFor="event-message" className="block text-slate-200 mb-2 font-semibold">
                        EVENT NOTES / SPECIFICATIONS
                      </label>
                      <textarea
                        id="event-message"
                        rows={5}
                        placeholder="Detail camera count, OB truck model, transmission requirements…"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 resize-none min-h-[120px]"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold font-mono text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-colors flex items-center justify-center gap-3 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[48px]"
                      >
                        <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Dispatch Booking Inquiry</span>
                      </button>

                      <a
                        href={generateWhatsAppInquiry()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playTallyClick()}
                        className="w-full sm:w-auto py-4 px-6 rounded-xl bg-emerald-600/25 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/50 font-mono text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none min-h-[48px]"
                      >
                        <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Instant WhatsApp</span>
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
