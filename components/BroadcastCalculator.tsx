"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  Calculator,
  Clock,
  Activity,
} from "lucide-react";

export function BroadcastCalculator() {
  // Calculator 1: Frame Delay to Milliseconds
  const [fps, setFps] = useState<number>(50);
  const [frames, setFrames] = useState<number>(3);

  // Calculator 2: Video Signal Bandwidth Estimator
  const [cameraChannels, setCameraChannels] = useState<number>(16);
  const [videoStandard, setVideoStandard] = useState<"1080i50" | "1080p50" | "4k50p">("1080p50");

  const msPerFrame = 1000 / fps;
  const totalMs = (frames * msPerFrame).toFixed(2);

  const bandwidthMap = {
    "1080i50": { sdi: 1.485, st2110: 1.5 },
    "1080p50": { sdi: 2.97, st2110: 3.1 },
    "4k50p": { sdi: 11.88, st2110: 12.5 },
  };

  const currentStandard = bandwidthMap[videoStandard];
  const totalSdiGbps = (cameraChannels * currentStandard.sdi).toFixed(1);
  const totalSt2110Num = cameraChannels * currentStandard.st2110 * 1.15;
  const totalSt2110Gbps = totalSt2110Num.toFixed(1);
  const qsfpUtilization = Math.min(100, Math.round((totalSt2110Num / 100) * 100));

  const quickDelayPresets = [
    { label: "Vision DVE", frames: 1, desc: "1 frame switcher delay" },
    { label: "Frame Sync", frames: 2, desc: "2 frames baseband buffer" },
    { label: "RF Camera", frames: 3, desc: "3 frames COFDM RF link" },
    { label: "IP Decoder", frames: 5, desc: "5 frames SRT / H.265 stream" },
  ];

  return (
    <section
      id="calculator"
      aria-label="Broadcast Engineering Calculator"
      className="py-20 lg:py-28 bg-[#090d16] border-b border-[#162133] relative overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
              <Calculator className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>ENGINEERING UTILITIES & FIELD CALCULATOR</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Broadcast Delay & Bandwidth Estimators.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-200 fluid-body mt-4 font-normal">
              Tools used in OB trucks and MCR suites for calculating audio lip-sync compensation delays and multi-camera fiber network throughput.
            </p>
          </Reveal>
        </div>

        {/* Dual Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Tool 1: SMPTE Frame Delay $\leftrightarrow$ Milliseconds */}
          <Reveal direction="left" delay={0.2}>
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0c1322] border border-[#1e2d44] shadow-xl bevel-panel h-full flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-xs mb-3">
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="font-bold tracking-wider uppercase">LIP-SYNC & FRAME DELAY CONVERTER</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
                  SMPTE Frame Delay to Milliseconds (ms)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mb-6 leading-relaxed">
                  Accurately align audio DSP delay for frame-synchronizers, wireless RF links, and video router processing delays.
                </p>

                {/* Quick Presets */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                    QUICK PRESETS (COMMON BROADCAST HARDWARE):
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="group" aria-label="Quick lip sync presets">
                    {quickDelayPresets.map((preset) => (
                      <button
                        key={preset.label}
                        onClick={() => {
                          sound.playJogClick();
                          setFrames(preset.frames);
                        }}
                        className={`p-2 rounded-xl border text-center transition-all font-mono ${
                          frames === preset.frames
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                            : "bg-[#080d17] border-[#1b283d] text-slate-300 hover:text-white"
                        }`}
                      >
                        <div className="text-xs font-bold">{preset.label}</div>
                        <div className="text-[10px] text-slate-400">{preset.frames} fr</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="space-y-5 font-mono text-xs">
                  <div>
                    <label className="block text-slate-200 mb-2 font-semibold">
                      BROADCAST FRAME RATE: <strong className="text-amber-400">{fps} FPS</strong>
                    </label>
                    <div className="grid grid-cols-4 gap-2.5" role="group" aria-label="Select frame rate">
                      {[25, 29.97, 50, 59.94].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            sound.playJogClick();
                            setFps(rate);
                          }}
                          aria-pressed={fps === rate}
                          className={`py-2.5 rounded-xl border text-xs font-bold transition-all min-h-[40px] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                            fps === rate
                              ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                              : "bg-[#080d17] border-[#1b283d] text-slate-300 hover:text-white"
                          }`}
                        >
                          {rate} fps
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-200 mb-2 font-semibold">
                      <span>FRAME DELAY:</span>
                      <span className="text-emerald-400 font-bold">{frames} Frames</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      aria-label="Adjust frame delay"
                      aria-valuemin={1}
                      aria-valuemax={20}
                      aria-valuenow={frames}
                      value={frames}
                      onChange={(e) => {
                        sound.playJogClick();
                        setFrames(Number(e.target.value));
                      }}
                      className="w-full accent-emerald-400 h-2 bg-slate-800 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400"
                    />
                  </div>
                </div>
              </div>

              {/* Result Readout */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#080e18] border border-[#1c2a3f] text-center font-mono space-y-1">
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-bold">
                  REQUIRED AUDIO DELAY COMPENSATION
                </span>
                <div className="text-3xl sm:text-5xl font-extrabold text-emerald-400 py-1">
                  {totalMs} ms
                </div>
                <div className="text-xs text-slate-300">
                  1 Frame @ {fps}fps = {msPerFrame.toFixed(2)} ms
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tool 2: Video Bandwidth & Fiber Throughput */}
          <Reveal direction="right" delay={0.25}>
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#0c1322] border border-[#1e2d44] shadow-xl bevel-panel h-full flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2.5 text-cyan-400 font-mono text-xs mb-3">
                  <Activity className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="font-bold tracking-wider uppercase">OB VAN FIBER & TRUNK BANDWIDTH</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
                  12G-SDI vs SMPTE ST 2110 Network Load
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans mb-6 leading-relaxed">
                  Estimate total uncompressed optical throughput required for stadium compounds and MCR tie-lines.
                </p>

                {/* Controls */}
                <div className="space-y-5 font-mono text-xs">
                  <div>
                    <label className="block text-slate-200 mb-2 font-semibold">
                      VIDEO FORMAT STANDARD:
                    </label>
                    <div className="grid grid-cols-3 gap-2.5" role="group" aria-label="Select video standard">
                      {(
                        [
                          { id: "1080i50", label: "1080i 50 (HD-SDI)" },
                          { id: "1080p50", label: "1080p 50 (3G-SDI)" },
                          { id: "4k50p", label: "4K UHD 50p (12G)" },
                        ] as const
                      ).map((std) => (
                        <button
                          key={std.id}
                          onClick={() => {
                            sound.playJogClick();
                            setVideoStandard(std.id);
                          }}
                          aria-pressed={videoStandard === std.id}
                          className={`py-2.5 px-2 rounded-xl border text-[11px] font-bold truncate transition-all min-h-[40px] focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                            videoStandard === std.id
                              ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold"
                              : "bg-[#080d17] border-[#1b283d] text-slate-300 hover:text-white"
                          }`}
                        >
                          {std.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-200 mb-2 font-semibold">
                      <span>SIMULTANEOUS CAMERA CHANNELS:</span>
                      <span className="text-cyan-400 font-bold">{cameraChannels} Channels</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="32"
                      aria-label="Adjust simultaneous camera channels"
                      aria-valuemin={4}
                      aria-valuemax={32}
                      aria-valuenow={cameraChannels}
                      value={cameraChannels}
                      onChange={(e) => {
                        sound.playJogClick();
                        setCameraChannels(Number(e.target.value));
                      }}
                      className="w-full accent-cyan-400 h-2 bg-slate-800 rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400"
                    />
                  </div>

                  {/* Network Trunk Load Bar */}
                  <div className="p-3.5 rounded-xl bg-[#080d17] border border-[#1a273c]">
                    <div className="flex justify-between text-[11px] mb-1.5">
                      <span className="text-slate-300">100GbE QSFP Trunk Load:</span>
                      <span className={`font-bold ${qsfpUtilization > 80 ? "text-amber-400" : "text-emerald-400"}`}>
                        {qsfpUtilization}% ({totalSt2110Gbps} / 100 Gbps)
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          qsfpUtilization > 80 ? "bg-amber-400" : "bg-cyan-400"
                        }`}
                        style={{ width: `${qsfpUtilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Readout */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#080e18] border border-[#1c2a3f] grid grid-cols-2 gap-6 text-center font-mono">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block mb-1 font-bold">
                    TOTAL BASEBAND SDI
                  </span>
                  <div className="text-2xl sm:text-4xl font-extrabold text-white">
                    {totalSdiGbps} <span className="text-xs text-slate-400 font-normal">Gbps</span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 uppercase block mb-1 font-bold">
                    ST 2110 IP TRUNK
                  </span>
                  <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400">
                    {totalSt2110Gbps} <span className="text-xs text-slate-400 font-normal">Gbps</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
