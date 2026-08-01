"use client";
import { CopyIcon, EyeIcon, ShieldCheckIcon, WarningIcon } from "@phosphor-icons/react";

const TerminalTab = () => {
  return (
    <div>
      <div className="border-b border-[#D6C9B9] p-5">
        <p className="text-[#1B1D1E] text-2xl font-bold">
          Kitchen Display System (KDS) Access
        </p>
        <p className="text-[#584237] text-base font-medium mt-1">
          Use these credentials to log into your kitchen&apos;s iPad or
          tablet. Keep these details secure for back-of-house
          operations.
        </p>
      </div>

      <div className="p-8">
        <div className="bg-[#F2F4F6] rounded-2xl p-6">
          <div className="space-y-6">
            <div>
              <label className="text-[#64748B] text-xs font-bold tracking-widest uppercase mb-2 block">
                Login Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value="kds@nanaskitchen.ng"
                  readOnly
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-white text-[#1B1D1E] font-medium text-base focus:outline-none"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9D4300] hover:text-[#724237] transition-colors cursor-pointer">
                  <CopyIcon size={20} weight="bold" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-[#64748B] text-xs font-bold tracking-widest uppercase mb-2 block">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value="password123"
                  readOnly
                  className="w-full h-12 px-4 pr-24 rounded-xl bg-white text-[#1B1D1E] font-medium text-xl tracking-widest focus:outline-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <button className="text-[#64748B] hover:text-[#1B1D1E] transition-colors cursor-pointer">
                    <EyeIcon size={20} weight="bold" />
                  </button>
                  <div className="w-px h-5 bg-[#E6E8EA]"></div>
                  <button className="text-[#9D4300] hover:text-[#724237] transition-colors cursor-pointer">
                    <CopyIcon size={20} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <button className="border-2 border-[#1B1D1E] hover:bg-[#F2F4F6] text-[#1B1D1E] px-6 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer">
            Generate New Password
          </button>
          <div className="flex items-center gap-2 text-[#BA1A1A] text-sm font-semibold">
            <WarningIcon size={18} weight="bold" />
            <p>
              Generating a new password will immediately log out all
              active KDS devices.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-between rounded-b-3xl">
        <div className="flex items-center gap-2 text-[#475569] text-sm font-medium">
          <ShieldCheckIcon size={20} />
          <p>
            End-to-end encrypted management for secure kitchen
            operations.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[#64748B] text-xs font-bold tracking-widest uppercase">
          <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
          System Active
        </div>
      </div>
    </div>
  );
};
export default TerminalTab;
