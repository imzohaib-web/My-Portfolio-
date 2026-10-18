import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

import { PROFILE } from "@/lib/profile";

export const metadata: Metadata = {
  metadataBase: new URL("https://zohaibumer.dev"),
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description: `Portfolio of ${PROFILE.name}, showcasing expertise in React, Next.js, FastAPI, LangChain, and Generative AI systems.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-[rgba(176,38,255,0.5)] selection:text-white`}>
        <CustomCursor />
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
