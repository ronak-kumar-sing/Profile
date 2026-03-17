"use client";

import { motion } from "motion/react";
import Image from "next/image";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";
import { Button } from "@/components/animate-ui/primitives/buttons/button";

export default function FloatingAvatar() {
  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed right-4 sm:right-6 lg:right-8 top-16 sm:top-20 lg:top-24 z-40 hidden sm:flex flex-col items-center gap-2"
      >
        {/* Avatar circle with tooltip */}
        <Tooltip side="left" sideOffset={12}>
          <TooltipTrigger asChild>
            <Button
              hoverScale={1.08}
              tapScale={0.95}
              asChild
            >
              <a
                href="mailto:ronakkumar20062006@gmail.com"
                className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-linear-to-br from-blue-600 to-violet-700 flex items-center justify-center text-2xl shadow-lg shadow-blue-900/30 border-2 border-blue-700/30 overflow-hidden cursor-pointer"
              >
                <Image
                  src="/profile.jpeg"
                  alt="Ronak Kumar"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-navy-light text-accent-green border border-line font-mono">
            Get in touch →
          </TooltipContent>
        </Tooltip>

        {/* Label */}
        <span className="font-mono text-[10px] text-text-muted whitespace-nowrap">
          contact_me
        </span>
      </motion.div>
    </TooltipProvider>
  );
}
