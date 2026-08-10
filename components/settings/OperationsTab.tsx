"use client";
import { FloppyDiskIcon, ListDashesIcon, WalletIcon, ClockIcon } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";

const OperationsTab = () => {
  const supabase = createClient();
  const [prepTime, setPrepTime] = useState<number>(15);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData?.user) return;

      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id, target_prep_time")
        .eq("owner_id", userData.user.id)
        .maybeSingle();

      if (restaurant) {
        setRestaurantId(restaurant.id);
        if (restaurant.target_prep_time) {
          setPrepTime(restaurant.target_prep_time);
        }
      }
    };
    fetchSettings();
  }, [supabase]);

  const handleSave = async () => {
    if (!restaurantId) return;
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
              <button type="button" className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#10B981] shrink-0 cursor-pointer">
                <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-6"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-end gap-6 rounded-b-3xl">
        <button className="text-[#64748B] hover:text-[#0F172A] text-sm font-semibold transition-colors cursor-pointer">
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
