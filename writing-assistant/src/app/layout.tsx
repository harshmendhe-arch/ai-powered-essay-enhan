import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-slate-100 text-slate-900 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
