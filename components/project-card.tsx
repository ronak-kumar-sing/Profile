"use client";

import { motion } from "motion/react";

export default function ProjectCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[420px]"
    >
      <div className="relative rounded-2xl overflow-hidden bg-navy-light/60 backdrop-blur-xl border border-white/[0.06] shadow-[0_0_80px_-20px_rgba(233,146,135,0.15)]">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-pink to-transparent opacity-50" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-mono text-accent-orange text-sm font-medium">
            _make-it-app
          </span>
          <span className="font-mono text-text-muted text-xs">
            AI Study Companion
          </span>
        </div>

        {/* Image Preview */}
        <div className="px-3 pb-3">
          <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gradient-to-br from-[#1a1040] via-[#0d1a3a] to-[#0d2530]">
            {/* Ambient glow */}
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              {/* Top decorative elements */}
              <div className="flex justify-between items-start">
                <div className="flex gap-2 items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-violet-600 opacity-60" />
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="w-3 h-3 rounded-full bg-green-400/40" />
                    <div className="w-2 h-2 rounded-full bg-cyan-400/30" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <div className="w-8 h-1.5 bg-white/20 rounded" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/20">
                    <div className="w-6 h-1.5 bg-blue-400/40 rounded" />
                  </div>
                </div>
              </div>

              {/* Center text */}
              <div className="text-right pr-2 space-y-0.5">
                <p className="text-white/90 font-bold text-base sm:text-lg leading-snug">
                  AI-Powered
                </p>
                <p className="text-white/90 font-bold text-base sm:text-lg leading-snug">
                  Study Tools &
                </p>
                <p className="text-white/90 font-bold text-base sm:text-lg leading-snug">
                  Resources
                </p>
              </div>

              {/* Bottom: tech dots */}
              <div className="flex items-center gap-1.5">
                {[
                  "#3178c6",
                  "#61dafb",
                  "#000000",
                  "#06b6d4",
                  "#8b5cf6",
                  "#f59e0b",
                  "#22c55e",
                  "#ec4899",
                ].map((color, i) => (
                  <div
                    key={i}
                    className="w-[18px] h-[18px] rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Decorative shape */}
            <div className="absolute bottom-6 left-4">
              <div className="w-24 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-violet-600/20 rotate-[-8deg] backdrop-blur-sm border border-white/5" />
              <div className="absolute top-1 left-3 w-4 h-4 rounded-full bg-green-400/20" />
              <div className="absolute top-1 right-4 w-4 h-4 rounded-full bg-blue-400/20" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
