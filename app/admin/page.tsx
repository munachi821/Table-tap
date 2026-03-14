"use client";
import {
  SquaresFour as LayoutDashboard,
  ForkKnife as Utensils,
  Desk,
} from "@phosphor-icons/react";
import { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const admintabs = [
    { name: "Overview", icon: <LayoutDashboard /> },
    { name: "Menu", icon: <Utensils /> },
    { name: "Tables", icon: <Desk /> },
    { name: "History", icon: <LayoutDashboard /> },
    { name: "Finance", icon: <LayoutDashboard /> },
    { name: "Settings", icon: <LayoutDashboard /> },
  ];
  return (
    <main className="flex h-screen">
      <div className="w-68 h-full shrink-0">
        <div className="p-4 flex gap-2.5 items-end border-b border-gray-100">
          <div className="size-10 rounded-full border border-orange-200"></div>
          <p className="text-xl">Nana&apos;s Kitchen</p>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-2">
            {admintabs.map((tab) => (
              <li
                className={`flex items-center gap-2 text-lg ${activeTab === tab.name ? "font-semibold text-orange-800 bg-[#FEF3C7]" : "text-[#64748B]"} p-2.5 rounded-md`}
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon} {tab.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full h-full bg-orange-400"></div>
    </main>
  );
};
export default Page;
