"use client";
import { FloppyDiskIcon, ListDashesIcon, WalletIcon } from "@phosphor-icons/react";

const OperationsTab = () => {
  return (
    <div>
      <div className="border-b border-[#D6C9B9] p-5">
        <p className="text-[#1B1D1E] text-2xl font-bold">
          Operational Preferences
        </p>
        <p className="text-[#584237] text-base font-medium">
          Configure your financial rules and kitchen routing logic.
        </p>
      </div>

      <div className="p-8">
        {/* FINANCIAL RULES */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <WalletIcon
              size={20}
              className="text-[#F97316]"
              weight="bold"
            />
            <p className="text-[#64748B] font-bold text-sm tracking-widest uppercase">
              Financial Rules
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[#1B1D1E] font-bold text-base mb-1">
                  Apply Value Added Tax (VAT)
                </p>
                <p className="text-[#64748B] text-sm">
                  Automatically append a standard 7.5% tax to all
                  customer checkouts.
                </p>
              </div>
              <button
                type="button"
                className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#10B981] shrink-0 cursor-pointer"
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-6"></div>
              </button>
            </div>

            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[#1B1D1E] font-bold text-base mb-1">
                  Mandatory Service Charge
                </p>
                <p className="text-[#64748B] text-sm">
                  Apply a flat 5% service charge to cover digital
                  platform and convenience fees.
                </p>
              </div>
              <button
                type="button"
                className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#E2E8F0] shrink-0 cursor-pointer"
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-0"></div>
              </button>
            </div>
          </div>
        </div>

        {/* ORDER WORKFLOW */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <ListDashesIcon
              size={20}
              className="text-[#F97316]"
              weight="bold"
            />
            <p className="text-[#64748B] font-bold text-sm tracking-widest uppercase">
              Order Workflow
            </p>
          </div>

          <div>
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[#1B1D1E] font-bold text-base mb-1">
                  KDS Auto-Sync (Bypass Waiter)
                </p>
                <p className="text-[#64748B] text-sm">
                  When a customer pays digitally, instantly send the
                  ticket to the Kitchen Display System without requiring
                  manual waiter approval.
                </p>
              </div>
              <button
                type="button"
                className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#10B981] shrink-0 cursor-pointer"
              >
                <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-6"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-end gap-6 rounded-b-3xl">
        <button className="text-[#64748B] hover:text-[#0F172A] text-sm font-semibold transition-colors cursor-pointer">
          Cancel Changes
        </button>
        <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2">
          <FloppyDiskIcon size={18} weight="bold" /> Save Preferences
        </button>
      </div>
    </div>
  );
};
export default OperationsTab;
