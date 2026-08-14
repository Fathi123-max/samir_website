"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Radio, ShieldCheck, MapPin } from "lucide-react";

export function BroadcastHUD() {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [dubaiTime, setDubaiTime] = useState("");

  const soundEnabled = useSyncExternalStore(
    (callback) => sound.subscribe(callback),
    () => sound.getSoundEnabled(),
    () => false
  );

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();

      // SMPTE Timecode (25 fps)
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 25)).padStart(2, "0");
      setTimecode(`${h}:${m}:${s}:${f}`);

      // Dubai Time (GST UTC+4)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dubai",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setDubaiTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 40);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    sound.toggleMute();
  };

  return (
    <div className="w-full bg-[#05070a] border-b border-[#1c2638] text-xs font-mono select-none px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 sm:gap-4 text-slate-300 z-50 min-h-[40px]">
      {/* Left: Tally & System Locks */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-red-950/70 border border-red-700/80 text-red-300 font-semibold tracking-wider">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span className="text-[11px]">PGM 1: LIVE</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>SYNC: 100% (5600SPG)</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded text-[11px]">
          <Radio className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>ROUTING: 128x128 READY</span>
        </div>
      </div>

      {/* Center: Live Timecode & Dubai Clock */}
      <div className="flex items-center gap-4 text-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-amber-400 font-bold text-[11px]">TC:</span>
          <span className="font-mono tracking-widest text-white bg-[#0d131f] px-2.5 py-1 rounded border border-[#223147] font-semibold text-xs sm:text-sm">
            {timecode}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 text-slate-300 text-xs">
          <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
          <span>DUBAI (UTC+4):</span>
          <span className="text-white font-semibold">{dubaiTime}</span>
        </div>
      </div>

      {/* Right: Audio FX & Dispatch Tag */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleSound}
          aria-label={soundEnabled ? "Mute broadcast interface sound effects" : "Enable broadcast interface sound effects"}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all text-xs focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[28px] ${
            soundEnabled
              ? "bg-amber-500/20 border-amber-400 text-amber-300"
              : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" /> : <VolumeX className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />}
          <span className="hidden sm:inline font-medium">{soundEnabled ? "AUDIO FX: ON" : "AUDIO FX: OFF"}</span>
        </button>

        <span className="hidden xl:inline-block px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-medium">
          UAE & GCC AVAILABLE
        </span>
      </div>
    </div>
  );
}
