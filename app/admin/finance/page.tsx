"use client";
import {
  ClockIcon,
  MoneyIcon,
  ReceiptIcon,
  WalletIcon,
} from "@phosphor-icons/react";

const page = () => {
  return (
    <div className="p-4 py-6">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Financial Report</h2>
        <p className="text-lg text-[#64748B]">
          Track gross volume, processing fees, and settlements.
        </p>
      </div>

      <div className="grid grid-cols-4 mt-6 gap-4">
        <div className="bg-white rounded-2xl p-5">
          <div className="p-2 w-fit rounded-xl bg-[#F4EAE2] text-[#9E4301]">
            <WalletIcon size={25} weight="bold" />
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#594236] font-semibold">Gross Volume</p>
            <h2 className="text-3xl font-semibold text-[#1B1D1E] font-inter">
              ₦1,500,000
            </h2>
            <span className="text-[13.5px] text-[#9B8E87] font-inter">
              Total customer payments
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="p-2 w-fit rounded-xl bg-[#F7E1DC] text-[#BE1F19]">
            <ReceiptIcon size={25} weight="bold" />
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#594236] font-semibold">
              Processing Fees
            </p>
            <h2 className="text-3xl font-semibold text-[#BD1E1A] font-inter">
              -₦22,500
            </h2>
            <span className="text-[13.5px] text-[#9B8E87] font-inter">
              Paystack + Platform fees
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="p-2 w-fit rounded-xl bg-[#E5EAEB] text-[#096393]">
            <MoneyIcon size={25} weight="bold" />
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#594236] font-semibold">Net Earnings</p>
            <h2 className="text-3xl font-semibold text-[#016497] font-inter">
              ₦1,477,500
            </h2>
            <span className="text-[13.5px] text-[#9B8E87] font-inter">
              Actual Revenue
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5">
          <div className="p-2 w-fit rounded-xl bg-[#D5E0F8] text-[#586377]">
            <ClockIcon size={25} weight="bold" />
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#584237] font-semibold">Next Payout</p>
            <h2 className="text-3xl font-semibold text-[#1B1D1E] font-inter">
              ₦340,000
            </h2>
            <span className="text-[13.5px] text-[#9B8E87] font-inter">
              Tomorrow @ 8:00AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
