"use client";
import {
  MapPinIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BasketIcon,
  TrashIcon,
  XIcon,
  DownloadSimpleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Beverage from "@/components/beverageItem";
import Item from "@/components/item";
import { createClient } from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { toPng } from "html-to-image";
import { Toaster, toast } from "sonner";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false },
);

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
  menu_item_id: string;
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
    status: string;
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
  const [receiptData, setReceiptData] = useState<{
    orderId: string;
    tableNumber: string | undefined;
    items: CartItem[];
    note: string;
    status: string;
    placedAt: Date;
  } | null>(null);
  const [mostOrderedItems, setMostOrderedItems] = useState<foodItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!tableId) {
        return;
      }
      const { data: tableData, error: tablesError } = await supabase
        .from("tables")
        .select("*, restaurants(id, name, address, logo_url, status)")
        .eq("id", tableId)
        .maybeSingle();
      if (tablesError) {
        console.error("Error fetching table", tablesError);
        return;
      }

      if (!tableData?.restaurants?.id) {
        return;
      }
      const restaurantId = tableData.restaurants.id;

      const { data: menuItemsData, error: menuItemsError } = await supabase
        .from("menu_items")
        .select("*, menu_categories(name)")
        .eq("restaurant_id", restaurantId);
      if (menuItemsError) {
        console.error("Error fetching menu items", menuItemsError);
        return;
      }

      // Securely fetch the most ordered items from the server
      const { data: trendingData } = await supabase.rpc("get_trending_items", {
        p_restaurant_id: restaurantId,
        p_limit: 4,
      });

      if (trendingData && trendingData.length > 0) {
        // Map the IDs returned by the RPC back to the full menu item objects
        const sortedItems = trendingData
          .map((t: any) => menuItemsData?.find((item) => item.id === t.menu_item_id))
          .filter(Boolean) as foodItem[];

        // If for some reason the returned items don't map correctly, fallback to defaults
        if (sortedItems.length > 0) {
          setMostOrderedItems(sortedItems);
        } else {
          setMostOrderedItems(menuItemsData?.slice(0, 4) || []);
        }
      } else {
        // Fallback: If the restaurant has no recent orders, just show the first 4 items from the menu
        setMostOrderedItems(menuItemsData?.slice(0, 4) || []);
      }

      setCurrentTable(tableData);
      setMenuItems(menuItemsData);
      setIsLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  const uniqueCategories = Array.from(
    new Set(
      menuItems
        .map((item) => item.menu_categories?.name?.toLowerCase())
        .filter(Boolean),
    ),
  ) as string[];

  const categories = ["all", "available", ...uniqueCategories];

  const categoryTags = (activeCategory: string) => {
    if (activeCategory === "all") return menuItems;
    if (activeCategory === "available")
      return menuItems.filter((item) => item.is_available);

    return menuItems.filter(
      (item) => item.menu_categories?.name?.toLowerCase() === activeCategory,
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
    const unitPrice = parseInt(item.price);

    toast.success(`Added ${quantity} ${item.name} to cart`);

    setCart((prev) => {
      const existingItemIndex = prev.findIndex(
        (c) => c.menu_item_id === item.id,
      );

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
          menu_item_id: item.id,
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

  const paystackConfig = {
    reference: crypto.randomUUID(),
    email: "guest.checkout@tabletap.com",
    amount: Math.round(
      cart.reduce((total, item) => total + item.price, 0) * 100,
    ),
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  const onSuccess = async () => {
    const finalOrder = {
      orderId: crypto.randomUUID(),
      tableNumber: currentTable?.table_name,
      items: cart,
      note: chefNotes,
      status: "pending",
      placedAt: new Date(),
    };

    setReceiptData(finalOrder);
    setCart([]);
    setChefNotes("");
    setSearchOpen(false);
    setCartOpen(false);

    console.log("Checkout complete!", finalOrder);

    const { data: result, error: orderError } = await supabase.rpc(
      "place_secure_order",
      {
        p_restaurant_id: currentTable?.restaurants?.id || null,
        p_table_id: tableId || null,
        p_notes: chefNotes || "",
        p_paystack_reference: paystackConfig.reference,
        p_items: cart.map((item) => ({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
        })),
      },
    );

    if (orderError) {
      console.error(
        "Error inserting secure order",
        JSON.stringify(orderError, null, 2),
        orderError,
      );
      toast.error(`Failed to place order securely: ${orderError.message}`);
      return;
    }

    console.log("Secure order placed:", result);
  };

  const onClose = () => {
    toast.error("Payment cancelled!");
  };

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await toPng(receiptRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `Receipt_${receiptData?.orderId?.split("_")[0]}.png`;
      link.click();
    } catch (err) {
      console.error("Failed to download receipt", err);
    }
  };

  if (isLoading) {
    return (
      <main className="pb-10 relative bg-white min-h-screen">
        {/* Header Skeleton */}
        <header className="py-2 -top-2 sticky z-50">
          <nav className="bg-white px-3 sm:px-6 py-3 rounded-b-lg border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center animate-pulse">
                <div className="size-13 rounded-full bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-200 rounded" />
                  <div className="h-3 w-48 bg-gray-100 rounded" />
                </div>
              </div>
              <div className="flex gap-3 animate-pulse">
                <div className="w-20 h-10 bg-gray-100 rounded-full hidden sm:block" />
                <div className="size-10 bg-gray-200 rounded-full" />
                <div className="size-10 bg-gray-200 rounded-full" />
              </div>
            </div>
          </nav>
        </header>

        {/* Categories Skeleton */}
        <div className="flex items-center gap-2 my-4 pl-9 overflow-x-hidden animate-pulse">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-gray-200 rounded-full shrink-0"
            />
          ))}
        </div>

        {/* Section Skeleton */}
        <div className="px-4 md:px-10 mt-8">
          <div className="h-8 w-40 bg-gray-200 rounded-md mb-4 animate-pulse flex" />
          <div className="flex gap-4 overflow-x-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-88 w-62 shrink-0 rounded-xl bg-gray-50 border border-gray-100 p-2 animate-pulse"
              >
                <div className="w-full h-62 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
          <div className="flex gap-4 overflow-x-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-88 w-62 shrink-0 rounded-xl bg-gray-50 border border-gray-100 p-2 animate-pulse"
              >
                <div className="w-full h-62 bg-gray-200 rounded-lg mb-4" />
                <div className="h-6 w-24 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-40 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (currentTable?.restaurants?.status === "SUSPENDED") {
    return (
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <WarningCircleIcon
              size={32}
              weight="duotone"
              className="text-red-500"
            />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Store Unavailable
          </h2>
          <p className="text-sm text-gray-500">
            This restaurant is not accepting orders at the moment. Please try
            again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-10 relative min-h-screen">
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
                    sizes="52px"
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
                  <span className="truncate max-w-30 sm:max-w-none">
                    {currentTable?.restaurants?.address || "Loading..."}
                  </span>
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
                  placeholder="Search menu..."
                  onBlur={() => {
                    if (search === "") setSearchOpen(false);
                  }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className={`bg-transparent outline-none text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-300 ease-in-out ${
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

      <div className="flex items-center gap-2 my-2 max-w-full overflow-x-auto hide-scrollbar pl-9 py-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
            }}
            className={`
                  px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ease-out whitespace-nowrap capitalize active:scale-95
                  ${
                    activeCategory === category
                      ? "bg-orange-500 text-white shadow-md shadow-orange-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }
                `}
          >
            {category}
          </button>
        ))}
      </div>

      {search.length > 0 ? (
        <div className="px-4 md:px-10 mt-5">
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
          {menuItems.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase()),
          ).length === 0 && <p className="text-gray-500">No food found.</p>}
        </div>
      ) : activeCategory !== "all" ? (
        <div className="px-4 md:px-10 mt-5">
          <p className="text-2xl mb-4 capitalize">{activeCategory}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categoryTags(activeCategory).map((item) => (
              <Item
                key={item.id}
                item={item}
                handleItemClick={handleItemClick}
              />
            ))}
          </div>
          {categoryTags(activeCategory).length === 0 && (
            <p className="text-gray-500">No items found in this category.</p>
          )}
        </div>
      ) : (
        /* Menu Items */
        <div className="px-4 md:px-10 mt-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-4">
              Most Ordered
            </h2>
            <div className="flex gap-5 max-w-6xl overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              {mostOrderedItems.map((mostOrdered, i) => (
                <div
                  className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-88 w-62 shrink-0 rounded-2xl overflow-hidden group"
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
                      sizes="(max-width: 768px) 100vw, 300px"
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
                      className={`${mostOrdered.is_available ? "bg-orange-400 hover:bg-orange-500 active:scale-[0.9] shadow-md shadow-orange-200/50 cursor-pointer text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"} transition-all duration-200 ease-out rounded-2xl py-3 px-4.5`}
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
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-4">
              Beverages
            </h2>
            <div className="flex gap-5 max-w-6xl overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 md:mx-0 md:px-0">
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
          <div className="mt-10">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-4">
              All Items
            </h2>
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
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          cartOpen
            ? "pointer-events-auto bg-black/20 backdrop-blur-[2px]"
            : "pointer-events-none bg-transparent backdrop-blur-none"
        }`}
        onClick={() => setCartOpen(false)}
      >
        <div
          className="absolute bottom-0 right-0 m-4 pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cart */}
          <div
            className={`absolute bottom-full right-0 mb-4 p-2 flex flex-col w-[350px] sm:w-[400px] max-h-[calc(100dvh-120px)] bg-white border border-gray-100 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] origin-bottom-right transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              cartOpen
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            <div className="flex justify-between items-center rounded-b-xl px-3 py-2">
              <h3 className="font-semibold tracking-tight text-gray-900 text-lg">
                Your Order
              </h3>
              <button
                className="text-gray-400 hover:text-orange-500 hover:bg-orange-50 active:scale-90 p-1 rounded-full transition-all cursor-pointer"
                onClick={() => setCartOpen(false)}
              >
                <XIcon size={20} weight="bold" />
              </button>
            </div>

            <div className="w-full flex-1 min-h-0 flex flex-col gap-2 overflow-y-auto pr-1 hide-scrollbar">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    className="border border-gray-100 bg-gray-50/50 rounded-xl p-2 transition-all hover:border-orange-100"
                    key={item.cartId}
                  >
                    <div className="flex gap-2 items-end relative">
                      <div className="w-16 h-16 overflow-hidden rounded-lg shrink-0 relative shadow-sm">
                        <Image
                          src={item.image}
                          alt="checkout image"
                          fill={true}
                          sizes="64px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="flex-1 pb-1">
                        <p className="font-bold text-base text-orange-500 leading-4 mb-1.5">
                          ₦{item.originalPrice}
                        </p>
                        <div className="flex gap-1.5 font-semibold leading-tight text-gray-800 mb-1.5">
                          <p className="truncate max-w-[140px]">{item.name}</p>
                          <span className="text-gray-400 text-xs self-center">
                            x{item.quantity}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-gray-500">
                          Total:{" "}
                          <span className="text-gray-900">
                            ₦{item.price.toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <button
                        className="absolute right-0 top-0 m-1 text-gray-300 hover:text-red-500 hover:bg-red-50 active:scale-90 p-1.5 rounded-md transition-all cursor-pointer"
                        onClick={() =>
                          setCart((prev) =>
                            prev.filter((c) => c.cartId !== item.cartId),
                          )
                        }
                      >
                        <TrashIcon size={18} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="mx-auto my-8 font-semibold text-gray-400 flex flex-col items-center gap-2">
                  <BasketIcon size={32} className="opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 mt-2 px-2 pb-2">
              <div className="w-full mb-3">
                <textarea
                  placeholder="Add a note for the kitchen (optional)"
                  value={chefNotes}
                  onChange={(e) => setChefNotes(e.target.value)}
                  className="w-full outline-0 border border-gray-200 bg-gray-50 focus:bg-white focus:border-gray-300 transition-all p-3 text-sm font-medium rounded-xl resize-none h-20 placeholder:text-gray-400"
                ></textarea>
              </div>

              {cart.length === 0 ? (
                <button
                  className="bg-gray-100 text-gray-400 font-bold tracking-wide w-full py-3.5 rounded-xl cursor-not-allowed transition-all"
                  disabled={true}
                >
                  Cart is empty
                </button>
              ) : (
                <PaystackButton
                  {...paystackConfig}
                  onSuccess={onSuccess}
                  onClose={onClose}
                  text={`Pay ₦${cart.reduce((total, item) => total + item.price, 0).toLocaleString()}`}
                  className="bg-orange-500 hover:bg-orange-600 active:scale-[0.98] shadow-lg shadow-orange-200/50 transition-all duration-200 ease-out text-white font-semibold tracking-wide w-full py-3.5 rounded-xl"
                />
              )}
            </div>
          </div>

          {/* Cart Floating Button */}
          <button
            className="text-orange-500 bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.2)] hover:border-orange-200 active:scale-[0.92] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-full p-4 cursor-pointer float-right relative"
            onClick={() => setCartOpen(!cartOpen)}
          >
            {cart.length > 0 && (
              <div className="absolute text-[11px] font-bold size-5 rounded-full bg-orange-500 text-white flex items-center justify-center -top-1 -right-1 shadow-sm shadow-orange-500/50">
                {cart.length}
              </div>
            )}
            <BasketIcon
              size={28}
              weight={cart.length > 0 ? "fill" : "regular"}
            />
          </button>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {receiptData && (
        <div
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/40 backdrop-blur-sm transition-all duration-300 ease-out"
          onClick={() => setReceiptData(null)}
        >
          <div className="flex min-h-full p-4 sm:p-6">
            <div
              className="bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] max-w-sm w-full p-6 text-center m-auto animate-in fade-in zoom-in-95 duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]"
              onClick={(e) => e.stopPropagation()}
              ref={receiptRef}
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-green-100/50">
                <span className="text-3xl text-green-500 font-bold">✓</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
                Payment Successful!
              </h2>
              <p className="text-gray-500 font-medium mb-6 text-sm">
                Your order has been sent to the kitchen.
              </p>

              <div className="bg-[#F8FAFC] rounded-2xl p-5 mb-6 text-left border border-gray-100">
                <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-3 text-center">
                  Digital Receipt
                </p>

                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500 font-medium">Order ID</span>
                  <span className="font-mono text-gray-900 font-semibold">
                    #{receiptData.orderId?.split("-")[0]}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-gray-500 font-medium">Table</span>
                  <span className="text-gray-900 font-semibold">
                    {receiptData.tableNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-gray-500 font-medium">Time</span>
                  <span className="text-gray-900 font-semibold">
                    {new Date(receiptData.placedAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-300 py-3 my-3">
                  {receiptData.items?.map((item, i: number) => (
                    <div key={i} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-800 font-medium">
                        <span className="text-gray-900 font-bold mr-1">
                          {item.quantity}x
                        </span>
                        {item.name}
                      </span>
                      <span className="font-bold text-gray-900">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-3">
                  <span className="font-bold tracking-tight text-gray-700">
                    Total Paid
                  </span>
                  <span className="text-orange-500 font-bold text-xl tracking-tight">
                    ₦
                    {receiptData.items
                      ?.reduce(
                        (total: number, item: CartItem) => total + item.price,
                        0,
                      )
                      .toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center">
                <button
                  className="flex-1 bg-gray-900 text-white font-bold py-3.5 rounded-2xl hover:bg-black active:scale-[0.97] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] shadow-xl shadow-gray-900/10 cursor-pointer"
                  onClick={() => setReceiptData(null)}
                >
                  Close Receipt
                </button>

                <div
                  className="flex items-center justify-center p-3.5 w-14 h-14 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 active:scale-[0.92] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer shrink-0"
                  onClick={downloadReceipt}
                >
                  <DownloadSimpleIcon size={22} weight="bold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toaster richColors position="top-center" />
    </main>
  );
};
export default OrderComponent;
