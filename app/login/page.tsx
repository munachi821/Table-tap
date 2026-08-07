"use client";

import { CheckCircleIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster, toast } from "sonner";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) return console.log(error);
      if (user) {
        // AuthGuard on admin layout handles paywall/subscription check
        router.push("/admin/overview");
      }
    };

    fetchSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }

    toast.success("Successfully logged in!");
    router.push("/admin/overview");
  };

  return (
    <div className="flex bg-white font-inter h-screen">
      <Toaster position="top-center" richColors theme="light" />
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
        <div className="w-full max-w-md mx-auto my-auto pt-8">
          <div className="mb-10">
            <h2 className="text-[#1B1D1E] text-2xl font-serif mb-2">
              Welcome back
            </h2>
            <p className="text-[#64748B] text-[15px]">
              Log in to manage your Restaurant.
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
                Owner Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@restaurant.com"
                className="w-full h-11 px-4 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium placeholder:font-normal placeholder:text-[#94A3B8]"
              />
            </div>

            <div>
              <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-11 px-4 pr-12 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium tracking-widest placeholder:font-normal placeholder:tracking-normal placeholder:text-[#94A3B8]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeSlashIcon size={18} /> : <EyeIcon size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#EA580C] hover:bg-[#D97706] text-white h-12 rounded-md font-medium text-[15px] transition-colors mt-2 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="mt-8 text-center text-[#64748B] text-[13px]">
            Don&apos;t have an account?{" "}
            <Link href="/" className="text-[#EA580C] font-bold hover:underline">
              Sign up.
            </Link>
          </div>
        </div>

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
