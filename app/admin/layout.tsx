import type { Metadata } from "next";
import AdminSidebar from "@/components/adminSidebar";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for TableTap",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <AuthGuard>
        <AdminSidebar />
        <div className="w-full h-full overflow-auto relative pt-16 md:pt-0">
          {children}
        </div>
      </AuthGuard>
    </div>
  );
}
