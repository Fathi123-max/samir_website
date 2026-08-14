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
  Calendar,
  Send,
  CheckCircle2,
  Download,
  FileText,
  Clock,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function ContactBooking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productionType: "Live Sports Championship",
    dates: "",
    location: "UAE",
    selectedRoles: ["OB Systems Engineer", "CCU Operator"],
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTallyClick();

    // Trigger celebratory confetti
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
      className="py-20 lg:py-28 bg-[#06090f] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>DIRECT PRODUCTION BOOKING & DISPATCH</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Book Samir for Your Next Live Broadcast.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-300 fluid-body mt-3">
              Available for tier-1 OB truck deployments, sports championships, studio playout setups, and international flyaways across Dubai, Abu Dhabi, Saudi Arabia, and the GCC.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Live Availability */}
          <div className="lg:col-span-5 space-y-6">
            {/* Status Card */}
            <Reveal direction="left" delay={0.2}>
              <div className="p-6 rounded-3xl bg-[#0c121e] border border-[#1f2d44] shadow-xl bevel-panel">
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    CURRENT AVAILABILITY STATUS
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-mono mb-2">
                  Open for UAE, GCC & Flyaway Deployments
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed mb-6">
                  Immediate dispatch capability for sports OB trucks, international summits, and studio playout facilities.
                </p>

                <div className="space-y-3 border-t border-[#182438] pt-4 text-xs font-mono">
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playTallyClick()}
                    className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:bg-emerald-900/60 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <div>
                        <span className="text-[10px] text-slate-400 block">PHONE & WHATSAPP</span>
                        <span className="font-bold text-white">{PERSONAL_INFO.phone}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-800 text-white font-bold">
                      CHAT NOW &rarr;
                    </span>
                  </a>

                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    onClick={() => sound.playButtonClick()}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#090e17] border border-[#1d2a3f] text-slate-300 hover:text-white hover:bg-[#121c2d] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <div>
                        <span className="text-[10px] text-slate-500 block">DIRECT EMAIL</span>
                        <span className="font-bold text-slate-200">{PERSONAL_INFO.email}</span>
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090e17] border border-[#1d2a3f] text-slate-300">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">OPERATIONAL BASE</span>
                      <span className="font-bold text-slate-200">{PERSONAL_INFO.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ATS CV & Spec Sheet Download Tile */}
            <Reveal direction="left" delay={0.25}>
              <div className="p-6 rounded-3xl bg-[#0c121e] border border-[#1f2d44] shadow-xl">
                <div className="flex items-center gap-3 text-amber-400 font-mono text-xs mb-3">
                  <FileText className="w-4 h-4" />
                  <span className="font-bold tracking-wider">OFFICIAL ENGINEERING PROFILE</span>
                </div>
                <h4 className="text-base font-bold text-white font-display mb-2">
                  ATS-Optimized CV & Technical Dossier
                </h4>
                <p className="text-xs text-slate-400 font-sans mb-4">
                  Download Samir’s full engineering curriculum vitae detailing 18+ years of vision mixer, CCU, and EVS event assignments.
                </p>

                <a
                  href="https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/7487941/0f02829a-eaf4-4945-9ec2-6df7aeed7323/Samir-Elgamma-atsCV-eng-ccu-evs-2026.pdf?AWSAccessKeyId=ASIA2F3EMEYEQDVXVUNG&Signature=3KXerQFhm3RBE3IIuJPwXSxV6WE%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEDcaCXVzLWVhc3QtMSJHMEUCIBaaUAq58xdcyrX3CJKRr391kah9eUclo9LlRd3mA4FrAiEAk2a2Ulq1mtze4stZuWUdnDZiJPBEdiv7quuF9YhPcrIq8wQIABABGgw2OTk3NTMzMDk3MDUiDGgGacCZHGp76MvzCirQBJPBOcSsMsMdJGPt3%2FFZKnvU9UzPLvIWGQDfH5PLMM1%2FCXneKHUKL2IFfcXwZM2oB33FckYI%2BBeDHmsWQrPZMWpRHRHgCqBitB8V7bSkaQKa8OesNb2N8YV31ybZSFjpRMYD4Pr6kOZigISxrMMe5C3fWVD%2F62q2XP19zTui1aiBZPGjrR70FqGFWjrj8%2BkW5hsL7gkCs8cZOh9mMo2X5ESopuYIIWExW94CjL09FhHaFoj5gxgIF48EQdI115PUxyS8wM8rkswudfar9yEwRZTAWJ2TpQsSLarXWMZ1tr%2FiP3sHG%2B8P%2FtXWjQ4oBTfRW1GnASgDIpeeiHf0nLwaSsoB7xlFMcGnudMt4hrP0BmO8ugPxKwH3zkjoruu%2BLna%2FSKVT%2Fajef3ymEmoIQsZYZIrvB4sGnPv4LAXjwkLT5GW5pbN9xg1vChYqtVCqZWSA7lUKxAPHmNyhGn5EZv7N8tJvpxoYDnK58ZhaCeoxwuj3XiJMp8xDENpQ9QDK7C23fDXA9gyziioDWOFYHWaEwJ%2BdLaD%2BZhgFDNY5roPiCRAj1ljn6KKFDC4GOd693DUzTgdVV7to5dAL0EcOc6S9newDLmbS8vYs5tuWGiIFMur4b8fQ7%2BS8zFBjbMOszsFkb6Sbej1mOhr%2BmgpYSZ85F15kdLeGsZFRm2EN7%2B4RDNJ3tr6%2BTdN%2FlwdzWMF8%2FTuHWXnbzMagvv2GIVx8usXpSTJ%2F4Lp5snq03vNQBHaegKAAIqCFY4cnp29RoSmw1EpDFSkwnjTpNDW9qt5sjkPThAwls780wY6mAER74Nckcbc5yVfQMw%2FI5mM78vXy%2Fc994EhVEAaPvXZZmD1E9%2B7uuU4R3hv%2BJf%2BNHhtRCS8OU3Pkq%2BXHFlbbshuGPr3RL7unW2c071L0dc7qNlZFu8e3Jk91hkhCLKRvu0KgWF07uX4mAptOa12umFvdzpETfyqAbhKLUcC%2BCXXTLnYEWwGa4cpe4xCXSD3%2BXiTp%2BxVU803%2Fg%3D%3D&Expires=1786721513"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playButtonClick()}
                  className="w-full py-2.5 px-4 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Samir&apos;s ATS CV (PDF)</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <Reveal direction="right" delay={0.2}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0c121e] border border-[#1f2d44] shadow-2xl bevel-panel">
                <div className="flex items-center justify-between border-b border-[#182336] pb-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white font-mono">
                      Production Booking Dispatch
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Submit project parameters for immediate availability confirmation
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800">
                    DISPATCH READY
                  </span>
                </div>

                {submitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white font-mono">
                      Booking Request Received!
                    </h4>
                    <p className="text-sm text-slate-300 max-w-md mx-auto font-sans">
                      Thank you, {formData.name || "Client"}. Samir Elgammal has received your inquiry for the {formData.productionType} and will reply within 2 hours.
                    </p>

                    <div className="pt-4 flex flex-wrap justify-center gap-3">
                      <a
                        href={generateWhatsAppInquiry()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>Send via WhatsApp Directly</span>
                      </a>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-5 py-2.5 rounded-xl bg-[#131d2e] hover:bg-[#1a273d] text-slate-300 border border-[#24354f] font-mono text-xs font-semibold"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                    {/* Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">
                          YOUR NAME / CONTACT *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Tariq Al-Hashimi"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          BROADCASTER / PRODUCTION COMPANY *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Abu Dhabi Sports / Media City"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="tariq@network.ae"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1">
                          PHONE / WHATSAPP NUMBER
                        </label>
                        <input
                          type="tel"
                          placeholder="+971 50 ..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Production Type & Target Dates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1">
                          TYPE OF PRODUCTION
                        </label>
                        <select
                          value={formData.productionType}
                          onChange={(e) => {
                            sound.playJogClick();
                            setFormData({ ...formData, productionType: e.target.value });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 focus:outline-none focus:border-amber-400"
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
                        <label className="block text-slate-300 mb-1">
                          EVENT LOCATION & DATES
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Dubai / Oct 15 – 22"
                          value={formData.dates}
                          onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    {/* Required Engineering Roles Multi-Select */}
                    <div>
                      <label className="block text-slate-300 mb-2">
                        REQUIRED ENGINEERING ROLES:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availableRoles.map((role) => {
                          const isSelected = formData.selectedRoles.includes(role);
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => handleRoleToggle(role)}
                              className={`p-2 rounded-xl border text-[11px] font-bold text-left transition-all ${
                                isSelected
                                  ? "bg-amber-500/20 border-amber-500 text-amber-300"
                                  : "bg-[#080d17] border-[#1b283d] text-slate-400 hover:text-white"
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-amber-400" : "bg-slate-700"}`} />
                                <span className="truncate">{role}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message / Technical Specs */}
                    <div>
                      <label className="block text-slate-300 mb-1">
                        EVENT NOTES / SPECIFICATIONS
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detail camera count, OB truck model, transmission requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#080d17] border border-[#1b283d] text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-amber-400 resize-none"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="submit"
                        className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider shadow-xl shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Dispatch Booking Inquiry</span>
                      </button>

                      <a
                        href={generateWhatsAppInquiry()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playTallyClick()}
                        className="w-full sm:w-auto py-3.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <PhoneCall className="w-4 h-4" />
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
