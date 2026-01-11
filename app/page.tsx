import { MapPin, SearchIcon, ShoppingBasketIcon } from "lucide-react";

export default function Home() {
  return (
    <main>
      <header>
        <nav className="bg-white text-black flex items-center justify-between mt-10 px-4 py-2 rounded-lg">
          <div className="flex gap-2 items-center">
            <div className="size-13 rounded-full border border-orange-200"></div>
            <div>
              <p className="text-lg leading-5">Chicken Republic</p>
              <p className="text-base font-medium flex items-center gap-1 text-gray-600">
                <MapPin size={15} /> New haven, Enugu State
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-lg text-gray-500 p-1 bg-gray-100 rounded-full px-4">
              Table 1
            </p>
            <div className="text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <SearchIcon size={25} />
            </div>
            <div className="relative text-orange-400 bg-orange-50 rounded-full p-2 hover:bg-orange-100 transition-colors">
              <div className="absolute text-xs size-4 rounded-full bg-orange-400/80 text-white flex items-center justify-center right-0 top-0">
                3
              </div>
              <ShoppingBasketIcon size={25} />
            </div>
          </div>
        </nav>
      </header>
    </main>
  );
}
