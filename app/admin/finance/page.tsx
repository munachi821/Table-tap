"use client";
import {
  ClockIcon,
  MoneyIcon,
  ReceiptIcon,
  WalletIcon,
  DotsThreeIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const page = () => {
  const generateChartData = () => {
    const baseData = [
      7500, 11000, 8500, 12000, 10000, 15000, 9000, 7800, 10000, 12500, 11500,
      14000, 11500, 13000, 10500, 10800, 16000, 14500, 18000, 9500, 13500, 8800,
      12000, 16000, 10500, 13000, 12800, 14500, 12000, 15000, 11000, 16500,
      14800, 18500, 9200,
    ];

    return baseData.slice(0, 30).map((value, index) => ({
      day: `D${index + 1}`,
      revenue: value,
    }));
  };

  const chartData = generateChartData();
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

      <div className="bg-white p-5 rounded-2xl mt-4">
        <div className="flex items-end justify-between">
          <div className="font-manrope">
            <p className="font-semibold text-xl">Last 30 Days Revenue</p>
            <p className="text-base">
              Daily gross volume across all payment channels
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm font-semibold bg-[#F2F4F6] text-[#584237] rounded-full">
              Daily
            </button>
            <button className="px-4 py-1.5 text-sm font-semibold bg-[#9D4300] text-white rounded-full">
              Weekly
            </button>
          </div>
        </div>

        <div className="w-full mt-6 p-1">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-lg text-[#1F2937] font-medium tracking-tight">
              30-Day Revenue Trend
            </h2>
            <span className="text-xl font-semibold text-[#111827]">
              ₦1,477,500
            </span>
          </div>

          <div className="w-full h-95">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 0, right: 0, left: -15, bottom: 15 }}
              >
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6b7280", fontSize: 13 }}
                  dy={15}
                  tickFormatter={(value) => {
                    const dayNum = parseInt(value.replace("D", ""));
                    return dayNum === 1 || dayNum % 5 === 0 ? value : "";
                  }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 13 }}
                  domain={[0, 20000]}
                  ticks={[0, 5000, 10000, 15000, 20000]}
                  tickFormatter={(value) => {
                    if (value === 0) return "0";
                    return `₦${(value / 1000).toFixed(0)}k`;
                  }}
                />
                <Tooltip
                  cursor={{ fill: "#F3F4F6" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    color: "#1F2937",
                    fontWeight: "500",
                  }}
                  formatter={(value) => {
                    const numValue = Number(value) || 0;
                    return [`₦${numValue.toLocaleString()}`, "Revenue"];
                  }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#FF7F00"
                  radius={[2, 2, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-xl text-[#1F2937]">
            Recent Bank Settlements
          </h2>
          <div className="relative">
            <MagnifyingGlassIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by ID..."
              className="bg-[#F8FAFC] text-sm pl-10 pr-4 py-2.5 rounded-full border-none focus:ring-0 w-70 outline-none text-gray-600"
            />
          </div>
        </div>

        <div className="w-full">
          <table className="w-full text-left font-manrope">
            <thead>
              <tr className="border-b border-gray-100 text-[#9B8E87] text-[11px] font-bold uppercase tracking-wider">
                <th className="pb-4 font-inter">Settlement ID</th>
                <th className="pb-4 font-inter">Date</th>
                <th className="pb-4 font-inter">Destination Account</th>
                <th className="pb-4 font-inter">Amount</th>
                <th className="pb-4 font-inter">Status</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              <tr className="border-b border-gray-100">
                <td className="py-4 font-semibold text-[#9E4301]">#ST_0092</td>
                <td className="py-4 text-[#584237]">June 3, 2026</td>
                <td className="py-4 text-[#1B1D1E] font-medium">
                  GTBank (**** 4829)
                </td>
                <td className="py-4 font-bold text-[#1B1D1E] text-sm">
                  ₦340,000
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#F4EAE2] text-[#9E4301]">
                    PROCESSING
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <DotsThreeIcon size={24} weight="bold" />
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 font-semibold text-[#9E4301]">#ST_0091</td>
                <td className="py-4 text-[#584237]">June 2, 2026</td>
                <td className="py-4 text-[#1B1D1E] font-medium">
                  GTBank (**** 4829)
                </td>
                <td className="py-4 font-bold text-[#1B1D1E] text-sm">
                  ₦412,500
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#CDEBF8] text-[#096393]">
                    SUCCESS
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <DotsThreeIcon size={24} weight="bold" />
                  </button>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-4 font-semibold text-[#9E4301]">#ST_0090</td>
                <td className="py-4 text-[#584237]">June 1, 2026</td>
                <td className="py-4 text-[#1B1D1E] font-medium">
                  GTBank (**** 4829)
                </td>
                <td className="py-4 font-bold text-[#1B1D1E] text-sm">
                  ₦280,000
                </td>
                <td className="py-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#CDEBF8] text-[#096393]">
                    SUCCESS
                  </span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-gray-600">
                    <DotsThreeIcon size={24} weight="bold" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="mt-6 mb-2 flex justify-center font-manrope">
            <button className="text-[11px] font-bold text-[#9E4301] tracking-widest uppercase hover:underline">
              View Full Settlement History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
