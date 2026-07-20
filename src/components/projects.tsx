"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ExternalLink, Github, Filter } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

const categories = ["All", "Featured", "DeFi", "AI", "Gaming", "Infrastructure", "NFT", "DAO", "Market Intelligence", "Productivity", "Education"];

export function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered = projects.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Featured") return p.featured;
    return p.category === filter;
  });

  return (
    <section id="projects" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">Featured Projects</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A curated selection of work spanning Web3, AI, and full-stack development.
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                filter === cat
                  ? "bg-brand text-brand-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl overflow-hidden flex flex-col group"
              >
                <div className="relative h-40 bg-gradient-to-br from-brand/20 to-brand/5 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle, var(--brand) 1px, transparent 1px)`, backgroundSize: "16px 16px" }} />
                  </div>
                  <span className="text-4xl font-bold gradient-text">{project.name.charAt(0)}</span>
                  {project.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs bg-brand text-brand-foreground flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-lg">{project.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full glass shrink-0">{project.category}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground flex-1">{project.description}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.languages.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-accent">{t}</span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" /> {project.stars}</span>
                      <span className="text-xs">{project.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-accent transition-colors" aria-label={`${project.name} on GitHub`}>
                        <Github className="w-4 h-4" />
                      </a>
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md hover:bg-accent transition-colors" aria-label={`${project.name} live demo`}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}