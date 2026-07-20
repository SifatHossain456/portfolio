"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/game/store";
import { profile } from "@/lib/data";
import { HUD } from "@/game/HUD";

const Scene = dynamic(() => import("@/game/Scene").then((m) => m.Scene), { ssr: false });

function LoadingScreen({ onEnter }: { onEnter: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + Math.random() * 15, 100));
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="mb-6 text-7xl animate-pulse">🌐</div>
        <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          {profile.name}
        </h1>
        <p className="text-slate-400 text-lg mb-8">{profile.title}</p>

        <div className="w-80 max-w-[80vw] mx-auto mb-8">
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-slate-500 text-sm mt-2 text-center">
            {progress < 100 ? "Loading world..." : "Ready to explore!"}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          disabled={progress < 100}
          className={`px-8 py-3 rounded-full font-bold text-white transition-all ${
            progress >= 100
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50"
              : "bg-slate-700 opacity-50 cursor-not-allowed"
          }`}
        >
          Enter World →
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function MobileFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6">
      <div className="max-w-md text-center">
        <div className="text-6xl mb-4">🌐</div>
        <h1 className="text-3xl font-black text-white mb-2">{profile.name}</h1>
        <p className="text-indigo-400 text-lg mb-6">{profile.title}</p>
        <p className="text-slate-400 mb-8">{profile.bio}</p>
        <div className="bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 mb-6">
          <p className="text-amber-400 text-sm mb-4">🎮 This interactive 3D experience is optimized for desktop.</p>
          <p className="text-slate-300 text-sm">Please visit on a larger screen with a keyboard to explore the full portfolio world.</p>
        </div>
        <div className="flex flex-col gap-3">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-white font-semibold transition">
            GitHub Profile →
          </a>
          <a href={`mailto:${profile.email}`} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-white font-semibold transition">
            Contact Me →
          </a>
        </div>
      </div>
    </div>
  );
}

export function GameExperience() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const started = useGame((s) => s.started);
  const start = useGame((s) => s.start);
  const setReducedMotion = useGame((s) => s.setReducedMotion);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mq.removeEventListener("change", handler);
    };
  }, [setReducedMotion]);

  if (!mounted) return null;

  if (isMobile) {
    return <MobileFallback />;
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950">
      <AnimatePresence>
        {!started && <LoadingScreen onEnter={start} />}
      </AnimatePresence>

      {started && (
        <>
          <div className="absolute inset-0">
            <Scene />
          </div>
          <HUD />
        </>
      )}
    </div>
  );
}