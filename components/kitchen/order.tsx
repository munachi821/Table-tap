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
        <h2 className="font-semibold text-2xl text-gray-700 mb-2">
          Table 1 - <span className="text-xl">#5 Orders</span>
        </h2>
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
              <div className="font-semibold flex justify-between">
                <div className="text-gray-700 w-50">
                  <p>
                    Food: <br /> Catfish pepper Soup with scented leaves
                  </p>
                </div>
                <p className="text-orange-400 shrink-0">Qty: 2</p>
              </div>
            </div>

            <div className="mt-3">
              <button className="px-6 py-1.5 rounded-full text-base font-semibold capitalize transition-colors hover:bg-[#fd9319]/90 bg-[#fd9319] text-white shadow-base cursor-pointer">
                Order Completed
              </button>
            </div>
          </div>
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
              <div className="font-semibold flex justify-between">
                <div className="text-gray-700 w-50">
                  <p>
                    Food: <br /> Fried rice with chicken and salad
                  </p>
                </div>
                <p className="text-orange-400 shrink-0">Qty: 2</p>
              </div>
            </div>

            <div className="mt-3">
              <button className="px-6 py-1.5 rounded-full text-base font-semibold capitalize transition-colors hover:bg-[#fd9319]/90 bg-[#fd9319] text-white shadow-base cursor-pointer">
                Order Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
