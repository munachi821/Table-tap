"use client";
import {
  BellIcon,
  PizzaIcon,
  GearIcon,
  ForkKnifeIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Menu from "@/components/kitchen/menu";
import Order from "@/components/kitchen/order";
import { createClient } from "@/utils/supabase/client";

const Kitchen = () => {
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("orders");
  const [pendingCount, setPendingCount] = useState(0);

  /* Getting pending count */
  /* const pendingCount = orders.filter(
    (ordercount) => ordercount.status === "pending",
  ).length; */

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          `id, created_at, status, notes, tables(table_name), order_items(id, quantity, menu_items(name))`,
        )
        .in("status", ["paid", "completed"])
        .order("created_at", { ascending: false });

      if (data) {
        setPendingCount(
          data.filter((order) => order.status === "paid").length || 0,
        );
      } else if (error) {
        console.error("error fetching pending count", error);
      }
    };

    fetchOrders();

    const channel = supabase
      .channel("kitchen-page-listeners")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        () => {
          setTimeout(() => {
            fetchOrders();
          }, 500);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const [restName, setRestName] = useState("Loading...");
  const [restImage, setRestImage] = useState("");

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      const { data: user } = await supabase.auth.getUser();
      if (user?.user) {
        // Fallback to metadata just in case
        setRestName(user.user.user_metadata?.name || "Kitchen Dashboard");
        
        // Fetch the official name and logo from the database
        const { data: restData } = await supabase
          .from("restaurants")
          .select("name, logo_url")
          .eq("owner_id", user.user.id)
          .single();

        if (restData) {
          if (restData.name) setRestName(restData.name);
          if (restData.logo_url) setRestImage(restData.logo_url);
        }
      }
    };
    fetchRestaurantInfo();
  }, []);

  const changeOverview = () => {
    if (activeTab === "orders") {
      return (
        <div className="flex gap-3 items-center">
          <p className="bg-orange-400/90 px-3 font-semibold py-1 rounded-full text-white">
            {pendingCount} Pending
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
              {restImage ? (
                <img src={restImage} alt="Restaurant Logo" className="size-11 rounded-full border border-orange-100 object-cover" />
              ) : (
                <div className="size-11 rounded-full border border-orange-100 bg-gray-100 animate-pulse"></div>
              )}
              <div>
                <p className="font-semibold text-lg leading-4 text-orange-500">
                  {restName}
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
                <ForkKnifeIcon size={22} className="shrink-0" />
                Orders
              </button>
              <button
                className={`py-0.5 rounded-full px-2 ${activeTab === "menu" ? "text-orange-400" : "text-gray-500 hover:text-orange-400"} flex gap-2 items-center cursor-pointer`}
                onClick={() => setActiveTab("menu")}
              >
                <PizzaIcon size={22} className="shrink-0" />
                Menu
              </button>
            </div>

            <div className="flex gap-2 items-center">
              <div className="p-2 bg-white rounded-full border border-gray-200 text-gray-600">
                <GearIcon size={20} />
              </div>
              <div className="p-2 bg-white rounded-full border border-gray-200 text-gray-600">
                <BellIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        <div className="pt-20">
          <div className={activeTab === "orders" ? "block" : "hidden"}>
            <Order />
          </div>

          <div className={activeTab === "menu" ? "block" : "hidden"}>
            <Menu />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Kitchen;
