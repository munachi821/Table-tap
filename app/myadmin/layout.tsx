import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for Nana's kitchen",
};

const manRope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manRope.variable} antialiased`}>
        <div className="w-full h-full">{children}</div>
      </body>
    </html>
  );
}
