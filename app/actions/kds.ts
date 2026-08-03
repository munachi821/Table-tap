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
  
  const generatedEmail = `kitchen@${slug}.tabletap.com`;

  const adminClient = createAdminClient();

  // 3. Create or update the Supabase Auth user for this KDS
  // We can search for the user by email, but admin API doesn't let us search easily by email directly without listUsers,
  // so we try to create it. If it fails with "User already exists", we update it.
  
  // Actually, we can just use admin.createUser. 
  // If it fails because of duplicate email, we can list users by email and update the password.
  // Alternatively, since we are generating unique credentials, we might just be updating the password of the existing user.
  let kdsUser;
  
  const { data: existingUsers } = await adminClient.auth.admin.listUsers();
  const existingUser = existingUsers?.users.find((u) => u.email === generatedEmail);

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
    const { data: createdUser, error: createError } = await adminClient.auth.admin.createUser({
      email: generatedEmail,
      password: newPass,
      email_confirm: true,
      app_metadata: { role: "kds", restaurant_id: restaurantId }
    });
    if (createError) return { error: createError.message };
    kdsUser = createdUser.user;
  }

  // 4. Update the restaurants table with the visible credentials
  const { error: dbError } = await supabase
    .from("restaurants")
    .update({ kds_password: newPass, kds_email: generatedEmail })
    .eq("owner_id", user.id);

  if (dbError) {
    return { error: "Failed to update restaurant record." };
  }

  return { email: generatedEmail, password: newPass };
}
