"use client";

import {
  CreditCardIcon,
  DesktopIcon,
  HouseIcon,
  PersonIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import ProfileTab from "@/components/settings/ProfileTab";
import TerminalTab from "@/components/settings/TerminalTab";
import OperationsTab from "@/components/settings/OperationsTab";
import BillingTab from "@/components/settings/BillingTab";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="font-manrope relative flex flex-col h-full min-h-screen pb-10">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-[#F7F9FB]/95 backdrop-blur-md p-4 pt-6 pb-4">
        <h2 className="font-bold text-[#0F172A] text-3xl">Settings</h2>
        <p className="text-lg text-[#64748B]">
          Configure your restaurant preferences and settings.
        </p>
      </div>

      <div className="p-4 grid grid-cols-11 mt-4 gap-6 relative flex-1 items-start">
        {/* Sticky Sidebar */}
        <div className="col-span-3 space-y-2 sticky top-35">
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

        {/* Tab Content */}
        <div className="col-span-8 bg-white rounded-3xl border border-[#E6E8EA] shadow-sm">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "terminal" && <TerminalTab />}
          {activeTab === "operations" && <OperationsTab />}
          {activeTab === "billing" && <BillingTab />}
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
