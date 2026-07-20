"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { timeline } from "@/lib/data";

const categoryColors: Record<string, string> = {
  milestone: "from-purple-500 to-pink-500",
  project: "from-blue-500 to-cyan-500",
  learning: "from-green-500 to-emerald-500",
};

export function Timeline() {
  const sorted = [...timeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <section id="timeline" className="section-py relative">
      <div className="container-px mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">Developer Journey</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Key milestones and projects from my GitHub journey.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

          {sorted.map((event, i) => {
            const Icon = (Icons as any)[event.icon] ?? Icons.Circle;
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={event.title + event.date}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center mb-8 ${isLeft ? "md:justify-start" : "md:justify-end"}`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full gradient-bg md:-translate-x-1/2 ring-4 ring-background z-10" />

                <div className={`pl-12 md:pl-0 w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                  <div className="glass rounded-2xl p-5 group hover:scale-[1.02] transition-transform">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg bg-gradient-to-br ${categoryColors[event.category] ?? "from-brand to-brand"}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <time className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </time>
                    </div>
                    <h3 className="font-bold text-base">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}