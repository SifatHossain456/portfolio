"use client";

import { motion } from "framer-motion";
import { profile, projects } from "@/lib/data";

const stats = [
  { label: "Public Repos", value: profile.publicRepos, suffix: "+" },
  { label: "Total Projects", value: projects.length, suffix: "" },
  { label: "Chains Built On", value: 8, suffix: "" },
  { label: "Years on GitHub", value: new Date().getFullYear() - 2019, suffix: "" },
];

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--accent-secondary)] uppercase tracking-widest">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            The <span className="gradient-text">Developer</span> Journey
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full border-2 border-[var(--accent)]"
                />
                <div>
                  <h3 className="text-xl font-bold">{profile.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{profile.title}</p>
                </div>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                {profile.bio}
              </p>
              <div className="flex flex-wrap gap-2">
                {["DeFi", "Web3", "Multi-Chain", "Smart Contracts", "AI", "On-Chain Gaming"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium glass-card">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-1">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-[var(--text-secondary)]">{stat.label}</div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-2xl p-6 col-span-2"
            >
              <div className="flex items-center gap-3 mb-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-sm font-medium">{profile.location}</span>
              </div>
              <p className="text-sm text-[var(--text-tertiary)] italic">"{profile.quote}"</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}