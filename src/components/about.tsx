"use client";

import { motion } from "framer-motion";
import { Quote, MapPin, Calendar, Users, GitBranch } from "lucide-react";
import Image from "next/image";
import { profile } from "@/lib/data";

export function About() {
  const meta = [
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Calendar, label: "On GitHub since", value: new Date(profile.createdAt).getFullYear() },
    { icon: Users, label: "Followers", value: profile.followers },
    { icon: GitBranch, label: "Public Repos", value: profile.publicRepos },
  ];

  return (
    <section id="about" className="section-py relative">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">About Me</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{profile.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1 flex flex-col items-center text-center"
          >
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden gradient-border">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.title}</p>
            <div className="mt-3 flex gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs glass">{profile.publicRepos} repos</span>
              <span className="px-2.5 py-1 rounded-full text-xs glass">{profile.publicGists} gists</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <p className="text-foreground/80 leading-relaxed">{profile.bio}</p>
            </div>

            <div className="glass rounded-2xl p-6 relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-brand/20" />
              <p className="text-lg italic text-foreground/90">&ldquo;{profile.quote}&rdquo;</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {meta.map((item) => (
                <div key={item.label} className="glass rounded-xl p-4 flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-brand" />
                  <div>
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-semibold">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}