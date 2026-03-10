"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/animate-ui/primitives/buttons/button";

const EXPERIENCE = [
  {
    type: "work",
    id: "gdse_lead",
    company: "Runfly",
    role: "App Development Intern",
    location: "Remote",
    duration: "2024 - Present",
    description:
      "Worked on frontend development for mobile applications with a strong focus on designing and implementing user-friendly interfaces using React Native. Collaborated on component architecture and UI polish.",
    highlights: [
      "Built mobile app UIs with React Native",
      "Collaborated on component architecture",
      "Focused on UI/UX design patterns",
      "Worked in agile team environment",
    ],
    logo: "GD",
  },
  {
    type: "edu",
    id: "cec_cse",
    company: "Lovely Professional University",
    role: "B.Tech in Computer Science",
    location: "Punjab, India",
    duration: "2023 - 2027",
    description:
      "Pursuing Bachelor of Technology in Computer Science. Active participant in hackathons, coding clubs, and college tech events. Focusing on full-stack development and algorithms.",
    highlights: [
      "5+ hackathon participations",
      "150+ LeetCode problems solved",
      "Active in coding clubs & tech events",
      "Focus on DSA & full-stack development",
    ],
    logo: "CEC",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Hackathon Participant",
    subtitle: "5+ Competitions",
    description:
      "Participated in 5+ hackathons including college-level and national competitions, building full-stack solutions under 36-hour time constraints.",
    color: "#FEA55F",
  },
  {
    title: "150+ LeetCode Problems",
    subtitle: "Competitive Programming",
    description:
      "Solved 150+ algorithmic problems across Easy, Medium, and Hard categories. Consistently practicing DSA for interview readiness.",
    color: "#4D5BCE",
  },
  {
    title: "Featured Projects",
    subtitle: "3+ Production Apps",
    description:
      "Shipped 3+ production-grade projects including an AI-powered study app, a career platform, and a student accommodation marketplace.",
    color: "#43D9AD",
  },
  {
    title: "AI Integration Pioneer",
    subtitle: "Google Gemini API",
    description:
      "Integrated Google Gemini 2.0 into Make-it app for AI-powered study resource generation.",
    color: "#E99287",
  },
  {
    title: "Runfly Lead Intern",
    subtitle: "App Development",
    description:
      "Gained professional experience in mobile app development with a focus on UI/UX and React Native.",
    color: "#43D9AD",
  },
  {
    title: "Full Stack Builder",
    subtitle: "End-to-End Dev",
    description:
      "Built complete full-stack applications independently — from database design and REST APIs to polished frontend UIs and mobile apps.",
    color: "#FEA55F",
  },
];

export default function ExperienceSection() {
  const [activeItem, setActiveItem] = useState(EXPERIENCE[0]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-14 pb-18 md:pb-16"
    >
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12 lg:mb-16"
        >
          <h2 className="font-mono text-xl lg:text-2xl font-semibold text-text-primary mb-3 lg:mb-4">
            Experience &amp; Education
          </h2>
          <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed mb-8 max-w-[700px]">
            My professional journey and academic background
          </p>

          <div className="flex flex-col items-center">
            {/* Main Display Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-3xl bg-navy-light/40 border border-line rounded-xl p-6 lg:p-8"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <h3 className="font-mono text-lg lg:text-xl font-semibold text-text-primary mb-1">
                      {activeItem.company}
                    </h3>
                    <p className="font-mono text-sm lg:text-base text-accent-orange">
                      {activeItem.role}
                    </p>
                  </div>
                  <div className="text-right font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                    <p>{activeItem.duration}</p>
                    <p>{activeItem.location}</p>
                  </div>
                </div>

                <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed mb-5">
                  {activeItem.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {activeItem.highlights.map((h) => (
                    <span
                      key={h}
                      className="font-mono text-[10px] lg:text-xs px-3 py-1.5 rounded-md bg-white/[0.04] border border-line text-text-muted"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              {EXPERIENCE.map((item) => (
                <Button
                  key={item.id}
                  hoverScale={1.05}
                  tapScale={0.95}
                  onClick={() => setActiveItem(item)}
                  className={`relative h-12 w-12 lg:h-14 lg:w-14 rounded-xl flex items-center justify-center text-sm lg:text-base font-bold transition-all duration-300 cursor-pointer ${
                    activeItem.id === item.id
                      ? "bg-accent-blue/10 border-accent-blue text-accent-blue border shadow-[0_0_15px_rgba(77,91,206,0.2)]"
                      : "bg-navy-light/40 border-line text-text-muted border hover:text-text-primary"
                  }`}
                >
                  {item.logo}
                  {activeItem.id === item.id && (
                    <motion.div
                      layoutId="activeExpIndicator"
                      className="absolute -bottom-2 w-1 h-1 rounded-full bg-accent-blue"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="font-mono text-xl lg:text-2xl font-semibold text-text-primary mb-3 lg:mb-4">
            Achievements
          </h2>
          <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed mb-8 max-w-[700px]">
            Milestones, competitions, and notable accomplishments
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                className="rounded-lg p-4 border border-line bg-navy-light/30 hover:-translate-y-1 transition-all duration-300 group"
                style={{ borderTopColor: item.color, borderTopWidth: 2 }}
              >
                <h3 className="font-mono text-sm font-semibold text-text-primary mb-1">
                  {item.title}
                </h3>
                <p
                  className="font-mono text-[10px] lg:text-xs font-medium mb-2"
                  style={{ color: item.color }}
                >
                  {item.subtitle}
                </p>
                <p className="font-mono text-[10px] lg:text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
