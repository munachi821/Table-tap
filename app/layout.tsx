import type { Metadata } from "next";
import { Fraunces, Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manRope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "TableTap",
  description: "Run your restaurant on autopilot",
  icons: {
    icon: "/tabletap-logo.png",
    shortcut: "/tabletap-logo.png",
    apple: "/tabletap-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manRope.variable} ${fraunces.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

