"use client";
import {
  Bell,
  Pizza,
  Gear as Settings,
  ForkKnife as Utensils,
} from "@phosphor-icons/react";
import { useState } from "react";
import Menu from "@/components/kitchen/menu";
import Order from "@/components/kitchen/order";

const Kitchen = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const changeTab = () => {
    if (activeTab === "orders") {
      return <Order />;
    } else if (activeTab === "menu") {
      return <Menu />;
    }
  };

  const changeOverview = () => {
    if (activeTab === "orders") {
      return (
        <div className="flex gap-3 items-center">
          <p className="bg-orange-400/90 px-3 font-semibold py-1 rounded-full text-white">
            3 Pending
          </p>
          <h2 className="text-lg font-semibold">Orders</h2>
        </div>
      );
    } else if (activeTab === "menu") {
      return (
        <div className="flex gap-3 items-center">
          <p className="bg-orange-400/90 px-3 font-semibold py-1 rounded-full text-white">
            3 Available
          </p>
          <h2 className="text-lg font-semibold">Menu items</h2>
        </div>
      );
    }
  };
  return (
    <main className="bg-slate-50">
      <div className="w-full min-h-screen">
        {/* Navbar */}
        <header className="flex justify-between bg-white px-4 py-3.5 items-center fixed w-full z-50">
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-2">
              <div className="size-11 rounded-full border border-orange-100"></div>
              <div>
                <p className="font-semibold text-lg leading-4 text-orange-500">
                  Nene&apos;s Pastries
                </p>
                <p className="text-xs font-semibold text-gray-500">
                  Kitchen Dashboard
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">{changeOverview()}</div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="font-semibold flex gap-2 text-lg border px-2.5 rounded-full border-gray-200 py-1">
              <button
                className={`py-0.5 rounded-full px-2 ${activeTab === "orders" ? "text-orange-400" : "text-gray-500 hover:text-orange-400"} flex gap-2 items-center cursor-pointer`}
                onClick={() => setActiveTab("orders")}
              >
                <Utensils size={22} className="shrink-0" />
                Orders
              </button>
              <button
                className={`py-0.5 rounded-full px-2 ${activeTab === "menu" ? "text-orange-400" : "text-gray-500 hover:text-orange-400"} flex gap-2 items-center cursor-pointer`}
                onClick={() => setActiveTab("menu")}
              >
                <Pizza size={22} className="shrink-0" />
                Menu
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-2 bg-white rounded-full border border-gray-200 text-gray-600">
                <Settings />
              </div>
              <div className="p-2 bg-white rounded-full border border-gray-200 text-gray-600">
                <Bell />
              </div>
            </div>
          </div>
        </header>

        <div className="pt-20">{changeTab()}</div>
      </div>
    </main>
  );
};
export default Kitchen;
