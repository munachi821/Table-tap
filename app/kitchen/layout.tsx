import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Dashboard",
  description: "Kitchen dashboard for tableTap",
};

export default function KitchenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
