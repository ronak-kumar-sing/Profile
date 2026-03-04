"use client";

import {
  Highlight,
  HighlightItem,
} from "@/components/animate-ui/primitives/effects/highlight";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/animate-ui/components/animate/tooltip";
import { Button } from "@/components/animate-ui/primitives/buttons/button";
import { Mail, MoreVertical } from "lucide-react";

const tabs = [
  { id: "hello", label: "_hello", description: "Home" },
  { id: "about", label: "_about", description: "About me" },
  { id: "projects", label: "_projects", description: "My work" },
  { id: "experience", label: "_experience", description: "My journey" },
];

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  return (
    <TooltipProvider>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-line">
        <div className="flex items-center h-14">
          {/* Name */}
          <div className="min-w-0 sm:min-w-40 lg:min-w-70 px-4 md:px-5 lg:px-6 md:border-r border-line flex items-center h-full shrink-0">
            <span className="font-mono text-text-primary md:text-text-muted text-sm md:text-sm lg:text-base font-semibold md:font-normal tracking-tight truncate">
              Ronak Kumar
            </span>
          </div>

          {/* Center Tabs - Desktop */}
          <Highlight
            mode="parent"
            controlledItems
            value={activeTab}
            onValueChange={(val) => val && setActiveTab(val)}
            hover={false}
            click
            className="bg-accent-orange h-0.75 rounded-full bottom-0"
            containerClassName="hidden md:flex items-center h-full"
            boundsOffset={{ top: 0, left: 0, width: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {tabs.map((tab) => (
              <HighlightItem key={tab.id} value={tab.id} asChild>
                <Tooltip side="bottom" sideOffset={6}>
                  <TooltipTrigger asChild>
                    <Button
                      hoverScale={1}
                      tapScale={0.97}
                      onClick={() => setActiveTab(tab.id)}
                      data-value={tab.id}
                      className={`relative h-14 px-6 lg:px-10 font-mono text-sm transition-colors border-r border-line cursor-pointer ${
                        activeTab === tab.id
                          ? "text-text-primary"
                          : "text-text-muted hover:text-text-primary/70"
                      }`}
                    >
                      {tab.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-navy-light text-text-primary border border-line">
                    {tab.description}
                  </TooltipContent>
                </Tooltip>
              </HighlightItem>
            ))}
          </Highlight>

          {/* Mobile tabs */}
          <Highlight
            mode="parent"
            controlledItems
            value={activeTab}
            onValueChange={(val) => val && setActiveTab(val)}
            hover={false}
            click
            className="bg-accent-orange h-0.75 rounded-full bottom-0"
            containerClassName="hidden md:hidden items-center h-full overflow-x-auto scrollbar-hide"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            {tabs.map((tab) => (
              <HighlightItem key={tab.id} value={tab.id} asChild>
                <Button
                  hoverScale={1}
                  tapScale={0.97}
                  onClick={() => setActiveTab(tab.id)}
                  data-value={tab.id}
                  className={`relative h-14 px-2.5 sm:px-4 font-mono text-[10px] sm:text-xs transition-colors border-r border-line whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? "text-text-primary"
                      : "text-text-muted"
                  }`}
                >
                  {tab.label}
                </Button>
              </HighlightItem>
            ))}
          </Highlight>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Contact - Desktop only */}
          <div className="border-l border-line h-full hidden md:flex items-center shrink-0">
            <Tooltip side="bottom" sideOffset={6}>
              <TooltipTrigger asChild>
                <Button
                  hoverScale={1.02}
                  tapScale={0.97}
                  onClick={() => setActiveTab("contact")}
                  className={`h-full px-3 sm:px-4 lg:px-6 font-mono text-[10px] sm:text-xs lg:text-sm transition-colors cursor-pointer ${
                    activeTab === "contact"
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  _Contact_me
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-navy-light text-text-primary border border-line">
                Get in touch
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile right icons */}
          <div className="flex md:hidden items-center h-full gap-1 pr-2">
            <a
              href="mailto:ronakkumar20062006@gmail.com"
              className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors rounded-lg"
            >
              <Mail size={16} />
            </a>
            <button className="w-9 h-9 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors rounded-lg">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
