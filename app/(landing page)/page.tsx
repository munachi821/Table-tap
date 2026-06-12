"use client";

import {
  CheckCircleIcon,
  CloudArrowUpIcon,
  EyeIcon,
  LockKeyIcon,
} from "@phosphor-icons/react";

export default function Home() {
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
        <div className="w-full max-w-md mx-auto my-auto pt-8">
          <div className="mb-10">
            <h2 className="text-[#1B1D1E] text-2xl font-serif mb-2">
              Create your workspace
            </h2>
            <p className="text-[#64748B] text-[15px]">
              Start automating your Restaurant today.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
                Restaurant Logo
              </label>
              <div className="border-[1.5px] border-dashed border-[#E2E8F0] bg-white rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors">
                <CloudArrowUpIcon size={32} className="text-[#64748B] mb-3" />
                <p className="text-[#64748B] font-medium text-[13px]">
                  Click to upload or drag and drop
                </p>
                <p className="text-[#94A3B8] text-xs mt-1">
                  (SVG, PNG, JPG up to 2MB)
                </p>
              </div>
            </div>

            <div>
              <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
                Restaurant Name
              </label>
              <input
                type="text"
                placeholder="e.g., Nana's Kitchen"
                className="w-full h-11 px-4 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium placeholder:font-normal placeholder:text-[#94A3B8]"
              />
            </div>

            <div>
              <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
                Owner Email
              </label>
              <input
                type="email"
                placeholder="admin@restaurant.com"
                className="w-full h-11 px-4 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium placeholder:font-normal placeholder:text-[#94A3B8]"
              />
            </div>

            <div>
              <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
                Secure Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-11 px-4 pr-12 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium tracking-widest placeholder:font-normal placeholder:tracking-normal placeholder:text-[#94A3B8]"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
                >
                  <EyeIcon size={18} />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#EA580C] hover:bg-[#D97706] text-white h-12 rounded-md font-medium text-[15px] transition-colors mt-2"
            >
              Continue to Payment (₦80,000/mo)
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 bg-[#F8FAFC] py-3.5 rounded-md border border-[#E2E8F0] text-[#64748B] text-[11px] font-semibold">
            <LockKeyIcon size={14} weight="fill" />
            <p>Secure checkout via Paystack</p>
          </div>

          <div className="mt-8 text-center text-[#64748B] text-[13px]">
            Already have an account?{" "}
            <a href="#" className="text-[#EA580C] font-bold hover:underline">
              Log in.
            </a>
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
