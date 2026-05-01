import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "SparkDex — Green Terminal Card Market Pet",
  description:
    "SparkDex is a terminal-native AI pet for collectible card market tracking, watchlists, and risk-aware buy/hold/sell signals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${mono.variable} spark-bg min-h-screen antialiased`}>{children}</body>
    </html>
  );
}
