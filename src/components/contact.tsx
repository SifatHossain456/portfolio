"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Twitter, Linkedin, Send, MapPin, MessageSquare } from "lucide-react";
import { profile } from "@/lib/data";

const socials = [
  { icon: Github, label: "GitHub", url: profile.githubUrl, color: "hover:text-purple-400" },
  { icon: Twitter, label: "Twitter", url: profile.twitterUrl, color: "hover:text-blue-400" },
  { icon: Linkedin, label: "LinkedIn", url: `https://linkedin.com/in/${profile.github}`, color: "hover:text-blue-500" },
  { icon: Mail, label: "Email", url: `mailto:${profile.email}`, color: "hover:text-green-400" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section-py relative">
      <div className="container-px mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text inline-block">Get In Touch</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Let us build something great together.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-brand/10">
                  <MessageSquare className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-bold text-lg">Let us Talk</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                I am always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Whether you have a question or just want to say hi, I will try my best to get back to you!
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-brand/10">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-bold text-lg">Location</h3>
              </div>
              <p className="text-sm text-muted-foreground">{profile.location}</p>
              <p className="text-sm text-muted-foreground mt-1">Available for remote work worldwide</p>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl glass transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-6 space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name</label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-accent border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-accent border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1.5">Message</label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg bg-accent border border-border focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-brand-foreground font-medium hover:opacity-90 transition-opacity"
            >
              <Send className="w-4 h-4" />
              {sent ? "Opening mail client..." : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
