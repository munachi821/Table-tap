"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getPlatformSettings } from "@/app/actions/platform";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuthAndSubscription = async () => {
      // 1. Get the current user session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        // If not logged in at all, kick them to login page
        router.push("/login");
        return;
      }

      // 2. Fetch platform settings
      const settings = await getPlatformSettings();

      // 3. Check if the user has an active subscription in their metadata (IF paywall is enabled)
      if (settings.paywall_enabled) {
        const hasPaid = session.user.user_metadata?.has_active_subscription;

        if (!hasPaid) {
          // If they logged in but haven't paid, kick them to login page
          router.push("/login");
          return;
        }

        const metadata = session.user.user_metadata;
        const hasFlag = metadata?.has_active_subscription;
        const expiresAt = metadata?.subscription_expires_at;

        const expiryDate = expiresAt ? new Date(expiresAt) : null;
        const today = new Date();

        if (hasFlag && expiryDate && today < expiryDate) {
          // Subscription is valid, do nothing
        } else {
          alert(
            "Your subscription has expired. Please renew your subscription to continue using our services.",
          );
          await supabase.auth.updateUser({
            data: {
              has_active_subscription: false,
            },
          });
          await supabase.auth.signOut();
          router.push("/login");
          return;
        }
      }

      // 4. Verify that the restaurant is not suspended
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("status")
        .eq("owner_id", session.user.id)
        .maybeSingle();

      if (restaurant?.status === "SUSPENDED") {
        router.push("/suspended");
        return;
      }

      // 4. User is logged in (payment check bypassed), let them through!
      setIsLoading(false);
    };

    checkAuthAndSubscription();
  }, [router, supabase]);

  if (isLoading) {
    // Show a loading spinner or empty page while we verify their payment
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EA580C]"></div>
      </div>
    );
  }

  // If isLoading is false, they passed the check! Render the actual dashboard.
  return <>{children}</>;
}
