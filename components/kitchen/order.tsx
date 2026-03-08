export interface Orderitem {
  id: string;
  itemIndex: number;
  name: string;
  quantity: number;
  isCompleted: boolean;
}
export interface kitchenOrder {
  orderId: string;
  tableNumber: string;
  status: "pending" | "completed";
  placedAt: Date;
  items: Orderitem[];
}

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
    ],
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
    status: "completed",
    // Simulating an order placed 45 minutes ago
    placedAt: new Date(Date.now() - 45 * 60000),
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
  return (
    <div className="relative">
      {/* Filter Section */}
      <div className="flex gap-3 bg-white py-1.5 px-2 rounded-lg border border-gray-200 w-fit shadow-md shadow-slate-200 absolute right-0 mt-2 mr-4">
        <button className="px-6 py-1.5 rounded-full text-base font-semibold capitalize transition-all bg-slate-600 text-white shadow-base">
          All Orders
        </button>
        <button className="px-4 py-1.5 rounded-full text-base font-semibold capitalize transition-all text-slate-500 hover:bg-slate-100">
          Pending Orders
        </button>
        <button className="px-4 py-1.5 rounded-full text-base font-semibold capitalize transition-all text-slate-500 hover:bg-slate-100">
          Completed Orders
        </button>
      </div>

      {/* Main Body */}
      <div className="p-4">
        {mockOrders.map((orders) => (
          <div key={orders.tableNumber}>
            <h2 className="font-semibold text-2xl text-gray-700 mb-2">
              {orders.tableNumber} -{" "}
              <span className="text-xl">#{orders.items.length}</span>
            </h2>

            <div className="grid grid-cols-4 gap-4">
              {orders.items.map((items) => (
                <div
                  className="rounded-xl border-2 border-gray-700 p-2 bg-white/50 backdrop-blur-xl"
                  key={items.id}
                >
                  <header className="flex items-center justify-between border-b pb-2 mb-2 border-gray-300">
                    <div className="size-8 flex items-center justify-center text-white bg-orange-400/95 text-lg font-bold rounded-full">
                      {items.itemIndex}
                    </div>
                    <div className="py-4 text-white bg-orange-400/80 text-base leading-0 font-semibold rounded-full w-fit px-3">
                      1 min ago
                    </div>
                  </header>

                  <div className="px-2">
                    <div className="font-semibold flex justify-between">
                      <div className="text-gray-700 w-50">
                        <p>{items.name}</p>
                      </div>
                      <p className="text-orange-400 shrink-0">
                        Qty: {items.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <button className="px-6 py-1.5 rounded-full text-base font-semibold capitalize transition-colors hover:bg-[#fd9319]/90 bg-[#fd9319] text-white shadow-base cursor-pointer">
                      Ready
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Order;
