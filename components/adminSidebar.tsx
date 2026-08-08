"use client";

import {
  PicnicTableIcon,
  SquaresFourIcon,
  ForkKnifeIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  WalletIcon,
  SignOutIcon,
  List,
  X,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [restName, setRestName] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data: userData, error } = await supabase
        .from("restaurants")
        .select("name")
        .eq("owner_id", user?.user?.id)
        .maybeSingle();
      if (error) {
        console.error("Error fetching user data", error);
      }
      setRestName(userData?.name || "Admin Dashboard");
    };
    fetchUser();
  }, []);

  const admintabs = [
    { name: "Overview", Icon: SquaresFourIcon, link: "/admin/overview" },
    { name: "Menu", Icon: ForkKnifeIcon, link: "/admin/menu" },
    { name: "Tables", Icon: PicnicTableIcon, link: "/admin/tables" },
    {
      name: "History",
      Icon: ClockCounterClockwiseIcon,
      link: "/admin/history",
    },
    { name: "Finance", Icon: WalletIcon, link: "/admin/finance" },
    { name: "Settings", Icon: GearIcon, link: "/admin/settings" },
  ];

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center justify-between px-4">
        <h2 className="text-lg text-[#0F172A] font-bold font-manrope truncate pr-4">
          {restName}
        </h2>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="p-2 -mr-2 text-[#475569] hover:bg-gray-100 rounded-lg"
        >
          <List size={28} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative flex w-64 max-w-xs flex-col bg-[#F8FAFC] h-full shadow-xl">
            <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-100">
              <div>
                <h2 className="text-xl text-[#0F172A] font-bold font-manrope leading-6 truncate w-40">
                  {restName}
                </h2>
                <p className="font-semibold text-[#94A3B8] text-[11px] mt-1">
                  CEO&apos;S DASHBOARD
                </p>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 -mr-2 text-[#475569] hover:bg-gray-200 rounded-lg"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <div className="px-4 py-4 flex flex-col justify-between flex-1 overflow-y-auto">
              <ul className="flex flex-col gap-2">
                {admintabs.map((tab) => {
                  const isActive = pathname === tab.link;
                  const Icon = tab.Icon;
                  return (
                    <li key={tab.name}>
                      <Link
                        href={tab.link}
                        onClick={() => setIsMobileOpen(false)}
                        className={`flex items-center gap-3 text-[15px] ${
                          isActive
                            ? "text-[#7C2D12] bg-white shadow-sm"
                            : "text-[#475569] hover:bg-gray-100/50"
                        } p-3 rounded-xl font-semibold transition-all`}
                      >
                        <Icon
                          size={22}
                          weight={isActive ? "fill" : "regular"}
                        />
                        {tab.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div
                className="flex items-center gap-3 text-[15px] text-red-500 hover:bg-red-50 p-3 rounded-xl cursor-pointer font-semibold transition-all mt-4"
                onClick={logout}
              >
                <SignOutIcon size={22} />
                Logout
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-60 h-full shrink-0 flex-col border-r border-gray-100 z-10 mr-5">
        <div className="p-6">
          <h2 className="text-2xl w-25 whitespace-wrap text-[#0F172A] font-bold font-manrope leading-8">
            {restName}
          </h2>
          <p className="font-semibold text-[#94A3B8] text-sm">
            CEO&apos;S DASHBOARD
          </p>
        </div>

        <div className="px-4 pb-4 flex justify-between flex-col h-[calc(100vh-120px)] overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {admintabs.map((tab) => {
              const isActive = pathname === tab.link;
              const Icon = tab.Icon;

              return (
                <li key={tab.name}>
                  <Link
                    href={tab.link}
                    className={`flex items-center gap-2 text-lg ${
                      isActive
                        ? "text-[#7C2D12] bg-white shadow-sm"
                        : "text-[#475569]/80 hover:bg-gray-100/30"
                    } p-2 rounded-lg cursor-pointer font-medium transition-all`}
                  >
                    <Icon size={24} weight={isActive ? "fill" : "regular"} />
                    {tab.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="flex items-center gap-2 text-lg text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer font-medium transition-all mt-4"
            onClick={logout}
          >
            <SignOutIcon size={24} />
            Logout
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
