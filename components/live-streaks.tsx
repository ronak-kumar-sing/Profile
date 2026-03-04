"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { Flame, Github, Code2, TrendingUp, Calendar } from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
} from "@/components/animate-ui/components/radix/tabs";

/* ──────────────────────── types ──────────────────────── */
interface ContributionDay {
  date: string;
  count: number;
}
interface GitHubData {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  contributionDays: ContributionDay[];
}
interface LeetCodeData {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  currentStreak: number;
  totalActiveDays: number;
  contributionDays: ContributionDay[];
}

/* ──────────────────── palettes ──────────────────── */
const GH_PALETTE = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
const LC_PALETTE = ["#161b22", "#1e2d0e", "#2d5a1a", "#3d8a24", "#4ec94f"];

function getLevel(count: number, max: number) {
  if (count === 0 || max === 0) return 0;
  const r = count / max;
  return r <= 0.25 ? 1 : r <= 0.5 ? 2 : r <= 0.75 ? 3 : 4;
}

/* ──────────────────── build grid ──────────────────── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function buildGrid(days: ContributionDay[], weeks: number) {
  const map = new Map(days.map((d) => [d.date, d.count]));
  const max = Math.max(1, ...days.map((d) => d.count));

  const today = new Date();
  const end = new Date(today);
  end.setDate(end.getDate() + (6 - end.getDay())); // next Saturday

  const totalDays = weeks * 7;
  const start = new Date(end);
  start.setDate(start.getDate() - totalDays + 1);

  const grid: { date: string; count: number; level: number }[][] = [];
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  const cur = new Date(start);

  for (let d = 0; d < totalDays; d++) {
    const wi = Math.floor(d / 7);
    const di = d % 7;
    if (di === 0) grid.push([]);
    const ds = cur.toISOString().split("T")[0];
    grid[wi].push({ date: ds, count: map.get(ds) ?? 0, level: getLevel(map.get(ds) ?? 0, max) });
    const m = cur.getMonth();
    if (m !== lastMonth) { monthLabels.push({ label: MONTHS[m], col: wi }); lastMonth = m; }
    cur.setDate(cur.getDate() + 1);
  }
  return { grid, monthLabels };
}

/* ──────────────────── HeatmapGrid ──────────────────── */
function HeatmapGrid({
  days, palette, weeksCount, cell, gap,
}: {
  days: ContributionDay[];
  palette: string[];
  weeksCount: number;
  cell: number;
  gap: number;
}) {
  const { grid, monthLabels } = useMemo(
    () => buildGrid(days, weeksCount),
    [days, weeksCount],
  );
  const c = `${cell}px`, g = `${gap}px`;
  const dayW = cell <= 8 ? 18 : 24;

  return (
    <div className="overflow-x-auto scrollbar-hide w-full">
      {/* Month labels */}
      <div className="flex mb-0.5" style={{ gap: g, paddingLeft: `${dayW}px` }}>
        {(() => {
          const els: React.ReactNode[] = [];
          let prev = -2;
          for (const ml of monthLabels) {
            const sp = ml.col - prev - 1;
            if (sp > 0) els.push(<span key={`sp-${ml.col}`} style={{ width: `calc(${sp} * (${c} + ${g}))`, flexShrink: 0 }} />);
            els.push(
              <span key={ml.col} className="text-[8px] font-mono text-text-muted whitespace-nowrap shrink-0 leading-none" style={{ width: `calc(${c} + ${g})` }}>
                {ml.label}
              </span>
            );
            prev = ml.col;
          }
          return els;
        })()}
      </div>
      <div className="flex">
        {/* Day labels */}
        <div className="flex flex-col shrink-0" style={{ gap: g, width: `${dayW}px` }}>
          {["","Mon","","Wed","","Fri",""].map((lbl, i) => (
            <span key={i} className="text-[8px] font-mono text-text-muted leading-none flex items-center" style={{ height: c }}>
              {lbl}
            </span>
          ))}
        </div>
        {/* Cells */}
        <div className="flex" style={{ gap: g }}>
          {grid.map((week, wi) => (
            <div key={wi} className="flex flex-col" style={{ gap: g }}>
              {week.map((cell_, di) => (
                <div
                  key={`${wi}-${di}`}
                  className="rounded-[2px] transition-colors"
                  style={{ width: c, height: c, backgroundColor: palette[cell_.level] }}
                  title={`${cell_.date}: ${cell_.count}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────── Legend ──────────────────── */
function Legend({ palette, size }: { palette: string[]; size: number }) {
  return (
    <div className="flex items-center gap-1 font-mono text-[8px] text-text-muted">
      <span>Less</span>
      {palette.map((c, i) => (
        <div key={i} className="rounded-[2px]" style={{ width: size, height: size, backgroundColor: c }} />
      ))}
      <span>More</span>
    </div>
  );
}

/* ──────────────────── Main component ──────────────────── */
export default function LiveStreaks() {
  const [github, setGithub] = useState<GitHubData | null>(null);
  const [leetcode, setLeetcode] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [g, l] = await Promise.allSettled([
          fetch("/api/github-streak").then((r) => r.json()),
          fetch("/api/leetcode-streak").then((r) => r.json()),
        ]);
        if (g.status === "fulfilled") setGithub(g.value);
        if (l.status === "fulfilled") setLeetcode(l.value);
      } catch {}
      finally { setLoading(false); }
    })();
  }, []);

  const weeks = isMobile ? 18 : 46;
  const cell  = isMobile ? 9  : 10;
  const gap   = isMobile ? 2  : 2;
  const lgndSz = isMobile ? 7 : 9;

  if (loading) {
    return (
      <div className="rounded-2xl border border-line bg-navy-light/30 animate-pulse h-48 sm:h-56" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-line bg-navy-light/30 overflow-hidden"
    >
      {/* ── Card header ── */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 border-b border-line bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <Calendar size={13} className="text-text-muted" />
          <span className="font-mono text-[10px] sm:text-xs text-text-muted font-medium tracking-wider uppercase">
            Coding Activity
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] sm:text-[10px] text-text-muted">
          <span><strong className="text-[#39d353]">{github?.totalContributions ?? 0}</strong> commits</span>
          <span><strong className="text-[#4ec94f]">{leetcode?.totalSolved ?? 0}</strong> solved</span>
        </div>
      </div>

      {/* ── Tabs (desktop + mobile) ── */}
      <div className="p-3 sm:p-4">
        <Tabs defaultValue="github" className="gap-3 sm:gap-4">

          {/* Tab triggers */}
          <TabsList className="w-full bg-white/[0.04] border border-line rounded-lg p-0.5 h-auto">
            <TabsTrigger
              value="github"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono rounded-md data-[state=active]:text-text-primary text-text-muted"
            >
              <Github size={12} />
              <span className="font-semibold">GitHub</span>
              <span className="flex items-center gap-0.5 text-[9px]">
                <Flame size={9} className="text-[#f97316]" />
                {github?.currentStreak ?? 0}d
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="leetcode"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-mono rounded-md data-[state=active]:text-text-primary text-text-muted"
            >
              <Code2 size={12} />
              <span className="font-semibold">LeetCode</span>
              <span className="flex items-center gap-0.5 text-[9px]">
                <Flame size={9} className="text-[#f97316]" />
                {leetcode?.currentStreak ?? 0}d
              </span>
            </TabsTrigger>
          </TabsList>

          {/* Tab panels */}
          <TabsContents>
            {/* GitHub panel */}
            <TabsContent value="github" className="space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-text-muted">
                <div className="flex items-center gap-3">
                  <span><strong className="text-text-primary">{github?.totalContributions ?? 0}</strong> contributions</span>
                  <span><strong className="text-text-primary">{github?.longestStreak ?? 0}</strong> longest streak</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={10} className="text-[#f97316]" />
                  <span className="font-bold text-text-primary">{github?.currentStreak ?? 0}</span>
                  <span>day streak</span>
                </div>
              </div>
              <HeatmapGrid days={github?.contributionDays ?? []} palette={GH_PALETTE} weeksCount={weeks} cell={cell} gap={gap} />
              <div className="flex items-center justify-end pt-0.5">
                <Legend palette={GH_PALETTE} size={lgndSz} />
              </div>
            </TabsContent>

            {/* LeetCode panel */}
            <TabsContent value="leetcode" className="space-y-2.5">
              <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px] text-text-muted">
                <div className="flex items-center gap-3">
                  <span><strong className="text-text-primary">{leetcode?.totalSolved ?? 0}</strong> solved</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-green inline-block" />{leetcode?.easy ?? 0}
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f89f1b] inline-block" />{leetcode?.medium ?? 0}
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-pink inline-block" />{leetcode?.hard ?? 0}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={10} className="text-[#f97316]" />
                  <span className="font-bold text-text-primary">{leetcode?.currentStreak ?? 0}</span>
                  <span>day streak</span>
                </div>
              </div>
              <HeatmapGrid days={leetcode?.contributionDays ?? []} palette={LC_PALETTE} weeksCount={weeks} cell={cell} gap={gap} />
              <div className="flex items-center justify-end pt-0.5">
                <Legend palette={LC_PALETTE} size={lgndSz} />
              </div>
            </TabsContent>
          </TabsContents>

        </Tabs>
      </div>

      {/* ── Footer strip ── */}
      <div className="flex items-center justify-between px-3 sm:px-5 py-2 border-t border-line bg-white/[0.01]">
        <div className="flex items-center gap-1 font-mono text-[9px] text-text-muted">
          <TrendingUp size={10} />
          <span>Past 6 months</span>
        </div>
        <span className="font-mono text-[9px] text-text-muted">
          {leetcode?.totalActiveDays ?? 0} active days on LeetCode
        </span>
      </div>
    </motion.div>
  );
}

