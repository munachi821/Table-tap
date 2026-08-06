"use client";

import { EyeIcon, EyeSlashIcon, ShieldCheck } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import Link from "next/link";

export default function GodModeLogin() {
  const supabase = createClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const superAdminEmail = process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL || "munachi@table-tap.com";
        
        if (session.user?.email === superAdminEmail || session.user?.email === "admin@table-tap.com") {
          router.push("/myadmin");
        } else {
          // If a regular user accidentally gets here, sign them out silently to prevent redirect loops
          await supabase.auth.signOut();
          setIsChecking(false);
        }
      } else {
        setIsChecking(false);
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
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

    const superAdminEmail = process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL || "munachi@table-tap.com";
    
    if (data.user?.email !== superAdminEmail && data.user?.email !== "admin@table-tap.com") {
      toast.error("Unauthorized. God Mode access denied.");
      await supabase.auth.signOut();
      setIsLoading(false);
      return;
    }

    toast.success("Welcome back, Creator.");
    router.push("/myadmin");
  };

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/100 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center font-inter relative overflow-hidden selection:bg-white/20">
      <Toaster position="top-center" richColors theme="dark" />
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[400px] relative z-10 p-6">
        <div className="flex flex-col items-center mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          <div className="w-14 h-14 bg-gradient-to-b from-white/10 to-white/5 rounded-[18px] border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center justify-center mb-6 backdrop-blur-xl">
            <ShieldCheck size={28} weight="duotone" className="text-white/90" />
          </div>
          <h1 className="text-white text-[28px] font-semibold tracking-[-0.03em] mb-2">
            God Mode
          </h1>
          <p className="text-white/40 text-[15px] font-medium tracking-wide">
            Platform control center
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out delay-150 fill-mode-backwards">
          <div className="space-y-1.5">
            <label className="text-white/60 text-[13px] font-medium ml-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full h-[52px] px-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 focus:bg-white/[0.05] text-white text-[15px] placeholder:text-white/30 transition-all duration-300 shadow-inner"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-white/60 text-[13px] font-medium ml-1">
              Passkey
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full h-[52px] px-4 pr-12 bg-white/[0.03] border border-white/[0.08] rounded-2xl focus:outline-none focus:border-white/20 focus:bg-white/[0.05] text-white text-[15px] tracking-widest placeholder:tracking-normal placeholder:text-white/30 transition-all duration-300 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black hover:bg-white/90 h-[52px] rounded-2xl font-semibold text-[15px] transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:shadow-[0_6px_20px_rgba(255,255,255,0.2)] active:scale-[0.98]"
          >
            {isLoading ? "Authenticating..." : "Initialize Session"}
          </button>
        </form>

        <div className="mt-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out delay-300 fill-mode-backwards">
          <Link 
            href="/"
            className="text-white/30 text-[13px] font-medium hover:text-white/70 transition-colors"
          >
            Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
