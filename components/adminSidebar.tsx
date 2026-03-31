"use client";
import { useState } from "react";
import {
  PicnicTableIcon,
  SquaresFourIcon,
  ForkKnifeIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  WalletIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
const AdminSidebar = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const admintabs = [
    {
      name: "Overview",
      icon: (
        <SquaresFourIcon
          size={24}
          weight={activeTab === "Overview" ? "fill" : "regular"}
        />
      ),
      link: "/admin/overview",
    },
    {
      name: "Menu",
      icon: (
        <ForkKnifeIcon
          size={24}
          weight={activeTab === "Menu" ? "fill" : "regular"}
        />
      ),
      link: "/admin/menu",
    },
    {
      name: "Tables",
      icon: (
        <PicnicTableIcon
          size={24}
          weight={activeTab === "Tables" ? "duotone" : "regular"}
        />
      ),
      link: "/admin/tables",
    },
    {
      name: "History",
      icon: (
        <ClockCounterClockwiseIcon
          size={24}
          weight={activeTab === "History" ? "fill" : "regular"}
        />
      ),
      link: "/admin/history",
    },
    {
      name: "Finance",
      icon: (
        <WalletIcon
          size={24}
          weight={activeTab === "Finance" ? "fill" : "regular"}
        />
      ),
      link: "/admin/finance",
    },
    {
      name: "Settings",
      icon: (
        <GearIcon
          size={24}
          weight={activeTab === "Settings" ? "fill" : "regular"}
        />
      ),
      link: "/admin/settings",
    },
  ];

  return (
    <div className="w-60 h-full shrink-0 bg-[#F8FAFC]">
      <div className="p-6">
        <h2 className="text-2xl w-25 whitespace-wrap text-[#0F172A] font-bold font-manrope leading-8">
          Nana&apos;s Kitchen
        </h2>
        <p className="font-semibold text-[#94A3B8] text-sm">
          CEO&apos;S DASHBOARD
        </p>
      </div>

      <div className="px-4 pb-4">
        <ul className="flex flex-col gap-2">
          {admintabs.map((tab) => (
            <Link
              href={tab.link}
              className={`flex items-center gap-2 text-lg ${activeTab === tab.name ? "text-[#7C2D12] bg-white" : "text-[#475569]/80 hover:bg-gray-100/30"} p-2 rounded-lg cursor-pointer font-medium transition-all`}
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon} {tab.name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default AdminSidebar;
