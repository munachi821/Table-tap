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
    <main className="flex h-screen">
      <div className="w-68 h-full shrink-0 border-r border-gray-100">
        <div className="p-4 flex gap-2.5 items-end border-b border-gray-100">
          <div className="size-10 rounded-full border border-orange-200"></div>
          <p className="text-xl text-gray-700 font-semibold">
            Nana&apos;s Kitchen
          </p>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-2">
            {admintabs.map((tab) => (
              <li
                className={`flex items-center gap-2 text-lg ${activeTab === tab.name ? "font-semibold text-orange-800 bg-[#FEF3C7]" : "text-[#64748B] hover:bg-gray-100/70"} p-2.5 rounded-md cursor-pointer transition-all`}
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full h-full bg-orange-400">
        <header>
          <nav className="bg-white p-3.5 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-medium text-gray-700">
                Welcome Back, Nana&apos;s Kitchen!
              </h2>
              <p className="text-xs text-gray-400">
                Here&apos;s how your business snapshot for today.
              </p>
            </div>

            <div className="flex gap-4">
              <div>
                <p className="text-sm font-bold text-gray-600">{fullDate()}</p>
                <p className="text-xs text-right font-semibold text-gray-500">
                  {time}
                </p>
              </div>

              <div className="flex items-center gap-4 border-l pl-3 border-gray-200">
                <div>
                  <BellIcon size={24} />
                </div>

                <div className="size-10 rounded-full border flex items-center justify-center font-semibold bg-orange-400 text-white">
                  NK
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </main>
  );
};
export default Page;
