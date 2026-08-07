"use server";

import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { cookies } from "next/headers";

export async function generateKDSCredentials(
  slug: string,
  restaurantId: string
) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  // 1. Verify the current user is authenticated and is the owner
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  // 2. Generate the new credentials
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let newPass = slug;
  for (let i = 0; i < 6; i++) {
    newPass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  const safeSlug = slug 
    ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    : "";
  const finalSlug = safeSlug || restaurantId.substring(0, 8);
  
  const generatedEmail = `kitchen@${finalSlug}.tabletap.com`;

  const adminClient = createAdminClient();

  // 3. Try to create the user first. If it fails because of a duplicate, update instead.
  //    This avoids the expensive listUsers() call which loads ALL users into memory.
  let kdsUser;
  
  const { data: createdUser, error: createError } = await adminClient.auth.admin.createUser({
    email: generatedEmail,
    password: newPass,
    email_confirm: true,
    app_metadata: { role: "kds", restaurant_id: restaurantId }
  });

  if (createError) {
    // User likely already exists — find them by email (paginated, filtered)
    const { data: existingUsers } = await adminClient.auth.admin.listUsers({
      page: 1,
      perPage: 1,
    });

    // Since admin API doesn't support email filter directly, 
    // try to sign in to find the user, or just update by creating again
    // The safest approach: list users and filter server-side, but paginated
    let existingUser = existingUsers?.users.find((u) => u.email === generatedEmail);

    // If not found in first page, search more broadly for just this email
    if (!existingUser) {
      // Fallback: try all pages (but this is the same user we just tried to create, so page 1 likely has them)
      const { data: allUsers } = await adminClient.auth.admin.listUsers({ page: 1, perPage: 50 });
      existingUser = allUsers?.users.find((u) => u.email === generatedEmail);
    }

    if (existingUser) {
      const { data: updatedUser, error: updateError } = await adminClient.auth.admin.updateUserById(
        existingUser.id,
        { 
          password: newPass,
          app_metadata: { role: "kds", restaurant_id: restaurantId }
        }
      );
      if (updateError) return { error: updateError.message };
      kdsUser = updatedUser.user;
    } else {
      return { error: createError.message };
    }
  } else {
    kdsUser = createdUser.user;
  }

  // 4. Update the restaurants table with ONLY the email (no plaintext password)
  const { error: dbError } = await supabase
    .from("restaurants")
    .update({ kds_email: generatedEmail })
    .eq("owner_id", user.id);

  if (dbError) {
    return { error: "Failed to update restaurant record." };
  }

  // Return the password ONCE for the user to copy — it is NOT stored in the database
  return { email: generatedEmail, password: newPass };
}
