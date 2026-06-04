"use client";
import {
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import qrCode from "@/public/qr-code/qr-code.png";
import { useState } from "react";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 py-6">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Create Qr-codes</h2>
        <p className="text-lg text-[#64748B]">
          create and manage qrcodes for your tables
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="bg-white flex items-center pl-4 pr-1 gap-3 w-fit rounded-full border border-[#E2E8F0] shadow-sm overflow-hidden h-11">
          <MagnifyingGlassIcon size={20} className="text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search table..."
            className="w-lg h-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] font-inter outline-0"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-3 h-fit bg-orange-400 hover:bg-orange-500 transition-colors font-medium text-white rounded-full flex items-center gap-2"
        >
          <PlusIcon size={18} weight="bold" color="#ffffff" /> Create qr-code
        </button>
      </div>

      <div className="p-2 mt-4 flex flex-wrap gap-5">
        <div className="bg-white w-fit rounded-xl p-1">
          <div className="w-60 overflow-hidden">
            <Image src={qrCode} alt="qr-code 1" className="w-full" />
          </div>
          <div className="mt-2 p-2 flex justify-between items-end">
            <div>
              <p className="text-lg font-medium text-gray-700">Table 1</p>
              <p className="text-sm text-gray-500 font-medium leading-2">
                #847384
              </p>
            </div>
            <button className="border-2 border-orange-400 text-orange-400 hover:text-orange-300 hover:border-orange-300 transition-colors rounded-lg p-1 cursor-pointer">
              <DownloadSimpleIcon size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div
          className="fixed w-screen h-screen bg-black/15 top-0 right-0 left-0 bottom-0 flex items-center justify-center"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          {/* modal */}
          <div
            className="bg-white p-4 rounded-xl w-100 h-50 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">
                Create Qr-code
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer p-2 rounded-full hover:shadow-xs hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              >
                <XIcon size={18} weight="bold" />
              </button>
            </div>
            <form action="" className="flex flex-col mt-6 gap-4">
              <input
                type="text"
                placeholder="e.g. Table 05 or Lounge Booth"
                className="border-2 border-gray-200 rounded-xl p-2 focus:border-orange-400 outline-none transition-colors"
              />
              <button className="bg-orange-400 py-2 text-white font-medium rounded-full hover:bg-orange-500 transition-colors">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
