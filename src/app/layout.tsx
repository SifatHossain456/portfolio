import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/data";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://sifat-portfolio.vercel.app"),
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
    url: "https://sifat-portfolio.vercel.app",
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
  alternates: { canonical: "https://sifat-portfolio.vercel.app" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}