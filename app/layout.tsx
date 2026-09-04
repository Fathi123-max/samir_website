import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Outfit,
  Playfair_Display,
  Space_Grotesk,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f3f7f6",
  colorScheme: "light",
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
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen bg-canvas text-ink antialiased selection:bg-signal selection:text-white"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-3 focus:rounded-lg focus:bg-signal focus:text-white focus:font-bold focus:font-mono focus:text-xs focus:tracking-wider focus:uppercase focus:shadow-xl"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
