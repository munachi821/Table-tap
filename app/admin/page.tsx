"use client";
import {
  PicnicTableIcon,
  SquaresFourIcon,
  ForkKnifeIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  WalletIcon,
  BellIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Overview from "./(tabs)/overview";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }),
  );
  const admintabs = [
    {
      name: "Overview",
      icon: (
        <SquaresFourIcon
          size={24}
          weight={activeTab === "Overview" ? "fill" : "regular"}
        />
      ),
    },
    {
      name: "Menu",
      icon: (
        <ForkKnifeIcon
          size={24}
          weight={activeTab === "Menu" ? "fill" : "regular"}
        />
      ),
    },
    {
      name: "Tables",
      icon: (
        <PicnicTableIcon
          size={24}
          weight={activeTab === "Tables" ? "duotone" : "regular"}
        />
      ),
    },
    {
      name: "History",
      icon: (
        <ClockCounterClockwiseIcon
          size={24}
          weight={activeTab === "History" ? "fill" : "regular"}
        />
      ),
    },
    {
      name: "Finance",
      icon: (
        <WalletIcon
          size={24}
          weight={activeTab === "Finance" ? "fill" : "regular"}
        />
      ),
    },
    {
      name: "Settings",
      icon: (
        <GearIcon
          size={24}
          weight={activeTab === "Settings" ? "fill" : "regular"}
        />
      ),
    },
  ];

  /* getting full date */
  const fullDate = () => {
    const date = new Date();
    return date.toLocaleString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* updating time every 1 sec */
  useEffect(() => {
    const timer = setInterval(
      () =>
        setTime(
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        ),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex h-screen overflow-hidden">
      <div className="w-68 h-full shrink-0 bg-[#F8FAFC]">
        <div className="p-6">
          {/* <div className="size-10 rounded-full border border-orange-200 bg-[#9D4300]"></div> */}
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
              <li
                className={`flex items-center gap-2 text-lg ${activeTab === tab.name ? "text-[#7C2D12] bg-[#FEF3C7]/50 border-r-3 border-[#7C2D12]" : "text-[#475569]/80 hover:bg-gray-100/30"} p-2.5 pl-3 rounded-l-full cursor-pointer font-medium transition-all`}
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full h-full bg-[#F8FAFC] overflow-auto relative">
        <Overview />
      </div>
    </main>
  );
};
export default Page;
