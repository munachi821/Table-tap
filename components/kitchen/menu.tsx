"use client";
import { MagnifyingGlass as Search, Pizza } from "@phosphor-icons/react";
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

  useEffect(() => {
    const fetchMealData = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const restaurantId = userData?.user?.app_metadata?.restaurant_id;

      let query = supabase
        .from("menu_items")
        .select("id, name, image_url, is_available");

      if (restaurantId) {
        query = query.eq("restaurant_id", restaurantId);
      }

      const { data, error } = await query;

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
      console.error(
        "Unable to update availability! You may not have permission if you aren't logged in as the admin.",
      );

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
      <div className="px-4 pt-16 pb-2 sm:pt-20">
        <h1 className="text-2xl text-gray-700 font-semibold">
          {isLoading
            ? "Loading menu..."
            : filteredItems.length === 0 && searchText === ""
              ? "Menu is empty"
              : "Toggle meal availability"}
        </h1>
      </div>

      <div className="relative">
        <div className="sticky top-20 z-50 px-4 mb-4 flex justify-end pointer-events-none">
          <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md py-1.5 px-2 rounded-xl border border-gray-100 w-full sm:w-80 md:w-96 shadow-lg pointer-events-auto">
            <input
              type="text"
              className="w-full h-9 outline-0 font-medium text-sm text-gray-800 placeholder:text-gray-400 pl-2 rounded-lg bg-transparent"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search menu items..."
            />
            <button className="text-orange-500 bg-orange-50 hover:bg-orange-100 active:scale-90 transition-all duration-200 ease-out p-2 rounded-lg cursor-pointer shrink-0">
              <Search size={18} weight="bold" />
            </button>
          </div>
        </div>

        <div className="px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-x-5 sm:gap-y-6 animate-pulse place-items-center sm:place-items-start">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-lg p-2 w-full sm:w-fit max-w-sm"
                >
                  <div className="w-full aspect-square sm:w-60 sm:h-60 rounded-md bg-gray-200 mb-4" />
                  <div className="flex justify-between items-center mb-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="w-12 h-6 bg-gray-200 rounded-full" />
                  </div>
                  <div className="h-5 w-40 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-400 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-center px-4">
              <div className="size-24 bg-orange-50 text-orange-300 rounded-full flex items-center justify-center mb-5 shadow-inner">
                <Pizza size={48} weight="duotone" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                {searchText ? "No matching meals found" : "Your menu is empty"}
              </h2>
              <p className="text-base font-medium text-gray-500">
                {searchText
                  ? `We couldn't find anything matching "${searchText}".`
                  : "Menu items added from the admin dashboard will appear here."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-x-5 sm:gap-y-6 place-items-center sm:place-items-start">
              {filteredItems.map((meals) => (
                <div
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl p-2 w-full sm:w-fit max-w-sm group"
                  key={meals.id}
                >
                  <div className="w-full aspect-square sm:w-60 sm:h-60 rounded-xl overflow-hidden bg-gray-50 relative flex items-center justify-center">
                    {meals.image_url ? (
                      <Image
                        src={meals.image_url}
                        alt={meals.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        className={`object-cover object-center transition-all duration-300 ${
                          meals.is_available ? "" : "grayscale opacity-60"
                        }`}
                      />
                    ) : (
                      <div className="text-gray-300 flex flex-col items-center">
                        <span className="text-4xl">🍽️</span>
                        <p className="text-xs mt-2 font-medium">No Image</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 mb-1">
                    <div className="flex justify-between items-center mb-1">
                      <p
                        className={`text-xs font-medium uppercase transition-colors ${
                          meals.is_available ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {meals.is_available ? "Available" : "Out of stock"}
                      </p>

                      <button
                        onClick={() =>
                          toggleAvailability(meals.id, meals.is_available)
                        }
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.85] flex items-center cursor-pointer ${
                          meals.is_available ? "bg-orange-500" : "bg-gray-200"
                        }`}
                      >
                        <div
                          className={`size-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                            meals.is_available
                              ? "translate-x-6"
                              : "translate-x-0"
                          }`}
                        ></div>
                      </button>
                    </div>

                    <h3
                      className={`font-semibold text-lg my-1 transition-colors truncate block w-60 ${
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
          )}
        </div>
      </div>
    </div>
  );
};
export default Menu;
