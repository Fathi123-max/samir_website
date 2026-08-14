"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  Radio,
  Camera,
  Sliders,
  Film,
  Send,
  Play,
} from "lucide-react";

export function SignalFlowSimulator() {
  const [selectedCam, setSelectedCam] = useState<number>(1);
  const [colorPreset, setColorPreset] = useState<"5600K" | "3200K" | "D65">("5600K");
  const [irisLevel, setIrisLevel] = useState<number>(75);
  const [evsSpeed, setEvsSpeed] = useState<number>(33);
  const [pgmActive, setPgmActive] = useState<boolean>(true);
  const [routingBackup, setRoutingBackup] = useState<boolean>(false);
  const [replayCue, setReplayCue] = useState<boolean>(false);

  const cameras = [
    { id: 1, name: "CAM 01", model: "Sony HDC-4300", type: "Main Center Gantry (4K)", fiber: "SMPTE Fiber A", tally: "PGM" },
    { id: 2, name: "CAM 02", model: "Sony HDC-3500", type: "18-Yard Box Right", fiber: "SMPTE Fiber B", tally: "PVW" },
    { id: 3, name: "CAM 03", model: "Vislink COFDM", type: "RF Wireless Chase Cam", fiber: "Wireless RF 7GHz", tally: "STBY" },
    { id: 4, name: "CAM 04", model: "Grass Valley LDX", type: "Super Slow-Mo 6x Reverse", fiber: "SMPTE Fiber C", tally: "EVS" },
  ];

  const triggerReplay = () => {
    sound.playJogClick();
    setReplayCue(true);
    setTimeout(() => {
      setReplayCue(false);
    }, 2400);
  };

  const handleCamSelect = (id: number) => {
    sound.playButtonClick();
    setSelectedCam(id);
  };

  const toggleRouterPath = () => {
    sound.playTallyClick();
    setRoutingBackup(!routingBackup);
  };

  return (
    <section
      id="simulator"
      aria-label="Signal Routing Simulator"
      className="py-20 lg:py-28 bg-[#06090f] border-b border-[#162133] relative overflow-hidden scroll-mt-28"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[250px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
              <Radio className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>INTERACTIVE OB VAN SCHEMATIC & ROUTING SIMULATOR</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Live Signal Flow Architecture Simulator
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-200 fluid-body mt-4 font-normal">
              Test Samir’s broadcast signal chain in real-time. Select camera inputs, adjust CCU colorimetry, switch router redundancy paths, and trigger EVS super slow-motion replays.
            </p>
          </Reveal>
        </div>

        {/* The Live Interactive Command Matrix */}
        <Reveal direction="scale" delay={0.2}>
          <div className="rounded-3xl bg-[#090e17] border border-[#1d2a3f] p-6 sm:p-8 lg:p-10 shadow-2xl bevel-panel space-y-8">
            {/* Top Rack Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1b283d] text-xs font-mono">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1624] border border-[#23344d] text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" aria-hidden="true" />
                  <span className="font-bold">OB UNIT: DUBAI TRUCK ALPHA</span>
                </div>
                <div className="text-slate-300 hidden sm:inline">
                  MASTER SYNC: <span className="text-emerald-400 font-bold">LOCKED (5600SPG)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-300">ROUTER BACKUP TRUNK:</span>
                <button
                  onClick={toggleRouterPath}
                  aria-pressed={routingBackup}
                  className={`px-4 py-2 rounded-xl border transition-all text-xs font-mono font-bold focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[40px] ${
                    routingBackup
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                      : "bg-[#111927] text-slate-200 border-[#22334d] hover:text-white"
                  }`}
                >
                  {routingBackup ? "SECONDARY OPTICAL RING [ENGAGED]" : "PRIMARY TRUNK [NORMAL]"}
                </button>
              </div>
            </div>

            {/* Signal Flow Visual Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
              {/* Node 1: Camera Ingest */}
              <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between h-full space-y-4 ${
                selectedCam ? "bg-[#0f1726] border-cyan-500/60 shadow-lg ring-1 ring-cyan-500/20" : "bg-[#0a0f19] border-[#182436]"
              }`}>
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-3">
                    <span className="font-bold">STAGE 01</span>
                    <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1">Camera Ingest</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    {cameras.find((c) => c.id === selectedCam)?.model}
                  </p>
                </div>

                <div className="space-y-2 font-mono text-[11px]" role="group" aria-label="Select camera channel">
                  {cameras.map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => handleCamSelect(cam.id)}
                      aria-pressed={selectedCam === cam.id}
                      className={`w-full px-3 py-2 rounded-xl flex items-center justify-between border transition-all min-h-[38px] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                        selectedCam === cam.id
                          ? "bg-cyan-950/70 border-cyan-400 text-cyan-200 font-bold"
                          : "bg-[#090d16] border-[#172336] text-slate-300 hover:text-white"
                      }`}
                    >
                      <span>{cam.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-semibold">
                        {cam.tally}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Node 2: CCU Paint Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1726] border border-[#202f47] shadow-lg flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-amber-300 mb-3">
                    <span className="font-bold">STAGE 02</span>
                    <Sliders className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1">Sony RCP-1500 CCU</h3>
                  <p className="text-xs text-slate-300 font-mono">Real-time Shading</p>
                </div>

                <div className="space-y-4 font-mono text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-200 mb-1.5">
                      <span>COLOR TEMP:</span>
                      <span className="text-amber-400 font-bold">{colorPreset}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Select color temperature">
                      {(["3200K", "5600K", "D65"] as const).map((temp) => (
                        <button
                          key={temp}
                          onClick={() => {
                            sound.playJogClick();
                            setColorPreset(temp);
                          }}
                          aria-pressed={colorPreset === temp}
                          className={`py-1.5 rounded-lg border text-[11px] font-bold focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none min-h-[34px] ${
                            colorPreset === temp
                              ? "bg-amber-500 text-slate-950 border-amber-400"
                              : "bg-[#090d16] border-[#1a2538] text-slate-300 hover:text-white"
                          }`}
                        >
                          {temp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-200 mb-1.5">
                      <span>IRIS EXPOSURE:</span>
                      <span className="text-cyan-400 font-bold">{irisLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      aria-label="Adjust camera iris exposure level"
                      aria-valuemin={30}
                      aria-valuemax={100}
                      aria-valuenow={irisLevel}
                      value={irisLevel}
                      onChange={(e) => {
                        sound.playJogClick();
                        setIrisLevel(Number(e.target.value));
                      }}
                      className="w-full accent-amber-400 h-2 bg-slate-800 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Node 3: Router Matrix */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1726] border border-[#202f47] shadow-lg flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-300 mb-3">
                    <span className="font-bold">STAGE 03</span>
                    <Radio className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1">Nevion 128x128</h3>
                  <p className="text-xs text-slate-300 font-mono">Baseband SDI Matrix</p>
                </div>

                <div className="p-4 rounded-xl bg-[#090d16] border border-[#172336] font-mono text-[11px] space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-300">SRC IN:</span>
                    <span className="text-cyan-300 font-semibold">CAM 0{selectedCam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">SYNC JITTER:</span>
                    <span className="text-emerald-400 font-bold">&lt; 0.05 UI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">PATH:</span>
                    <span className={routingBackup ? "text-amber-400 font-bold" : "text-emerald-400 font-bold"}>
                      {routingBackup ? "OPTICAL RING B" : "DIRECT 12G-SDI"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 4: EVS XT3 Replay */}
              <div className={`p-5 sm:p-6 rounded-2xl border transition-all flex flex-col justify-between h-full space-y-4 ${
                replayCue ? "bg-[#181a28] border-red-500 shadow-red-500/20 ring-1 ring-red-500/40" : "bg-[#0f1726] border-[#202f47]"
              }`}>
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-3">
                    <span className="font-bold">STAGE 04</span>
                    <Film className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1">EVS XT3 Max</h3>
                  <p className="text-xs text-slate-300 font-mono">Live Replay & Highlights</p>
                </div>

                <div className="space-y-3 font-mono text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-200 mb-1.5">
                      <span>SPEED:</span>
                      <span className="text-red-400 font-bold">{evsSpeed}% SLOW-MO</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5" role="group" aria-label="Select slow motion replay speed">
                      {[25, 33, 50].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => {
                            sound.playJogClick();
                            setEvsSpeed(spd);
                          }}
                          aria-pressed={evsSpeed === spd}
                          className={`py-1.5 rounded-lg border text-[11px] font-bold focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none min-h-[34px] ${
                            evsSpeed === spd
                              ? "bg-red-500 text-white border-red-400"
                              : "bg-[#090d16] border-[#1a2538] text-slate-300 hover:text-white"
                          }`}
                        >
                          {spd}%
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={triggerReplay}
                    aria-label="Cue and trigger EVS slow motion replay clip"
                    className={`w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all min-h-[42px] focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none ${
                      replayCue
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-red-950/80 border border-red-700/80 text-red-300 hover:bg-red-900"
                    }`}
                  >
                    <Play className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{replayCue ? "REPLAY ON-AIR..." : "CUE EVS CLIP"}</span>
                  </button>
                </div>
              </div>

              {/* Node 5: Transmission Out */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0f1726] border border-[#202f47] shadow-lg flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-purple-300 mb-3">
                    <span className="font-bold">STAGE 05</span>
                    <Send className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-1">Tx & Playout</h3>
                  <p className="text-xs text-slate-300 font-mono">Satellite & Fiber Handover</p>
                </div>

                <div className="p-4 rounded-xl bg-[#090d16] border border-[#172336] font-mono text-[11px] space-y-2">
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span>SNG UPLINK:</span>
                    <span>100% OK</span>
                  </div>
                  <div className="flex items-center justify-between text-cyan-300 font-semibold">
                    <span>FIBER MCR:</span>
                    <span>TX READY</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-300 font-semibold">
                    <span>STREAM OTT:</span>
                    <span>50 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Live Program Output Console */}
            <div className={`p-6 sm:p-8 rounded-2xl border transition-all flex flex-col lg:flex-row items-center justify-between gap-6 ${
              replayCue ? "bg-[#140a0f] border-red-500/70 shadow-lg shadow-red-500/20" : "bg-[#060a12] border-[#1a263c]"
            }`} aria-live="polite">
              <div className="space-y-1.5 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono">
                  <span className={`w-2.5 h-2.5 rounded-full ${replayCue ? "bg-red-500 animate-ping" : "bg-emerald-400"}`} aria-hidden="true" />
                  <span className={`font-bold tracking-widest uppercase ${replayCue ? "text-red-400" : "text-emerald-400"}`}>
                    {replayCue ? "● EVS REPLAY INSERTION ON-AIR (33% SLOW-MO)" : "● LIVE BROADCAST MASTER FEED ACTIVE"}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                  ACTIVE FEED: {cameras.find((c) => c.id === selectedCam)?.name} • {colorPreset} • {irisLevel}% IRIS
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  Routed via {routingBackup ? "Secondary Optical Ring B" : "Primary 12G-SDI Matrix"} &bull; Audio -18 dBFS Phase Aligned
                </p>
                {replayCue && (
                  <div className="w-full bg-red-950 rounded-full h-1.5 mt-2 overflow-hidden" aria-hidden="true">
                    <div className="bg-red-500 h-full w-full animate-pulse transition-all duration-300" />
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    sound.playTallyClick();
                    setPgmActive(!pgmActive);
                  }}
                  aria-pressed={pgmActive}
                  className={`px-5 py-3 rounded-xl font-mono text-xs font-bold border transition-all min-h-[44px] focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none ${
                    pgmActive
                      ? "bg-red-600 text-white border-red-500 glow-live"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  {pgmActive ? "PGM BUS: LIVE ON-AIR" : "PGM BUS: BLACK / CUT"}
                </button>

                <a
                  href="#contact"
                  onClick={() => sound.playButtonClick()}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
                >
                  Book This Workflow
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
