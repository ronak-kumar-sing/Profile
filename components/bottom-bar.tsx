"use client";

import { Home, User, Code2, Briefcase, Mail as MailIcon, Linkedin, Github } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";
import { Button } from "@/components/animate-ui/primitives/buttons/button";

const blogPosts = [
  "AI-Powered Study Companion with Gemini 2.0",
  "Building Cross-Platform Apps with React Native & Expo",
  "Full-Stack Career Platform with PHP & MySQL",
  "Student Accommodation Marketplace with Next.js",
  "Competitive Programming: 150+ Problems Solved",
];

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/ronak-kumar-sing" },
  { icon: Github, label: "GitHub", href: "https://github.com/ronak-kumar-sing" },
  { icon: MailIcon, label: "Email", href: "mailto:ronakkumar20062006@gmail.com" },
];

const mobileNavItems = [
  { id: "hello", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "experience", label: "Career", icon: Briefcase },
  { id: "contact", label: "Contact", icon: MailIcon },
];

interface BottomBarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function BottomBar({ activeTab, setActiveTab }: BottomBarProps) {
  return (
    <TooltipProvider>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-t border-line h-14 md:h-12">
        {/* ═══ Mobile: App-style bottom navigation ═══ */}
        <div className="flex md:hidden items-center justify-around h-full px-1">
          {mobileNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab?.(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 py-1 px-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? "text-accent-green"
                  : "text-text-muted active:text-text-primary"
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 1.5} />
              <span className="text-[9px] font-mono font-medium leading-none">{item.label}</span>
            </button>
          ))}
        </div>

        {/* ═══ Desktop: Socials + Marquee (unchanged) ═══ */}
        <div className="hidden md:flex items-center h-full">
          {/* Left: find_me + socials */}
          <div className="flex items-center h-full shrink-0">
            <div className="px-3 lg:px-4 h-full flex items-center border-r border-line">
              <span className="font-mono text-[10px] lg:text-xs text-text-muted">
                _find_me
              </span>
            </div>
            {socials.map((social, i) => (
              <Tooltip key={i} side="top" sideOffset={8}>
                <TooltipTrigger asChild>
                  <Button
                    hoverScale={1.15}
                    tapScale={0.9}
                    asChild
                  >
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="h-full flex items-center justify-center w-10 lg:w-12 border-r border-line text-text-muted hover:text-text-primary transition-colors"
                    >
                      <social.icon size={15} />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-navy-light text-text-primary border border-line font-mono">
                  {social.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          {/* Right: Scrolling blog titles */}
          <div className="flex-1 overflow-hidden h-full flex items-center">
            <div className="animate-marquee whitespace-nowrap flex items-center">
              {[...blogPosts, ...blogPosts].map((title, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] lg:text-xs text-text-muted px-4 lg:px-8 inline-flex items-center gap-1.5 cursor-pointer hover:text-text-primary transition-colors"
                >
                  {title}
                  <span className="text-accent-orange text-sm">↗</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
