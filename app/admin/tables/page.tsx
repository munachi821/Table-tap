"use client";
import {
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XIcon,
  QrCode,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { useRestaurant } from "@/context/RestaurantContext";
import { toast, Toaster } from "sonner";

interface Table {
  table_name: string;
  id: string;
}

const Page = () => {
  const supabase = createClient();
  const { restaurantId } = useRestaurant();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!restaurantId || !tableName.trim()) return;

    setIsSubmitting(true);
    const { error: tablesErr } = await supabase
      .from("tables")
      .insert({
        restaurant_id: restaurantId,
        table_name: tableName.trim(),
      })
      .select();

    setIsSubmitting(false);

    if (tablesErr) {
      console.error("Error creating table", tablesErr);
      toast.error("Failed to create table");
      return;
    }

    toast.success(`Created ${tableName}!`);
    setTableName("");
    setIsModalOpen(false);
    fetchTables();
  };

  const fetchTables = async () => {
    if (!restaurantId) {
      setTables([]);
      setIsLoading(false);
      return;
    }

    const { data: tables, error: tablesErr } = await supabase
      .from("tables")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });

    if (tablesErr) {
      console.error("Error fetching tables", tablesErr);
      setIsLoading(false);
      return;
    }
    setTables(tables || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchTables();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantId]);

  const downloadQRCode = async (tableId: string, tableName: string) => {
    const element = document.getElementById(`qr-${tableId}`);
    if (!element) return;
    try {
      toast.loading("Downloading QR Code...", { id: "qr-download" });
      const dataUrl = await toPng(element, {
        pixelRatio: 3,
        backgroundColor: "#ffffff",
        cacheBust: true,
      });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${tableName.replace(/\s+/g, "_")}_QR.png`;
      link.click();
      toast.success("QR Code downloaded!", { id: "qr-download" });
    } catch (err) {
      console.error("Failed to download QR code", err);
      toast.error("Failed to download QR code", { id: "qr-download" });
    }
  };

  const filteredTables = tables.filter((table) =>
    table.table_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    table.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
      <Toaster position="top-center" richColors />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-[#0F172A] text-2xl sm:text-3xl font-manrope">
            Table QR Codes
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] mt-1 font-inter">
            Create, manage, and download QR codes for every physical dining table.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto shrink-0 py-2.5 px-4 bg-orange-500 hover:bg-orange-600 transition-all font-semibold text-white text-sm rounded-full flex items-center justify-center gap-2 shadow-xs active:scale-95 cursor-pointer"
        >
          <PlusIcon size={18} weight="bold" />
          <span>New Table QR</span>
        </button>
      </div>

      {/* Search Bar & Controls */}
      <div className="mt-6 flex items-center justify-between">
        <div className="bg-white flex items-center px-4 gap-3 w-full sm:w-80 md:w-96 rounded-full border border-[#E2E8F0] shadow-2xs h-11 transition-focus focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100">
          <MagnifyingGlassIcon size={18} className="text-[#94A3B8] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by table name or ID..."
            className="w-full h-full text-sm text-[#0F172A] placeholder:text-[#94A3B8] font-inter outline-none bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-gray-400 hover:text-gray-600 p-1"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Tables Grid */}
      <div className="mt-6">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-4 shadow-2xs border border-gray-100 animate-pulse"
              >
                <div className="w-full aspect-square bg-gray-100 mb-3 rounded-xl" />
                <div className="flex justify-between items-end gap-2">
                  <div className="flex-1 space-y-1.5">
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded" />
                  </div>
                  <div className="size-8 bg-gray-100 rounded-lg shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTables.length === 0 ? (
          <div className="w-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 flex flex-col items-center justify-center text-center my-4">
            <div className="size-20 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-4">
              <QrCode size={40} weight="duotone" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 font-manrope">
              {searchQuery ? "No matching tables found" : "No QR Codes created yet"}
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mb-6">
              {searchQuery
                ? `No tables match "${searchQuery}". Try a different search.`
                : "Add your first table to generate a unique QR code guests can scan to order & pay instantly."}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="py-2.5 px-5 bg-orange-500 hover:bg-orange-600 font-semibold text-white text-sm rounded-full flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <PlusIcon size={16} weight="bold" />
                <span>Create First Table</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
            {filteredTables.map((table) => (
              <div
                className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xs border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between group"
                key={table.id}
              >
                {/* QR Display Container */}
                <div
                  className="w-full aspect-square p-3 bg-[#F8FAFC] rounded-xl flex items-center justify-center border border-gray-100/80 mb-3"
                  id={`qr-${table.id}`}
                >
                  <QRCode
                    value={`${baseUrl}/order?table_id=${table.id}`}
                    size={180}
                    bgColor="#F8FAFC"
                    fgColor="#0F172A"
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  />
                </div>

                {/* Table Info & Action */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-bold text-gray-900 truncate font-manrope">
                      {table.table_name}
                    </p>
                    <p className="text-[11px] text-gray-400 font-mono truncate">
                      #{table.id.split("-")[0]}
                    </p>
                  </div>
                  <button
                    onClick={() => downloadQRCode(table.id, table.table_name)}
                    title="Download QR code image"
                    className="p-2 text-orange-600 bg-orange-50 hover:bg-orange-100 active:scale-90 transition-all rounded-xl cursor-pointer shrink-0"
                  >
                    <DownloadSimpleIcon size={18} weight="bold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Responsive Create Table Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl border border-gray-100 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A] font-manrope">
                  Create Table QR Code
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Generate a new scannable order link
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <XIcon size={20} weight="bold" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col mt-5 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Table / Spot Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Table 04, VIP Booth, Bar Stool 1"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                  autoFocus
                  required
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !tableName.trim()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 py-2.5 text-white font-semibold text-sm rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  {isSubmitting ? "Creating..." : "Create Table"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

