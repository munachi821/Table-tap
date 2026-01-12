"use client";
import { MapPin, Plus, SearchIcon, ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import food1 from "@/public/menu-items/food1.png";

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Rice",
    "Swallow",
    "Beverages",
    "Snacks",
    "Desert",
    "Mocktails",
    "Cocktails",
    "Continental",
  ];

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = () => {
    if (searchOpen && searchRef.current) {
      /* function to handle search */
      console.log("click happened");
      searchRef.current.value = "";
    }
  };
  return (
    <main>
      <header className="py-5 px-4">
        <nav className="bg-white text-black flex items-center justify-between py-2 rounded-lg">
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
              } hover:bg-gray-100 transition-colors relative`}
              onClick={() => setSearchOpen(true)}
            >
              <SearchIcon
                size={25}
                onClick={() => {
                  handleSearch();
                }}
                onMouseDown={(e) => e.preventDefault()}
              />

              <input
                ref={searchRef}
                type="search"
                placeholder="Search Food"
                onBlur={() => setSearchOpen(false)}
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

        <div className="flex items-center gap-2 my-2 max-w-full overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`
              px-5 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap 
              ${
                activeCategory === category
                  ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-200"
              }
            `}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      {/* Menu Items */}
      <div className="pl-10">
        <div>
          <p className="text-2xl mb-3">Most Ordered</p>
          <div className="flex gap-4 max-w-6xl overflow-x-auto hide-scrollbar p-2">
            <div className="shadow-lg h-fit w-62 shrink-0 rounded-xl overflow-hidden">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={food1}
                  alt="detail about food 1"
                  className="min-w-full"
                />
              </div>

              <div className="p-3 py-5 flex justify-between">
                <div>
                  <p className="text-xl font-bold text-orange-500">₦5,400</p>
                  <p className="text-base font-semibold text-gray-800">
                    Catfish pepper soup
                  </p>
                </div>
                <button className="bg-orange-400 hover:bg-orange-300 transition-colors cursor-pointer text-white rounded-2xl py-2 px-5">
                  <Plus size={25} />
                </button>
              </div>
            </div>
            <div className="border h-90 w-62 shrink-0 rounded-xl overflow-hidden"></div>
            <div className="border h-90 w-62 shrink-0 rounded-xl overflow-hidden"></div>
            <div className="border h-90 w-62 shrink-0 rounded-xl overflow-hidden"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
