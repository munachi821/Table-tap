"use client";
import {
  MapPinIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BasketIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Beverage from "@/components/beverageItem";
import Item from "@/components/item";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";

export interface foodItem {
  id: string;
  name: string;
  price: string;
  image_url: string;
  is_available: boolean;
  menu_categories: {
    name: string;
  };
}

interface CartItem {
  cartId: string;
  name: string;
  originalPrice: string;
  price: number;
  image: string;
  quantity: number;
}

interface Table {
  id: string;
  table_name: string;
  status: string;
  restaurants: {
    id: string;
    address: string;
    logo_url: string;
    name: string;
  };
}
const OrderComponent = () => {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table_id");
  const [currentTable, setCurrentTable] = useState<Table | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [chefNotes, setChefNotes] = useState("");
  const [menuItems, setMenuItems] = useState<foodItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!tableId) {
        return;
      }
      const { data: tableData, error: tablesError } = await supabase
        .from("tables")
        .select("*, restaurants(id, name, address, logo_url)")
        .eq("id", tableId)
        .single();
      if (tablesError) {
        console.error("Error fetching table", tablesError);
        return;
      }

      if (!tableId) {
        return;
      }
      const { data: menuItemsData, error: menuItemsError } = await supabase
        .from("menu_items")
        .select("*, menu_categories(name)")
        .eq("restaurant_id", tableData?.restaurants?.id);
      if (menuItemsError) {
        console.error("Error fetching menu items", menuItemsError);
        return;
      }
      console.log(menuItemsData);
      setCurrentTable(tableData);
      setMenuItems(menuItemsData);
    };

    fetchData();
  }, []);

  console.log(currentTable);
  const categories = [
    "all",
    "available",
    "rice",
    "swallow",
    "beverage",
    "snacks",
    "dessert",
    "mocktails",
    "cocktails",
    "continental",
  ];

  const categoryTags = (activeCategory: string) => {
    if (activeCategory === "all") return menuItems;
    return menuItems.filter((items) =>
      items.menu_categories?.name?.toLowerCase().includes(activeCategory),
    );
  };

  /* filtering tags */
  const filterTags = (tag: string) => {
    return categoryTags(activeCategory).filter((items) =>
      items.menu_categories?.name?.toLowerCase().includes(tag),
    );
  };

  /* adding focus when the user clicks the search btn */
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  const handleItemClick = (foodItem: foodItem, quantity: number) => {
    addToCart(foodItem, quantity);
  };

  const addToCart = (item: foodItem, quantity: number = 1) => {
    const unitPrice = parseInt(item.price.replace(",", ""));

    setCart((prev) => {
      const existingItemIndex = prev.findIndex((c) => c.name === item.name);

      if (existingItemIndex !== -1) {
        const updatedCart = [...prev];
        const existingItem = updatedCart[existingItemIndex];

        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + quantity,
          price: existingItem.price + unitPrice * quantity,
        };

        return updatedCart;
      } else {
        const newCartItem: CartItem = {
          cartId: crypto.randomUUID(),
          name: item.name,
          originalPrice: item.price,
          price: unitPrice * quantity,
          image: item.image_url,
          quantity: quantity,
        };
        return [...prev, newCartItem];
      }
    });
  };

  useEffect(() => {
    console.log("Current Cart:", cart);
  }, [cart]);

  const onCheckout = () => {
    setCart([]);
    setChefNotes("");
    const finalOrder = {
      orderId: crypto.randomUUID(),
      tableNumber: "Table 1" /* This should be gotten automatically */,
      items: cart,
      note: chefNotes,
      status: "pending",
      placedAt: new Date(),
    };
    console.log("Checkout complete!", finalOrder);
  };
  return (
    <main className="pb-10 relative">
      <header className="py-2 -top-2 sticky z-50">
        <nav className="bg-white px-3 sm:px-6 py-3 rounded-b-lg">
          <div className="text-black flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="size-13 rounded-full border border-orange-200 overflow-hidden relative">
                {currentTable?.restaurants?.logo_url ? (
                  <Image
                    src={currentTable.restaurants.logo_url}
                    alt="Restaurant Logo"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100" />
                )}
              </div>
              <div>
                <p className="text-lg leading-5">
                  {currentTable?.restaurants?.name || "Loading..."}
                </p>
                <p className="text-sm sm:text-base font-medium flex items-center gap-1 text-gray-600">
                  <MapPinIcon size={15} className="shrink-0" />{" "}
                  <span className="truncate max-w-[120px] sm:max-w-none">{currentTable?.restaurants?.address || "Loading..."}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-3">
              <p className="hidden sm:block text-lg text-gray-500 p-1 bg-gray-100 rounded-full px-4 font-semibold">
                {currentTable?.table_name || "Loading..."}
              </p>
              <div
                className={`flex flex-row-reverse gap-2 text-gray-600 p-2 rounded-full ${
                  searchOpen && "bg-gray-100"
                } hover:bg-gray-100 transition-colors relative`}
                onClick={() => setSearchOpen(true)}
              >
                <button>
                  <MagnifyingGlassIcon size={25} />
                </button>

                <input
                  ref={searchRef}
                  type="search"
                  placeholder="Search Food"
                  onBlur={() => {
                    if (search === "") setSearchOpen(false);
                  }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className={`bg-transparent outline-none text-sm text-gray-800 placeholder:text-gray-400 transition-all duration-300 ease-in-out ${
                    searchOpen
                      ? "w-32 sm:w-60 opacity-100 pl-2"
                      : "w-0 opacity-0 p-0 sr-only"
                  }
            `}
                />
              </div>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative text-orange-400 bg-orange-50 rounded-full p-2 hover:bg-orange-100 transition-colors"
              >
                {cart.length > 0 && (
                  <div className="absolute text-[10px] size-4 rounded-full bg-orange-400/80 text-white flex items-center justify-center right-0 top-0">
                    <p className="leading-0">{cart.length}</p>
                  </div>
                )}
                <BasketIcon size={25} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex items-center gap-2 my-2 max-w-full overflow-x-auto hide-scrollbar pl-9">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
            }}
            className={`
                  px-5 py-1.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap capitalize 
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

      {search.length > 0 ? (
        <div className="px-10">
          <p className="text-2xl mb-4">
            Results for{" "}
            <span className="text-orange-400">&quot;{search}&quot;</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((item, i) => (
                <Item key={i} item={item} handleItemClick={handleItemClick} />
              ))}
          </div>
          {/* No Results Message */}
          {menuItems.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          ).length === 0 && <p className="text-gray-500">No food found.</p>}
        </div>
      ) : (
        /* Menu Items */
        <div className="px-4 md:px-10 mt-5">
          <div>
            <p className="text-2xl mb-2.5">Most Ordered</p>
            <div className="flex gap-4 max-w-6xl overflow-x-auto hide-scrollbar p-2">
              {menuItems.slice(0, 4).map((mostOrdered, i) => (
                <div
                  className="shadow-md h-88 w-62 shrink-0 rounded-xl overflow-hidden"
                  key={i}
                >
                  <div
                    className={`rounded-lg overflow-hidden h-62 relative ${!mostOrdered.is_available ? "grayscale opacity-80" : ""}`}
                  >
                    {!mostOrdered.is_available && (
                      <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase tracking-wide">
                        Out of Stock
                      </div>
                    )}
                    <Image
                      src={mostOrdered.image_url}
                      alt="detail about food 1"
                      fill={true}
                      className="object-contain object-center"
                    />
                  </div>

                  <div className="p-3 py-5 flex gap-2 items-end justify-between">
                    <div>
                      <p
                        className={`text-xl font-bold ${mostOrdered.is_available ? "text-orange-500" : "text-gray-400"}`}
                      >
                        ₦{mostOrdered.price}
                      </p>
                      <p
                        className={`text-base font-semibold ${mostOrdered.is_available ? "text-gray-800" : "text-gray-400"}`}
                      >
                        {mostOrdered.name}
                      </p>
                    </div>
                    <button
                      disabled={!mostOrdered.is_available}
                      className={`${mostOrdered.is_available ? "bg-orange-400 hover:bg-orange-300 cursor-pointer text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"} transition-colors rounded-2xl py-3 px-4.5`}
                      onClick={() => handleItemClick(mostOrdered, 1)}
                    >
                      <PlusIcon weight="bold" size={25} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beverage */}
          <div>
            <p className="text-2xl m-2.5">Beverages</p>
            <div className="flex gap-4 max-w-6xl overflow-x-auto hide-scrollbar p-2">
              {filterTags("beverage").map((beverage, i) => (
                <Beverage
                  key={i}
                  item={beverage}
                  handleItemClick={handleItemClick}
                />
              ))}
            </div>
          </div>

          {/* Other tags */}
          <div className="mt-8">
            <p className="text-2xl my-2.5">Other Meals</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {menuItems.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  handleItemClick={handleItemClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed ${cartOpen ? "top-0 right-0 left-0 bottom-0" : "right-0 bottom-0"}`}
        onClick={() => setCartOpen(false)}
      >
        <div
          className="fixed bottom-0 right-0 m-4 z-20 flex items-end flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cart */}
          <div
            className={`p-2 w-fit bg-white border border-gray-300 rounded-xl ${cartOpen ? "block" : "hidden"}`}
          >
            <div className="flex justify-between items-center sticky top-2 rounded-b-xl mb-2 my-1">
              <p className="font-semibold text-gray-800">Checkout</p>
              <button
                className="text-orange-400 cursor-pointer"
                onClick={() => setCartOpen(false)}
              >
                <XIcon size={20} weight="bold" />
              </button>
            </div>

            <div className="w-88 max-h-95 h-90 flex flex-col gap-2 overflow-y-auto">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    className="border border-gray-200 rounded-lg p-2"
                    key={item.cartId}
                  >
                    <div className="flex gap-2 items-end relative">
                      <div className="w-20 h-20 overflow-hidden rounded-lg shrink-0 relative">
                        <Image
                          src={item.image}
                          alt="checkout image"
                          fill={true}
                          className="object-cover object-center"
                        />
                      </div>

                      <div>
                        <p className="font-bold text-lg text-orange-400 leading-4">
                          ₦{item.originalPrice}
                        </p>
                        <span className="flex gap-2 font-semibold leading-6 text-gray-800">
                          <p className="max-w-45 truncate overflow-x-hidden">
                            {item.name}
                          </p>{" "}
                          -<p>{item.quantity}x</p>
                        </span>
                        <p className="leading-4 font-semibold">
                          <span className="text-orange-400">Total:</span> ₦
                          {item.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        className="absolute right-0 top-0 m-2 text-orange-400 hover:text-orange-400/80 transition-colors cursor-pointer"
                        onClick={() =>
                          setCart((prev) =>
                            prev.filter((c) => c.cartId !== item.cartId),
                          )
                        }
                      >
                        <TrashIcon size={22} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mx-auto mt-5 font-semibold text-gray-800">
                  <p>There are no items in your cart</p>
                </div>
              )}
            </div>

            <div
              className="pt-1.5
                "
            >
              <div className="w-full">
                <textarea
                  placeholder="Notes for the Kitchen?"
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  className="w-full outline-0 border border-gray-300 p-1 text-sm rounded-lg"
                ></textarea>
              </div>

              <button
                className="bg-orange-400 hover:bg-orange-400/90 transition-colors text-white font-semibold w-full mt-2 py-2 rounded-full disabled:bg-orange-300"
                disabled={cart.length === 0}
                onClick={onCheckout}
              >
                Checkout - ₦
                {cart
                  .reduce((total, item) => total + item.price, 0)
                  .toLocaleString()}
              </button>
            </div>
          </div>

          {/* Cart Open and count */}
          <button
            className="text-orange-400 bg-orange-100 rounded-full p-4 cursor-pointer w-fit relative"
            onClick={() => setCartOpen(!cartOpen)}
          >
            {cart.length > 0 && (
              <div className="absolute text-xs size-4 rounded-full bg-orange-400/80 text-white flex items-center justify-center right-0 top-0">
                {cart.length}
              </div>
            )}
            <BasketIcon size={30} />
          </button>
        </div>
      </div>
    </main>
  );
};
export default OrderComponent;
