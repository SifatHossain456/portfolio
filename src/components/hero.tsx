"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Twitter, Mail, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import { profile, projects } from "@/lib/data";

const ThreeBackground = dynamic(() => import("./three-background"), { ssr: false });

const stats = [
  { label: "Public Repos", value: profile.publicRepos },
  { label: "Projects Built", value: projects.length },
  { label: "Featured", value: projects.filter((p) => p.featured).length },
  { label: "Years on GitHub", value: new Date().getFullYear() - 2019 },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ThreeBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background -z-10" />

      <div className="container-px mx-auto max-w-5xl text-center relative z-10">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-brand" />
          <span className="text-sm font-medium">{profile.location}</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-balance"
        >
          <span className="gradient-text">{profile.name}</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-2xl sm:text-3xl font-semibold text-foreground/90"
        >
          {profile.title}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-3 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#projects" className="px-6 py-3 rounded-lg bg-brand text-brand-foreground font-medium hover:opacity-90 transition-opacity">
            View Projects
          </a>
          <a href="#contact" className="px-6 py-3 rounded-lg glass glass-hover font-medium">
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass glass-hover" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href={profile.twitterUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full glass glass-hover" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href={`mailto:${profile.email}`} className="p-2.5 rounded-full glass glass-hover" aria-label="Email">
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4">
              <div className="text-3xl font-bold gradient-text">{stat.value}+</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll down"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.a>
    </section>
  );
}