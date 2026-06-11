"use client";

import { BellIcon, GearIcon, InfoIcon } from "@phosphor-icons/react";

const Page = () => {
  return (
    <div className="min-h-screen bg-white text-[#1B1D1E] font-inter">
      {/* Header */}
      <header className="px-8 py-4 flex items-center justify-between border-b border-[#E6E8EA]">
        <h1 className="text-2xl font-bold">Table-tap God Mode</h1>
        <div className="flex items-center gap-6">
          <button className="bg-black hover:bg-black/90 text-white px-5 py-2.5 rounded-md text-sm font-bold transition-colors cursor-pointer">
            + Add Restaurant
          </button>
          <div className="flex items-center gap-4 text-[#475569]">
            <button className="hover:text-black transition-colors cursor-pointer">
              <BellIcon size={24} />
            </button>
            <button className="hover:text-black transition-colors cursor-pointer">
              <GearIcon size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* Revenue Overview */}
        <div className="mb-12">
          <h2 className="text-[#64748B] text-xs font-bold tracking-widest uppercase mb-2">
            Revenue Overview
          </h2>
          <p className="text-[64px] leading-tight font-black tracking-tight mb-3">
            ₦160,000
          </p>
          <div className="flex items-center gap-4 text-[#64748B] text-sm font-medium">
            <p>Total MRR</p>
            <div className="w-px h-4 bg-[#E6E8EA]"></div>
            <p>2 Active Licenses at ₦80k/mo</p>
          </div>
        </div>

        <div className="w-full h-px bg-[#E6E8EA] mb-12"></div>

        {/* Restaurant Management */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#64748B] text-xs font-bold tracking-widest uppercase">
              Restaurant Management
            </h2>
            <p className="text-[#64748B] text-sm font-medium">
              3 Entities Found
            </p>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E6E8EA] text-[#64748B] text-xs font-bold tracking-widest uppercase">
                <th className="py-4 font-inter">Restaurant</th>
                <th className="py-4 font-inter">Status</th>
                <th className="py-4 font-inter text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              <tr className="border-b border-[#E6E8EA]">
                <td className="py-6 text-lg font-bold">Nana&apos;s Kitchen</td>
                <td className="py-6">
                  <div className="flex items-center gap-2 text-[#10B981] text-xs font-bold tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                    Active
                  </div>
                </td>
                <td className="py-6 text-right space-x-6">
                  <button className="text-[#EF4444] hover:text-red-700 font-bold text-sm transition-colors cursor-pointer">
                    Suspend
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="border-b border-[#E6E8EA]">
                <td className="py-6 text-lg font-bold">The Grill House</td>
                <td className="py-6">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-full bg-[#F97316]"></div>
                    Pending Payment
                  </div>
                </td>
                <td className="py-6 text-right space-x-6">
                  <button className="text-[#1B1D1E] hover:text-gray-600 font-bold text-sm transition-colors cursor-pointer">
                    Activate License
                  </button>
                  <button className="text-[#EF4444] hover:text-red-700 font-bold text-sm transition-colors cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="border-b border-[#E6E8EA]">
                <td className="py-6 text-lg font-bold">Campus Bites</td>
                <td className="py-6">
                  <div className="flex items-center gap-2 text-[#EF4444] text-xs font-bold tracking-widest uppercase">
                    <div className="w-2 h-2 rounded-full bg-[#EF4444]"></div>
                    Suspended
                  </div>
                </td>
                <td className="py-6 text-right space-x-6">
                  <button className="text-[#1B1D1E] hover:text-gray-600 font-bold text-sm transition-colors cursor-pointer">
                    Reactivate
                  </button>
                  <button className="text-[#EF4444] hover:text-red-700 font-bold text-sm transition-colors cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* System Integrity Alert */}
        <div className="bg-[#F8FAFC] border border-[#E6E8EA] rounded-lg p-6 flex gap-4">
          <div className="text-[#64748B] shrink-0 mt-0.5">
            <InfoIcon size={20} weight="bold" />
          </div>
          <div>
            <h3 className="text-[#1B1D1E] text-xs font-bold tracking-widest uppercase mb-2">
              System Integrity
            </h3>
            <p className="text-[#64748B] text-sm leading-relaxed">
              You are currently in God Mode. All actions performed here are
              permanent and directly affect the production database. Suspended
              restaurants will lose access to their POS and ordering systems
              immediately.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E6E8EA] px-8 py-6 flex items-center justify-between text-[#64748B] text-xs font-bold tracking-widest uppercase bg-white mt-12">
        <p>© 2024 Table-Tap. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="#"
            className="hover:text-black transition-colors underline underline-offset-4 decoration-1"
          >
            Support
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors underline underline-offset-4 decoration-1"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-black transition-colors underline underline-offset-4 decoration-1"
          >
            Documentation
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Page;
