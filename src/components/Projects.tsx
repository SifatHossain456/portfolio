"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, categories, type Project } from "@/lib/data";

const categoryColors: Record<string, string> = {
  DeFi: "#8b5cf6",
  "Market Intelligence": "#3b82f6",
  Infrastructure: "#06b6d4",
  Gaming: "#f59e0b",
  AI: "#ec4899",
  NFT: "#10b981",
  DAO: "#f97316",
  Productivity: "#6366f1",
  Education: "#14b8a6",
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const color = categoryColors[project.category] || "#8b5cf6";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="glass-card rounded-2xl overflow-hidden group relative"
    >
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold"
              style={{ background: `${color}20`, color }}
            >
              {project.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-[var(--accent)] transition-colors">
                {project.name}
              </h3>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${color}20`, color }}
              >
                {project.category}
              </span>
            </div>
          </div>
          {project.featured && (
            <span className="text-xs bg-[var(--accent)] text-white px-2 py-1 rounded-full font-medium">
              ★ Featured
            </span>
          )}
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
          {project.description}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.highlights.slice(0, 3).map((h) => (
              <span
                key={h}
                className="text-xs px-2 py-1 rounded-md bg-[var(--card-bg)] text-[var(--text-tertiary)]"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.languages.slice(0, 4).map((lang) => (
            <span
              key={lang}
              className="text-xs px-2 py-0.5 rounded border border-[var(--border)] text-[var(--text-tertiary)]"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {project.stars}
            </span>
            <span>{new Date(project.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
          </div>
          <div className="flex gap-2">
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass-card hover:text-[var(--accent)] transition-colors"
                aria-label="Live demo"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg glass-card hover:text-[var(--accent)] transition-colors"
              aria-label="GitHub repository"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.605-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.845 2.805 1.335 3.495 1.005.105-.78.42-1.335.765-1.64-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    let list = activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
    list = [...list].sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return showAll ? list : list.slice(0, 9);
  }, [activeCategory, showAll]);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[var(--accent-secondary)] uppercase tracking-widest">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            <span className="gradient-text">Projects</span> Portfolio
          </h2>
          <p className="text-[var(--text-secondary)] mt-4 max-w-2xl mx-auto">
            {projects.length} repositories across DeFi, AI, Gaming, Infrastructure, and more — built on 8+ chains.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {featuredProjects.slice(0, 3).map((p, i) => (
            <motion.a
              key={p.slug}
              href={p.homepage || p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group"
            >
              <div
                className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity"
                style={{ background: categoryColors[p.category] || "#8b5cf6" }}
              />
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: categoryColors[p.category] || "#8b5cf6" }}
                />
                <span className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">
                  {p.category}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {p.name}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                {p.description}
              </p>
            </motion.a>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setShowAll(false);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[var(--accent)] text-white"
                  : "glass-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {!showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="btn-secondary"
            >
              Show All {projects.length} Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}