import { TrendUpIcon } from "@phosphor-icons/react";

const Overview = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-x-4">
        <div className="bg-white p-4 rounded-xl flex justify-between flex-col gap-1.5 border-2 border-gray-200">
          <p className="text-[#64748B] font-semibold">GROSS REVENUE (TODAY)</p>
          <p className="text-2xl font-bold ml-2">₦142,500</p>
          <p className="flex gap-2 text-[#059669] font-semibold items-center">
            <TrendUpIcon size={22} /> 12% vs yesterday
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl flex justify-between flex-col gap-1.5 border-2 border-gray-200">
          <p className="text-[#64748B] font-semibold">ACTIVE TABLES</p>
          <p className="text-2xl font-bold ml-2">8 / 12</p>
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full w-[66%] bg-amber-400"></div>
          </div>
          <p className="text-sm text-gray-400">66% Capacity</p>
        </div>

        <div className="bg-red-100 p-4 rounded-xl flex justify-between flex-col gap-1.5 border-2 border-red-200">
          <p className="text-[#DC2626] font-semibold">KITCHEN LOAD</p>
          <p className="text-2xl font-bold ml-2 text-[#B91C1C]">15 Tickets</p>
          <p className="text-[#DC2626]/70">High volume warning</p>
        </div>

        <div className="bg-white p-4 rounded-xl flex justify-between flex-col gap-1.5 border-2 border-gray-200">
          <p className="text-[#64748B] font-semibold">ORDERS TODAY</p>
          <p className="text-2xl font-bold ml-2">53</p>
          <p className="text-sm text-gray-400">Across all categories</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mt-8">
        <div className="bg-white rounded-xl pb-7">
          <header className="flex justify-between p-4">
            <p className="font-bold text-lg">Top Selling Items Today</p>
            <a
              href="#"
              className="text-[#F59E0B] text-sm font-semibold hover:underline underline-[#F59E0B]"
            >
              View All
            </a>
          </header>

          <div className="border-t border-gray-100">
            <div className="p-4 flex gap-2 flex-col">
              <div className="bg-[#F8FAFC] flex items-center justify-between gap-2 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="size-10 flex items-center justify-center bg-[#F59E0B] text-white rounded-full">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Catfish Pepper Soup</p>
                    <p className="text-sm text-gray-500 -mt-0.5">45 Orders</p>
                  </div>
                </div>
                <p className="font-semibold">₦202,500</p>
              </div>

              <div className="border-[#F8FAFC] border flex items-center justify-between gap-2 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="size-10 flex items-center justify-center bg-[#E2E8F0] text-[#475569] font-semibold rounded-full">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Catfish Pepper Soup</p>
                    <p className="text-sm text-gray-500 -mt-0.5">45 Orders</p>
                  </div>
                </div>
                <p className="font-semibold">₦202,500</p>
              </div>

              <div className="border-[#F8FAFC] border flex items-center justify-between gap-2 p-2 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="size-10 flex items-center justify-center bg-[#E2E8F0] text-[#475569] font-semibold rounded-full">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Catfish Pepper Soup</p>
                    <p className="text-sm text-gray-500 -mt-0.5">45 Orders</p>
                  </div>
                </div>
                <p className="font-semibold">₦202,500</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl pb-7">
          <header className="p-4">
            <p className="font-bold text-lg">Live Table Feed</p>
          </header>

          <div className="flex flex-col p-4.5">
            <div className="flex gap-2 py-2 w-full">
              <div className="h-16 w-1 bg-[#10B981]"></div>
              <div className="flex items-center justify-between flex-1">
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-[#10B981] text-white rounded-full"></div>
                  <div>
                    <p className="font-semibold text-lg">Table 1</p>
                    <p className="text-sm text-[#059669] -mt-0.5">
                      Ready for Guests
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold bg-[#D1FAE5] text-[#047857] px-3 rounded-full py-0.5">
                    Empty
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 py-2 w-full">
              <div className="h-16 w-1 bg-[#F97316]"></div>
              <div className="flex items-center justify-between flex-1">
                <div className="flex items-center gap-2">
                  <div className="size-3 bg-[#F97316] text-white rounded-full"></div>
                  <div>
                    <p className="font-semibold text-lg">Table 2</p>
                    <p className="text-sm text-[#64748B]">Order #345 pending</p>
                  </div>
                </div>

                <div>
                  <p className="text-[#C2410C]">45 min elapsed</p>
                  <p className="font-semibold bg-[#FFEDD5] text-[#C2410C] px-3 rounded-full py-0.5 text-center">
                    in Service
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
