"use client";
import Image from "next/image";
import { PlusIcon, MinusIcon, ShoppingCartIcon } from "@phosphor-icons/react";
import { foodItem } from "@/app/order/page";
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
    <div className="border border-gray-300 p-1 rounded-xl flex gap-2 bg-gray-100 h-50 shrink-0">
      <div className="overflow-hidden rounded-xl">
        <Image
          src={item.image}
          alt="drink 5"
          className="w-fit h-full object-center object-contain"
        />
      </div>

      <div className="flex flex-col gap-1.5 bg-white justify-end shrink-0 p-1.5 w-50 rounded-r-lg">
        <p className="text-lg font-semibold leading-6 text-gray-800 my-1">
          {item.itemName}
        </p>
        <div className="flex gap-3">
          <p className="font-bold text-lg text-orange-500">₦{item.price}</p>
          <div className="flex gap-3">
            <button
              className="size-7.5 rounded-md flex items-center justify-center cursor-pointer bg-orange-100 text-orange-400"
              onClick={() => incrementCount()}
            >
              {" "}
              <PlusIcon size={22} />{" "}
            </button>
            <p className="font-semibold text-lg">{count}</p>
            <button
              className="size-7.5 rounded-md flex items-center justify-center cursor-pointer bg-orange-100 text-orange-400"
              onClick={() => decrementCount()}
            >
              {" "}
              <MinusIcon size={22} />{" "}
            </button>
          </div>
        </div>
        <button
          className="py-2 rounded-lg text-white font-semibold bg-orange-400 hover:bg-orange-400/80 transition-colors cursor-pointer flex items-center justify-center gap-2 m-0.5"
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
