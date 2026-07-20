"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/game/store";
import { projects } from "@/lib/data";
import { useState, useEffect } from "react";

function AchievementToast() {
  const showAchievement = useGame((s) => s.showAchievement);
  return (
    <AnimatePresence>
      {showAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-gradient-to-r from-amber-500/90 to-yellow-500/90 backdrop-blur-md border border-amber-300 rounded-xl px-6 py-4 shadow-2xl shadow-amber-500/50">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏆</div>
              <div>
                <div className="text-xs uppercase tracking-wider text-amber-100 font-semibold">Achievement Unlocked</div>
                <div className="text-lg font-bold text-white">{showAchievement.title}</div>
                <div className="text-sm text-amber-50">{showAchievement.description}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectPanel() {
  const activeProject = useGame((s) => s.activeProject);
  const setActiveProject = useGame((s) => s.setActiveProject);
  const project = projects.find((p) => p.slug === activeProject);
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-20 right-4 bottom-20 w-full max-w-md z-40 pointer-events-auto"
        >
          <div className="h-full bg-slate-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-2xl overflow-hidden flex flex-col">
            <div className="relative h-40 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
              <div className="text-6xl">{project.category === "DeFi" ? "💰" : project.category === "Gaming" ? "🎮" : project.category === "AI" ? "🤖" : project.category === "NFT" ? "🖼️" : project.category === "DAO" ? "🏛️" : project.category === "Infrastructure" ? "⚙️" : project.category === "Market Intelligence" ? "📊" : project.category === "Education" ? "📚" : "📦"}</div>
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition"
              >
                ✕
              </button>
              {project.featured && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-black text-xs font-bold rounded-full">
                  ★ FEATURED
                </div>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-5 text-white">
              <div className="text-xs uppercase tracking-wider text-indigo-400 font-semibold mb-1">{project.category}</div>
              <h2 className="text-2xl font-bold mb-3">{project.name}</h2>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{project.description}</p>
              <div className="mb-4">
                <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.languages.map((lang) => (
                    <span key={lang} className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/40 rounded text-xs text-indigo-200">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Highlights</div>
                  <ul className="space-y-1">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-indigo-400 mt-1">▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2 mt-6">
                {project.homepage && (
                  <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-center text-sm font-semibold transition">
                    Live Demo →
                  </a>
                )}
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-center text-sm font-semibold transition">
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatsBar() {
  const collectedCoins = useGame((s) => s.collectedCoins);
  const totalCoins = useGame((s) => s.totalCoins);
  const visitedProjects = useGame((s) => s.visitedProjects);
  const achievements = useGame((s) => s.achievements);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  return (
    <div className="fixed top-4 left-4 z-30 flex gap-3 pointer-events-none">
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className="text-amber-400 text-lg">🪙</span>
        <span className="text-white text-sm font-semibold">{collectedCoins}/{totalCoins}</span>
      </div>
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className="text-indigo-400 text-lg">📍</span>
        <span className="text-white text-sm font-semibold">{visitedProjects.length}</span>
      </div>
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-lg px-3 py-2 flex items-center gap-2">
        <span className="text-yellow-400 text-lg">🏆</span>
        <span className="text-white text-sm font-semibold">{unlockedCount}/{achievements.length}</span>
      </div>
    </div>
  );
}

function ControlsHint() {
  const [visible, setVisible] = useState(true);
  const started = useGame((s) => s.started);
  useEffect(() => {
    if (!started) return;
    const t = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(t);
  }, [started]);
  if (!visible) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
      <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-lg px-4 py-2 flex items-center gap-4 text-white text-sm">
        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs">W A S D</kbd>Move</span>
        <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 bg-slate-700 rounded text-xs">Space</kbd>Jump</span>
        <span className="flex items-center gap-1"><span className="text-indigo-400">●</span>Approach islands to explore</span>
      </div>
    </motion.div>
  );
}

function ThemeToggle() {
  const theme = useGame((s) => s.theme);
  const toggleTheme = useGame((s) => s.toggleTheme);
  return (
    <button onClick={toggleTheme} className="fixed top-4 right-4 z-30 w-10 h-10 bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-lg flex items-center justify-center text-white hover:bg-slate-800 transition" aria-label="Toggle theme">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}

function AchievementsPanel() {
  const [open, setOpen] = useState(false);
  const achievements = useGame((s) => s.achievements);
  return (
    <>
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 z-30 w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-amber-500/30 hover:scale-110 transition" aria-label="Achievements">🏆</button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-6">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Achievements</h3>
                  <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white text-2xl leading-none">✕</button>
                </div>
                <div className="space-y-2">
                  {achievements.map((a) => (
                    <div key={a.id} className={`flex items-center gap-3 p-3 rounded-lg ${a.unlocked ? "bg-amber-500/10 border border-amber-500/30" : "bg-slate-800/50 border border-slate-700/50 opacity-50"}`}>
                      <div className="text-2xl">{a.unlocked ? "🏆" : "🔒"}</div>
                      <div>
                        <div className="text-white font-semibold text-sm">{a.title}</div>
                        <div className="text-slate-400 text-xs">{a.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function HUD() {
  return (
    <>
      <StatsBar />
      <ThemeToggle />
      <AchievementToast />
      <ProjectPanel />
      <ControlsHint />
      <AchievementsPanel />
    </>
  );
}