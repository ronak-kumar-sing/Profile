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
    logo: "EXP",
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

const CERTIFICATIONS = [
  {
    title: "C++ Programming: OOPs and DSA",
    issuer: "CSE Pathshala",
    date: "Jul 2025",
    href: "https://drive.google.com/file/d/1DxMJ4ev_J-889YCc6_PLl8ZeSEHnqUOE/view?usp=sharing",
    textClass: "text-accent-blue",
    borderClass: "border-t-accent-blue",
  },
  {
    title: "Cloud Computing",
    issuer: "NPTEL",
    date: "Nov 2025",
    href: "https://drive.google.com/file/d/13eT1BUVIrjIOOxcR-5DG7CPVCTnjS5hY/view?usp=sharing",
    textClass: "text-accent-green",
    borderClass: "border-t-accent-green",
  },
  {
    title: "Master Generative AI & Generative AI tools",
    issuer: "Udemy",
    date: "Aug 2025",
    href: "https://springboard.udemy.com/certificate/UC-3316e042-4f16-4e2c-bfc7-04c9326f903b/",
    textClass: "text-accent-orange",
    borderClass: "border-t-accent-orange",
  },
  {
    title: "Computational Theory",
    issuer: "Infosys",
    date: "Aug 2025",
    href: "https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_0135015511562403847605/1-00474f1b-8131-4192-ada1-ab1e39f08ce6.pdf",
    textClass: "text-accent-blue",
    borderClass: "border-t-accent-blue",
  },
  {
    title: "Prompt Engineering: ChatGPT, Generative AI & LLM",
    issuer: "Udemy",
    date: "Oct 2024",
    href: "https://springboard.udemy.com/certificate/UC-a2cb5e04-1d04-4a75-b556-4eb0b24990be/",
    textClass: "text-accent-green",
    borderClass: "border-t-accent-green",
  },
  {
    title: "Build Generative AI Apps and Solutions with No-Code Tools",
    issuer: "Udemy",
    date: "Sep 2024",
    href: "https://springboard.udemy.com/certificate/UC-8dba5538-25e8-452c-ab49-c0d51e3036c4/",
    textClass: "text-accent-orange",
    borderClass: "border-t-accent-orange",
  },
  {
    title: "IITM Gwalior Hackathon",
    issuer: "Certificate of Achievement",
    date: "Aug 2025",
    href: "https://drive.google.com/file/d/1J9P2oOSur59QAPGNkCc98k7ELfSN6mbb/view?usp=sharing",
    textClass: "text-accent-blue",
    borderClass: "border-t-accent-blue",
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

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="mt-12 lg:mt-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-mono text-xl lg:text-2xl font-semibold text-text-primary mb-2">
                Certifications
              </h2>
              <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                Verified certifications and training from my resume.
              </p>
            </div>

            <Button hoverScale={1.03} tapScale={0.97} asChild>
              <a
                href="/Resume.pdf"
                download="Ronak_Kumar_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 font-mono text-xs lg:text-sm text-navy bg-accent-orange px-5 py-2.5 rounded-lg hover:bg-accent-orange/90 transition-colors font-medium cursor-pointer"
              >
                Download Resume
              </a>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.a
                key={`${cert.title}-${cert.issuer}`}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.05, duration: 0.35 }}
                className={`rounded-lg p-4 border border-line border-t-2 ${cert.borderClass} bg-navy-light/30 hover:-translate-y-1 hover:border-line/80 transition-all duration-300 block`}
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className={`font-mono text-[10px] lg:text-xs font-medium ${cert.textClass}`}>
                    {cert.issuer}
                  </span>
                  <span className="font-mono text-[10px] lg:text-xs text-text-muted">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-mono text-xs lg:text-sm font-semibold text-text-primary leading-relaxed mb-2">
                  {cert.title}
                </h3>

                <p className="font-mono text-[10px] lg:text-xs text-text-muted">
                  View certificate ↗
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
