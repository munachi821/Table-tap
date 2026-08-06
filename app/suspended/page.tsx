"use client";

import { WarningCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SuspendedPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-inter p-4">
      <div className="bg-white p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-red-100 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <WarningCircleIcon size={40} weight="duotone" className="text-red-500" />
        </div>
        
        <h1 className="text-[22px] font-bold text-gray-900 mb-3 tracking-tight">
          Account Suspended
        </h1>
        
        <p className="text-[#64748B] text-[15px] leading-relaxed mb-8">
          Your restaurant account has been temporarily suspended by the platform administrator. You currently cannot access your dashboard or receive new orders.
        </p>

        <div className="space-y-3">
          <button 
            className="w-full bg-[#EA580C] hover:bg-[#D97706] text-white py-3.5 rounded-xl font-semibold transition-colors shadow-sm"
          >
            Contact Support
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-gray-50 hover:text-gray-900 py-3.5 rounded-xl font-semibold transition-colors"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
