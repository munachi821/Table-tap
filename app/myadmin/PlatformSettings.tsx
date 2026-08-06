"use client";

import { useState } from "react";
import { updatePlatformSettings } from "@/app/actions/platform";
import { toast } from "sonner";
import { GearIcon, CurrencyNgn } from "@phosphor-icons/react";

interface PlatformSettingsProps {
  initialSettings: {
    paywall_enabled: boolean;
    subscription_price: number;
  };
}

export default function PlatformSettings({ initialSettings }: PlatformSettingsProps) {
  const [paywall, setPaywall] = useState(initialSettings.paywall_enabled);
  const [price, setPrice] = useState(initialSettings.subscription_price);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    const res = await updatePlatformSettings({ 
      paywall_enabled: paywall, 
      subscription_price: price 
    });
    
    if (res.success) {
      toast.success("Platform settings updated successfully");
    } else {
      toast.error(res.error || "Update failed");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white border border-black/[0.08] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-black/50 text-[11px] font-semibold tracking-widest uppercase">
        <GearIcon size={16} />
        <h2>Platform Settings</h2>
      </div>

      <div className="space-y-6 flex-1">
        {/* Paywall Toggle */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[14px] text-black/90">Global Paywall</h3>
            <p className="text-[12px] text-black/50 mt-0.5">Require subscription for tenant access</p>
          </div>
          <button
            onClick={() => setPaywall(!paywall)}
            className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center relative ${
              paywall ? "bg-[#10B981]" : "bg-black/10"
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-300 absolute ${
                paywall ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Pricing Input */}
        <div>
          <label className="font-semibold text-[14px] text-black/90 block mb-2">
            Subscription Price (Monthly)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 font-semibold">
              ₦
            </div>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              disabled={!paywall}
              className="w-full h-11 pl-8 pr-4 bg-[#FAFAFA] border border-black/[0.08] rounded-xl focus:outline-none focus:border-black/20 text-[14px] font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isLoading || (paywall === initialSettings.paywall_enabled && price === initialSettings.subscription_price)}
        className="w-full mt-6 bg-black text-white h-11 rounded-xl font-semibold text-[13px] transition-all hover:bg-black/90 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {isLoading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}
