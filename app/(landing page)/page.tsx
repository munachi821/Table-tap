"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) return console.log(error);
      if (session) {
        const hasPaid = session.user.user_metadata?.has_active_subscription;
        if (hasPaid) {
          router.push("/admin/overview");
        }
      }
    };

    fetchSession();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-inter">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/tabletap.png"
              alt="TableTap"
              width={140}
              height={34}
              priority
              className="h-8 w-auto object-contain brightness-0 invert"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-semibold bg-[#EA580C] hover:bg-[#D97706] text-white px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-orange-500/20 active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Landing Canvas */}
      <main className="pt-20">
        <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#EA580C] mb-8">
              <span className="size-2 rounded-full bg-[#EA580C] animate-pulse"></span>
              The Modern Restaurant OS
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-serif tracking-tight leading-[1.1] mb-6">
              Run your restaurant on <span className="text-[#EA580C]">autopilot</span>.
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              100% cashless table ordering, real-time kitchen displays, and automated settlements.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto bg-[#EA580C] hover:bg-[#D97706] text-white px-8 py-4 rounded-xl font-bold text-base transition-all shadow-xl shadow-orange-500/25 active:scale-95"
              >
                Start Free Trial
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/15 border border-white/10 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all active:scale-95"
              >
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
