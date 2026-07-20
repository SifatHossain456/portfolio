import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { profile, skillGroups } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sifathossain456.github.io/portfolio"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.bio,
  keywords: [
    "Sifat Hossain",
    "Web3 Developer",
    "DeFi Developer",
    "Solidity",
    "Next.js",
    "Base",
    "Ethereum",
    "Smart Contracts",
    "Blockchain",
    "TypeScript",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sifathossain456.github.io/portfolio",
    title: `${profile.name} — ${profile.title}`,
    description: profile.bio,
    siteName: `${profile.name} Portfolio`,
    images: [{ url: profile.avatar, width: 400, height: 400, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.bio,
    creator: `@${profile.twitter}`,
    images: [profile.avatar],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: "https://sifathossain456.github.io/portfolio" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: "https://sifathossain456.github.io/portfolio",
  image: profile.avatar,
  jobTitle: profile.title,
  description: profile.bio,
  sameAs: [profile.githubUrl, profile.twitterUrl],
  knowsAbout: skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-slate-950`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
