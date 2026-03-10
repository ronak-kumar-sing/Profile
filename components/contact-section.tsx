"use client";

import { motion } from "motion/react";
import { Mail, Github, Linkedin, MapPin } from "lucide-react";
import { Button } from "@/components/animate-ui/primitives/buttons/button";

const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "ronakkumar20062006@gmail.com",
    href: "mailto:ronakkumar20062006@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/ronak-kumar-sing",
    href: "https://github.com/ronak-kumar-sing",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ronak-kumar-sing",
    href: "https://linkedin.com/in/ronak-kumar-sing",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Jalandhar, India",
    href: null,
  },
];

export default function ContactSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-14 pb-18 md:pb-16"
    >
      <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left - Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <h2 className="font-mono text-xl lg:text-2xl font-semibold text-text-primary mb-3 lg:mb-4">
                Get In Touch
              </h2>
              <p className="font-mono text-xs lg:text-sm text-text-muted leading-relaxed mb-8 max-w-[500px]">
                I&apos;m currently open to internship and full-time
                opportunities. Whether you have a question, a project idea, or
                just want to connect — my inbox is always open.
              </p>
            </motion.div>

            <div className="space-y-5">
              {INFO.map(({ icon: Icon, label, value, href }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4 group"
                >
                  <Button
                    hoverScale={1.1}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-line flex items-center justify-center text-text-muted shrink-0 group-hover:border-accent-orange/50 group-hover:text-accent-orange transition-colors"
                  >
                    <Icon size={18} />
                  </Button>
                  <div>
                    <p className="font-mono text-[10px] lg:text-xs text-text-muted mb-0.5">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="font-mono text-xs lg:text-sm text-text-primary hover:text-accent-orange transition-colors break-all sm:break-normal"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-mono text-xs lg:text-sm text-text-primary break-all sm:break-normal">
                        {value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-10"
            >
              <Button hoverScale={1.03} tapScale={0.97} asChild>
                <a
                  href="/Resume - Ronak Kumar.pdf"
                  download="Ronak_Kumar_Resume.pdf"
                  className="inline-flex items-center gap-2 font-mono text-xs lg:text-sm text-navy bg-accent-orange px-5 py-2.5 rounded-lg hover:bg-accent-orange/90 transition-colors font-medium cursor-pointer"
                >
                  Download Resume
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Right - Stats & Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-mono text-base lg:text-lg font-semibold text-text-primary mb-4">
                Quick Stats
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3+", label: "Projects Built", color: "#4D5BCE" },
                { value: "1+", label: "Years Experience", color: "#43D9AD" },
                { value: "5+", label: "Hackathons", color: "#FEA55F" },
                { value: "150+", label: "Problems Solved", color: "#E99287" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="bg-navy-light/40 rounded-lg p-4 border border-line text-center"
                  style={{ borderTopColor: stat.color, borderTopWidth: 2 }}
                >
                  <p
                    className="font-mono text-2xl lg:text-3xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] lg:text-xs text-text-muted">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Coding Profiles */}
            <div className="space-y-3">
              <h3 className="font-mono text-sm lg:text-base font-semibold text-text-primary">
                Coding Profiles
              </h3>
              {[
                {
                  name: "LeetCode",
                  url: "https://leetcode.com/ronak-kumar-sing",
                  color: "#FEA55F",
                },
                {
                  name: "GeeksforGeeks",
                  url: "https://www.geeksforgeeks.org/user/ronakkumar20062006",
                  color: "#43D9AD",
                },
              ].map((profile) => (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-navy-light/30 rounded-lg p-3 border border-line hover:border-line/80 transition-colors group"
                >
                  <span className="font-mono text-xs lg:text-sm text-text-primary group-hover:text-accent-orange transition-colors">
                    {profile.name}
                  </span>
                  <span
                    className="font-mono text-xs"
                    style={{ color: profile.color }}
                  >
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
