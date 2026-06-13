import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "../globals.css";
import AdminSidebar from "@/components/adminSidebar";
import AuthGuard from "@/components/AuthGuard";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for Nana's Kitchen",
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
      <body
        className={`${inter.variable} ${manRope.variable} antialiased flex h-screen overflow-hidden`}
      >
        <AuthGuard>
          <AdminSidebar />
          <div className="w-full h-full bg-[#F8FAFC] overflow-auto relative">
            {children}
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
