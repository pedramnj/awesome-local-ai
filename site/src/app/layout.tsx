import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Awesome Local AI — tools for running AI on your own hardware",
  description:
    "A filterable directory of self-hosted and local AI tools across 18 categories: LLM runtimes, UIs, code assistants, image generation, speech, RAG, agents, and more.",
  openGraph: {
    title: "Awesome Local AI",
    description:
      "Self-hosted and local AI tools across 18 categories. Curated, hardware-honest, no cloud required.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">
        {children}
      </body>
    </html>
  );
}
