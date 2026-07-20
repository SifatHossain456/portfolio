import type { Metadata, Viewport } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://sifathossain456.github.io/portfolio/"),
  title: "Sifat Hossain — Web3 & DeFi Developer Portfolio",
  description:
    "Sifat Hossain is a Web3 & DeFi developer building multi-chain decentralized applications across Monad, Sui, Aptos, Solana, Base, and Arc. Explore 40+ projects, skills, and a developer timeline.",
  keywords: [
    "Sifat Hossain",
    "Web3 Developer",
    "DeFi Developer",
    "Solidity",
    "Next.js",
    "Base",
    "Arc Network",
    "Blockchain",
    "Smart Contracts",
    "TypeScript",
  ],
  authors: [{ name: "Sifat Hossain" }],
  creator: "Sifat Hossain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sifathossain456.github.io/portfolio/",
    title: "Sifat Hossain — Web3 & DeFi Developer Portfolio",
    description:
      "Building decentralized applications across Monad, Sui, Aptos, Solana, Base & Arc. Explore 40+ projects.",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/53669494?v=4",
        width: 400,
        height: 400,
        alt: "Sifat Hossain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sifat Hossain — Web3 & DeFi Developer Portfolio",
    description:
      "Building decentralized applications across Monad, Sui, Aptos, Solana, Base & Arc.",
    creator: "@Sifat551",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Sifat Hossain",
              jobTitle: "Web3 & DeFi Developer",
              url: "https://sifathossain456.github.io/portfolio/",
              image: "https://avatars.githubusercontent.com/u/53669494?v=4",
              sameAs: [
                "https://github.com/SifatHossain456",
                "https://x.com/Sifat551",
              ],
              email: "mailto:sifathossain551@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "Bangladesh",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div className="noise-overlay" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}