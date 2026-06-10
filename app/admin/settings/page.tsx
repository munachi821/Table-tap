"use client";

import {
  CameraIcon,
  CreditCardIcon,
  DesktopIcon,
  HouseIcon,
  ImageIcon,
  PersonIcon,
} from "@phosphor-icons/react";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 py-6 font-manrope">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Settings</h2>
        <p className="text-lg text-[#64748B]">
          Configure your restaurant preferences and settings.
        </p>
      </div>

      <div className="grid grid-cols-11 mt-5 gap-6">
        <div className="col-span-3 space-y-2">
          <div
            className={`py-3.5 px-4.5 ${activeTab === "profile" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("profile")}
          >
            <HouseIcon size={21} weight="bold" /> <p>Restaurant Profile</p>
          </div>
          <div
            className={`py-3.5 px-4.5 ${activeTab === "terminal" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("terminal")}
          >
            <DesktopIcon size={21} weight="bold" /> <p>Terminal Access</p>
          </div>
          <div
            className={`py-3.5 px-4.5 ${activeTab === "operations" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("operations")}
          >
            <PersonIcon size={21} weight="bold" /> <p>Operations</p>
          </div>
          <div
            className={`py-3.5 px-4.5 ${activeTab === "billing" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("billing")}
          >
            <CreditCardIcon size={21} weight="bold" /> <p>Billing & Plans</p>
          </div>
        </div>

        <div className="col-span-8 bg-white rounded-3xl border border-[#E6E8EA]">
          {activeTab === "profile" && (
            <div>
              <div className="border-b border-[#D6C9B9] p-5">
                <p className="text-[#1B1D1E] text-2xl font-bold">
                  Restaurant Profile
                </p>
                <p className="text-[#584237] text-base font-medium">
                  Update your restaurant information and preferences.
                </p>
              </div>

              <form className="p-5 space-y-6">
                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block font-inter font-semibold"
                  >
                    Brand Assets
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="w-76 h-50 border-2 border-dashed border-[#E0C0B1] transition-all hover:border-[#9D4300] rounded-2xl flex flex-col items-center justify-center font-inter space-y-1.5">
                      <div className="p-4 rounded-full bg-[#F8EEE9] text-[#584237]">
                        <CameraIcon size={25} weight="bold" />
                      </div>
                      <p className="font-semibold text-sm tracking-wide">
                        UPLOAD LOGO
                      </p>
                      <p className="text-xs">PNG, JPG (max 3MB)</p>
                    </div>
                    <div className="w-full h-50 border-2 border-dashed border-[#E0C0B1] transition-all hover:border-[#9D4300] rounded-2xl flex flex-col items-center justify-center font-inter space-y-1.5">
                      <ImageIcon size={26} className="text-[#584237]" />
                      <p className="font-semibold text-sm tracking-wide">
                        MENU BANNER
                      </p>
                      <p className="text-xs tracking-wider">
                        Recommended 1200 x 400px
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="border-l-4 border-[#9D4300] font-semibold pl-2.5 font-inter">
                    Restaurant Details
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-[#584237] text-sm font-semibold mb-2 block"
                      >
                        RESTAURANT NAME
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                        placeholder="e.g. The Italian Place"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="number"
                        className="text-[#584237] text-sm font-semibold mb-2 block"
                      >
                        PHONE NUMBER
                      </label>
                      <input
                        type="number"
                        id="number"
                        className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                        placeholder="08011223345"
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="support"
                      className="text-[#584237] text-sm font-semibold mb-2 block"
                    >
                      SUPPORT EMAIL
                    </label>
                    <input
                      type="text"
                      id="support"
                      className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                      placeholder="hello@restaurant.com"
                    />
                  </div>

                  <div className="mt-5">
                    <label
                      htmlFor="address"
                      className="text-[#584237] text-sm font-semibold mb-2 block"
                    >
                      PHYSICAL ADDRESS
                    </label>
                    <textarea
                      id="support"
                      className="w-full h-18 p-4! rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                      rows={10}
                      placeholder="12 hero road, apapa lagos street, jigawa"
                    />
                  </div>
                </div>

                <p className="border-l-4 border-[#9D4300] font-semibold pl-2.5 font-inter mt-6">
                  Legal Information
                </p>

                <div className="mt-5">
                  <label
                    htmlFor="tax-no"
                    className="text-[#584237] text-sm font-semibold mb-2 block"
                  >
                    Tax Identification Number (TIN) / VAT
                  </label>
                  <input
                    type="text"
                    id="tax-no"
                    className="w-1/2 h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                    placeholder="1122-3348221"
                  />
                </div>

                <div className="mt-6 border-t border-[#F2F4F6] pt-5 flex justify-end gap-4">
                  <button className="px-4 py-2 rounded-full text-[#9D4300] hover:text-gray-700 hover:bg-[#C6C9CF] text-[14px] font-semibold cursor-pointer">
                    Discard
                  </button>
                  <button className="bg-[#9D4300] px-4 py-2 rounded-full text-white text-[14px] font-semibold cursor-pointer">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "billing" && (
            <div>
              <div className="border-b border-[#D6C9B9] p-5">
                <p className="text-[#1B1D1E] text-2xl font-bold">
                  Billing & Plans
                </p>
                <p className="text-[#584237] text-base font-medium">
                  Manage your software license, payment methods, and download
                  invoices.
                </p>
              </div>

              <div className="p-5">
                <div>
                  <div className="bg-[#FFF4EE] px-6 py-7 rounded-xl border border-[#FFE0CE] flex justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#974800] text-white p-2 rounded-lg w-fit h-fit">
                        <SealCheckIcon size={23} weight="bold" />
                      </div>

                      <div className="font-semibold">
                        <p className="text-xl">Table-tap Full License</p>
                        <p className="text-gray-500">
                          QR Tables & KDS Displays
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        <span className="text-3xl font-bold font-inter text-[#974800]">
                          ₦80,000
                        </span>{" "}
                        /month
                      </p>
                      <p className="text-gray-500 text-sm text-right">
                        Next billing date: july 8 2026
                      </p>
                    </div>
                  </div>
                  <p className="text-[#BA1A1A] font-semibold mt-2.5 text-right">
                    Need to cancel your license? Contact Support.
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex gap-2">
                    <CreditCardIcon size={28} />{" "}
                    <p className="text-xl">Payment Method</p>
                  </div>

                  <div className="border border-[#E4EAF1] rounded-lg p-5 flex items-center justify-between mt-4">
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-7.5 bg-black/90 rounded-sm"></div>
                      <div className="text-sm font-bold">
                        <p className="text-[#0F172A]">
                          Mastercard ending in 4242
                        </p>
                        <p className="text-gray-600">EXPIRES 12/28</p>
                      </div>
                    </div>

                    <button className="border border-[#974800] hover:bg-[#974800] transition-colors hover:text-white px-3 py-1.5 text-[#974800] cursor-pointer font-semibold rounded-lg">
                      Update Card
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
