"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import food2 from "@/public/menu-items/food2.jpg";
import { useState } from "react";

const Menu = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  return (
    <div>
      <div className="flex items-center justify-between m-3">
        <h1 className="text-2xl text-gray-700 font-semibold">
          Toggle meal availability
        </h1>
        <div className="flex items-center gap-3 bg-white py-1.5 px-2 rounded-lg border border-gray-200 w-fit ">
          <input
            type="text"
            className="w-80 h-8 outline-0 border-orange-100 border pl-1"
          />
          <button className="text-orange-500 bg-orange-100/50 p-1.5 rounded-full">
            <Search />
          </button>
        </div>
      </div>

      <div className="px-4 grid grid-cols-5 gap-x-5 gap-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-60 h-60 rounded-md overflow-hidden bg-gray-50">
            <Image
              src={food2}
              alt="Goat meat pepper soup"
              className={`w-full h-full object-cover object-center transition-all duration-300 ${
                !isAvailable ? "grayscale opacity-60" : ""
              }`}
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p
                className={`text-sm font-medium transition-colors ${
                  isAvailable ? "text-gray-600" : "text-red-500"
                }`}
              >
                {isAvailable ? "Food is available" : "Out of stock"}
              </p>

              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${
                  isAvailable ? "bg-orange-400" : "bg-gray-300"
                }`}
              >
                <div
                  className={`size-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
                    isAvailable ? "translate-x-6" : "translate-x-0"
                  }`}
                ></div>
              </button>
            </div>

            <h3
              className={`font-semibold my-1 transition-colors ${
                !isAvailable
                  ? "text-gray-400 line-through decoration-gray-300"
                  : "text-gray-800"
              }`}
            >
              Goat meat pepper soup
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
