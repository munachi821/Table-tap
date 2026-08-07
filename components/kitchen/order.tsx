import { createClient } from "@/utils/supabase/client";
import TimeElapsed from "./timeElapsed";
import { useEffect, useRef, useState } from "react";
import { CookingPot } from "@phosphor-icons/react";

interface Orderitem {
  id: string;
  name: string;
  quantity: number;
  isCompleted: boolean;
}
interface kitchenOrder {
  orderId: string;
  tableNumber: string;
  status: "pending" | "completed";
  placedAt: Date;
  items: Orderitem[];
  note?: string;
}

type filterType = "all" | "paid" | "completed";

const Order = () => {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState<filterType>("paid");
  const [orders, setOrders] = useState<kitchenOrder[]>([]);

  const filterOrders = orders.filter((order) => {
    return order.status === activeTab;
  });

  /* playing a ding sound whenerver a new order is placed */
  const orderLength = useRef(orders.length);
  useEffect(() => {
    if (orders.length > orderLength.current) {
      const audio = new Audio("/order-arrival.wav").play();

      audio.catch((err) => {
        console.warn("Audio blocked by browser: ", err);
      });
    }

    orderLength.current = orders.length;
  }, [orders.length]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const restaurantId = userData?.user?.app_metadata?.restaurant_id;

      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

      let query = supabase
        .from("orders")
        .select(
          `id, created_at, status, notes, tables(table_name), order_items(id, quantity, menu_items(name))`,
        )
        .or(`status.eq.paid,and(status.eq.completed,created_at.gte.${twentyFourHoursAgo})`)
        .order("created_at", { ascending: false });

      if (restaurantId) {
        query = query.eq("restaurant_id", restaurantId);
      }

      const { data, error } = await query;

      if (data) {
        const orders = data.map((items) => {
          return {
            orderId: items.id,
            tableNumber: (items.tables as unknown as { table_name: string } | null)?.table_name ?? "Unknown",
            status: items.status,
            placedAt: new Date(items.created_at),
            items: items.order_items.map((item) => {
              return {
                id: item.id,
                name: (item.menu_items as unknown as { name: string } | null)?.name ?? "Unknown",
                quantity: item.quantity,
                isCompleted: false,
              };
            }),
            note: items.notes,
          };
        });

        setOrders(orders);
      }

      if (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    fetchOrders();

    const channel = supabase
      .channel("kitchen-orders-listeners")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => {
          setTimeout(() => {
            fetchOrders();
          }, 500);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markCompleted = async (orderId: string) => {
    setOrders((prev) => {
      return prev.map((order) =>
        order.orderId === orderId ? { ...order, status: "completed" } : order,
      );
    });

    const { error } = await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("id", orderId);

    if (error) {
      console.error("Error marking order as completed: ", error);
    }
  };

  return (
    <div className="relative">
      {/* Filter Section */}
      <div className="flex gap-3 bg-white py-1.5 px-2 rounded-lg border border-gray-200 w-fit shadow-md shadow-slate-200 absolute right-0 mt-1 mr-4">
        {(["paid", "completed"] as filterType[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveTab(filter)}
            className={`px-4 py-1.5 rounded-full text-base font-semibold capitalize transition-all ${
              activeTab === filter
                ? "bg-slate-600 text-white shadow-base px-6"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {filter === "paid" ? "pending" : filter} Orders
          </button>
        ))}
      </div>

      {/* Main Body */}
      <div className="p-4 mt-16">
        {filterOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-32 text-gray-400">
            <div className="size-24 bg-orange-50 text-orange-300 rounded-full flex items-center justify-center mb-5 shadow-inner">
              <CookingPot size={48} weight="duotone" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              No {activeTab === "paid" ? "pending" : "completed"} orders yet
            </h2>
            <p className="text-base font-medium text-gray-500">
              {activeTab === "paid"
                ? "When customers place orders, they will appear here automatically in real-time."
                : "You haven't completed any orders yet today. Let's get cooking!"}
            </p>
          </div>
        ) : filterOrders.map((orders) => (
            <div key={orders.orderId} className="mb-6">
            <div className="flex flex-wrap items-center sm:items-end gap-3 mb-4">
              <h2 className="font-semibold text-2xl text-gray-700">
                {orders.tableNumber}
              </h2>
              <span className="text-lg font-medium text-slate-500 mb-px">
                -
              </span>
              <span className="text-lg font-medium text-slate-500">
                #{orders.items.length}
              </span>

              <span className="text-lg font-medium text-slate-500 mb-px">
                -
              </span>

              <div className="text-orange-600 text-lg font-medium">
                <TimeElapsed placedAt={orders.placedAt} />
              </div>

              {orders.note && (
                <p className="ml-4 text-red-500 font-semibold max-w-50 truncate">
                  {orders.note}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {orders.items.map((items, index) => (
                <div
                  className="rounded-xl border-2 border-gray-700 p-2 bg-white/50 backdrop-blur-xl flex flex-col justify-between"
                  key={items.id}
                >
                  <header className="flex items-center justify-between border-b pb-2 mb-2 border-gray-300">
                    <div
                      className={`size-8 flex items-center justify-center text-white ${orders.status === "completed" ? "bg-orange-300" : "bg-orange-400/95"} text-lg font-bold rounded-full`}
                    >
                      {index + 1}
                    </div>

                    <p className="text-orange-400 shrink-0 font-semibold mr-2">
                      Qty: {items.quantity}
                    </p>
                  </header>

                  <div className="px-2">
                    <div className="text-gray-700 font-semibold">
                      <p>{items.name}</p>
                    </div>
                  </div>

                  <div className="mt-3"></div>
                </div>
              ))}
            </div>
            <button
              className="px-6 py-1.5 rounded-full text-base font-semibold capitalize transition-colors hover:bg-[#fd9319]/90 bg-[#fd9319] text-white shadow-base cursor-pointer disabled:bg-orange-300 disabled:cursor-default mt-3"
              disabled={orders.status === "completed"}
              onClick={() => markCompleted(orders.orderId)}
            >
              {orders.status === "completed" ? "Order completed" : "Ready"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Order;
