import type { MetadataRoute } from "next";
import { profile, projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sifathossain456.github.io/portfolio";
  const lastModified = new Date();

  const projectRoutes = projects.map((p) => ({
    url: `${base}/#${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#projects`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/#skills`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#timeline`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/#contact`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#github`, lastModified, changeFrequency: "daily", priority: 0.7 },
    ...projectRoutes,
  ];
}