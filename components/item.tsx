import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { foodItem } from "@/components/orderComponent";

interface itemProps {
  item: foodItem;
  handleItemClick: (item: foodItem, quantity: number) => void;
}
const Item = ({ item, handleItemClick }: itemProps) => {
  const [count, setCount] = useState(1);

  function incrementCount() {
    setCount((prev) => prev + 1);
  }

  function decrementCount() {
    setCount((prev) => Math.max(1, prev - 1));
  }

  return (
    <div
      className={`shadow-lg h-fit shrink-0 rounded-xl overflow-hidden p-3 ${!item.is_available ? "opacity-80" : ""}`}
    >
      <div
        className={`rounded-xl overflow-hidden h-62 relative ${!item.is_available ? "grayscale" : ""}`}
      >
        {!item.is_available && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded z-10 uppercase tracking-wide">
            Out of Stock
          </div>
        )}
        <Image
          src={item.image_url}
          alt="other food"
          fill={true}
          className="object-cover object-center"
        />
      </div>
      <div className="mt-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p
              className={`text-xl font-bold ${item.is_available ? "text-orange-500" : "text-gray-400"}`}
            >
              ₦{item.price}
            </p>

            <div className="flex gap-2.5">
              <button
                disabled={!item.is_available}
                className={`${item.is_available ? "bg-orange-400 hover:bg-orange-300 cursor-pointer text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"} transition-colors rounded-xl py-1 px-1`}
                onClick={() => incrementCount()}
              >
                <PlusIcon weight="bold" size={19} />
              </button>
              <p
                className={`text-lg font-semibold ${!item.is_available ? "text-gray-400" : ""}`}
              >
                {count}
              </p>
              <button
                disabled={!item.is_available}
                className={`${item.is_available ? "bg-orange-400 hover:bg-orange-300 cursor-pointer text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"} transition-colors rounded-xl py-1 px-1`}
                onClick={() => decrementCount()}
              >
                <MinusIcon weight="bold" size={19} />
              </button>
            </div>
          </div>
          <p
            className={`text-base font-semibold truncate w-full overflow-y-auto ${item.is_available ? "text-gray-800" : "text-gray-400"}`}
          >
            {item.name}
          </p>
        </div>
        <button
          disabled={!item.is_available}
          className={`w-full py-2.5 rounded-full text-sm mt-2 font-semibold transition-colors ${item.is_available ? "bg-orange-400 text-white hover:bg-orange-400/90 cursor-pointer" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          onClick={() => {
            handleItemClick(item, count);
            setCount(1);
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Item;
