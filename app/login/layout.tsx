import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log in",
  description: "Login to your restaurant account",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
