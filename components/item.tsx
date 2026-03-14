import { Minus, Plus } from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";
import { foodItem } from "@/app/order/page";

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
    <div className="shadow-lg h-fit shrink-0 rounded-xl overflow-hidden p-3">
      <div className="rounded-xl overflow-hidden h-62">
        <Image
          src={item.image}
          alt="other food"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="mt-3">
        <div>
          <div className="flex justify-between items-center mb-1">
            <p className="text-xl font-bold text-orange-500">₦{item.price}</p>

            <div className="flex gap-2.5">
              <button
                className="bg-orange-400 hover:bg-orange-300 transition-colors cursor-pointer text-white rounded-xl py-1 px-1"
                onClick={() => incrementCount()}
              >
                <Plus size={20} />
              </button>
              <p className="text-lg font-semibold">{count}</p>
              <button
                className="bg-orange-400 hover:bg-orange-300 transition-colors cursor-pointer text-white rounded-xl py-1 px-1"
                onClick={() => decrementCount()}
              >
                <Minus size={20} />
              </button>
            </div>
          </div>
          <p className="text-base font-semibold text-gray-800 truncate w-full overflow-y-auto">
            {item.itemName}
          </p>
        </div>
        <button
          className="w-full py-2.5 rounded-full text-sm mt-2 bg-orange-400 text-white font-semibold hover:bg-orange-400/90 transition-colors cursor-pointer"
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
