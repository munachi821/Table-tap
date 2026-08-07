"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function toggleTenantStatus(id: string, newStatus: "ACTIVE" | "SUSPENDED") {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Use getUser() — verifies the JWT with the Supabase server (getSession is insecure)
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  const superAdminEmail = process.env.SUPERADMIN_EMAIL || "munachi@table-tap.com";
  
  if (authError || !user || (user.email !== superAdminEmail && user.email !== "admin@table-tap.com")) {
     return { success: false, error: "Unauthorized" };
  }

  // Create admin client to bypass RLS
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabaseAdmin
    .from("restaurants")
    .update({ status: newStatus })
    .eq("id", id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/myadmin");
  return { success: true };
}
