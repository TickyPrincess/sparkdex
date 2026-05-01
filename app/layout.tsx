import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "SparkDex — Terminal-native AI pet for card market tracking",
  description:
    "SparkDex is a terminal-native AI pet for collectible card market tracking, watchlists, risk-aware buy/hold/sell signals, and mispricing hunts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${sans.variable} ${mono.variable} spark-bg min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
