"use client";

import {
  CameraIcon,
  CreditCardIcon,
  HouseIcon,
  ImageIcon,
  PersonIcon,
  UsersIcon,
} from "@phosphor-icons/react";

const page = () => {
  return (
    <div className="p-4 py-6 font-manrope">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Settings</h2>
        <p className="text-lg text-[#64748B]">
          Configure your restaurant preferences and settings.
        </p>
      </div>

      <div className="grid grid-cols-7 mt-5 gap-6">
        <div className="col-span-2 space-y-2">
          <div className="py-3.5 px-4.5 bg-[#F8EEE9] text-[#9D4300] font-semibold cursor-pointer flex items-center gap-3 rounded-2xl">
            <HouseIcon size={21} weight="bold" /> <p>Restaurant Profile</p>
          </div>
          <div className="py-3.5 px-4.5 hover:bg-[#F2F4F6] transition-colors cursor-pointer text-[#724237] font-semibold flex items-center gap-3 rounded-2xl">
            <UsersIcon size={21} weight="bold" /> <p>Manage Staffs</p>
          </div>
          <div className="py-3.5 px-4.5 hover:bg-[#F2F4F6] transition-colors cursor-pointer text-[#724237] font-semibold flex items-center gap-3 rounded-2xl">
            <PersonIcon size={21} weight="bold" /> <p>Operations</p>
          </div>
          <div className="py-3.5 px-4.5 hover:bg-[#F2F4F6] transition-colors cursor-pointer text-[#724237] font-semibold flex items-center gap-3 rounded-2xl">
            <CreditCardIcon size={21} weight="bold" /> <p>Billing & Plans</p>
          </div>
        </div>
        <div className="col-span-5 bg-white rounded-3xl border border-[#E6E8EA]">
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
                    className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#FAFAFA] font-inter font-medium text-base focus:outline-[#9D4300]"
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
                    className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#FAFAFA] font-inter font-medium text-base focus:outline-[#9D4300]"
                    placeholder="08011223345"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default page;
