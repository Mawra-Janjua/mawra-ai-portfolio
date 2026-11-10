import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import MotionProvider from "@/components/MotionProvider";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mawra Akbar Janjua — Junior AI Software Engineer",
  description:
    "Portfolio of Mawra Akbar Janjua, a Junior AI Software Engineer from Lahore, Pakistan, working with computer vision, NLP, machine learning and mobile software.",
  openGraph: {
    title: "Mawra Akbar Janjua — Junior AI Software Engineer",
    description: "AI & software projects in computer vision, NLP and machine learning.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8FA",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
