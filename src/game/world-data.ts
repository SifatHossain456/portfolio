import { projects, profile } from "@/lib/data";

export type ProjectLocation = {
  slug: string;
  name: string;
  position: [number, number, number];
  color: string;
  category: string;
  featured: boolean;
};

// Category color mapping for the 3D world
const categoryColors: Record<string, string> = {
  DeFi: "#10b981",
  Gaming: "#f59e0b",
  "Market Intelligence": "#3b82f6",
  AI: "#8b5cf6",
  Infrastructure: "#06b6d4",
  NFT: "#ec4899",
  DAO: "#f97316",
  Productivity: "#84cc16",
  Education: "#a855f7",
};

// Arrange projects in a spiral galaxy pattern around the center
function generatePositions(): ProjectLocation[] {
  const locations: ProjectLocation[] = [];
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  // Featured projects form an inner ring
  featured.forEach((p, i) => {
    const angle = (i / featured.length) * Math.PI * 2;
    const radius = 18;
    locations.push({
      slug: p.slug,
      name: p.name,
      position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
      color: categoryColors[p.category] || "#ffffff",
      category: p.category,
      featured: true,
    });
  });

  // Regular projects form outer rings
  regular.forEach((p, i) => {
    const ring = Math.floor(i / 8);
    const indexInRing = i % 8;
    const angle = (indexInRing / 8) * Math.PI * 2 + ring * 0.3;
    const radius = 30 + ring * 12;
    locations.push({
      slug: p.slug,
      name: p.name,
      position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
      color: categoryColors[p.category] || "#ffffff",
      category: p.category,
      featured: false,
    });
  });

  return locations;
}

export const projectLocations: ProjectLocation[] = generatePositions();

// Data shard (coin) positions scattered around the world
export const coinPositions: [number, number, number][] = [
  [0, 1, -8],
  [10, 1, -5],
  [-10, 1, -5],
  [5, 1, 10],
  [-5, 1, 10],
  [15, 1, 15],
  [-15, 1, 15],
  [20, 1, -10],
  [-20, 1, -10],
  [25, 1, 5],
  [-25, 1, 5],
  [0, 1, 20],
  [12, 1, -20],
  [-12, 1, -20],
  [30, 1, -15],
  [-30, 1, -15],
  [8, 1, 25],
  [-8, 1, 25],
  [35, 1, 10],
  [-35, 1, 10],
];

export { profile };