import { Search } from "lucide-react";
import Image from "next/image";
import food2 from "@/public/menu-items/food2.jpg";

const Menu = () => {
  return (
    <div>
      <div className="flex items-center justify-between m-3">
        <h1 className="text-2xl text-gray-700 font-semibold">
          Toggle meal availability
        </h1>
        <div className="flex items-center gap-3 bg-white py-1.5 px-2 rounded-lg border border-gray-200 w-fit ">
          <input
            type="text"
            className="w-80 h-8 outline-0 border-orange-100 border pl-1"
          />
          <button className="text-orange-500 bg-orange-100/50 p-1.5 rounded-full">
            <Search />
          </button>
        </div>
      </div>

      <div className="px-4 grid grid-cols-4 gap-x-5 gap-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-62 h-62">
            <Image
              src={food2}
              alt="placeholder img"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p>Food is available</p>

              <button className="bg-orange-400 w-14 rounded-full p-1">
                <div className="size-5 rounded-full bg-white"></div>
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 my-1">
              Goat meat pepper soup
            </h3>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-62 h-62">
            <Image
              src={food2}
              alt="placeholder img"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p>Food is available</p>

              <button className="bg-orange-400 w-14 rounded-full p-1">
                <div className="size-5 rounded-full bg-white"></div>
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 my-1">
              Goat meat pepper soup
            </h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-62 h-62">
            <Image
              src={food2}
              alt="placeholder img"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p>Food is available</p>

              <button className="bg-orange-400 w-14 rounded-full p-1">
                <div className="size-5 rounded-full bg-white"></div>
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 my-1">
              Goat meat pepper soup
            </h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-62 h-62">
            <Image
              src={food2}
              alt="placeholder img"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p>Food is available</p>

              <button className="bg-orange-400 w-14 rounded-full p-1">
                <div className="size-5 rounded-full bg-white"></div>
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 my-1">
              Goat meat pepper soup
            </h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-62 h-62">
            <Image
              src={food2}
              alt="placeholder img"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p>Food is available</p>

              <button className="bg-orange-400 w-14 rounded-full p-1">
                <div className="size-5 rounded-full bg-white"></div>
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 my-1">
              Goat meat pepper soup
            </h3>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2 w-fit">
          <div className="w-62 h-62">
            <Image
              src={food2}
              alt="placeholder img"
              className="w-full h-full object-contain object-center"
            />
          </div>

          <div className="mt-2 mb-1">
            <div className="flex justify-between items-center">
              <p>Food is available</p>

              <button className="bg-orange-400 w-14 rounded-full p-1">
                <div className="size-5 rounded-full bg-white"></div>
              </button>
            </div>

            <h3 className="font-semibold text-gray-800 my-1">
              Goat meat pepper soup
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
