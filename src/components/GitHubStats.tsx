"use client";

import { motion } from "framer-motion";
import { stats, profile } from "@/lib/data";

const statCards = [
  {
    label: "Public Repositories",
    value: stats.totalRepos,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#8b5cf6",
  },
  {
    label: "Total Stars",
    value: stats.totalStars,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    color: "#f59e0b",
  },
  {
    label: "DeFi Protocols",
    value: stats.defiProtocols,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="8" cy="8" r="6" />
        <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
        <path d="M7 6h1v4" />
      </svg>
    ),
    color: "#10b981",
  },
  {
    label: "Chains Supported",
    value: stats.chainsSupported,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <line x1="12" y1="7" x2="6" y2="17" />
        <line x1="12" y1="7" x2="18" y2="17" />
      </svg>
    ),
    color: "#3b82f6",
  },
  {
    label: "Years Active",
    value: stats.yearsActive,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: "#ec4899",
  },
  {
    label: "Total Projects",
    value: stats.totalProjects,
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    color: "#06b6d4",
  },
];

function generateContributions() {
  const weeks = 52;
  const days = 7;
  const data: { date: Date; count: number; level: number }[] = [];
  const now = new Date();

  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < days; d++) {
      const date = new Date(now);
      date.setDate(date.getDate() - w * 7 - (6 - d));
      const seed = (date.getDate() + date.getMonth() * 31) % 100;
      const baseActivity = seed < 20 ? 0 : seed < 40 ? 1 : seed < 60 ? 2 : seed < 80 ? 3 : 4;
      const weekendBoost = d === 0 || d === 6 ? -1 : 0;
      const level = Math.max(0, Math.min(4, baseActivity + weekendBoost));
      const count = level === 0 ? 0 : level * 2 + (seed % 3);
      data.push({ date, count, level });
    }
  }
  return data;
}

const levelColors = [
  "#161b22",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

function ContributionGraph() {
  const contributions = generateContributions();
  const total = contributions.reduce((sum, c) => sum + c.count, 0);

  const weeks: typeof contributions[] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  return (
    <div className="glass-card rounded-2xl p-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">Contribution Activity</h3>
          <p className="text-sm text-[var(--text-tertiary)]">
            {total} contributions in the last year
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]">
          <span>Less</span>
          {levelColors.map((color, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-sm"
              style={{ background: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
      <div className="flex gap-1 min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day, di) => (
              <motion.div
                key={`${wi}-${di}`}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: (wi * 7 + di) * 0.002 }}
                className="w-3 h-3 rounded-sm hover:ring-2 hover:ring-[var(--accent)] transition-all cursor-pointer"
                style={{ background: levelColors[day.level] }}
                title={`${day.date.toLocaleDateString()}: ${day.count} contributions`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GitHubStats() {
  return (
    <section id="github" className="section relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--accent-secondary)] uppercase tracking-widest">
            GitHub Activity
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Open Source <span className="gradient-text">Stats</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-5 text-center group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"
                style={{ background: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <ContributionGraph />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-full border-2 border-[var(--accent)]"
            />
            <div>
              <h3 className="font-bold">{profile.name}</h3>
              <p className="text-sm text-[var(--text-tertiary)]">@{profile.github}</p>
            </div>
          </div>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.605-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.845 2.805 1.335 3.495 1.005.105-.78.42-1.335.765-1.64-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Visit GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}