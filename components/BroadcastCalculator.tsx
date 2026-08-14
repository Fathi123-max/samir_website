"use client";

import React, { useState } from "react";
import { sound } from "@/lib/sound";
import { Reveal } from "./Reveal";
import {
  Calculator,
  Clock,
  Activity,
  Layers,
  Sparkles,
  CheckCircle2,
  Cpu,
  Radio,
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
  const totalSt2110Gbps = (cameraChannels * currentStandard.st2110 * 1.15).toFixed(1); // 15% IP overhead

  return (
    <section
      id="calculator"
      className="py-20 lg:py-28 bg-[#090d16] border-b border-[#162133] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>ENGINEERING UTILITIES & FIELD CALCULATOR</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="fluid-h2 font-display font-extrabold text-white tracking-tight">
              Broadcast Delay & Bandwidth Estimators.
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <p className="text-slate-300 fluid-body mt-3">
              Tools used in OB trucks and MCR suites for calculating audio lip-sync compensation delays and multi-camera fiber network throughput.
            </p>
          </Reveal>
        </div>

        {/* Dual Calculators Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tool 1: SMPTE Frame Delay $\leftrightarrow$ Milliseconds */}
          <Reveal direction="left" delay={0.2}>
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1322] border border-[#1e2d44] shadow-xl bevel-panel h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-emerald-400 font-mono text-xs mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold tracking-wider">LIP-SYNC & FRAME DELAY CONVERTER</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-2">
                  SMPTE Frame Delay to Milliseconds (ms)
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-6">
                  Accurately align audio DSP delay for frame-synchronizers, wireless RF links, and video router processing delays.
                </p>

                {/* Controls */}
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1.5">
                      BROADCAST FRAME RATE: <strong className="text-amber-400">{fps} FPS</strong>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[25, 29.97, 50, 59.94].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            sound.playJogClick();
                            setFps(rate);
                          }}
                          className={`py-2 rounded-xl border text-xs font-bold ${
                            fps === rate
                              ? "bg-emerald-500 text-slate-950 border-emerald-400"
                              : "bg-[#080d17] border-[#1b283d] text-slate-400 hover:text-white"
                          }`}
                        >
                          {rate} fps
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>FRAME DELAY:</span>
                      <span className="text-emerald-400 font-bold">{frames} Frames</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={frames}
                      onChange={(e) => {
                        sound.playJogClick();
                        setFrames(Number(e.target.value));
                      }}
                      className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Result Readout */}
              <div className="mt-8 p-5 rounded-2xl bg-[#080e18] border border-[#1c2a3f] text-center font-mono">
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-1">
                  REQUIRED AUDIO DELAY COMPENSATION
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">
                  {totalMs} ms
                </div>
                <div className="text-[11px] text-slate-400 mt-1">
                  1 Frame @ {fps}fps = {msPerFrame.toFixed(2)} ms
                </div>
              </div>
            </div>
          </Reveal>

          {/* Tool 2: Video Bandwidth & Fiber Throughput */}
          <Reveal direction="right" delay={0.25}>
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0c1322] border border-[#1e2d44] shadow-xl bevel-panel h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs mb-4">
                  <Activity className="w-4 h-4" />
                  <span className="font-bold tracking-wider">OB VAN FIBER & TRUNK BANDWIDTH</span>
                </div>

                <h3 className="text-xl font-bold text-white font-display mb-2">
                  12G-SDI vs SMPTE ST 2110 Network Load
                </h3>
                <p className="text-xs text-slate-400 font-sans mb-6">
                  Estimate total uncompressed optical throughput required for stadium compounds and MCR tie-lines.
                </p>

                {/* Controls */}
                <div className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1.5">
                      VIDEO FORMAT STANDARD:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
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
                          className={`py-2 px-2 rounded-xl border text-[11px] font-bold truncate ${
                            videoStandard === std.id
                              ? "bg-cyan-500 text-slate-950 border-cyan-400"
                              : "bg-[#080d17] border-[#1b283d] text-slate-400 hover:text-white"
                          }`}
                        >
                          {std.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>SIMULTANEOUS CAMERA CHANNELS:</span>
                      <span className="text-cyan-400 font-bold">{cameraChannels} Channels</span>
                    </div>
                    <input
                      type="range"
                      min="4"
                      max="32"
                      value={cameraChannels}
                      onChange={(e) => {
                        sound.playJogClick();
                        setCameraChannels(Number(e.target.value));
                      }}
                      className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Result Readout */}
              <div className="mt-8 p-5 rounded-2xl bg-[#080e18] border border-[#1c2a3f] grid grid-cols-2 gap-4 text-center font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">
                    TOTAL BASEBAND SDI
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">
                    {totalSdiGbps} <span className="text-xs text-slate-400">Gbps</span>
                  </div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">
                    ST 2110 IP TRUNK (QSFP)
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">
                    {totalSt2110Gbps} <span className="text-xs text-slate-400">Gbps</span>
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
