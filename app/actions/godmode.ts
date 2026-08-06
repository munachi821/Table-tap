"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleTenantStatus(id: string, newStatus: "ACTIVE" | "SUSPENDED") {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Authenticate the super admin
  const { data: { session } } = await supabase.auth.getSession();
  const superAdminEmail = process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL || "munachi@table-tap.com";
  
  if (!session || (session.user.email !== superAdminEmail && session.user.email !== "admin@table-tap.com")) {
     return { success: false, error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("restaurants")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/myadmin");
  return { success: true };
}
