"use client";

import {
  CreditCardIcon,
  HouseIcon,
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

      <div className="grid grid-cols-7 mt-5 gap-5">
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
        <div className="col-span-5 bg-blue-400 h-4"></div>
      </div>
    </div>
  );
};
export default page;
