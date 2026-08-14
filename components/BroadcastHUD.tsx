"use client";

import React, { useState, useEffect } from "react";
import { sound } from "@/lib/sound";
import { Volume2, VolumeX, Radio, ShieldCheck, MapPin } from "lucide-react";

export function BroadcastHUD() {
  const [timecode, setTimecode] = useState("00:00:00:00");
  const [dubaiTime, setDubaiTime] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Check initial sound state
    setSoundEnabled(sound.getSoundEnabled());

    const updateClocks = () => {
      const now = new Date();

      // SMPTE Timecode (25 fps approximation)
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
    const interval = setInterval(updateClocks, 40); // 25fps clock refresh
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const newState = sound.toggleMute();
    setSoundEnabled(newState);
  };

  return (
    <div className="w-full bg-[#05070a] border-b border-[#1c2638] text-xs font-mono select-none px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 text-slate-400 z-50">
      {/* Left: Tally & Live Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2 py-0.5 rounded bg-red-950/60 border border-red-800/80 text-red-400 font-semibold tracking-wider">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span>PGM 1: LIVE</span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SYNC: 100% (EVERTZ SPG LOCKED)</span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
          <Radio className="w-3.5 h-3.5" />
          <span>ROUTING: 128x128 MATRIX READY</span>
        </div>
      </div>

      {/* Center: Live Timecode */}
      <div className="flex items-center gap-4 text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="text-amber-500 font-bold">TC:</span>
          <span className="font-mono tracking-widest text-slate-100 bg-[#0d131f] px-2 py-0.5 rounded border border-[#223147] font-semibold text-xs sm:text-sm">
            {timecode}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 text-slate-400 text-xs">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>DUBAI (UTC+4):</span>
          <span className="text-slate-200 font-semibold">{dubaiTime}</span>
        </div>
      </div>

      {/* Right: Audio FX switch & Quick Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleSound}
          title={soundEnabled ? "Mute broadcast UI clicks" : "Enable broadcast UI sound effects"}
          className={`flex items-center gap-1.5 px-2 py-0.5 rounded border transition-all text-xs ${
            soundEnabled
              ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
              : "bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200"
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{soundEnabled ? "AUDIO FX: ON" : "AUDIO FX: OFF"}</span>
        </button>

        <span className="hidden xl:inline-block px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-400/90 font-medium">
          UAE & GCC AVAILABLE
        </span>
      </div>
    </div>
  );
}
