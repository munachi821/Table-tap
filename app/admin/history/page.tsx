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
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface OrderItem {
  quantity: number;
  menu_items: {
    name: string;
  };
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  tables: {
    table_name: string;
  };
  order_items: OrderItem[];
}

const HistoryPage = () => {
  const supabase = createClient();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All Orders");

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [voidedCount, setVoidedCount] = useState(0);
  const [voidedAmount, setVoidedAmount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 7;

  const fullDate = () => {
    const date = new Date();
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchHistory = async () => {
      const { data: user } = await supabase.auth.getUser();
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
        const { data: ordersData, error } = await supabase
          .from("orders")
          .select(`
            id, created_at, total_amount, status,
            tables(table_name),
            order_items(quantity, menu_items(name))
          `)
          .eq("restaurant_id", restaurant.id)
          .order("created_at", { ascending: false });

        if (ordersData) {
          setOrders(ordersData as any);
          setFilteredOrders(ordersData as any);

          const revenue = ordersData
            .filter((o) => o.status === "completed" || o.status === "paid")
            .reduce((acc, o) => acc + (o.total_amount || 0), 0);
          setTotalRevenue(revenue);

          const voided = ordersData.filter(
            (o) => o.status === "cancelled" || o.status === "refunded"
          );
          setVoidedCount(voided.length);
          setVoidedAmount(voided.reduce((acc, o) => acc + (o.total_amount || 0), 0));
        }
      }
      setIsLoading(false);
    };

    fetchHistory();
  }, [supabase]);

  useEffect(() => {
    setCurrentPage(1);
    if (filterStatus === "All Orders") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status.toLowerCase() === filterStatus.toLowerCase()));
    }
  }, [filterStatus, orders]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full py-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA580C]"></div>
      </div>
    );
  }

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
              <span className="font-manrope">₦</span>{totalRevenue.toLocaleString()}
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
              100%{" "}
              <span className="text-base text-[#584237] font-medium">
                Digital / 0% Cash
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
              {voidedCount} Orders{" "}
              <span className="text-base text-[#BA1A1A] font-medium">
                — ₦{voidedAmount.toLocaleString()}
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-between items-center">
        <div className="font-manrope space-x-4">
          {["All Orders", "Paid", "Refunded", "Cancelled"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`py-2 px-5 transition-colors cursor-pointer rounded-full font-medium ${
                filterStatus === tab
                  ? "bg-black text-white"
                  : "bg-[#F2F4F6] text-[#584237]"
              }`}
            >
              {tab}
            </button>
          ))}
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
            {paginatedOrders.length > 0 ? paginatedOrders.map((order) => {
              const time = new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              
              let statusStyle = "bg-[#F0FDF4] text-[#16A34A]";
              let dotColor = "bg-[#16A34A]";
              if (order.status === "cancelled") {
                statusStyle = "bg-[#FEF2F2] text-[#DC2626]";
                dotColor = "bg-[#DC2626]";
              } else if (order.status === "refunded") {
                statusStyle = "bg-[#FFF7ED] text-[#EA580C]";
                dotColor = "bg-[#EA580C]";
              } else if (order.status === "pending") {
                statusStyle = "bg-[#FFFbeb] text-[#d97706]";
                dotColor = "bg-[#d97706]";
              }

              const mainItem = order.order_items?.[0];
              const extraCount = order.order_items?.length > 1 ? order.order_items.length - 1 : 0;

              return (
                <tr className="hover:bg-slate-50/50 transition-colors" key={order.id}>
                  <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                    #{order.id.split("-")[0]}
                  </td>
                  <td className="py-6 px-2 text-[15px] font-medium text-[#586377] leading-tight">
                    {time}
                  </td>
                  <td className="py-6 px-2 text-[15px] font-medium text-[#0F172A] leading-tight">
                    {order.tables?.table_name || "Unknown"}
                  </td>
                  <td className="py-6 px-2">
                    {mainItem ? (
                      <>
                        <p className="text-[15px] font-medium text-[#0F172A] max-w-48 truncate">
                          {mainItem.quantity}x {mainItem.menu_items?.name}
                        </p>
                        {extraCount > 0 && (
                          <p className="text-[11px] font-bold text-[#A8B2C1] uppercase mt-1 tracking-wider">
                            + {extraCount} OTHER ITEMS
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-gray-400">No items</p>
                    )}
                  </td>
                  <td className="py-6 px-2">
                    <span className="bg-[#FAF5FF] text-[#9333EA] text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">
                      Digital
                    </span>
                  </td>
                  <td className="py-6 px-2 font-semibold font-inter text-[#0F172A]">
                    ₦{(order.total_amount || 0).toLocaleString()}
                  </td>
                  <td className="py-6 px-2">
                    <div className={`${statusStyle} text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 w-fit uppercase tracking-wider`}>
                      <div className={`size-1.5 rounded-full ${dotColor}`}></div>
                      {order.status}
                    </div>
                  </td>
                </tr>
              );
            }) : (
              <tr>
                <td colSpan={7} className="text-center py-10 text-gray-500 font-medium">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center text-sm font-manrope border-t border-gray-200 pt-4">
          <p className="text-[#586377] font-medium">
            Showing <span className="font-bold text-[#0F172A]">{filteredOrders.length > 0 ? startIndex + 1 : 0}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)}</span> of {filteredOrders.length} orders
          </p>
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-100 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 bg-white border border-gray-200 text-[#0F172A] font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HistoryPage;
