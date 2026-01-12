"use client";
import { MapPin, Plus, SearchIcon, ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import food1 from "@/public/menu-items/food1.png";
import food2 from "@/public/menu-items/food2.jpg";
import food3 from "@/public/menu-items/food3.jpg";
import food4 from "@/public/menu-items/food4.jpg";

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

  const mostOrdered = [
    {
      foodName: "Catfish pepper Soup with scented leaves",
      price: "5,400",
      image: food1,
    },
    { foodName: "Goat meat pepper Soup", price: "6,700", image: food2 },
    {
      foodName: "Egusi soup with 2 wraps of fufu",
      price: "3,400",
      image: food3,
    },
    {
      foodName: "Fried rice with chicken and salad",
      price: "4,000",
      image: food4,
    },
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
            <p className="text-lg text-gray-500 p-1 bg-gray-100 rounded-full px-4 font-semibold">
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
      </header>

      <div className="flex items-center gap-2 my-2 max-w-full overflow-x-auto hide-scrollbar pl-9">
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

      {/* Menu Items */}
      <div className="pl-10 mt-5">
        <div>
          <p className="text-2xl mb-2.5">Most Ordered</p>
          <div className="flex gap-4 max-w-6xl overflow-x-auto hide-scrollbar p-2">
            {mostOrdered.map((mostOrdered, i) => (
              <div
                className="shadow-md h-fit w-62 shrink-0 rounded-xl overflow-hidden"
                key={i}
              >
                <div className="rounded-lg overflow-hidden">
                  <Image
                    src={mostOrdered.image}
                    alt="detail about food 1"
                    className="min-w-full"
                  />
                </div>

                <div className="p-3 py-5 flex gap-2 items-end">
                  <div>
                    <p className="text-xl font-bold text-orange-500">
                      ₦{mostOrdered.price}
                    </p>
                    <p className="text-base font-semibold text-gray-800">
                      {mostOrdered.foodName}
                    </p>
                  </div>
                  <button className="bg-orange-400 hover:bg-orange-300 transition-colors cursor-pointer text-white rounded-2xl py-3 px-4.5">
                    <Plus size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
