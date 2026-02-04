import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter_Tight, Space_Grotesk } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Tanya Singh",
  description: "AI ML Engineer | Data Science | Building generative AI solutions at scale",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${interTight.className} ${spaceGrotesk.variable}`}>
        {children}
      </body>
    </html>
  );
}
