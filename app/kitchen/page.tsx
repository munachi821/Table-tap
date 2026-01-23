import { Pizza, Settings, Utensils } from "lucide-react";

const Kitchen = () => {
  return (
    <main className="">
      <div className="flex bg-slate-50">
        {/* Sidebar */}
        <div className="border-r border-white pt-3.5 bg-white w-68 shrink-0">
          <div className="flex gap-2 items-end pl-3">
            <div className="border border-orange-200 size-12 rounded-lg bg-white"></div>
            <div className="font-semibold">
              <p className="text-lg text-gray-700 leading-3">
                Kitchen Dashboard
              </p>
              <p className="text-sm text-slate-500">Chicken Republic</p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 px-3 flex flex-col gap-2">
            <div className="flex px-1 py-1.5 gap-2 items-center border-orange-400 bg-orange-50 transition-colors rounded-lg">
              {/* if active then bg-orange-500 text-white */}
              <div className="h-8 w-12 rounded-md flex items-center justify-center bg-orange-400 transition-colors text-white ml-2">
                <Utensils size={22} className="shrink-0" />
              </div>
              <p className="text-lg font-semibold text-gray-700">Orders</p>
            </div>
            <div className="flex px-1 py-1.5 gap-2 items-center hover:border border-gray-200 transition-colors rounded-lg">
              {/* if active then bg-orange-500 text-white */}
              <div className="h-8 w-12 rounded-md flex items-center justify-center transition-colors text-orange-400 ml-2">
                <Pizza size={22} className="shrink-0" />
              </div>
              <p className="text-lg font-semibold text-gray-600">Food items</p>
            </div>
          </div>
        </div>

        {/* Kitchen view */}
        <div className="w-full h-screen">
          {/* filter orders in the header */}
          <header className="flex justify-between bg-white px-4 py-4.5 items-center">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold">Orders</h2>
              <p className="bg-orange-400/90 px-3 font-semibold py-1 rounded-full text-white">
                3 Pending
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-2 bg-white rounded-full border border-gray-200">
                <Settings />
              </div>
              <div className="flex gap-3 bg-white py-1 px-2 rounded-lg border border-gray-200 w-fit">
                <button className="px-6 py-1.5 rounded-full text-sm font-semibold capitalize transition-all bg-slate-600 text-white shadow-sm">
                  All
                </button>
                <button className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all text-slate-500 hover:bg-slate-100">
                  Pending
                </button>
                <button className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all text-slate-500 hover:bg-slate-100">
                  Completed
                </button>
              </div>
            </div>
          </header>
          <div className="p-4">
            <h2 className="font-semibold text-2xl text-gray-700 mb-2">
              Table 1
            </h2>
            <div className="grid grid-cols-4 gap-4">
              <div className="h-20 rounded-xl border-2 border-gray-700 p-2 bg-white/50 backdrop-blur-xl">
                <header className="flex items-center justify-between">
                  <div className="size-8 flex items-center justify-center text-white bg-orange-400/95 text-lg font-bold rounded-full">
                    1
                  </div>
                  <div className="py-4 text-white bg-orange-400/95 text-base leading-0 font-semibold rounded-full w-fit px-3">
                    1 min ago
                  </div>
                </header>
              </div>
              {/* 
            <div className="bg-red-400 h-20"></div>
            <div className="bg-red-400 h-20"></div>
            <div className="bg-red-400 h-20"></div> */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Kitchen;
