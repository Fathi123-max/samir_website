import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Samir Elgammal | System Broadcast & OB Engineer — CCU & EVS Specialist",
  description: "Senior System Broadcast & OB Engineer with 18+ years keeping live sports, international summits (COP28), and primetime productions on-air across UAE, KSA, and GCC.",
  keywords: [
    "Samir Elgammal",
    "Broadcast Engineer Dubai",
    "OB Van Engineer UAE",
    "CCU Operator",
    "EVS Specialist",
    "Sony MVS-8000X",
    "COP28 Broadcast",
    "UAE Pro League OB Truck",
    "Pebble Beach Playout",
    "Live Television Systems",
  ],
  authors: [{ name: "Samir Elgammal" }],
  creator: "Samir Elgammal",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://samirelgammal.com",
    title: "Samir Elgammal | System Broadcast & OB Engineer",
    description: "18+ years keeping live broadcasts on-air — from high-pressure OB vans to master control rooms.",
    siteName: "Samir Elgammal Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samir Elgammal | System Broadcast & OB Engineer",
    description: "CCU & EVS Specialist — 18+ Years Live Sports & High-Stakes Production Engineering.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] antialiased selection:bg-amber-500 selection:text-black">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-3 focus:rounded-xl focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:font-mono focus:text-xs focus:tracking-wider focus:uppercase focus:shadow-2xl"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
