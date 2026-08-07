import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Section",
  description: "Home section for tableTap",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
