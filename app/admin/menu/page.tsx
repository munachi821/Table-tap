"use client";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSimpleIcon,
  TrashIcon,
  CaretRightIcon,
  CaretLeftIcon,
} from "@phosphor-icons/react";

const Page = () => {
  return (
    <div className="p-4 py-6 ">
      <nav className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Menu Inventory</h2>
        <p className="text-lg text-[#64748B]">
          Curate and manage your culinary offerings
        </p>
      </nav>

      <div className="mt-6 flex items-center justify-between">
        <div className="bg-white flex items-center pl-4 pr-1 gap-3 w-fit rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden h-11">
          <MagnifyingGlassIcon size={20} className="text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-lg h-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] font-inter outline-0"
          />
        </div>

        <button className="rounded-full px-5 h-10 text-[14.5px] font-bold bg-[#A4551F] hover:bg-[#8F4818] transition-colors text-white flex items-center gap-2 font-inter">
          <PlusIcon size={18} weight="bold" color="#ffffff" />
          Add New Item
        </button>
      </div>

      <div className="mt-8 bg-white border border-[#F1F5F9] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F8FAFC]">
            <tr className="border-b border-[#F1F5F9] text-[11.5px] font-bold font-inter text-[#64748B] uppercase tracking-[0.08em]">
              <th className="py-4 px-6">Item</th>
              <th className="py-4 px-6 w-[15%]">Category</th>
              <th className="py-4 px-6 w-[15%] text-left">Price</th>
              <th className="py-4 px-6 w-[15%] text-left">Status</th>
              <th className="py-4 px-6 w-[15%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            <tr className="hover:bg-[#F8FAFC]/50 transition-colors group">
              <td className="py-5 px-6">
                <div className="flex items-center gap-5">
                  <div className="size-16 rounded-[14px] overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative"></div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-manrope">
                      Catfish Pepper Soup
                    </h3>
                    <p className="text-[13.5px] text-[#64748B] font-inter">
                      Spicy authentic Nigerian soup
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className="bg-[#F4F7F9] text-[#475569] font-bold px-3 py-1.5 text-[10px] rounded-full uppercase tracking-widest font-inter">
                  Soups
                </span>
              </td>
              <td className="py-5 px-6">
                <p className="font-bold text-[16px] text-[#0F172A] font-manrope">
                  ₦4,500
                </p>
              </td>
              <td className="py-5 px-6">
                <div className="inline-flex w-11 h-6 bg-[#A4551F] rounded-full p-0.5 cursor-pointer relative items-center">
                  <div className="size-5 bg-white rounded-full shadow-sm absolute right-0.5 transition-all"></div>
                </div>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center justify-end gap-5 text-[#94A3B8]">
                  <PencilSimpleIcon
                    size={20}
                    className="hover:text-[#64748B] cursor-pointer transition-colors"
                    weight="bold"
                  />
                  <TrashIcon
                    size={20}
                    className="hover:text-red-500 cursor-pointer transition-colors"
                    weight="bold"
                  />
                </div>
              </td>
            </tr>

            <tr className="hover:bg-[#F8FAFC]/50 transition-colors group">
              <td className="py-5 px-6">
                <div className="flex items-center gap-5">
                  <div className="size-16 rounded-[14px] overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative"></div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-manrope">
                      Jollof Rice with Chicken
                    </h3>
                    <p className="text-[13.5px] text-[#64748B] font-inter">
                      Served with fried plantain
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className="bg-[#F4F7F9] text-[#475569] font-bold px-3 py-1.5 text-[10px] rounded-full uppercase tracking-widest font-inter">
                  Rice
                </span>
              </td>
              <td className="py-5 px-6">
                <p className="font-bold text-[16px] text-[#0F172A] font-manrope">
                  ₦3,500
                </p>
              </td>
              <td className="py-5 px-6">
                <div className="inline-flex w-11 h-6 bg-[#A4551F] rounded-full p-0.5 cursor-pointer relative items-center">
                  <div className="size-5 bg-white rounded-full shadow-sm absolute right-0.5 transition-all"></div>
                </div>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center justify-end gap-5 text-[#94A3B8]">
                  <PencilSimpleIcon
                    size={20}
                    className="hover:text-[#64748B] cursor-pointer transition-colors"
                    weight="bold"
                  />
                  <TrashIcon
                    size={20}
                    className="hover:text-red-500 cursor-pointer transition-colors"
                    weight="bold"
                  />
                </div>
              </td>
            </tr>

            <tr className="hover:bg-[#F8FAFC]/50 transition-colors group">
              <td className="py-5 px-6">
                <div className="flex items-center gap-5">
                  <div className="size-16 rounded-[14px] overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative"></div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-manrope">
                      Goat meat pepper soup
                    </h3>
                    <p className="text-[13.5px] text-[#64748B] font-inter">
                      Spicy pepper soup with goat meat
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className="bg-[#F4F7F9] text-[#475569] font-bold px-3 py-1.5 text-[10px] rounded-full uppercase tracking-widest font-inter">
                  soup
                </span>
              </td>
              <td className="py-5 px-6">
                <p className="font-bold text-[16px] text-[#0F172A] font-manrope">
                  ₦6,000
                </p>
              </td>
              <td className="py-5 px-6">
                <div className="inline-flex w-11 h-6 bg-[#CBD5E1] rounded-full p-0.5 cursor-pointer relative items-center border border-[#CBD5E1]">
                  <div className="size-5 bg-white rounded-full shadow-sm absolute left-0.5 transition-all"></div>
                </div>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center justify-end gap-5 text-[#94A3B8]">
                  <PencilSimpleIcon
                    size={20}
                    className="hover:text-[#64748B] cursor-pointer transition-colors"
                    weight="bold"
                  />
                  <TrashIcon
                    size={20}
                    className="hover:text-red-500 cursor-pointer transition-colors"
                    weight="bold"
                  />
                </div>
              </td>
            </tr>

            <tr className="hover:bg-[#F8FAFC]/50 transition-colors group">
              <td className="py-5 px-6">
                <div className="flex items-center gap-5">
                  <div className="size-16 rounded-[14px] overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative"></div>
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-manrope">
                      Egusi Soup & Fufu
                    </h3>
                    <p className="text-[13.5px] text-[#64748B] font-inter">
                      Melon seed soup with beef
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-5 px-6">
                <span className="bg-[#F4F7F9] text-[#475569] font-bold px-3 py-1.5 text-[10px] rounded-full uppercase tracking-widest font-inter">
                  Swallow
                </span>
              </td>
              <td className="py-5 px-6">
                <p className="font-bold text-[16px] text-[#0F172A] font-manrope">
                  ₦4,000
                </p>
              </td>
              <td className="py-5 px-6">
                <div className="inline-flex w-11 h-6 bg-[#CBD5E1] rounded-full p-0.5 cursor-pointer relative items-center border border-[#CBD5E1]">
                  <div className="size-5 bg-white rounded-full shadow-sm absolute left-0.5 transition-all"></div>
                </div>
              </td>
              <td className="py-5 px-6">
                <div className="flex items-center justify-end gap-5 text-[#94A3B8]">
                  <PencilSimpleIcon
                    size={20}
                    className="hover:text-[#64748B] cursor-pointer transition-colors"
                    weight="bold"
                  />
                  <TrashIcon
                    size={20}
                    className="hover:text-red-500 cursor-pointer transition-colors"
                    weight="bold"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 py-5 px-4">
          <div>
            <p className="text-[14px] text-[#64748B] font-inter">
              Showing 4 to 25 of menu items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="cursor-pointer text-[#94A3B8] hover:text-[#9D4300] transition-colors">
              <CaretLeftIcon size={20} weight="bold" />
            </button>
            <button className="cursor-pointer text-[#94A3B8] hover:text-[#9D4300] transition-colors">
              <CaretRightIcon size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
