import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothset — Digital Wardrobe & Outfit Planner",
  description: "Minimalist digital wardrobe organizer and outfit planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream bg-ambient-dots text-charcoal">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
