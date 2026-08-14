"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  Radio,
  Camera,
  Sliders,
  Film,
  Tv,
  Send,
  Zap,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCw,
  Eye,
  Activity,
  Layers,
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
      className="py-20 lg:py-28 bg-[#06090f] border-b border-[#162133] relative overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[250px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
              <Radio className="w-3.5 h-3.5" />
              <span>INTERACTIVE OB VAN SCHEMATIC & ROUTING SIMULATOR</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Live Signal Flow Architecture Simulator
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-300 fluid-body mt-3">
              Test Samir’s broadcast signal chain in real-time. Select camera inputs, adjust CCU colorimetry, switch router redundancy paths, and trigger EVS super slow-motion replays.
            </p>
          </Reveal>
        </div>

        {/* The Live Interactive Command Matrix */}
        <Reveal direction="scale" delay={0.2}>
          <div className="rounded-3xl bg-[#090e17] border border-[#1d2a3f] p-4 sm:p-6 lg:p-8 shadow-2xl bevel-panel">
            {/* Top Rack Status Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[#1b283d] text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#0e1624] border border-[#23344d] text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>OB UNIT: DUBAI TRUCK ALPHA</span>
                </div>
                <div className="text-slate-400 hidden sm:inline">
                  MASTER SYNC: <span className="text-emerald-400 font-bold">LOCKED (5600SPG)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-400">ROUTER BACKUP TRUNK:</span>
                <button
                  onClick={toggleRouterPath}
                  className={`px-2.5 py-1 rounded border transition-all text-xs font-mono font-bold ${
                    routingBackup
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20"
                      : "bg-[#111927] text-slate-300 border-[#22334d] hover:text-white"
                  }`}
                >
                  {routingBackup ? "SECONDARY OPTICAL RING [ENGAGED]" : "PRIMARY TRUNK [NORMAL]"}
                </button>
              </div>
            </div>

            {/* Signal Flow Visual Pipeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {/* Node 1: Camera Ingest */}
              <div className={`p-4 rounded-xl border transition-all ${
                selectedCam ? "bg-[#0f1726] border-cyan-500/60 shadow-lg ring-1 ring-cyan-500/20" : "bg-[#0a0f19] border-[#182436]"
              }`}>
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-3">
                  <span className="font-bold">STAGE 01</span>
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mb-1">Camera Ingest</h4>
                <p className="text-xs text-slate-400 font-mono mb-3">
                  {cameras.find((c) => c.id === selectedCam)?.model}
                </p>

                <div className="space-y-1.5 font-mono text-[11px]">
                  {cameras.map((cam) => (
                    <button
                      key={cam.id}
                      onClick={() => handleCamSelect(cam.id)}
                      className={`w-full px-2 py-1.5 rounded flex items-center justify-between border transition-all ${
                        selectedCam === cam.id
                          ? "bg-cyan-950/60 border-cyan-500 text-cyan-200 font-bold"
                          : "bg-[#090d16] border-[#172336] text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span>{cam.name}</span>
                      <span className="text-[9px] px-1 rounded bg-slate-800 text-slate-300">
                        {cam.tally}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Node 2: CCU Paint Box */}
              <div className="p-4 rounded-xl bg-[#0f1726] border border-[#202f47] shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-3">
                  <span className="font-bold">STAGE 02</span>
                  <Sliders className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mb-1">Sony RCP-1500 CCU</h4>
                <p className="text-xs text-slate-400 font-mono mb-3">Real-time Shading</p>

                <div className="space-y-3 font-mono text-[11px]">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>COLOR TEMP:</span>
                      <span className="text-amber-400 font-bold">{colorPreset}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {(["3200K", "5600K", "D65"] as const).map((temp) => (
                        <button
                          key={temp}
                          onClick={() => {
                            sound.playJogClick();
                            setColorPreset(temp);
                          }}
                          className={`py-1 rounded border text-[10px] ${
                            colorPreset === temp
                              ? "bg-amber-500 text-slate-950 font-bold border-amber-400"
                              : "bg-[#090d16] border-[#1a2538] text-slate-400 hover:text-white"
                          }`}
                        >
                          {temp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>IRIS EXPOSURE:</span>
                      <span className="text-cyan-400 font-bold">{irisLevel}%</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={irisLevel}
                      onChange={(e) => {
                        sound.playJogClick();
                        setIrisLevel(Number(e.target.value));
                      }}
                      className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Node 3: Router Matrix */}
              <div className="p-4 rounded-xl bg-[#0f1726] border border-[#202f47] shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-3">
                  <span className="font-bold">STAGE 03</span>
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mb-1">Nevion 128x128</h4>
                <p className="text-xs text-slate-400 font-mono mb-3">Baseband SDI Matrix</p>

                <div className="p-3 rounded-lg bg-[#090d16] border border-[#172336] font-mono text-[11px] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">SRC IN:</span>
                    <span className="text-cyan-300 font-semibold">CAM 0{selectedCam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SYNC JITTER:</span>
                    <span className="text-emerald-400 font-bold">&lt; 0.05 UI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">PATH:</span>
                    <span className={routingBackup ? "text-amber-400 font-bold" : "text-emerald-400"}>
                      {routingBackup ? "OPTICAL RING B" : "DIRECT 12G-SDI"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Node 4: EVS XT3 Replay */}
              <div className={`p-4 rounded-xl border transition-all ${
                replayCue ? "bg-[#181a28] border-red-500 shadow-red-500/20 ring-1 ring-red-500/40" : "bg-[#0f1726] border-[#202f47]"
              }`}>
                <div className="flex items-center justify-between text-xs font-mono text-red-400 mb-3">
                  <span className="font-bold">STAGE 04</span>
                  <Film className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mb-1">EVS XT3 Max</h4>
                <p className="text-xs text-slate-400 font-mono mb-3">Live Replay & Highlights</p>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex justify-between text-slate-300">
                    <span>SPEED:</span>
                    <span className="text-red-400 font-bold">{evsSpeed}% SLOW-MO</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {[25, 33, 50].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => {
                          sound.playJogClick();
                          setEvsSpeed(spd);
                        }}
                        className={`py-1 rounded border text-[10px] ${
                          evsSpeed === spd
                            ? "bg-red-500 text-white font-bold border-red-400"
                            : "bg-[#090d16] border-[#1a2538] text-slate-400 hover:text-white"
                        }`}
                      >
                        {spd}%
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={triggerReplay}
                    className={`w-full mt-2 py-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
                      replayCue
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-red-950/80 border border-red-700/80 text-red-300 hover:bg-red-900"
                    }`}
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{replayCue ? "REPLAY ON-AIR..." : "CUE EVS CLIP"}</span>
                  </button>
                </div>
              </div>

              {/* Node 5: Transmission Out */}
              <div className="p-4 rounded-xl bg-[#0f1726] border border-[#202f47] shadow-lg">
                <div className="flex items-center justify-between text-xs font-mono text-purple-400 mb-3">
                  <span className="font-bold">STAGE 05</span>
                  <Send className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mb-1">Tx & Playout</h4>
                <p className="text-xs text-slate-400 font-mono mb-3">Satellite & Fiber Handover</p>

                <div className="p-3 rounded-lg bg-[#090d16] border border-[#172336] font-mono text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span>SNG UPLINK:</span>
                    <span>100% OK</span>
                  </div>
                  <div className="flex items-center justify-between text-cyan-400">
                    <span>FIBER MCR:</span>
                    <span>TX READY</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-400">
                    <span>STREAM OTT:</span>
                    <span>50 FPS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Live Program Output Console */}
            <div className="p-4 sm:p-6 rounded-2xl bg-[#060a12] border border-[#1a263c] flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400 font-bold tracking-widest uppercase">
                    {replayCue ? "● EVS REPLAY INSERTION ON-AIR" : "● LIVE BROADCAST MASTER FEED ACTIVE"}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-mono">
                  ACTIVE FEED: {cameras.find((c) => c.id === selectedCam)?.name} • {colorPreset} • {irisLevel}% IRIS
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Routed via {routingBackup ? "Secondary Optical Ring" : "Primary 12G-SDI Matrix"} &bull; Audio -18 dBFS Phase Aligned
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    sound.playTallyClick();
                    setPgmActive(!pgmActive);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                    pgmActive
                      ? "bg-red-600 text-white border-red-500 glow-live"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {pgmActive ? "PGM BUS: LIVE ON-AIR" : "PGM BUS: BLACK / CUT"}
                </button>

                <a
                  href="#contact"
                  onClick={() => sound.playButtonClick()}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all"
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
