import KitchenTable from "@/components/svg/KitchenTable";
import {
  ArrowUpIcon,
  CalendarDotsIcon,
  CookingPotIcon,
  MoneyIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";

const Overview = () => {
  const fullDate = () => {
    const date = new Date();
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div className="pt-4 pr-4">
      <header className="sticky top-0">
        <nav className="p-3.5 flex justify-between items-end">
          <div>
            <p className="text-xs font-medium text-[#584237] tracking-wide">
              DASHBOARD OVERVIEW
            </p>
            <h2 className="text-2xl text-[#191C1E] font-bold font-manrope">
              Today at Nana&apos;s Kitchen
            </h2>
          </div>

          <div className="flex items-center gap-2 font-semibold shadow-sm py-1.5 px-4 text-[#191C1E] rounded-full bg-white">
            <CalendarDotsIcon size={19} className="text-[#9D4300]" />
            <p>{fullDate()}</p>
          </div>
        </nav>
      </header>
      <div className="grid grid-cols-4 gap-x-4">
        <div className="bg-white p-4 pt-5 rounded-xl flex flex-col gap-4 border shadow-xs border-gray-200">
          <header className="flex justify-between items-start">
            <div className="p-2 bg-[#F9EEE4] w-fit rounded-[14px]">
              <MoneyIcon size={26} color="#A4551F" weight="regular" />
            </div>

            <div className="bg-[#E6F9F0] text-[#059669] flex items-center gap-1 px-2 py-1 w-fit text-[11px] rounded-full font-bold font-inter tracking-wide">
              <ArrowUpIcon size={12} color="#059669" weight="bold" />
              12%
            </div>
          </header>

          <div className="flex flex-col gap-1">
            <p className="text-[#584237] font-medium text-[15px] font-inter">
              Gross Revenue (Today)
            </p>
            <p className="text-2xl font-bold font-manrope text-[#191C1E]">
              ₦142,500
            </p>
            <p className="text-[11px] text-[#64748B] font-inter">
              vs yesterday
            </p>
          </div>
        </div>

        <div className="bg-white p-4 pt-5 rounded-xl flex flex-col gap-4 border shadow-xs border-gray-200">
          <header className="flex justify-between items-start">
            <div className="p-2 bg-[#E6EDFF] w-fit rounded-[14px]">
              <KitchenTable />
            </div>
          </header>

          <div className="flex flex-col gap-1">
            <p className="text-[#584237] font-medium text-[15px] font-inter">
              Active Tables
            </p>
            <p className="text-2xl font-bold font-manrope text-[#191C1E]">
              8{" "}
              <span className="text-[17px] text-[#64748B] font-medium">
                / 12
              </span>
            </p>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mt-2">
              <div className="h-full w-[66%] bg-[#B45309] rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 pt-5 rounded-xl flex flex-col gap-4 border shadow-xs border-gray-200">
          <header className="flex justify-between items-start">
            <div className="p-2.5 bg-[#FDE8E8] w-fit rounded-[14px]">
              <CookingPotIcon size={22} color="#9B1C1C" weight="bold" />
            </div>

            <div className="bg-[#FDE8E8] text-[#9B1C1C] flex items-center px-2 py-1 w-fit text-[10px] rounded-md font-bold font-inter tracking-wider">
              HIGH VOLUME
            </div>
          </header>

          <div className="flex flex-col gap-1">
            <p className="text-[#584237] font-medium text-[15px] font-inter">
              Kitchen Load
            </p>
            <p className="text-2xl font-bold font-manrope text-[#191C1E]">
              15 Tickets
            </p>
            <p className="text-[11px] text-[#B91C1C] font-semibold">
              Avg. prep time: 24 mins
            </p>
          </div>
        </div>

        <div className="bg-white p-4 pt-5 rounded-xl flex flex-col gap-4 border shadow-xs border-gray-200">
          <header className="flex justify-between items-start">
            <div className="p-2.5 bg-[#E6F4FF] w-fit rounded-[14px]">
              <ReceiptIcon size={22} color="#2B72B9" weight="bold" />
            </div>
          </header>

          <div className="flex flex-col gap-1">
            <p className="text-[#584237] font-medium text-[15px] font-inter">
              Orders Today
            </p>
            <p className="text-2xl font-bold font-manrope text-[#191C1E]">53</p>
            <p className="text-[11px] text-[#64748B] font-inter">
              Across all categories
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-5 mt-8 max-w-full">
        <div className="col-span-4 bg-white rounded-xl pb-7 border shadow-xs border-gray-200">
          <header className="flex justify-between items-center p-6 pb-4">
            <p className="font-bold text-lg font-manrope text-[#191C1E]">
              Top Selling Items Today
            </p>
            <a
              href="#"
              className="text-[#9D4300] text-[13px] font-bold hover:underline"
            >
              View Full Menu
            </a>
          </header>

          <div className="flex flex-col gap-7 px-6 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-11.5 flex items-center justify-center bg-[#AC4D00] text-white font-bold text-lg rounded-[10px]">
                  1
                </div>
                <div>
                  <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                    Catfish Pepper Soup
                  </p>
                  <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                    Best Seller • Signature Dish
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                  ₦202,500
                </p>
                <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                  45 orders
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-11.5 flex items-center justify-center bg-[#FFC2A8] text-[#713100] font-bold text-lg rounded-[10px]">
                  2
                </div>
                <div>
                  <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                    Jollof Rice
                  </p>
                  <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                    Popular • Daily Special
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                  ₦133,000
                </p>
                <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                  38 orders
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-11.5 flex items-center justify-center bg-[#E2E8F0] text-[#334155] font-bold text-lg rounded-[10px]">
                  3
                </div>
                <div>
                  <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                    Chilled Coke
                  </p>
                  <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                    Beverage • Standard
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                  ₦25,000
                </p>
                <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                  25 orders
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white col-span-3 rounded-xl pb-6 border shadow-xs border-gray-200">
          <header className="flex justify-between items-center p-6 pb-4">
            <p className="font-bold text-lg font-manrope text-[#191C1E]">
              Live Table Feed
            </p>
            <div className="size-2 bg-[#10B981] rounded-full"></div>
          </header>

          <div className="flex flex-col gap-4 px-6 pt-2">
            <div className="flex bg-[#F8FAFC] rounded-[14px] overflow-hidden py-3 px-4 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#10B981]"></div>
              <div className="flex items-center justify-between w-full pl-2">
                <div>
                  <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                    Table 1
                  </p>
                  <p className="text-[10px] font-bold font-inter text-[#10B981] mt-1.5 uppercase tracking-wide">
                    Ready to Seat
                  </p>
                </div>
                <div className="text-right flex flex-col justify-between items-end h-full">
                  <p className="text-[13px] font-semibold text-[#191C1E] mb-1.5">
                    0 min
                  </p>
                  <p className="text-[9.5px] font-bold bg-[#D1FAE5] text-[#047857] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Empty
                  </p>
                </div>
              </div>
            </div>

            <div className="flex bg-[#F8FAFC] rounded-[14px] overflow-hidden py-3 px-4 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D97706]"></div>
              <div className="flex items-center justify-between w-full pl-2">
                <div>
                  <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                    Table 2
                  </p>
                  <p className="text-[10px] font-bold font-inter text-[#D97706] mt-1.5 uppercase tracking-wide">
                    Awaiting Check
                  </p>
                </div>
                <div className="text-right flex flex-col justify-between items-end h-full">
                  <p className="text-[13px] font-semibold text-[#191C1E] mb-1.5">
                    45 min
                  </p>
                  <p className="text-[9.5px] font-bold bg-[#FFEDD5] text-[#C2410C] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    In Service
                  </p>
                </div>
              </div>
            </div>

            <div className="flex bg-[#F8FAFC] rounded-[14px] overflow-hidden py-3 px-4 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#64748B]"></div>
              <div className="flex items-center justify-between w-full pl-2">
                <div>
                  <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                    VIP Lounge
                  </p>
                  <p className="text-[10px] font-bold font-inter text-[#64748B] mt-1.5 uppercase tracking-wide">
                    Main Course
                  </p>
                </div>
                <div className="text-right flex flex-col justify-between items-end h-full">
                  <p className="text-[13px] font-semibold text-[#191C1E] mb-1.5">
                    12 min
                  </p>
                  <p className="text-[9.5px] font-bold bg-[#E0E7FF] text-[#4338CA] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Dining
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-2 w-full flex items-center justify-center gap-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors py-3.5 rounded-xl font-bold font-manrope text-[#191C1E] text-sm md:text-[15px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  rx="1.5"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  rx="1.5"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  rx="1.5"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  rx="1.5"
                />
              </svg>
              Full Floor Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Overview;
