import { Pizza, Utensils } from "lucide-react";

const Kitchen = () => {
  return (
    <main className="">
      <div className="flex bg-slate-50">
        {/* Sidebar */}
        <div className="border-r border-white w-full pt-3.5 bg-white">
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
              <div className="h-8 w-12 rounded-md flex items-center justify-center bg-orange-500 transition-colors text-white ml-2">
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
        <div className="max-w-270 w-full h-screen shrink-0 p-4">
          <h2 className="font-semibold text-2xl text-orange-500">Table 1</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-transparent h-20 relative rounded-xl border-2 border-gray-700">
              <div className="absolute -top-3 -left-4 size-8 flex items-center justify-center text-white bg-blue-400 text-lg font-bold rounded-full">
                1
              </div>
            </div>
            {/* 
            <div className="bg-red-400 h-20"></div>
            <div className="bg-red-400 h-20"></div>
            <div className="bg-red-400 h-20"></div> */}
          </div>
        </div>
      </div>
    </main>
  );
};
export default Kitchen;
