"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  ForkKnifeIcon,
  LockKeyIcon,
  EnvelopeSimpleIcon,
  SpinnerGap,
} from "@phosphor-icons/react";

export default function KitchenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid KDS credentials. Please try again.");
      setIsLoading(false);
    } else {
      // Check if they are actually a KDS role
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (user?.app_metadata?.role !== "kds") {
        // Sign them out immediately since they used valid credentials but lack the correct role
        await supabase.auth.signOut();
        setError("Access denied. This portal is strictly for authorized Kitchen Display Systems.");
        setIsLoading(false);
        return;
      }

      router.push("/kitchen");
      router.refresh();
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden font-sans text-gray-900">
      <div className="w-full max-w-md z-10">
        {/* Terminal Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-slate-200 mb-5">
            <ForkKnifeIcon size={40} className="text-[#FF5C00]" weight="fill" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2 tracking-wide uppercase">
            Station Auth
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            Authenticate KDS terminal to connect to kitchen stream.
          </p>
        </div>

        {/* Login Card (Industrial Terminal - Light) */}
        <div className="kds-card bg-white border border-slate-200 shadow-xl rounded-2xl p-8 relative overflow-hidden">
          {/* Hardware detail line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/70 to-transparent"></div>

          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Terminal Offline
            </span>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-orange-50 text-orange-600 p-4 rounded-xl text-sm font-semibold border border-orange-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Station ID (Email)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <EnvelopeSimpleIcon size={20} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="kds-input block w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-orange-500 focus:bg-white text-slate-900 font-mono text-sm placeholder:text-slate-400 outline-none"
                  placeholder="kds_01@tabletap.local"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Access Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <LockKeyIcon size={20} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="kds-input block w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:border-orange-500 focus:bg-white text-slate-900 font-mono text-lg tracking-widest outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="kds-btn w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed mt-6 active:scale-[0.98] uppercase tracking-wider"
            >
              <div
                className={`kds-btn-content w-full flex justify-center items-center ${isLoading ? "transitioning" : ""}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <SpinnerGap
                      size={20}
                      className="animate-spin"
                      weight="bold"
                    />
                    Authenticating...
                  </span>
                ) : (
                  "Connect Terminal"
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-xs font-mono text-slate-400">
          <p>TABLETAP OS // KDS_MODULE_V1</p>
        </div>
      </div>
    </main>
  );
}
