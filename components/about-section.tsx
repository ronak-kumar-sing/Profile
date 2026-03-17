"use client";

import { motion } from "motion/react";
import { Code, Server, Trophy, BookOpen, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@/components/animate-ui/primitives/radix/accordion";
import { Button } from "@/components/animate-ui/primitives/buttons/button";

const services = [
  {
    icon: Code,
    title: "Frontend Developer",
    description:
      "Crafting sleek, responsive UIs with React, React Native & Tailwind — turning ideas into polished user experiences.",
  },
  {
    icon: Server,
    title: "Backend Developer",
    description:
      "Building robust APIs and databases with Node.js, PHP & MySQL — the brain behind the beauty.",
  },
  {
    icon: Trophy,
    title: "Problem Solver ",
    description:
      "From LeetCode to hackathons — I love cracking complex problems and shipping clever solutions under pressure.",
  },
  {
    icon: BookOpen,
    title: "Lifelong Learner ",
    description:
      "Curious, adaptable & always hungry for challenges — every project is a new adventure worth exploring.",
  },
];

const specializations = [
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Expert in React.js, Next.js, and React Native. Building responsive, performant, and accessible user interfaces with modern tooling like Tailwind CSS and TypeScript.",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile development with React Native and Expo. Delivered production apps with smooth animations, offline support, and native-feeling UX.",
  },
  {
    id: "ai",
    title: "AI Integration",
    description:
      "Integrated Google Gemini 2.0 into Make-it app for AI-powered study resource generation. Experienced in working with LLM APIs to build intelligent assistants.",
  },
  {
    id: "fullstack",
    title: "Full Stack Development",
    description:
      "End-to-end development from database design and REST API development to polished frontend UIs. Comfortable with Node.js, PHP, MySQL, and modern deployment platforms.",
  },
];

const toolCategories = [
  {
    title: "Frontend",
    items: "React.js, Next.js, React Native, TypeScript, Tailwind CSS",
    color: "#4D5BCE",
  },
  {
    title: "Backend & Languages",
    items: "JavaScript, C++, Java, PHP, Node.js",
    color: "#43D9AD",
  },
  {
    title: "Database",
    items: "MySQL, REST APIs",
    color: "#E99287",
  },
  {
    title: "Tools & Ecosystem",
    items: "Git & GitHub, Expo, Vercel, Figma",
    color: "#FEA55F",
  },
];

export default function AboutSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-14 pb-18 md:pb-16"
    >
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 sm:gap-8 lg:gap-12">
          {/* Main content */}
          <div>
            {/* About me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h2 className="font-mono text-xl lg:text-2xl font-semibold text-text-primary mb-3 lg:mb-4">
                About me
              </h2>
              <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed mb-10 lg:mb-12 max-w-[700px]">
                Hi, I&apos;m Ronak Kumar Singh — a software engineer who loves
                turning ideas into real, impactful products. I specialize in the
                full JavaScript ecosystem — React.js, Next.js, React Native —
                and love creating apps that feel smooth, simple, and genuinely
                helpful.
              </p>
            </motion.div>

            {/* Services */}
            <div className="space-y-6 lg:space-y-8 mb-12 lg:mb-16">
              {services.map((service, i) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex gap-4 lg:gap-5"
                >
                  <Button
                    hoverScale={1.1}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-line flex items-center justify-center text-text-muted shrink-0"
                  >
                    <service.icon size={18} />
                  </Button>
                  <div>
                    <h3 className="font-mono text-sm lg:text-base font-semibold text-text-primary mb-1.5 lg:mb-2">
                      {service.title}
                    </h3>
                    <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Areas of Specialization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2 className="font-mono text-xl lg:text-2xl font-semibold text-text-primary mb-2 lg:mb-3">
                Areas of Specialization
              </h2>
              <p className="font-mono text-xs lg:text-sm text-text-muted mb-6 lg:mb-8">
                Core skills I bring to every project
              </p>
            </motion.div>

            <Accordion
              type="single"
              collapsible
              defaultValue="frontend"
              className="space-y-3"
            >
              {specializations.map((spec) => (
                <AccordionItem
                  key={spec.id}
                  value={spec.id}
                  className="border border-line rounded-lg overflow-hidden bg-white/[0.02]"
                >
                  <AccordionHeader>
                    <AccordionTrigger className="w-full flex items-center justify-between px-4 py-3 lg:px-5 lg:py-4 cursor-pointer group">
                      <h3 className="font-mono text-sm lg:text-base font-semibold text-text-primary text-left">
                        {spec.title}
                      </h3>
                      <ChevronDown
                        size={16}
                        className="text-text-muted transition-transform duration-300 group-data-[state=open]:rotate-180"
                      />
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent className="px-4 pb-3 lg:px-5 lg:pb-4">
                    <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed">
                      {spec.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right sidebar: Tools & Platforms */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-5 lg:space-y-6"
          >
            <div>
              <h2 className="font-mono text-base lg:text-lg font-semibold text-text-primary mb-1.5 lg:mb-2">
                Tools &amp; Platforms
              </h2>
              <p className="font-mono text-[10px] lg:text-xs text-text-muted leading-relaxed">
                Here is the list of the tools and platforms that I use.
              </p>
            </div>

            <div className="space-y-3 lg:space-y-4">
              {toolCategories.map((cat) => (
                <div
                  key={cat.title}
                  className="bg-navy-light/40 rounded-lg p-3 lg:p-4 border border-line"
                  style={{ borderTopColor: cat.color, borderTopWidth: 2 }}
                >
                  <h3 className="font-mono text-xs lg:text-sm font-semibold text-text-primary mb-1.5 lg:mb-2">
                    {cat.title}
                  </h3>
                  <p className="font-mono text-[10px] lg:text-xs text-text-muted leading-relaxed">
                    {cat.items}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
