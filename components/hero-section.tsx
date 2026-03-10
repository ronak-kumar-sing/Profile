"use client";

import { motion } from "motion/react";
import ProjectCard from "./project-card";
import LogoRow from "./logo-row";
import LiveStreaks from "./live-streaks";
import { Button } from "@/components/animate-ui/primitives/buttons/button";
import {
  CursorProvider,
  Cursor,
  CursorFollow,
} from "@/components/animate-ui/components/animate/cursor";

/* ── Mobile tabs config ── */
const MOBILE_TABS = [
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "experience", label: "RESUME" },
  { id: "contact", label: "CONTACT" },
];

const SKILLS = [
  { name: "React", symbol: "⚛" },
  { name: "Next.js", symbol: "▲" },
  { name: "TypeScript", symbol: "TS" },
  { name: "Tailwind", symbol: "◆" },
  { name: "React Native", symbol: "📱" },
  { name: "Node.js", symbol: "⬡" },
];

interface HeroProps {
  setActiveTab?: (tab: string) => void;
}

export default function HeroSection({ setActiveTab }: HeroProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-14 pb-16 flex flex-col"
    >
      {/* ═══════════ MOBILE PROFILE LAYOUT ═══════════ */}
      <div className="flex-1 md:hidden overflow-y-auto">
        <div className="px-5 pt-5 pb-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between mb-5"
          >
            <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-blue-600 to-violet-700 flex items-center justify-center border-2 border-blue-700/30 shadow-lg shadow-blue-900/20">
              <span className="text-3xl">👋</span>
            </div>
            <span className="font-mono text-[10px] text-accent-green border border-accent-green/30 rounded-full px-3 py-1.5 bg-accent-green/5 mt-1">
              Open to work ▾
            </span>
          </motion.div>

          {/* Name & Info */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.5 }}
            className="mb-3"
          >
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-mono text-xl font-bold text-text-primary">
                Ronak Kumar Singh
              </h1>
              <div className="w-[18px] h-[18px] rounded-full bg-accent-green flex items-center justify-center shrink-0">
                <span className="text-[9px] text-navy font-bold leading-none">✓</span>
              </div>
            </div>
            <p className="font-mono text-xs text-text-muted">
              @ronak-kumar-sing • Jalandhar, India
            </p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.5 }}
            className="font-mono text-xs text-text-muted leading-relaxed mb-4"
          >
            🚀 React | Next.js | React Native | TypeScript | Node.js | Full Stack Developer &amp; Open Source Enthusiast
          </motion.p>

          {/* Skill Tags */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.5 }}
            className="flex flex-wrap gap-2 mb-5"
          >
            {SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="font-mono text-[10px] px-2.5 py-1 rounded-full border border-line bg-white/[0.03] text-text-muted flex items-center gap-1.5"
              >
                <span className="text-[10px]">{skill.symbol}</span>
                {skill.name}
              </span>
            ))}
          </motion.div>

          {/* Inline Tab Bar (like Peerlist WORK/RESUME/COLLECTIONS) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="border-b border-line mb-5"
          >
            <div className="flex overflow-x-auto scrollbar-hide -mb-px">
              <span className="font-mono text-[10px] tracking-wider px-3 py-2.5 text-text-primary border-b-2 border-accent-orange shrink-0 cursor-default">
                WORK
              </span>
              {MOBILE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab?.(tab.id)}
                  className="font-mono text-[10px] tracking-wider px-3 py-2.5 text-text-muted shrink-0 cursor-pointer hover:text-text-primary transition-colors"
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>



          {/* Live Streaks - Coding Activity */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="mb-5"
          >
            <LiveStreaks />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex gap-4 text-xs font-mono text-text-muted mb-6"
          >
            <span>
              <strong className="text-text-primary">3+</strong> Projects
            </span>
            <span>
              <strong className="text-text-primary">150+</strong> Solved
            </span>
            <span>
              <strong className="text-text-primary">5+</strong> Hackathons
            </span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex gap-3"
          >
            <a
              href="/Resume - Ronak Kumar.pdf"
              download="Ronak_Kumar_Resume.pdf"
              className="flex-1 text-center font-mono text-xs text-text-muted border border-line rounded-lg px-4 py-2.5 hover:border-text-muted/50 transition-colors"
            >
              Download CV
            </a>
            <a
              href="https://github.com/ronak-kumar-sing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center font-mono text-xs text-text-muted border border-line rounded-lg px-4 py-2.5 hover:border-text-muted/50 transition-colors"
            >
              View GitHub
            </a>
          </motion.div>
        </div>
      </div>

      {/* ═══════════ DESKTOP LAYOUT (unchanged) ═══════════ */}
      <div className="hidden md:flex md:flex-col flex-1">
      {/* Main hero area */}
      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text with custom cursor */}
            <CursorProvider>
              <div className="space-y-6 relative">
                <Cursor className="size-5 text-accent-orange hidden lg:block" />
                <CursorFollow
                  className="bg-navy-light text-accent-green border border-line rounded-md px-2 py-1 text-xs font-mono hidden lg:block"
                  sideOffset={12}
                  alignOffset={8}
                >
                  available for opportunities
                </CursorFollow>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-mono text-text-muted text-sm lg:text-base"
                >
                  Hello, I am
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6 }}
                  className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold text-text-primary leading-[1.1] tracking-tight"
                >
                  Ronak
                  <br />
                  Kumar.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-mono text-text-muted text-xs sm:text-sm lg:text-base leading-relaxed max-w-full sm:max-w-120"
                >
                  A software engineer focused on building
                  <br className="hidden sm:block" />
                  premium web and mobile experiences. Passionate
                  <br className="hidden sm:block" />
                  about clean architecture and great UX.
                </motion.p>
              </div>
            </CursorProvider>

            {/* Right side - Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="hidden sm:flex justify-center lg:justify-end"
            >
              <ProjectCard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom area: Streaks + Buttons + Logos */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-12 space-y-6 lg:space-y-8">
        {/* Live Streaks - Desktop */}
        <div className="max-w-2xl">
          <LiveStreaks />
        </div>

        {/* Buttons */}
        <div className="flex justify-center lg:justify-end gap-3 lg:gap-4">
          <Button
            hoverScale={1.03}
            tapScale={0.97}
            asChild
          >
            <a
              href="/Resume - Ronak Kumar.pdf"
              download="Ronak_Kumar_Resume.pdf"
              className="font-mono text-xs lg:text-sm text-text-muted border border-line rounded-lg px-4 lg:px-6 py-2 lg:py-2.5 hover:border-text-muted/50 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              Download CV
            </a>
          </Button>
          <Button
            hoverScale={1.03}
            tapScale={0.97}
            asChild
          >
            <a
              href="https://github.com/ronak-kumar-sing"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs lg:text-sm text-text-muted border border-line rounded-lg px-4 lg:px-6 py-2 lg:py-2.5 hover:border-text-muted/50 transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              View GitHub
            </a>
          </Button>
        </div>

        {/* Logo Row */}
        <LogoRow />
      </div>
      </div> {/* end desktop wrapper */}
    </motion.section>
  );
}
