import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PROFILE } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

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
    <html
      lang="en"
      className={`scroll-smooth ${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased selection:bg-[#c6f432] selection:text-[#0b0b0c] bg-[#0b0b0c] text-[#ededed]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
