"use client";
import { MapPin, SearchIcon, ShoppingBasketIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);
  return (
    <main>
      <header className="py-5">
        <nav className="bg-white text-black flex items-center justify-between px-4 py-2 rounded-lg">
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
            {/* if the search bar is open the background should be gray-100 */}
            <div
              className={`flex flex-row-reverse gap-2 text-gray-600 p-2 rounded-full ${
                searchOpen && "bg-gray-100"
              } hover:bg-gray-100 transition-colors`}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon size={25} />

              <input
                ref={searchRef}
                type="search"
                placeholder="Search Food"
                className={`bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-300 ease-in-out ${
                  searchOpen
                    ? "w-60 opacity-100 pl-2"
                    : "w-0 opacity-0 p-0 sr-only"
                }
        `}
              />
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
