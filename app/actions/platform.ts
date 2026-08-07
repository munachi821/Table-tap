"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getPlatformSettings() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
    .from("platform_settings")
    .select("*")
    .limit(1)
    .maybeSingle();
    
  // If table doesn't exist or is empty, return safe defaults
  if (error || !data) {
    return {
      paywall_enabled: false,
      subscription_price: 80000,
    };
  }
  
  return data;
}

export async function updatePlatformSettings(data: { paywall_enabled: boolean; subscription_price: number }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Use getUser() — verifies the JWT with the Supabase server (getSession is insecure)
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  const superAdminEmail = process.env.SUPERADMIN_EMAIL || "munachi@table-tap.com";
  
  if (authError || !user || (user.email !== superAdminEmail && user.email !== "admin@table-tap.com")) {
     return { success: false, error: "Unauthorized" };
  }

  // Attempt to update row with id 1
  const { error } = await supabase
    .from("platform_settings")
    .update({ 
      paywall_enabled: data.paywall_enabled, 
      subscription_price: data.subscription_price 
    })
    .eq("id", 1);

  if (error) {
    // If it fails, maybe the row doesn't exist yet, try to insert it
    const { error: insertError } = await supabase
      .from("platform_settings")
      .insert({ 
        id: 1,
        paywall_enabled: data.paywall_enabled, 
        subscription_price: data.subscription_price 
      });
      
    if (insertError) {
      return { success: false, error: "Failed to update. Make sure the platform_settings table exists in Supabase." };
    }
  }
  
  revalidatePath("/myadmin");
  return { success: true };
}
