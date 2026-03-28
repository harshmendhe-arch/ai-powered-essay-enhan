import type { Metadata } from "next";
import { Geist, Geist_Mono, Merriweather, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PersonaProvider } from "@/components/layout/PersonaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Powered Writing Assistant",
  description:
    "Improve essays with grammar correction, sentence enhancement, and vocabulary suggestions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${merriweather.variable} ${jetbrainsMono.variable} h-full antialiased theme-literature`}
    >
      <body className="min-h-full font-sans transition-colors duration-500 bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col selection:bg-[var(--accent-color)] selection:text-white">
        <PersonaProvider>
          {children}
        </PersonaProvider>
      </body>
    </html>
  );
}
