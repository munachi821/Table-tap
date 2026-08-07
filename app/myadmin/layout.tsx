import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "God Mode — Admin Dashboard",
  description: "Super admin dashboard for TableTap",
};

export default function MyAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full h-full">{children}</div>;
}
