"use client";

import { useState } from "react";
import { toggleTenantStatus } from "@/app/actions/godmode";
import { toast } from "sonner";

export default function TenantActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (newStatus: "ACTIVE" | "SUSPENDED") => {
    setIsLoading(true);
    const result = await toggleTenantStatus(id, newStatus);
    
    if (result.success) {
      toast.success(`Tenant ${newStatus.toLowerCase()} successfully!`);
    } else {
      toast.error(`Failed to update: ${result.error}`);
    }
    setIsLoading(false);
  };

  if (currentStatus === "ACTIVE") {
    return (
      <button 
        disabled={isLoading}
        onClick={() => handleToggle("SUSPENDED")}
        className="text-[#EF4444] hover:bg-[#EF4444]/10 px-3 py-1.5 rounded-md font-semibold text-[13px] transition-colors cursor-pointer disabled:opacity-50"
      >
        {isLoading ? "Working..." : "Suspend"}
      </button>
    );
  }

  return (
    <button 
      disabled={isLoading}
      onClick={() => handleToggle("ACTIVE")}
      className="text-[#10B981] hover:bg-[#10B981]/10 px-3 py-1.5 rounded-md font-semibold text-[13px] transition-colors cursor-pointer disabled:opacity-50"
    >
      {isLoading ? "Working..." : "Reactivate"}
    </button>
  );
}
