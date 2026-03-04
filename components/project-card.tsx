"use client";

import { motion } from "motion/react";

const TECH_STACK = [
  { label: "React", color: "#61dafb", icon: "⚛" },
  { label: "Next.js", color: "#ffffff", icon: "▲" },
  { label: "TypeScript", color: "#3178c6", icon: "TS" },
  { label: "Node.js", color: "#68a063", icon: "⬡" },
];

const STATS = [
  { value: "5+", label: "Projects" },
  { value: "150+", label: "Problems" },
  { value: "545+", label: "Commits" },
];

export default function ProjectCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[400px]"
    >
      <div className="relative rounded-2xl overflow-hidden bg-navy-light/60 backdrop-blur-xl border border-white/[0.06] shadow-[0_0_80px_-20px_rgba(67,217,173,0.12)]">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-green to-transparent opacity-40" />

        {/* Terminal header dots */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.04]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[10px] text-text-muted">
            ~/ronak-kumar
          </span>
        </div>

        {/* Code-style content */}
        <div className="px-5 pt-4 pb-3 space-y-3">
          {/* Greeting line */}
          <div className="font-mono text-xs">
            <span className="text-accent-blue">const</span>{" "}
            <span className="text-accent-orange">developer</span>{" "}
            <span className="text-text-muted">=</span>{" "}
            <span className="text-accent-green">{`{`}</span>
          </div>
          <div className="font-mono text-[11px] pl-4 space-y-1.5">
            <div>
              <span className="text-accent-pink">name</span>
              <span className="text-text-muted">:</span>{" "}
              <span className="text-accent-green">&quot;Ronak Kumar&quot;</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-accent-pink">role</span>
              <span className="text-text-muted">:</span>{" "}
              <span className="text-accent-green">&quot;Full Stack Dev&quot;</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-accent-pink">focus</span>
              <span className="text-text-muted">:</span>{" "}
              <span className="text-accent-green">&quot;Web &amp; Mobile&quot;</span>
              <span className="text-text-muted">,</span>
            </div>
            <div>
              <span className="text-accent-pink">open</span>
              <span className="text-text-muted">:</span>{" "}
              <span className="text-accent-blue">true</span>
              <span className="text-text-muted">,</span>
            </div>
          </div>
          <div className="font-mono text-xs">
            <span className="text-accent-green">{`}`}</span>
            <span className="text-text-muted">;</span>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/[0.06]" />

        {/* Tech stack row */}
        <div className="px-5 py-3">
          <p className="font-mono text-[9px] text-text-muted uppercase tracking-wider mb-2">
            Tech Stack
          </p>
          <div className="flex gap-2">
            {TECH_STACK.map((tech) => (
              <div
                key={tech.label}
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-md px-2.5 py-1.5"
              >
                <span className="text-[10px]" style={{ color: tech.color }}>
                  {tech.icon}
                </span>
                <span className="font-mono text-[10px] text-text-muted">
                  {tech.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 h-px bg-white/[0.06]" />

        {/* Stats row */}
        <div className="px-5 py-3 flex items-center justify-between">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="text-center">
                <p className="font-mono text-sm font-bold text-text-primary">
                  {stat.value}
                </p>
                <p className="font-mono text-[9px] text-text-muted">
                  {stat.label}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <div className="w-px h-6 bg-white/[0.06]" />
              )}
            </div>
          ))}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-t border-white/[0.04]">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono text-[9px] text-accent-green">
              Available for work
            </span>
          </div>
          <span className="font-mono text-[9px] text-text-muted">v2.0</span>
        </div>
      </div>
    </motion.div>
  );
}
