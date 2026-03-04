"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ProjectsSection from "@/components/projects-section";
import ExperienceSection from "@/components/experience-section";
import ContactSection from "@/components/contact-section";
import FloatingAvatar from "@/components/floating-avatar";
import BottomBar from "@/components/bottom-bar";

export default function Home() {
  const [activeTab, setActiveTab] = useState("hello");

  return (
    <div className="min-h-screen relative">
      {/* Star background */}
      <div className="stars-bg" />

      {/* Content */}
      <div className="relative z-10">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <AnimatePresence mode="wait">
          {activeTab === "hello" && <HeroSection key="hello" setActiveTab={setActiveTab} />}
          {activeTab === "about" && <AboutSection key="about" />}
          {activeTab === "projects" && <ProjectsSection key="projects" />}
          {activeTab === "experience" && (
            <ExperienceSection key="experience" />
          )}
          {activeTab === "contact" && <ContactSection key="contact" />}
        </AnimatePresence>

        <FloatingAvatar />
        <BottomBar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
}
