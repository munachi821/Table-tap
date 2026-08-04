"use client";
import KitchenTable from "@/components/svg/KitchenTable";
import { createClient } from "@/utils/supabase/client";
import {
  ArrowUpIcon,
  CalendarDotsIcon,
  CookingPotIcon,
  MoneyIcon,
  ReceiptIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";

interface TopItem {
  name: string;
  category: string;
  revenue: number;
  orders: number;
}

interface LiveTable {
  id: string;
  name: string;
  statusText: string;
  timeText: string;
  tagText: string;
  colorCode: "green" | "orange" | "gray";
}

const Overview = () => {
  const supabase = createClient();
  const [restName, setRestName] = useState("");
  const [grossRevenue, setGrossRevenue] = useState(0);
  const [ordersToday, setOrdersToday] = useState(0);
  const [activeTables, setActiveTables] = useState(0);
  const [totalTables, setTotalTables] = useState(0);
  const [kitchenLoad, setKitchenLoad] = useState(0);
  const [topItems, setTopItems] = useState<TopItem[]>([]);
  const [liveTables, setLiveTables] = useState<LiveTable[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fullDate = () => {
    const date = new Date();
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchUserAndData = async () => {
      const { data: user } = await supabase.auth.getUser();
      setRestName(user.user?.user_metadata?.name || "Restaurant");
      
      if (!user.user) {
        setIsLoading(false);
        return;
      }

      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("owner_id", user.user.id)
        .maybeSingle();
        
      if (restaurant) {
        await fetchDashboardData(restaurant.id);
      } else {
        setIsLoading(false);
      }
    };

    const fetchDashboardData = async (restId: string) => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const startISO = startOfDay.toISOString();

      const { data: todayOrders } = await supabase
        .from("orders")
        .select("id, total_amount, status, table_id, created_at")
        .eq("restaurant_id", restId)
        .gte("created_at", startISO);

      if (todayOrders) {
        setOrdersToday(todayOrders.length);
        setGrossRevenue(todayOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0));
        
        const activeOrders = todayOrders.filter(o => o.status === "pending" || o.status === "paid" || o.status === "in-progress");
        setKitchenLoad(activeOrders.length);
      }

      const { data: tablesData } = await supabase
        .from("tables")
        .select("id, table_name")
        .eq("restaurant_id", restId);

      if (tablesData && todayOrders) {
        setTotalTables(tablesData.length);
        
        const activeOrders = todayOrders.filter(o => o.status === "pending" || o.status === "paid" || o.status === "in-progress");
        const activeTableIds = new Set(activeOrders.map(o => o.table_id));
        setActiveTables(activeTableIds.size);

        const live: LiveTable[] = tablesData.map((table) => {
          const tableOrders = activeOrders.filter(o => o.table_id === table.id).sort((a,b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          const latestOrder = tableOrders[0];
          
          if (latestOrder) {
            const diffMins = Math.floor((new Date().getTime() - new Date(latestOrder.created_at).getTime()) / 60000);
            return {
              id: table.id,
              name: table.table_name,
              statusText: latestOrder.status === "paid" ? "Awaiting Kitchen" : "Dining",
              timeText: `${diffMins} min`,
              tagText: "In Service",
              colorCode: "orange"
            };
          } else {
            return {
              id: table.id,
              name: table.table_name,
              statusText: "Ready to Seat",
              timeText: "0 min",
              tagText: "Empty",
              colorCode: "green"
            };
          }
        });
        setLiveTables(live);
      }

      if (todayOrders && todayOrders.length > 0) {
        const orderIds = todayOrders.map(o => o.id);
        const { data: orderItems } = await supabase
          .from("order_items")
          .select("quantity, unit_price, menu_items(name, menu_categories(name))")
          .in("order_id", orderIds);

        if (orderItems) {
          const itemMap = new Map<string, TopItem>();
          
          orderItems.forEach((oi: any) => {
            const name = oi.menu_items?.name || "Unknown";
            const cat = oi.menu_items?.menu_categories?.name || "Menu Item";
            const qty = oi.quantity || 0;
            const rev = (oi.unit_price || 0) * qty;

            if (itemMap.has(name)) {
              const existing = itemMap.get(name)!;
              existing.orders += qty;
              existing.revenue += rev;
            } else {
              itemMap.set(name, { name, category: cat, orders: qty, revenue: rev });
            }
          });

          const sortedItems = Array.from(itemMap.values()).sort((a, b) => b.orders - a.orders).slice(0, 5);
          setTopItems(sortedItems);
        }
      }
      setIsLoading(false);
    };

    fetchUserAndData();
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA580C]"></div>
      </div>
    );
  }

  return (
    <div className="py-4 pr-4">
      <header className="sticky top-0">
        <nav className="p-3.5 flex justify-between items-end">
          <div>
            <p className="text-xs font-medium text-[#584237] tracking-wide">
              DASHBOARD OVERVIEW
            </p>
            <h2 className="text-2xl text-[#191C1E] font-bold font-manrope">
              Today at {restName}
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
              ₦{grossRevenue.toLocaleString()}
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
              {activeTables}{" "}
              <span className="text-[17px] text-[#64748B] font-medium">
                / {totalTables}
              </span>
            </p>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-[#B45309] rounded-full transition-all duration-500"
                style={{ width: `${totalTables > 0 ? (activeTables / totalTables) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 pt-5 rounded-xl flex flex-col gap-4 border shadow-xs border-gray-200">
          <header className="flex justify-between items-start">
            <div className="p-2.5 bg-[#FDE8E8] w-fit rounded-[14px]">
              <CookingPotIcon size={22} color="#9B1C1C" weight="bold" />
            </div>

            {kitchenLoad > 10 && (
              <div className="bg-[#FDE8E8] text-[#9B1C1C] flex items-center px-2 py-1 w-fit text-[10px] rounded-md font-bold font-inter tracking-wider">
                HIGH VOLUME
              </div>
            )}
          </header>

          <div className="flex flex-col gap-1">
            <p className="text-[#584237] font-medium text-[15px] font-inter">
              Kitchen Load
            </p>
            <p className="text-2xl font-bold font-manrope text-[#191C1E]">
              {kitchenLoad} Tickets
            </p>
            <p className="text-[11px] text-[#B91C1C] font-semibold">
              Pending & Paid Orders
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
            <p className="text-2xl font-bold font-manrope text-[#191C1E]">{ordersToday}</p>
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
              className="text-[#9D4300] text-[13px] font-inter font-semibold hover:underline"
            >
              View Full Menu
            </a>
          </header>

          <div className="flex flex-col gap-7 px-6 pt-4 h-[350px] overflow-y-auto hide-scrollbar">
            {topItems.length > 0 ? topItems.map((item, i) => {
              const colors = [
                { bg: "bg-[#AC4D00]", text: "text-white" },
                { bg: "bg-[#FFC2A8]", text: "text-[#713100]" },
                { bg: "bg-[#E2E8F0]", text: "text-[#334155]" },
                { bg: "bg-[#3488f5]", text: "text-[#334155]" },
                { bg: "bg-[#a9caf5]", text: "text-[#334155]" },
              ];
              const c = colors[i % colors.length];
              return (
                <div className="flex items-center justify-between" key={i}>
                  <div className="flex items-center gap-4">
                    <div className={`size-11.5 flex items-center justify-center font-bold text-lg rounded-[10px] ${c.bg} ${c.text}`}>
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                        {item.name}
                      </p>
                      <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                      ₦{item.revenue.toLocaleString()}
                    </p>
                    <p className="text-[12.5px] font-inter text-[#64748B] mt-0.5">
                      {item.orders} orders
                    </p>
                  </div>
                </div>
              );
            }) : (
              <p className="text-gray-500 text-sm italic mt-4 text-center">No items sold today yet.</p>
            )}
          </div>
        </div>

        <div className="bg-white col-span-3 rounded-xl pb-6 border shadow-xs border-gray-200 flex flex-col">
          <header className="flex justify-between items-center p-6 pb-4 shrink-0">
            <p className="font-bold text-lg font-manrope text-[#191C1E]">
              Live Table Feed
            </p>
            <div className="size-2 bg-[#10B981] rounded-full"></div>
          </header>

          <div className="flex flex-col gap-4 px-6 pt-2 h-[350px] overflow-y-auto hide-scrollbar">
            {liveTables.map((table) => {
              const theme = table.colorCode === "green" 
                ? { line: "bg-[#10B981]", text: "text-[#10B981]", bgTag: "bg-[#D1FAE5]", textTag: "text-[#047857]" }
                : { line: "bg-[#D97706]", text: "text-[#D97706]", bgTag: "bg-[#FFEDD5]", textTag: "text-[#C2410C]" };
                
              return (
                <div className="flex bg-[#F8FAFC] rounded-[14px] overflow-hidden py-3 px-4 relative shrink-0" key={table.id}>
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${theme.line}`}></div>
                  <div className="flex items-center justify-between w-full pl-2">
                    <div>
                      <p className="font-bold text-[15px] font-manrope text-[#191C1E]">
                        {table.name}
                      </p>
                      <p className={`text-[10px] font-bold font-inter mt-1.5 uppercase tracking-wide ${theme.text}`}>
                        {table.statusText}
                      </p>
                    </div>
                    <div className="text-right flex flex-col justify-between items-end h-full">
                      <p className="text-[13px] font-semibold text-[#191C1E] mb-1.5">
                        {table.timeText}
                      </p>
                      <p className={`text-[9.5px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${theme.bgTag} ${theme.textTag}`}>
                        {table.tagText}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="px-6 pt-4 shrink-0">
            <button className="w-full flex items-center justify-center gap-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] transition-colors py-3.5 rounded-xl font-bold font-manrope text-[#191C1E] text-sm md:text-[15px]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2.5" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2.5" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2.5" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2.5" rx="1.5" />
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
