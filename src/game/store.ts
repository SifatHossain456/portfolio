import { create } from "zustand";

export type GamePhase = "loading" | "menu" | "playing" | "exploring";

export type Theme = "dark" | "light";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
};

export type GameState = {
  phase: GamePhase;
  started: boolean;
  activeProject: string | null;
  visitedProjects: string[];
  collectedCoins: number;
  totalCoins: number;
  achievements: Achievement[];
  showAchievement: Achievement | null;
  reducedMotion: boolean;
  theme: Theme;
  start: () => void;
  setActiveProject: (slug: string | null) => void;
  visitProject: (slug: string) => void;
  collectCoin: () => void;
  unlockAchievement: (id: string) => void;
  setReducedMotion: (v: boolean) => void;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const defaultAchievements: Achievement[] = [
  { id: "first-steps", title: "First Steps", description: "Begin your journey", unlocked: false },
  { id: "explorer", title: "Explorer", description: "Visit 5 project islands", unlocked: false },
  { id: "voyager", title: "Voyager", description: "Visit 15 project islands", unlocked: false },
  { id: "completionist", title: "Completionist", description: "Visit all project islands", unlocked: false },
  { id: "treasure-hunter", title: "Treasure Hunter", description: "Collect 10 data shards", unlocked: false },
  { id: "arc-nova", title: "Arc Nova Discovery", description: "Find the flagship project", unlocked: false },
  { id: "speed-demon", title: "Speed Demon", description: "Reach maximum velocity", unlocked: false },
];

export const useGame = create<GameState>((set, get) => ({
  phase: "loading",
  started: false,
  activeProject: null,
  visitedProjects: [],
  collectedCoins: 0,
  totalCoins: 20,
  achievements: defaultAchievements,
  showAchievement: null,
  reducedMotion: false,
  theme: "dark",
  start: () => set({ phase: "playing", started: true }),
  setActiveProject: (slug) => set({ activeProject: slug, phase: slug ? "exploring" : "playing" }),
  visitProject: (slug) => {
    const state = get();
    if (state.visitedProjects.includes(slug)) return;
    const visited = [...state.visitedProjects, slug];
    set({ visitedProjects: visited });
    if (visited.length >= 5) get().unlockAchievement("explorer");
    if (visited.length >= 15) get().unlockAchievement("voyager");
    if (visited.length >= 25) get().unlockAchievement("completionist");
    if (slug === "arc-nova") get().unlockAchievement("arc-nova");
  },
  collectCoin: () => {
    const state = get();
    const collected = state.collectedCoins + 1;
    set({ collectedCoins: collected });
    if (collected >= 10) get().unlockAchievement("treasure-hunter");
  },
  unlockAchievement: (id) => {
    const state = get();
    const ach = state.achievements.find((a) => a.id === id);
    if (!ach || ach.unlocked) return;
    const achievements = state.achievements.map((a) => (a.id === id ? { ...a, unlocked: true } : a));
    const updated = achievements.find((a) => a.id === id)!;
    set({ achievements, showAchievement: updated });
    setTimeout(() => set({ showAchievement: null }), 4000);
  },
  setReducedMotion: (v) => set({ reducedMotion: v }),
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
  setTheme: (t) => set({ theme: t }),
}));