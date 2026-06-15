"use client";
import Image from "next/image";
import { PlusIcon, MinusIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { foodItem } from "@/components/orderComponent";
import { useState } from "react";

interface itemProps {
  item: foodItem;
  handleItemClick: (item: foodItem, quantity: number) => void;
}

const Beverage = ({ item, handleItemClick }: itemProps) => {
  const [count, setCount] = useState(1);

  function incrementCount() {
    setCount((prev) => prev + 1);
  }

  function decrementCount() {
    setCount((prev) => Math.max(1, prev - 1));
  }

  return (
    <div className={`border border-gray-300 p-1 rounded-xl flex gap-2 h-50 shrink-0 ${item.is_available ? "bg-gray-100" : "bg-gray-50 opacity-80"}`}>
      <div className={`overflow-hidden rounded-xl relative w-30 ${!item.is_available ? "grayscale" : ""}`}>
        {!item.is_available && (
          <div className="absolute top-1 left-1 bg-black/70 text-white text-[8px] font-bold px-1.5 py-0.5 rounded z-10 uppercase tracking-wide">
            Out of Stock
          </div>
        )}
        <Image
          src={item.image_url}
          alt="drink 5"
          fill={true}
          className="object-center object-cover"
        />
      </div>

      <div className="flex flex-col gap-1.5 bg-white justify-end shrink-0 p-1.5 w-50 rounded-r-lg">
        <p className={`text-lg font-semibold leading-6 my-1 ${item.is_available ? "text-gray-800" : "text-gray-400"}`}>
          {item.name}
        </p>
        <div className="flex gap-3">
          <p className={`font-bold text-lg ${item.is_available ? "text-orange-500" : "text-gray-400"}`}>₦{item.price}</p>
          <div className="flex gap-3">
            <button
              disabled={!item.is_available}
              className={`size-7.5 rounded-md flex items-center justify-center transition-colors ${item.is_available ? "cursor-pointer bg-orange-100 text-orange-400 hover:bg-orange-200" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              onClick={() => incrementCount()}
            >
              <PlusIcon size={22} />{" "}
            </button>
            <p className={`font-semibold text-lg ${!item.is_available ? "text-gray-400" : ""}`}>{count}</p>
            <button
              disabled={!item.is_available}
              className={`size-7.5 rounded-md flex items-center justify-center transition-colors ${item.is_available ? "cursor-pointer bg-orange-100 text-orange-400 hover:bg-orange-200" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
              onClick={() => decrementCount()}
            >
              <MinusIcon size={22} />{" "}
            </button>
          </div>
        </div>
        <button
          disabled={!item.is_available}
          className={`py-2 rounded-lg text-white font-semibold transition-colors flex items-center justify-center gap-2 m-0.5 ${item.is_available ? "bg-orange-400 hover:bg-orange-400/80 cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
          onClick={() => {
            handleItemClick(item, count);
            setCount(1);
          }}
        >
          Add to Cart <ShoppingCartIcon size={18} color="#fff" weight="fill" />
        </button>
      </div>
    </div>
  );
};
export default Beverage;
