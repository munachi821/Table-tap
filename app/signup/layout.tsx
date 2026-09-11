import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - TableTap",
  description: "Create your restaurant account and run on autopilot",
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
