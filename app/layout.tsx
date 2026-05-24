import { metadata, viewport } from "@/lib/site-config";
import {
  Fraunces,
  Inter,
  JetBrains_Mono,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";

export { metadata, viewport };

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${sourceSerif.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full font-ui antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
