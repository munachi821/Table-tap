"use client";
import {
  CalendarDotsIcon,
  CaretDownIcon,
  DownloadSimpleIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import {
  ChartPieIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";

const page = () => {
  const fullDate = () => {
    const date = new Date();
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="p-4 py-6">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Order History</h2>
        <p className="text-lg text-[#64748B]">
          Monitor daily audits, volume, and past transactions
        </p>
      </div>

      <div className="grid grid-cols-3 mt-6 gap-4">
        <div className="bg-white p-6 rounded-2xl">
          <div className="bg-[#D5E0F8] p-2 text-[#586377] rounded-xl w-fit">
            <WalletIcon size={24} weight="bold" />
          </div>

          <div className="mt-7">
            <p className="text-sm uppercase text-[#584237] leading-5 font-semibold">
              Total Revenue Generated
            </p>
            <h2 className="text-3xl font-semibold font-inter">
              <span className="font-manrope">₦</span>450,000
            </h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <div className="bg-[#28b7ffde] text-[#003554] p-2 rounded-xl w-fit">
            <ChartPieIcon size={24} weight="bold" />
          </div>

          <div className="mt-7">
            <p className="text-sm uppercase text-[#584237] leading-5 font-semibold">
              Payment breakdown
            </p>
            <h2 className="text-3xl font-semibold font-inter">
              70%{" "}
              <span className="text-base text-[#584237] font-medium">
                Digital / 30% Cash
              </span>
            </h2>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl">
          <div className="bg-[#FFDAD6] p-2 rounded-xl text-[#BA1A1A] w-fit">
            <WarningCircleIcon size={24} weight="bold" />
          </div>

          <div className="mt-7">
            <p className="text-sm uppercase text-[#584237] leading-5 font-semibold">
              Voided Orders
            </p>
            <h2 className="text-3xl font-semibold font-inter">
              3 Orders{" "}
              <span className="text-base text-[#BA1A1A] font-medium">
                — ₦12,500
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <div className="font-manrope space-x-4">
          <button className="py-2 px-5 bg-black text-white transition-colors cursor-pointer rounded-full font-medium">
            All Orders
          </button>
          <button className="py-2 px-5 bg-[#F2F4F6] text-[#584237] transition-colors cursor-pointer rounded-full font-medium">
            Paid
          </button>
          <button className="py-2 px-5 bg-[#F2F4F6] text-[#584237] transition-colors cursor-pointer rounded-full font-medium">
            Refunded
          </button>
          <button className="py-2 px-5 bg-[#F2F4F6] text-[#584237] transition-colors cursor-pointer rounded-full font-medium">
            Cancelled
          </button>
        </div>

        <div className="flex gap-2.5 items-center">
          <div className="flex items-center gap-2 font-semibold shadow-sm py-2 px-5 text-[#191C1E] rounded-full bg-white w-fit">
            <CalendarDotsIcon size={19} className="text-[#9D4300]" />
            <p>{fullDate()}</p>
            <div className="ml-1.5">
              <CaretDownIcon size={19} weight="bold" />
            </div>
          </div>

          <button className="size-9 bg-[#9D4300] text-white rounded-full flex items-center justify-center cursor-pointer">
            <DownloadSimpleIcon size={20} weight="bold" />
          </button>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-225 font-manrope">
          <thead>
            <tr className="border-b border-gray-100 text-[#BCA89A] text-xs font-bold uppercase tracking-widest">
              <th className="pb-4 font-semibold px-2">Order ID</th>
              <th className="pb-4 font-semibold px-2">Time</th>
              <th className="pb-4 font-semibold px-2">Table</th>
              <th className="pb-4 font-semibold px-2">Items Summary</th>
              <th className="pb-4 font-semibold px-2">Method</th>
              <th className="pb-4 font-semibold px-2">Amount</th>
              <th className="pb-4 font-semibold px-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {/* Row 1 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                #984321
              </td>
              <td className="py-6 px-2 text-[15px] font-medium text-[#586377] leading-tight">
                08:42 PM
              </td>
              <td className="py-6 px-2 text-[15px] font-medium text-[#0F172A] leading-tight">
                Table 04
              </td>
              <td className="py-6 px-2">
                <p className="text-[15px] font-medium text-[#0F172A]">
                  2x Jollof <br /> Rice
                </p>
                <p className="text-[11px] font-bold text-[#A8B2C1] uppercase mt-1 tracking-wider">
                  + 1X CHILLED COKE
                </p>
              </td>
              <td className="py-6 px-2">
                <span className="bg-[#EEF4FF] text-[#3B82F6] text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  Transfer
                </span>
              </td>
              <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                ₦18,500
              </td>
              <td className="py-6 px-2">
                <div className="bg-[#F0FDF4] text-[#16A34A] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit uppercase tracking-wider">
                  <div className="size-1.5 rounded-full bg-[#16A34A]"></div>
                  Paid
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                #984320
              </td>
              <td className="py-6 px-2 text-[15px] font-medium text-[#586377] leading-tight">
                07:15 PM
              </td>
              <td className="py-6 px-2 text-[15px] font-medium text-[#0F172A] leading-tight">
                VIP Lounge
              </td>
              <td className="py-6 px-2">
                <p className="text-[15px] font-medium text-[#0F172A] leading-tight">
                  1x Catfish <br /> Pepper <br /> Soup
                </p>
              </td>
              <td className="py-6 px-2">
                <span className="bg-[#F1F5F9] text-[#64748B] text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  Cash
                </span>
              </td>
              <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                ₦5,000
              </td>
              <td className="py-6 px-2">
                <div className="bg-[#FEF2F2] text-[#DC2626] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit uppercase tracking-wider">
                  <div className="size-1.5 rounded-full bg-[#DC2626]"></div>
                  Cancelled
                </div>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-slate-50/50 transition-colors">
              <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                #984319
              </td>
              <td className="py-6 px-2 text-[15px] font-medium text-[#586377] leading-tight">
                04:30 PM
              </td>
              <td className="py-6 px-2 text-[15px] font-medium text-[#0F172A] leading-tight">
                Table 01
              </td>
              <td className="py-6 px-2">
                <p className="text-[15px] font-medium text-[#0F172A] leading-tight">
                  3x Grilled <br /> Chicken
                </p>
              </td>
              <td className="py-6 px-2">
                <span className="bg-[#FAF5FF] text-[#9333EA] text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                  Card
                </span>
              </td>
              <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                ₦32,000
              </td>
              <td className="py-6 px-2">
                <div className="bg-[#FFF7ED] text-[#EA580C] text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit uppercase tracking-wider">
                  <div className="size-1.5 rounded-full bg-[#EA580C]"></div>
                  Refunded
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center text-sm font-manrope border-t border-gray-200 pt-4">
          <p className="text-[#586377] font-medium">
            Showing <span className="font-bold text-[#0F172A]">1-3</span> of 142
            orders
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-100 text-gray-400 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="px-4 py-2 bg-white border border-gray-200 text-[#0F172A] font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
