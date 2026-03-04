"use client";

import { motion } from "motion/react";

const logos = [
  { name: "React", symbol: "⚛" },
  { name: "Next.js", symbol: "▲" },
  { name: "TypeScript", symbol: "TS" },
  { name: "Tailwind", symbol: "◆" },
  { name: "React Native", symbol: "📱" },
  { name: "Node.js", symbol: "⬡" },
];

export default function LogoRow() {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-14 flex-wrap">
      {logos.map((logo, i) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
          className="flex items-center gap-2 opacity-30 hover:opacity-50 transition-opacity cursor-default"
        >
          {logo.symbol && (
            <span className="text-text-muted text-sm">{logo.symbol}</span>
          )}
          <span className="font-mono text-[10px] sm:text-xs text-text-muted tracking-[0.15em] uppercase font-medium">
            {logo.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
