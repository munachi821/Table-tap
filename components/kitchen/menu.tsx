"use client";
import { Hand, Search } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import food1 from "@/public/menu-items/food1.png";
import food2 from "@/public/menu-items/food2.jpg";
import food3 from "@/public/menu-items/food3.jpg";
import food4 from "@/public/menu-items/food4.jpg";
import { useState } from "react";

interface mealOrder {
  id: string;
  img: StaticImageData;
  foodName: string;
  isAvailable: boolean;
}

const Menu = () => {
  const [searchText, setSearchText] = useState("");

  const mealOrder = [
    {
      id: "1",
      img: food1,
      foodName: "Catfish pepper Soup with scented leaves",
      isAvailable: true,
    },
    {
      id: "2",
      img: food2,
      foodName: "Goat meat pepper soup",
      isAvailable: true,
    },
    {
      id: "3",
      img: food3,
      foodName: "Egusi soup with 2 wraps of fufu",
      isAvailable: true,
    },
    {
      id: "4",
      img: food4,
      foodName: "Fried rice with chicken and salad",
      isAvailable: true,
    },
  ];

  const [mealData, setMealData] = useState<mealOrder[]>(mealOrder);

  const HandleSearch = (text: string) => {
    return mealData.filter((meals) =>
      meals.foodName.toLowerCase().includes(text.toLowerCase()),
    );
  };
  const filteredItems = HandleSearch(searchText);

  return (
    <div>
      <div className="flex items-center justify-between m-3">
        <h1 className="text-2xl text-gray-700 font-semibold">
          {filteredItems.length === 0
            ? "No meals Available"
            : "Toggle meal availability"}
        </h1>

        <div className="flex items-center gap-3 bg-white py-1.5 px-2 rounded-lg border border-gray-200 w-fit ">
          <input
            type="text"
            className="w-80 h-8 outline-0 border-orange-100 border pl-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="text-orange-500 bg-orange-100/50 p-1.5 rounded-full">
            <Search />
          </button>
        </div>
      </div>

      <div className="px-4 grid grid-cols-5 gap-x-5 gap-y-6">
        {filteredItems.map((meals) => (
          <div
            className="bg-white border border-gray-200 rounded-lg p-2 w-fit"
            key={meals.id}
          >
            <div className="w-60 h-60 rounded-md overflow-hidden bg-gray-50">
              <Image
                src={meals.img}
                alt="Goat meat pepper soup"
                className={`w-full h-full object-cover object-center transition-all duration-300 ${
                  meals.isAvailable ? "" : "grayscale opacity-60"
                }`}
              />
            </div>

            <div className="mt-2 mb-1">
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-medium transition-colors ${
                    meals.isAvailable ? "text-gray-600" : "text-red-500"
                  }`}
                >
                  {meals.isAvailable ? "Food is available" : "Out of stock"}
                </p>

                <button
                  onClick={() =>
                    setMealData((prev) =>
                      prev.map((menuitem) =>
                        menuitem.id === meals.id
                          ? { ...menuitem, isAvailable: !menuitem.isAvailable }
                          : menuitem,
                      ),
                    )
                  }
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${
                    meals.isAvailable ? "bg-orange-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`size-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
                      meals.isAvailable ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>

              <h3
                className={`font-semibold my-1 transition-colors truncate block w-60 ${
                  meals.isAvailable
                    ? "text-gray-800"
                    : "text-gray-400 line-through decoration-gray-300"
                }`}
              >
                {meals.foodName}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Menu;
