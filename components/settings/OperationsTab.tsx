"use client";
import { FloppyDiskIcon, ListDashesIcon, WalletIcon, ClockIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRestaurant } from "@/context/RestaurantContext";

const OperationsTab = () => {
  const supabase = createClient();
  const { restaurantId, targetPrepTime } = useRestaurant();
  const [prepTime, setPrepTime] = useState<number>(15);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (targetPrepTime) {
      setPrepTime(targetPrepTime);
    }
  }, [targetPrepTime]);

  const handleCancel = () => {
    setPrepTime(targetPrepTime || 15);
  };

  const handleSave = async () => {
    if (!restaurantId) return;
    if (prepTime < 1 || prepTime > 120) {
      toast.error("Prep time must be between 1 and 120 minutes.");
      return;
    }
    setIsLoading(true);

    const { error } = await supabase
      .from("restaurants")
      .update({ target_prep_time: prepTime })
      .eq("id", restaurantId);

    if (error) {
      toast.error("Failed to save preferences.");
    } else {
      toast.success("Preferences saved successfully!");
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="border-b border-[#D6C9B9] p-5">
        <p className="text-[#1B1D1E] text-2xl font-bold">
          Operational Preferences
        </p>
        <p className="text-[#584237] text-base font-medium">
          Configure your financial rules and kitchen routing logic.
        </p>
      </div>

      <div className="p-8">
        {/* KITCHEN SLA */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <ClockIcon size={20} className="text-[#F97316]" weight="bold" />
            <p className="text-[#64748B] font-bold text-sm tracking-widest uppercase">
              Kitchen SLA Alerts
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[#1B1D1E] font-bold text-base mb-1">
                  Target Prep Time (Minutes)
                </p>
                <p className="text-[#64748B] text-sm">
                  If an order takes longer than this, it will turn red on the Kitchen Display and alert the admin dashboard.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={prepTime}
                  onChange={(e) => setPrepTime(Number(e.target.value))}
                  className="w-20 px-3 py-1.5 border border-gray-300 rounded-lg text-center font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <span className="text-gray-500 font-semibold text-sm">mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* FINANCIAL RULES */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <WalletIcon size={20} className="text-[#F97316]" weight="bold" />
            <p className="text-[#64748B] font-bold text-sm tracking-widest uppercase">
              Financial Rules
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-[#1B1D1E] font-bold text-base mb-1">
                  Apply Value Added Tax (VAT)
                </p>
                <p className="text-[#64748B] text-sm">
                  Automatically append a standard 7.5% tax to all customer checkouts.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-bold px-2 py-1 bg-gray-100 text-gray-500 rounded-md uppercase tracking-wider">Coming Soon</span>
                <button type="button" disabled className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-gray-200 shrink-0 cursor-not-allowed">
                  <div className="bg-white w-4 h-4 rounded-full shadow-sm"></div>
                </button>
              </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-end gap-6 rounded-b-3xl">
        <button 
          onClick={handleCancel}
          className="text-[#64748B] hover:text-[#0F172A] text-sm font-semibold transition-colors cursor-pointer"
        >
          Cancel Changes
        </button>
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
        >
          <FloppyDiskIcon size={18} weight="bold" /> 
          {isLoading ? "Saving..." : "Save Preferences"}
        </button>
      </div>
    </div>
  );
};
export default OperationsTab;
