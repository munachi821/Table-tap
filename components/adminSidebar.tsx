"use client";

import {
  PicnicTableIcon,
  SquaresFourIcon,
  ForkKnifeIcon,
  ClockCounterClockwiseIcon,
  GearIcon,
  WalletIcon,
  SignOutIcon,
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

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setRestName(user?.user?.user_metadata.name);
    };
    fetchUser();
  });

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
    <div className="w-60 h-full shrink-0 bg-[#F8FAFC]">
      <div className="p-6">
        <h2 className="text-2xl w-25 whitespace-wrap text-[#0F172A] font-bold font-manrope leading-8">
          {restName}
        </h2>
        <p className="font-semibold text-[#94A3B8] text-sm">
          CEO&apos;S DASHBOARD
        </p>
      </div>

      <div className="px-4 pb-4 flex justify-between flex-col h-[calc(100vh-120px)]">
        <ul className="flex flex-col gap-2">
          {admintabs.map((tab) => {
            // This is the check that makes the "active" style work
            const isActive = pathname === tab.link;

            return (
              <li key={tab.name}>
                <Link
                  href={tab.link}
                  className={`flex items-center gap-2 text-lg ${
                    isActive
                      ? "text-[#7C2D12] bg-white"
                      : "text-[#475569]/80 hover:bg-gray-100/30"
                  } p-2 rounded-lg cursor-pointer font-medium transition-all`}
                >
                  <tab.Icon size={24} weight={isActive ? "fill" : "regular"} />
                  {tab.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <div
          className="flex items-center gap-2 text-lg text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer font-medium transition-all"
          onClick={logout}
        >
          <SignOutIcon size={24} />
          Logout
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
