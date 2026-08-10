"use server";

import { createAdminClient } from "@/utils/supabase/admin";

export async function verifySignupPayment(reference: string, userId: string) {
  try {
    if (reference.startsWith("trial-")) {
      // Allow trials/free plans if it's explicitly a trial reference
      const supabase = createAdminClient();
      const today = new Date();
      const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
      
      const { error } = await supabase.auth.admin.updateUserById(userId, {
        user_metadata: {
          has_active_subscription: true,
          paystack_reference: reference,
          subscription_expires_at: thirtyDaysFromNow.toISOString(),
        }
      });
      
      if (error) throw error;
      return { success: true };
    }

    // Verify actual payment with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    if (!data.status || data.data.status !== "success") {
      return { success: false, error: "Payment verification failed" };
    }

    const supabase = createAdminClient();
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
    
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: {
        has_active_subscription: true,
        paystack_reference: reference,
        subscription_expires_at: thirtyDaysFromNow.toISOString(),
      }
    });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return { success: false, error: error.message };
  }
}
