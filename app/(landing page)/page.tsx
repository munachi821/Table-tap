"use client";

import { CheckCircleIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import the signup form with SSR disabled to prevent Paystack window errors
const SignupForm = dynamic(() => import("@/components/SignupForm"), {
  ssr: false,
});

export default function Home() {
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
    <div className="flex bg-white font-inter h-screen">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0F172A] relative flex-col justify-between overflow-hidden h-screen">
        <div className="absolute inset-0 bg-linear-to-br from-[#1E293B] to-[#0F172A] z-0"></div>

        <div className="relative z-10 px-16 py-24 flex-1 flex flex-col justify-center">
          <h1 className="text-white text-5xl md:text-[56px] font-bold font-serif leading-[1.1] mb-8 max-w-lg">
            Run your restaurant on autopilot.
          </h1>

          <div className="w-12 h-px bg-white/20 mb-12"></div>

          <div className="space-y-6 text-[#CBD5E1]">
            <div className="flex items-center gap-4">
              <CheckCircleIcon size={24} className="text-[#94A3B8]" />
              <p className="font-medium text-[17px]">
                100% Cashless QR Ordering
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircleIcon size={24} className="text-[#94A3B8]" />
              <p className="font-medium text-[17px]">
                Eliminate Waiter Errors & Theft
              </p>
            </div>
            <div className="flex items-center gap-4">
              <CheckCircleIcon size={24} className="text-[#94A3B8]" />
              <p className="font-medium text-[17px]">
                Live Kitchen Display System (KDS)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex flex-col py-12 px-8 lg:px-24 overflow-y-auto h-screen">
        <SignupForm />

        <div className="w-full max-w-md mx-auto mt-24 flex justify-end gap-6 text-[#94A3B8] text-[13px] font-medium">
          <a href="#" className="hover:text-[#64748B] transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-[#64748B] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[#64748B] transition-colors">
            Help
          </a>
        </div>
      </div>
    </div>
  );
}
