import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zohaib Umer | AI Engineer & Full Stack Developer",
  description: "Portfolio of Zohaib Umer, showcasing expertise in React, Next.js, FastAPI, LangChain, and Generative AI systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased selection:bg-[rgba(176,38,255,0.5)] selection:text-white`}>
        <CustomCursor />
        <AnimatedBackground />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
