"use client";
import {
  BellIcon,
  PizzaIcon,
  GearIcon,
  ForkKnifeIcon,
  SignOut,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import Menu from "@/components/kitchen/menu";
import Order from "@/components/kitchen/order";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Kitchen = () => {
  const supabase = createClient();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [pendingCount, setPendingCount] = useState(0);
  const [availableCount, setAvailableCount] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/kitchen/login");
  };

  /* Getting pending count */
  /* const pendingCount = orders.filter(
    (ordercount) => ordercount.status === "pending",
  ).length; */

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const restaurantId = userData?.user?.app_metadata?.restaurant_id;

      let query = supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("status", "paid");

      if (restaurantId) {
        query = query.eq("restaurant_id", restaurantId);
      }

      const { count, error } = await query;

      if (count !== null) {
        setPendingCount(count);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [restName, setRestName] = useState("Loading...");
  const [restImage, setRestImage] = useState("");

  useEffect(() => {
    const fetchRestaurantInfo = async () => {
      try {
        const { data: user, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error("Auth error:", authError);
        }

        if (user?.user) {
          // Fallback to metadata just in case
          setRestName(user.user.user_metadata?.name || "Kitchen Dashboard");

          // Fetch the official name and logo from the database using the restaurant_id stored in app_metadata
          const restaurantId = user.user.app_metadata?.restaurant_id;

          if (restaurantId) {
            const { data: restData, error: dbError } = await supabase
              .from("restaurants")
              .select("name, logo_url")
              .eq("id", restaurantId)
              .maybeSingle();

            if (dbError) {
              console.error("DB error fetching restaurant:", dbError);
            }

            if (restData) {
              if (restData.name) setRestName(restData.name);
              if (restData.logo_url) setRestImage(restData.logo_url);
            }
          }
        } else {
          setRestName("Kitchen Dashboard");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setRestName("Kitchen Dashboard");
      }
    };
    fetchRestaurantInfo();
  }, []);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("id, name, is_available")
        .order("created_at", { ascending: false });

      if (data) {
        setAvailableCount(data.filter((item) => item.is_available).length || 0);
      } else if (error) {
        console.error("error fetching menu items", error);
      }
    };

    fetchMenuItems();

    const menuChannel = supabase
      .channel("menu-items-listeners")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "menu_items" },
        () => {
          setTimeout(() => {
            fetchMenuItems();
          }, 500);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(menuChannel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {availableCount} Available
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
        <header className="flex flex-col md:flex-row justify-between bg-white px-4 py-3.5 items-start md:items-center fixed w-full z-[200] shadow-sm border-b border-gray-100">
          <div className="flex flex-row items-center justify-between w-full md:w-auto gap-3">
            <div className="flex items-center gap-2">
              {restImage ? (
                <Image
                  src={restImage}
                  alt="Restaurant Logo"
                  width={44}
                  height={44}
                  className="rounded-full border border-orange-100 object-cover"
                />
              ) : (
                <div className="size-11 rounded-full border border-orange-100 bg-gray-100 animate-pulse"></div>
              )}
              <div>
                <p className="font-semibold text-lg leading-4 text-orange-500">
                  {restName}
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-gray-500">
                  Kitchen Dashboard
                </p>
              </div>
            </div>
            <div className="hidden sm:flex gap-3 items-center">
              {changeOverview()}
            </div>
          </div>
          <div className="flex flex-row justify-between gap-4 items-center mt-3 md:mt-0 w-full md:w-auto">
            <div className="font-semibold flex gap-1 sm:gap-2 text-[14px] sm:text-lg border px-1.5 sm:px-2.5 rounded-full border-gray-200 py-1 flex-1 sm:flex-none justify-center">
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
              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`p-2 rounded-full border border-gray-200 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.85] cursor-pointer ${
                    isSettingsOpen
                      ? "bg-gray-100 text-gray-800 shadow-inner"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <GearIcon size={20} />
                </button>

                {isSettingsOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[90]"
                      onClick={() => setIsSettingsOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 w-44 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl shadow-black-200/40 p-1.5 z-[100] animate-in fade-in zoom-in-95 duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top-right">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                      >
                        <SignOut size={18} weight="bold" />
                        {isLoggingOut ? "Logging out..." : "Log out"}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <button className="p-2 bg-white rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 active:scale-[0.85] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer">
                <BellIcon size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="pt-5 md:pt-5 pb-10">
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
