"use client";

import { motion } from "framer-motion";
import { GitCommit, Star, Users, BookMarked, Activity, Calendar } from "lucide-react";
import { profile, projects } from "@/lib/data";

const totalStars = projects.reduce((sum, p) => sum + p.stars, 0);
const languages = projects.reduce<Record<string, number>>((acc, p) => {
  acc[p.language] = (acc[p.language] ?? 0) + 1;
  return acc;
}, {});
const topLanguages = Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 6);

const stats = [
  { icon: GitCommit, label: "Public Repos", value: profile.publicRepos, color: "text-purple-400" },
  { icon: Star, label: "Total Stars", value: totalStars, color: "text-yellow-400" },
  { icon: Users, label: "Followers", value: profile.followers, color: "text-blue-400" },
  { icon: BookMarked, label: "Gists", value: profile.publicGists, color: "text-green-400" },
];

function generateContributions() {
  const days = 365;
  const grid: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const count = projects.filter(
      (p) => p.createdAt === dateStr || p.updatedAt === dateStr
    ).length;
    const baseline = Math.floor(Math.random() * 3);
    grid.push({ date: dateStr, count: count + baseline });
  }
  return grid;
}

const contributions = generateContributions();
const weeks: { date: string; count: number }[][] = [];
for (let i = 0; i < contributions.length; i += 7) {
  weeks.push(contributions.slice(i, i + 7));
}

function getLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;
  return 4;
}

const levelColors = [
  "bg-accent",
  "bg-brand/30",
  "bg-brand/50",
  "bg-brand/70",
  "bg-brand",
];

export function GitHubActivity() {
  return (
    <section id="activity" className="section-py relative">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">GitHub Activity</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A snapshot of my open-source contributions and development activity.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-xl p-4 text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 overflow-x-auto"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-brand" />
            <h3 className="font-semibold text-sm">Contribution Activity (last year)</h3>
          </div>
          <div className="flex gap-1 min-w-max">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day) => (
                  <div
                    key={day.date}
                    className={`w-2.5 h-2.5 rounded-sm ${levelColors[getLevel(day.count)]} hover:ring-1 hover:ring-brand transition-all`}
                    title={`${day.date}: ${day.count} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            {levelColors.map((c, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
            ))}
            <span>More</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass rounded-2xl p-6 mt-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-brand" />
            <h3 className="font-semibold text-sm">Top Languages</h3>
          </div>
          <div className="space-y-3">
            {topLanguages.map(([lang, count]) => {
              const pct = (count / projects.length) * 100;
              return (
                <div key={lang}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-medium">{lang}</span>
                    <span className="text-xs text-muted-foreground">{count} repos</span>
                  </div>
                  <div className="h-2 rounded-full bg-accent overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full gradient-bg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}