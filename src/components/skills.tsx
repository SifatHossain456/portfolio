"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { skillGroups } from "@/lib/data";

export function Skills() {
  return (
    <section id="skills" className="section-py relative">
      <div className="container-px mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">Skills & Technologies</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to build across the decentralized web.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => {
            const Icon = (Icons as any)[group.icon] ?? Icons.Code2;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-lg bg-brand/10">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="font-bold text-lg">{group.category}</h3>
                </div>

                <div className="space-y-3">
                  {group.skills.map((skill, si) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-accent overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: si * 0.05, ease: "easeOut" }}
                          className="h-full rounded-full gradient-bg"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}