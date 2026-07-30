"use client";
import { MagnifyingGlass as Search } from "@phosphor-icons/react";
import Image, { StaticImageData } from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface MenuItems {
  id: string;
  name: string;
  image_url: string;
  is_available: boolean;
}

const Menu = () => {
  const supabase = createClient();
  const [searchText, setSearchText] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* const mealOrder = [
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
  ]; */

  useEffect(() => {
    const fetchMealData = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("id, name, image_url, is_available");
      if (data) {
        setMenuItems(data);
      }
      if (error) {
        console.error("Error fetching menu items", error);
      }
      setIsLoading(false);
    };
    fetchMealData();
  }, []);

  /* const HandleSearch = (text: string) => {
    return menuItems.filter((meals) =>
      meals.name.toLowerCase().includes(text.toLowerCase()),
    );
  }; */
  const filteredItems = menuItems.filter((item) => {
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    // Optimistic UI update
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, is_available: !currentStatus } : item,
      ),
    );

    const { data, error } = await supabase
      .from("menu_items")
      .update({ is_available: !currentStatus })
      .eq("id", id)
      .select();

    if (error || !data || data.length === 0) {
      console.error("Error updating availability or blocked by RLS:", error);
      alert("Unable to update availability! You may not have permission if you aren't logged in as the admin.");

      // Revert the optimistic UI update
      setMenuItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, is_available: currentStatus } : item,
        ),
      );
    }
  };

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
                src={meals.image_url}
                alt="Goat meat pepper soup"
                width={240}
                height={240}
                className={`w-full h-full object-cover object-center transition-all duration-300 ${
                  meals.is_available ? "" : "grayscale opacity-60"
                }`}
              />
            </div>

            <div className="mt-2 mb-1">
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-medium transition-colors ${
                    meals.is_available ? "text-gray-600" : "text-red-500"
                  }`}
                >
                  {meals.is_available ? "Food is available" : "Out of stock"}
                </p>

                <button
                  onClick={() =>
                    toggleAvailability(meals.id, meals.is_available)
                  }
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 flex items-center ${
                    meals.is_available ? "bg-orange-400" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`size-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
                      meals.is_available ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></div>
                </button>
              </div>

              <h3
                className={`font-semibold my-1 transition-colors truncate block w-60 ${
                  meals.is_available
                    ? "text-gray-800"
                    : "text-gray-400 line-through decoration-gray-300"
                }`}
              >
                {meals.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Menu;
