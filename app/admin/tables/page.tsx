"use client";
import {
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import qrCode from "@/public/qr-code/qr-code.png";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import QRCode from "react-qr-code";

interface Table {
  table_name: string;
  id: string;
}
const Page = () => {
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState<Table[]>([]);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data } = await supabase.auth.getUser();

    const { data: restaurant, error: gettingRestErr } = await supabase
      .from("restaurants")
      .select("id")
      .eq("owner_id", data?.user?.id)
      .single();
    if (gettingRestErr) {
      console.error("Error getting restaurant", gettingRestErr);
      return;
    }

    const { error: tablesErr } = await supabase
      .from("tables")
      .insert({
        restaurant_id: restaurant?.id,
        table_name: tableName,
      })
      .select();

    if (tablesErr) {
      console.error("Error creating table", tablesErr);
      return;
    }
    setTableName("");
    setIsModalOpen(false);
    fetchTables();
  };

  const fetchTables = async () => {
    const { data: tables, error: tablesErr } = await supabase
      .from("tables")
      .select("*");
    if (tablesErr) {
      console.error("Error fetching tables", tablesErr);
      return;
    }
    setTables(tables);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <div className="p-4 py-6">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Create Qr-codes</h2>
        <p className="text-lg text-[#64748B]">
          create and manage qrcodes for your tables
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="bg-white flex items-center pl-4 pr-1 gap-3 w-fit rounded-full border border-[#E2E8F0] shadow-sm overflow-hidden h-11">
          <MagnifyingGlassIcon size={20} className="text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search table..."
            className="w-lg h-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] font-inter outline-0"
          />
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-3 h-fit bg-orange-400 hover:bg-orange-500 transition-colors font-medium text-white rounded-full flex items-center gap-2"
        >
          <PlusIcon size={18} weight="bold" color="#ffffff" /> Create qr-code
        </button>
      </div>

      <div className="p-2 mt-4 flex flex-wrap gap-5">
        {tables.map((table) => (
          <div className="bg-white w-fit rounded-xl p-1" key={table.id}>
            <div className="w-full object-cover">
              <QRCode
                value={`${baseUrl}/order?table_id=${table.id}`}
                size={128}
                bgColor="#FFFFFF"
                fgColor="#0F172A"
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <div className="mt-2 p-2 flex justify-between items-end">
              <div>
                <p className="text-lg font-medium text-gray-700">
                  {table.table_name}
                </p>
                <p className="text-sm text-gray-500 font-medium leading-3 truncate w-40 overflow-hidden">
                  #{table.id}
                </p>
              </div>
              <button className="border-2 border-orange-400 text-orange-400 hover:text-orange-300 hover:border-orange-300 transition-colors rounded-lg p-1 cursor-pointer">
                <DownloadSimpleIcon size={20} weight="bold" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div
          className="fixed w-screen h-screen bg-black/15 top-0 right-0 left-0 bottom-0 flex items-center justify-center"
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          {/* modal */}
          <div
            className="bg-white p-4 rounded-xl w-100 h-50 shadow-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-gray-700">
                Create Qr-code
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer p-2 rounded-full hover:shadow-xs hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
              >
                <XIcon size={18} weight="bold" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mt-6 gap-4">
              <input
                type="text"
                placeholder="e.g. Table 05 or Lounge Booth"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                required
                className="border-2 border-gray-200 rounded-xl p-2 focus:border-orange-400 outline-none transition-colors"
              />
              <button className="bg-orange-400 py-2 text-white font-medium rounded-full hover:bg-orange-500 transition-colors">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Page;
