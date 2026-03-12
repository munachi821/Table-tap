import { title } from "process";
import TimeElapsed from "./timeElapsed";
import { useEffect, useRef, useState } from "react";

interface Orderitem {
  id: string;
  itemIndex: number;
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

type filterType = "all" | "pending" | "completed";

export const mockOrders: kitchenOrder[] = [
  {
    orderId: "#5",
    tableNumber: "Table 1",
    status: "pending",
    // Simulating an order placed 2 minutes ago
    placedAt: new Date(Date.now() - 2 * 60000),
    items: [
      {
        id: "item-001",
        itemIndex: 1,
        name: "Catfish pepper Soup with scented leaves",
        quantity: 2,
        isCompleted: false,
      },
      {
        id: "item-002",
        itemIndex: 2,
        name: "Fried rice with chicken and salad",
        quantity: 2,
        isCompleted: false,
      },
      {
        id: "item-003",
        itemIndex: 3,
        name: "Fried rice with chicken and salad",
        quantity: 2,
        isCompleted: false,
      },
      {
        id: "item-004",
        itemIndex: 4,
        name: "Fried rice with chicken and salad",
        quantity: 2,
        isCompleted: false,
      },
      {
        id: "item-005",
        itemIndex: 5,
        name: "Fried rice with chicken and salad",
        quantity: 2,
        isCompleted: false,
      },
    ],
    note: "Don't add abacha",
  },
  {
    orderId: "#6",
    tableNumber: "Table 4",
    status: "pending",
    // Simulating an order placed 12 minutes ago
    placedAt: new Date(Date.now() - 12 * 60000),
    items: [
      {
        id: "item-003",
        itemIndex: 1,
        name: "Egusi soup with 2 wraps of fufu",
        quantity: 3,
        isCompleted: false,
      },
      {
        id: "item-004",
        itemIndex: 2,
        name: "Monster Energy",
        quantity: 3,
        isCompleted: false,
      },
    ],
  },
  {
    orderId: "#7",
    tableNumber: "Table 2",
    status: "pending",
    // Simulating an order placed 1 minute ago
    placedAt: new Date(Date.now() - 1 * 60000),
    items: [
      {
        id: "item-005",
        itemIndex: 1,
        name: "Goat meat pepper Soup",
        quantity: 1,
        isCompleted: false,
      },
    ],
  },
  {
    orderId: "#8",
    tableNumber: "Table 8",
    status: "pending",
    // Simulating an order placed 45 minutes ago
    placedAt: new Date(Date.now() - 45 * 60000),
    note: "what if i say, i know",
    items: [
      {
        id: "item-006",
        itemIndex: 1,
        name: "Strawberry Flavoured Hollandia Yoghurt",
        quantity: 4,
        isCompleted: true,
      },
      {
        id: "item-007",
        itemIndex: 2,
        name: "Fried rice with chicken and salad",
        quantity: 4,
        isCompleted: true,
      },
    ],
  },
];

const Order = () => {
  const [activeTab, setActiveTab] = useState<filterType>("pending");
  const [orders, setOrders] = useState<kitchenOrder[]>(mockOrders);

  /* Getting pending count */
  const pendingCount = orders.filter(
    (ordercount) => ordercount.status === "pending",
  ).length;

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

  return (
    <div className="relative">
      {/* Filter Section */}
      <div className="flex gap-3 bg-white py-1.5 px-2 rounded-lg border border-gray-200 w-fit shadow-md shadow-slate-200 absolute right-0 mt-1 mr-4">
        {(["pending", "completed"] as filterType[]).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveTab(filter)}
            className={`px-4 py-1.5 rounded-full text-base font-semibold capitalize transition-all ${
              activeTab === filter
                ? "bg-slate-600 text-white shadow-base px-6"
                : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {filter} Orders
          </button>
        ))}
      </div>

      {/* Main Body */}
      <div className="p-4">
        {filterOrders.map((orders) => (
          <div key={orders.orderId} className="mb-6">
            <div className="flex items-end gap-3 mb-4">
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

            <div className="grid grid-cols-4 gap-4">
              {orders.items.map((items) => (
                <div
                  className="rounded-xl border-2 border-gray-700 p-2 bg-white/50 backdrop-blur-xl flex flex-col justify-between"
                  key={items.id}
                >
                  <header className="flex items-center justify-between border-b pb-2 mb-2 border-gray-300">
                    <div
                      className={`size-8 flex items-center justify-center text-white ${orders.status === "completed" ? "bg-orange-300" : "bg-orange-400/95"} text-lg font-bold rounded-full`}
                    >
                      {items.itemIndex}
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
              onClick={() =>
                setOrders((prev) =>
                  prev.map((order) =>
                    order.orderId === orders.orderId
                      ? { ...order, status: "completed" }
                      : order,
                  ),
                )
              }
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
