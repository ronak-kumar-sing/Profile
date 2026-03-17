"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import {
  Files,
  FolderItem,
  FolderTrigger,
  FolderContent,
  FileItem,
} from "@/components/animate-ui/components/radix/files";
import { Button } from "@/components/animate-ui/primitives/buttons/button";

const projects = [
  { id: "make-it-app", name: "Make-it-app" },
  { id: "college-project", name: "College-Project" },
  { id: "student-nest", name: "student-nest" },
  { id: "atm-simulation", name: "ATM-Simulation" },
  { id: "bgmi-advisor", name: "BGMI-advisor" },
];

interface ProjectDetail {
  title: string;
  role: string;
  period: string;
  location: string;
  link?: string;
  video?: string;
  image?: string;
  intro: string;
  problem: string;
  task: string;
  solutionIntro: string;
  solution: string[];
  tech: {
    languages: string;
    tools: string;
    frameworks: string;
  };
}

const projectDetails: Record<string, ProjectDetail> = {
  "make-it-app": {
    title: "Make-it-app",
    role: "Full Stack Developer",
    period: "2024 - Present",
    location: "Personal Project",
    link: "https://make-it-three.vercel.app/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fmake-it-three.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
    intro:
      "A comprehensive productivity and study companion mobile app with AI-powered study resources using Google Gemini 2.0. Designed to help students organize their studies, generate flashcards, and access AI-curated learning materials.",
    problem:
      "Students often struggle with finding the right study resources and organizing their learning effectively. Existing tools lack AI integration to provide personalized, intelligent study assistance.",
    task: "Build a cross-platform mobile app that leverages AI to generate study resources, manage tasks, and provide an intelligent learning companion experience.",
    solutionIntro:
      "Make-it-app provides an AI-first approach to student productivity.",
    solution: [
      "Integrated Google Gemini 2.0 for AI-powered study resource generation.",
      "Built cross-platform mobile app with React Native and Expo.",
      "Implemented task management, flashcard generation, and study tracking.",
      "Created a clean, intuitive UI with smooth animations and offline support.",
    ],
    tech: {
      languages: "TypeScript, JavaScript",
      tools: "Expo, Google Gemini API, Vercel",
      frameworks: "React Native, Next.js, Tailwind CSS",
    },
  },
  "college-project": {
    title: "College-Project",
    role: "Full Stack Developer",
    period: "2024",
    location: "College Project",
    link: "https://cricket-hub-y63h.vercel.app/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fcricket-hub-y63h.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
    intro:
      "A comprehensive career development platform with AI-powered assessments, personalized roadmaps, and job matching features. Built to help students navigate their career paths with data-driven guidance.",
    problem:
      "Students lack personalized guidance for career development. Generic career advice doesn't account for individual skills, interests, and goals.",
    task: "Design and develop a platform that provides personalized career assessments, skill-based roadmaps, and intelligent job matching.",
    solutionIntro:
      "The platform offers a data-driven approach to career development.",
    solution: [
      "Built AI-powered career assessment system.",
      "Implemented personalized learning roadmaps based on skill gaps.",
      "Created job matching engine with smart filtering.",
      "Developed responsive UI with modern PHP and Tailwind CSS.",
    ],
    tech: {
      languages: "PHP, JavaScript",
      tools: "MySQL, REST APIs, MongoDB",
      frameworks: "Tailwind CSS",
    },
  },
  "student-nest": {
    title: "student-nest",
    role: "Frontend Developer",
    period: "2024",
    location: "Hackathon Project",
    link: "https://student-nest-infotsav.vercel.app/",
    image: "https://api.microlink.io/?url=https%3A%2F%2Fstudent-nest-infotsav.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
    intro:
      "A modern student accommodation platform connecting students with verified property owners. Features real-time chat, smart filtering, and responsive design for seamless property discovery.",
    problem:
      "Students face difficulty finding reliable, affordable accommodations near their colleges. Existing platforms are cluttered and lack student-specific features.",
    task: "Build a modern, user-friendly platform specifically designed for student accommodation needs with real-time communication features.",
    solutionIntro:
      "Student Nest provides a focused solution for student housing.",
    solution: [
      "Built responsive property listing with smart filtering and search.",
      "Implemented real-time chat between students and property owners.",
      "Created verified property owner system for trust and safety.",
      "Designed mobile-first responsive UI with Next.js and Tailwind CSS.",
    ],
    tech: {
      languages: "JavaScript, TypeScript",
      tools: "Vercel, REST APIs",
      frameworks: "Next.js, Tailwind CSS",
    },
  },
  "atm-simulation": {
    title: "ATM-Simulation",
    role: "Developer",
    period: "2023",
    location: "College Project",
    link: "https://github.com/ronak-kumar-sing/ATM-Simulation",
    image: "https://opengraph.githubassets.com/1/ronak-kumar-sing/ATM-Simulation",
    intro:
      "A simulation of ATM operations built to demonstrate core programming concepts including object-oriented design, data structures, and transaction processing.",
    problem:
      "Understanding complex banking operations and transaction flows requires hands-on implementation experience.",
    task: "Create an ATM simulation that handles user authentication, balance checking, deposits, withdrawals, and transaction history.",
    solutionIntro:
      "A clean, well-structured ATM simulation covering core banking operations.",
    solution: [
      "Implemented user authentication and session management.",
      "Built transaction processing for deposits, withdrawals, and transfers.",
      "Created transaction history and balance tracking.",
      "Applied OOP principles for clean, maintainable code.",
    ],
    tech: {
      languages: "C++, Java",
      tools: "Git, GitHub",
      frameworks: "Standard Library",
    },
  },
  "bgmi-advisor": {
    title: "BGMI-advisor",
    role: "Developer",
    period: "2024",
    location: "Personal Project",
    link: "https://github.com/ronak-kumar-sing/BGMI-advisor",
    image: "https://opengraph.githubassets.com/1/ronak-kumar-sing/BGMI-advisor",
    intro:
      "A gaming advisory tool that provides tips, strategies, and loadout recommendations for BGMI players. Features intelligent suggestion engine and user-friendly interface.",
    problem:
      "New and intermediate BGMI players lack access to organized, actionable game strategy information.",
    task: "Build an advisory tool that curates and presents game strategies, weapon loadouts, and tips in an accessible format.",
    solutionIntro:
      "BGMI Advisor delivers curated gaming intelligence.",
    solution: [
      "Built curated strategy and tips database.",
      "Implemented weapon loadout recommendation system.",
      "Created intuitive, mobile-friendly user interface.",
      "Designed category-based navigation for easy content discovery.",
    ],
    tech: {
      languages: "JavaScript",
      tools: "Vercel",
      frameworks: "React, Tailwind CSS",
    },
  },
};

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState("make-it-app");
  const details = projectDetails[activeProject];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-14 pb-18 md:pb-16"
    >
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-56px-64px)]">
        {/* Left sidebar */}
        <div className="w-full lg:w-[240px] border-b lg:border-b-0 lg:border-r border-line shrink-0 overflow-y-auto py-3 lg:py-6 px-2 lg:px-3">
          <p className="font-mono text-sm text-text-muted mb-3 lg:mb-6 px-2">
            //projects
          </p>

          {/* Mobile: horizontal project pills */}
          <div className="flex lg:hidden gap-2 px-2 overflow-x-auto scrollbar-hide pb-1">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={`font-mono text-xs whitespace-nowrap px-3 py-1.5 rounded-md border transition-colors shrink-0 ${
                  activeProject === project.id
                    ? "text-text-primary border-accent-blue bg-accent-blue/10"
                    : "text-text-muted border-line hover:border-text-muted/50"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>

          {/* Desktop: file tree */}
          <div className="hidden lg:block">
          <Files
            defaultOpen={["projects"]}
            className="font-mono"
          >
            <FolderItem value="projects">
              <FolderTrigger className="text-accent-blue font-semibold text-xs lg:text-sm">
                projects
              </FolderTrigger>
              <FolderContent>
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setActiveProject(project.id)}
                    className="cursor-pointer"
                  >
                    <FileItem
                      className={`text-xs lg:text-sm transition-colors ${
                        activeProject === project.id
                          ? "text-text-primary font-semibold"
                          : "text-text-muted"
                      }`}
                    >
                      {project.name}
                    </FileItem>
                  </div>
                ))}
              </FolderContent>
            </FolderItem>
          </Files>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="max-w-[800px]">
            {/* Project Preview Image */}
            {details.image && (
              <motion.div
                key={`preview-${activeProject}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mb-5 lg:mb-6"
              >
                <a
                  href={details.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative rounded-xl overflow-hidden border border-line bg-navy-light/40 hover:border-accent-blue/50 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={details.image}
                    alt={`${details.title} preview`}
                    className="w-full aspect-[16/9] object-cover object-top"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).parentElement!.style.display = "none";
                    }}
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
                      <ExternalLink size={14} className="text-white" />
                      <span className="font-mono text-xs text-white">Open Project</span>
                    </div>
                  </div>
                  {/* Top-right badge */}
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
                    <span className="font-mono text-[9px] text-white/80">Live</span>
                  </div>
                </a>
              </motion.div>
            )}

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 lg:mb-8">
              <div>
                <h1 className="font-mono text-lg lg:text-2xl font-semibold text-text-primary mb-1.5 lg:mb-2">
                  {details.role}
                </h1>
                <p className="font-mono text-xs lg:text-sm text-text-muted">
                  {details.period}
                </p>
                <p className="font-mono text-xs lg:text-sm text-text-muted">
                  {details.location}
                </p>
              </div>
              {details.link && (
                <Button
                  hoverScale={1.05}
                  className="shrink-0"
                >
                  <a
                    href={details.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs lg:text-sm text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink size={13} />
                    _visit_project
                  </a>
                </Button>
              )}
            </div>

            {/* Sections */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="font-mono text-base lg:text-lg font-semibold text-text-primary mb-3 lg:mb-4">
                  Project Intro
                </h2>
                <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                  {details.intro}
                </p>
              </div>

              <div>
                <h2 className="font-mono text-base lg:text-lg font-semibold text-text-primary mb-3 lg:mb-4">
                  Problem statement
                </h2>
                <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                  {details.problem}
                </p>
              </div>

              <div>
                <h2 className="font-mono text-base lg:text-lg font-semibold text-text-primary mb-3 lg:mb-4">
                  Task
                </h2>
                <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                  {details.task}
                </p>
              </div>

              <div>
                <h2 className="font-mono text-base lg:text-lg font-semibold text-text-primary mb-3 lg:mb-4">
                  Solution
                </h2>
                <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed mb-3">
                  {details.solutionIntro}
                </p>
                <ul className="space-y-2">
                  {details.solution.map((item, i) => (
                    <li
                      key={i}
                      className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed flex gap-2"
                    >
                      <span className="shrink-0">-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Tech */}
        <div className="w-full lg:w-[280px] border-t lg:border-t-0 lg:border-l border-line shrink-0 overflow-y-auto py-6 lg:py-8 px-4 lg:px-5">
          <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-col gap-3 lg:gap-4 overflow-x-auto lg:overflow-x-visible">
            <div
              className="bg-navy-light/40 rounded-lg p-3 lg:p-4 border border-line flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-0"
              style={{ borderTopColor: "#4D5BCE", borderTopWidth: 2 }}
            >
              <h3 className="font-mono text-xs lg:text-sm font-semibold text-text-primary mb-1.5 lg:mb-2">
                Languages
              </h3>
              <p className="font-mono text-[10px] lg:text-xs text-text-muted leading-relaxed">
                {details.tech.languages}
              </p>
            </div>
            <div
              className="bg-navy-light/40 rounded-lg p-3 lg:p-4 border border-line flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-0"
              style={{ borderTopColor: "#43D9AD", borderTopWidth: 2 }}
            >
              <h3 className="font-mono text-xs lg:text-sm font-semibold text-text-primary mb-1.5 lg:mb-2">
                Tools
              </h3>
              <p className="font-mono text-[10px] lg:text-xs text-text-muted leading-relaxed">
                {details.tech.tools}
              </p>
            </div>
            <div
              className="bg-navy-light/40 rounded-lg p-3 lg:p-4 border border-line flex-1 min-w-[140px] sm:min-w-[200px] lg:min-w-0"
              style={{ borderTopColor: "#E99287", borderTopWidth: 2 }}
            >
              <h3 className="font-mono text-xs lg:text-sm font-semibold text-text-primary mb-1.5 lg:mb-2">
                Frameworks
              </h3>
              <p className="font-mono text-[10px] lg:text-xs text-text-muted leading-relaxed">
                {details.tech.frameworks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
