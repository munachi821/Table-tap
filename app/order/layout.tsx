import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Section",
  description: "Order section for tableTap",
};

export default function OrderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-4xl mx-auto bg-white! min-h-screen border-x border-gray-200">
      {children}
    </div>
  );
}
