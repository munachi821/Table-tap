import { Bell, Pizza, Settings, Utensils } from "lucide-react";

const Kitchen = () => {
  return (
    <main className="bg-slate-50">
      <div className="w-full h-screen relative">
        {/* Navbar */}
        <header className="flex justify-between bg-white px-4 py-3.5 items-center">
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-2">
              <div className="size-11 rounded-full border border-orange-100"></div>
              <div>
                <p className="font-semibold text-lg leading-4 text-orange-500">
                  Nene&apos;s Pastries
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  Kitchen Dashboard
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <p className="bg-orange-400/90 px-3 font-semibold py-1 rounded-full text-white">
                3 Pending
              </p>
              <h2 className="text-lg font-semibold">Orders</h2>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="font-semibold flex gap-2 text-lg border px-2.5 rounded-full border-gray-200 py-1">
              <button className="py-0.5 rounded-full px-2 text-orange-400 hover:text-orange-400 flex gap-2 items-center cursor-pointer">
                <Utensils size={22} className="shrink-0" />
                Orders
              </button>
              <button className="py-0.5 rounded-full px-2 border-gray-200 text-gray-500 cursor-pointer flex gap-2 items-center hover:text-orange-400">
                <Pizza size={22} className="shrink-0" />
                Menu
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-2 bg-white rounded-full border border-gray-200 text-gray-600">
                <Settings />
              </div>
              <div className="p-2 bg-white rounded-full border border-gray-200 text-gray-600">
                <Bell />
              </div>
            </div>
          </div>
        </header>

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
          <h2 className="font-semibold text-2xl text-gray-700 mb-2">Table 1</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-xl border-2 border-gray-700 p-2 bg-white/50 backdrop-blur-xl">
              <header className="flex items-center justify-between border-b pb-2 mb-2 border-gray-300">
                <div className="size-8 flex items-center justify-center text-white bg-orange-400/95 text-lg font-bold rounded-full">
                  1
                </div>
                <div className="py-4 text-white bg-orange-400/80 text-base leading-0 font-semibold rounded-full w-fit px-3">
                  1 min ago
                </div>
              </header>

              <div className="px-2">
                <div className="flex justify-between font-semibold">
                  <h3 className="text-gray-700">Food: Fried Rice</h3>{" "}
                  <p className="text-orange-400">Qty: 2</p>
                </div>
                <p className="list-none text-orange-400 font-semibold">
                  extra:{" "}
                </p>
                <ul className="list-disc pl-2 font-semibold">
                  <li>2 extra beef</li>
                  <li>2 extra beef</li>
                  <li>2 extra beef</li>
                </ul>
              </div>

              <div className="mt-2">
                <button className="px-6 py-1.5 rounded-full text-base font-semibold capitalize transition-all hover:bg-slate-600 transition-all bg-slate-700 text-white shadow-base cursor-pointer">
                  Order Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Kitchen;
