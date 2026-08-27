import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norr312.industries"),
  title: {
    default: "NO.rr 312 — Industrial & Architectural Jewelry",
    template: "%s · NO.rr 312",
  },
  description:
    "NO.rr 312 — Independent titanium and tension-wire jewelry engineering. Precision kinetic artifacts.",
  keywords: [
    "NO.rr 312",
    "Titanium jewelry",
    "Architectural jewelry",
    "Industrial design",
    "Kinetic ring",
    "Tension ring",
    "MOD. R1 V3",
  ],
  authors: [{ name: "NO.rr 312" }],
  openGraph: {
    type: "website",
    title: "NO.rr 312 — Industrial & Architectural Jewelry",
    description: "Independent titanium and tension-wire jewelry engineering. Precision kinetic artifacts.",
    siteName: "NO.rr 312",
  },
};

export const viewport: Viewport = {
  themeColor: "#111215",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body suppressHydrationWarning className="bg-[#111215] text-[#f0f2f5] overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}

