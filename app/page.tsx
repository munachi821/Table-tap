"use client";
import {
  MapPin,
  Minus,
  Plus,
  SearchIcon,
  ShoppingBasketIcon,
  ShoppingCart,
  X,
} from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import food1 from "@/public/menu-items/food1.png";
import food2 from "@/public/menu-items/food2.jpg";
import food3 from "@/public/menu-items/food3.jpg";
import food4 from "@/public/menu-items/food4.jpg";
import mod1 from "@/public/menu-items/mod1.jpg";
import mod2 from "@/public/menu-items/mod2.jpg";
import mod3 from "@/public/menu-items/mod3.jpg";
import mod4 from "@/public/menu-items/mod4.jpg";
import drink7 from "@/public/menu-items/drink7.jpg";
import drink2 from "@/public/menu-items/drink2.jpg";
import drink1 from "@/public/menu-items/drink1.jpg";
import drink3 from "@/public/menu-items/drink3.jpg";
import drink6 from "@/public/menu-items/drink6.jpg";
import Beverage from "@/components/beverageItem";
import Item from "@/components/item";

export interface modifier {
  name: string;
  price: number;
  img: StaticImageData;
  count: number;
  total: number;
}

export interface foodItem {
  tag: string[];
  itemName: string;
  price: string;
  image: StaticImageData;
  modifiers: modifier[];
  isAvailable: boolean;
}

interface CartItem {
  cartId: string;
  name: string;
  price: number;
  image: StaticImageData;
  quantity: number;
  selectedModifiers: modifier[];
}

export default function Home() {
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openModifierMenu, setOpenModifierMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState<foodItem | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const categories = [
    "All",
    "Available",
    "Rice",
    "Swallow",
    "Beverages",
    "Snacks",
    "Desert",
    "Mocktails",
    "Cocktails",
    "Continental",
  ];

  const menuItems = [
    {
      tag: ["most-ordered", "item"],
      itemName: "Catfish pepper Soup with scented leaves",
      price: "5,400",
      image: food1,
      modifiers: [],
      isAvailable: true,
    },
    {
      tag: ["most-ordered", "item"],
      itemName: "Goat meat pepper Soup",
      price: "6,700",
      image: food2,
      modifiers: [],
      isAvailable: true,
    },
    {
      tag: ["most-ordered", "item"],
      itemName: "Egusi soup with 2 wraps of fufu",
      price: "3,400",
      image: food3,
      modifiers: [
        { name: "pounded yam", price: 500, img: mod3, count: 0, total: 0 },
        { name: "Peppered meat", price: 600, img: mod4, count: 0, total: 0 },
        {
          name: "cow skin (ponmo)",
          price: 500,
          img: mod2,
          count: 0,
          total: 0,
        },
      ],
      isAvailable: true,
    },
    {
      tag: ["most-ordered", "item"],
      itemName: "Fried rice with chicken and salad",
      price: "4,000",
      image: food4,
      modifiers: [
        { name: "Fried chicken", price: 700, img: mod1, count: 0, total: 0 },
        { name: "coleslaw", price: 700, img: mod2, count: 0, total: 0 },
      ],
      isAvailable: true,
    },
    {
      tag: ["beverage", "most-ordered"],
      itemName: "Strawberry Flavoured Hollandia Yoghurt",
      price: "2,400",
      image: drink7,
      modifiers: [],
      isAvailable: true,
    },
    {
      tag: ["beverage"],
      itemName: "Canned sprite",
      price: "1,200",
      image: drink2,
      modifiers: [],
      isAvailable: true,
    },
    {
      tag: ["beverage"],
      itemName: "Canned coke",
      price: "1,200",
      image: drink1,
      modifiers: [],
      isAvailable: true,
    },
    {
      tag: ["beverage", "item"],
      itemName: "Monster Energy",
      price: "1,400",
      image: drink3,
      modifiers: [],
      isAvailable: true,
    },
    {
      tag: ["beverage", "item"],
      itemName: "Canned pepsi",
      price: "1,200",
      image: drink6,
      modifiers: [],
      isAvailable: true,
    },
  ];

  /* adding focus when the user clicks the search btn */
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  /* handling search */
  const handleSearch = () => {
    if (searchOpen && searchRef.current) {
      /* function to handle search */
      console.log("click happened");
      searchRef.current.value = "";
    }
  };

  /* filtering tags */
  const filterTags = (tag: string) => {
    return menuItems.filter((items) => items.tag.includes(tag));
  };

  /* checking if the item has modifiers */
  const handleItemClick = (foodItem: foodItem, quantity: number) => {
    if (foodItem.modifiers.length > 0) {
      setSelectedItem(foodItem);
      setOpenModifierMenu(true);
      return;
    }
    addToCart(foodItem, quantity);
  };

  //confirming selected modifiers and adding to cart
  const handleModifierConfirm = () => {
    if (!selectedItem) return;

    const selectedModifiers = selectedItem.modifiers.filter(
      (mod) => mod.count > 0,
    );

    const modifiersTotalCost = selectedModifiers.reduce(
      (sum, mod) => sum + mod.total,
      0,
    );
    const basePrice = parseInt(selectedItem.price.replace(",", ""));
    const finalTotalPrice = basePrice + modifiersTotalCost;

    const cartPayload = {
      cartId: crypto.randomUUID(),
      name: selectedItem.itemName,
      image: selectedItem.image,
      price: finalTotalPrice,
      quantity: 1,
      selectedModifiers: selectedModifiers,
    };

    addToCart(cartPayload);

    setSelectedItem(null);
    setOpenModifierMenu(false);
  };

  //add to cart function
  const addToCart = (payload: CartItem | foodItem, quantity?: number) => {
    if ("cartId" in payload) {
      console.log("Adding Complex Item to Cart:", payload);
      setCart((prev) => [...prev, payload]);
      return;
    }

    const simpleItem = payload as foodItem;
    const simplePrice = parseInt(simpleItem.price.replace(",", ""));

    const simplePayload = {
      cartId: crypto.randomUUID(),
      name: simpleItem.itemName,
      price: simplePrice * (quantity || 1),
      image: simpleItem.image,
      quantity: quantity || 1,
      selectedModifiers: [],
    };

    console.log("Adding Simple Item to Cart:", simplePayload);
    setCart((prev) => [...prev, simplePayload]);
  };

  useEffect(() => {
    console.log("Current Cart:", cart);
  }, [cart]);

  return (
    <main className="pb-10">
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
              {cart.length > 0 && (
                <div className="absolute text-xs size-4 rounded-full bg-orange-400/80 text-white flex items-center justify-center right-0 top-0">
                  {cart.length}
                </div>
              )}
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
            {filterTags("most-ordered").map((mostOrdered, i) => (
              <div
                className="shadow-md h-91 w-62 shrink-0 rounded-xl overflow-hidden"
                key={i}
              >
                <div className="rounded-lg overflow-hidden h-62">
                  <Image
                    src={mostOrdered.image}
                    alt="detail about food 1"
                    className="w-full h-full object-contain object-center"
                  />
                </div>

                <div className="p-3 py-5 flex gap-2 items-end">
                  <div>
                    <p className="text-xl font-bold text-orange-500">
                      ₦{mostOrdered.price}
                    </p>
                    <p className="text-base font-semibold text-gray-800">
                      {mostOrdered.itemName}
                    </p>
                  </div>
                  <button
                    className="bg-orange-400 hover:bg-orange-300 transition-colors cursor-pointer text-white rounded-2xl py-3 px-4.5"
                    onClick={() => handleItemClick(mostOrdered, 1)}
                  >
                    <Plus size={25} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Modifiers menu (Extra food items) */}
          <div
            className={`${
              openModifierMenu ? "flex" : "hidden"
            } flex-col rounded-2xl border border-gray-200 fixed bottom-0 right-0 m-5 bg-white p-2`}
          >
            <div className="flex justify-between items-center sticky top-2 bg-white rounded-b-xl">
              <p className="my-1 font-semibold text-gray-800 mb-2 w-60">
                Extra items for {selectedItem?.itemName}
              </p>

              <button
                className="text-orange-400 cursor-pointer"
                onClick={() => {
                  setOpenModifierMenu(false);
                  setSelectedItem(null);
                }}
              >
                <X />
              </button>
            </div>

            <div className="flex w-90 max-h-95 h-90 overflow-y-auto shrink-0 gap-2 flex-col">
              {selectedItem?.modifiers.map((items, i) => (
                <div
                  className="border border-gray-100 rounded-xl p-2 flex gap-2 items-end"
                  key={i}
                >
                  <div className="w-20 h-20 overflow-hidden rounded-lg">
                    <Image
                      src={items.img}
                      alt="modifier for a particular category"
                      className="min-w-full h-full object-cover object-center"
                    />
                  </div>

                  <div>
                    <p className="text-lg font-semibold leading-4 text-orange-500">
                      {items.name}
                    </p>
                    <p className="font-semibold text-gray-800">
                      ₦{items.price}
                    </p>
                    <div className="flex gap-3 items-center">
                      <button
                        className="size-6 rounded-md flex items-center justify-center cursor-pointer bg-orange-100 text-orange-400"
                        onClick={() =>
                          setSelectedItem((selectedItem) => {
                            if (selectedItem) {
                              return {
                                ...selectedItem,
                                modifiers: selectedItem.modifiers.map(
                                  (mod, idx) =>
                                    idx === i
                                      ? {
                                          ...mod,
                                          count: Math.max(0, mod.count - 1),
                                          total: Math.max(
                                            0,
                                            mod.total - mod.price,
                                          ),
                                        }
                                      : mod,
                                ),
                              };
                            }
                            return selectedItem;
                          })
                        }
                      >
                        <Minus size={18} />
                      </button>
                      <p className="font-semibold text-lg">{items.count}</p>
                      <button
                        className="size-6 rounded-md flex items-center justify-center cursor-pointer bg-orange-100 text-orange-400"
                        onClick={() =>
                          setSelectedItem((selectedItem) => {
                            if (selectedItem) {
                              return {
                                ...selectedItem,
                                modifiers: selectedItem.modifiers.map(
                                  (mod, idx) =>
                                    idx === i
                                      ? {
                                          ...mod,
                                          count: Math.max(0, mod.count + 1),
                                          total: Math.max(
                                            0,
                                            (mod.count + 1) * mod.price,
                                          ),
                                        }
                                      : mod,
                                ),
                              };
                            }
                            return selectedItem;
                          })
                        }
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="bg-orange-400 w-full flex items-center justify-center text-white py-3 rounded-full font-semibold gap-2 mt-2 cursor-pointer hover:bg-orange-400/90 transition-colors disabled:bg-orange-300 disabled:cursor-default"
              disabled={!selectedItem?.modifiers.some((item) => item.count > 0)}
              onClick={() => handleModifierConfirm()}
            >
              Add to cart <ShoppingCart size={20} />
            </button>
          </div>
        </div>

        {/* Beverages */}
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
        <div className="pr-10">
          <p className="text-2xl my-2.5">Other Meals</p>
          <div className="grid grid-cols-3 gap-3">
            {filterTags("item").map((item, i) => (
              <Item key={i} item={item} handleItemClick={handleItemClick} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
