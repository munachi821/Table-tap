"use client";
import { ArrowRightIcon, CreditCardIcon, DownloadSimpleIcon, ReceiptIcon } from "@phosphor-icons/react";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";

const BillingTab = () => {
  return (
    <div>
      <div className="border-b border-[#D6C9B9] p-5">
        <p className="text-[#1B1D1E] text-2xl font-bold">
          Billing & Plans
        </p>
        <p className="text-[#584237] text-base font-medium">
          Manage your software license, payment methods, and download
          invoices.
        </p>
      </div>

      <div className="p-5">
        <div>
          <div className="bg-[#FFF4EE] px-6 py-7 rounded-xl border border-[#FFE0CE] flex justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#974800] text-white p-2 rounded-lg w-fit h-fit">
                <SealCheckIcon size={23} weight="bold" />
              </div>

              <div className="font-semibold">
                <p className="text-xl">Table-tap Full License</p>
                <p className="text-gray-500">
                  QR Tables & KDS Displays
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-500">
                <span className="text-3xl font-bold font-inter text-[#974800]">
                  ₦80,000
                </span>{" "}
                /month
              </p>
              <p className="text-gray-500 text-sm text-right">
                Next billing date: july 8 2026
              </p>
            </div>
          </div>
          <p className="text-[#BA1A1A] font-semibold mt-2.5 text-right">
            Need to cancel your license? Contact Support.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex gap-2">
            <CreditCardIcon size={28} />{" "}
            <p className="text-xl">Payment Method</p>
          </div>

          <div className="border border-[#E4EAF1] rounded-lg p-5 flex items-center justify-between mt-4">
            <div className="flex gap-2 items-center">
              <div className="w-12 h-7.5 bg-black/90 rounded-sm"></div>
              <div className="text-sm font-bold">
                <p className="text-[#0F172A]">
                  Mastercard ending in 4242
                </p>
                <p className="text-gray-600">EXPIRES 12/28</p>
              </div>
            </div>

            <button className="border border-[#974800] hover:bg-[#974800] transition-colors hover:text-white px-3 py-1.5 text-[#974800] cursor-pointer font-semibold rounded-lg text-sm">
              Update Card
            </button>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex gap-2 items-center mb-4">
            <ReceiptIcon size={24} />
            <p className="text-xl text-[#1B1D1E]">Invoice History</p>
          </div>

          <div className="border border-[#E4EAF1] bg-[#F8FAFC] rounded-xl overflow-hidden mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E4EAF1] text-[#64748B] text-xs font-bold tracking-wider">
                  <th className="py-4 px-6 uppercase font-inter">
                    Date
                  </th>
                  <th className="py-4 px-6 uppercase font-inter">
                    Amount
                  </th>
                  <th className="py-4 px-6 uppercase font-inter text-center">
                    Status
                  </th>
                  <th className="py-4 px-6 uppercase font-inter text-right">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[
                  {
                    date: "June 8, 2026",
                    amount: "₦80,000",
                    status: "PAID",
                  },
                  {
                    date: "May 8, 2026",
                    amount: "₦80,000",
                    status: "PAID",
                  },
                  {
                    date: "April 8, 2026",
                    amount: "₦80,000",
                    status: "PAID",
                  },
                ].map((invoice, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#E4EAF1] last:border-b-0"
                  >
                    <td className="py-4 px-6 font-medium text-[#475569] text-sm">
                      {invoice.date}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1B1D1E] font-inter text-sm">
                      {invoice.amount}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-[#E6F4EA] text-[#1E7E34] text-xs font-bold px-2.5 py-1 rounded-full">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="flex items-center gap-1.5 ml-auto text-[#9D4300] font-bold text-sm hover:underline cursor-pointer">
                        <DownloadSimpleIcon size={16} weight="bold" />{" "}
                        Download PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="py-4 flex justify-center bg-white border-t border-[#E4EAF1]">
              <button className="flex items-center gap-2 text-[#475569] hover:text-[#0F172A] font-semibold text-sm transition-colors cursor-pointer">
                View All History{" "}
                <ArrowRightIcon size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-between rounded-b-3xl">
        <p className="text-[#64748B] text-sm italic font-medium">
          All prices exclude local tax unless stated otherwise.
        </p>
        <button className="bg-[#0F172A] hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
          Save Billing Preferences
        </button>
      </div>
    </div>
  );
};
export default BillingTab;
