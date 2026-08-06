import { InfoIcon } from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import TenantActions from "./TenantActions";
import PlatformSettings from "./PlatformSettings";
import { getPlatformSettings } from "@/app/actions/platform";
import { Toaster } from "sonner";

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Settings
  const platformSettings = await getPlatformSettings();

  const superAdminEmail =
    process.env.NEXT_PUBLIC_SUPERADMIN_EMAIL || "munachi@table-tap.com";

  // God Mode Auth Check
  if (
    !session ||
    (session.user.email !== superAdminEmail &&
      session.user.email !== "admin@table-tap.com")
  ) {
    redirect("/myadmin/login");
  }

  // Fetch real data
  const { data: restaurants } = await supabase
    .from("restaurants")
    .select("*")
    .order("created_at", { ascending: false });
  const totalRestaurants = restaurants?.length || 0;

  const activeRestaurants =
    restaurants?.filter((r) => r.status === "ACTIVE") || [];
  const mrr = activeRestaurants.length * 80000;

  // Calculate today's signups
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const signupsToday =
    restaurants?.filter((r) => new Date(r.created_at) >= today).length || 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-inter selection:bg-black/10">
      <Toaster position="top-center" richColors theme="light" />
      {/* Header */}
      <header className="px-8 h-20 flex items-center justify-between border-b border-black/[0.08] bg-white/50 backdrop-blur-xl sticky top-0 z-50">
        <h1 className="text-xl font-semibold tracking-tight">God Mode</h1>
        <div className="flex items-center gap-6">
          <form
            action={async () => {
              "use server";
              const cookieStore = await cookies();
              const supabase = createClient(cookieStore);
              await supabase.auth.signOut();
              redirect("/myadmin/login");
            }}
          >
            <button
              type="submit"
              className="text-[13px] font-medium text-black/50 hover:text-black transition-colors cursor-pointer"
            >
              Log out
            </button>
          </form>
          <Link
            href="/"
            className="bg-black hover:bg-black/90 text-white px-5 py-2.5 rounded-full text-[13px] font-medium transition-all cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.16)] active:scale-95"
          >
            + Add Tenant
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 px-8">
          {/* Revenue Card */}
          <div className="bg-white border border-black/[0.08] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <h2 className="text-black/50 text-[11px] font-semibold tracking-widest uppercase mb-4">
              Revenue Overview
            </h2>
            <p className="text-[48px] leading-none font-semibold tracking-[-0.04em] mb-4">
              ₦{mrr.toLocaleString()}
            </p>
            <div className="flex items-center gap-2 text-black/50 text-[13px] font-medium">
              <p>Total MRR</p>
              <div className="w-1 h-1 rounded-full bg-black/20"></div>
              <p>{activeRestaurants.length} Active Licenses at ₦80k/mo</p>
            </div>
          </div>

          {/* Users Card */}
          <div className="bg-white border border-black/[0.08] rounded-2xl p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-hidden">
            {/* Subtle decorative background for the growth card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/5 rounded-bl-full pointer-events-none"></div>

            <h2 className="text-black/50 text-[11px] font-semibold tracking-widest uppercase mb-4 relative z-10">
              Platform Growth
            </h2>
            <p className="text-[48px] leading-none font-semibold tracking-[-0.04em] mb-4 relative z-10">
              {totalRestaurants}
            </p>
            <div className="flex items-center gap-2 text-black/50 text-[13px] font-medium relative z-10">
              <p>Total Restaurants</p>
              <div className="w-1 h-1 rounded-full bg-black/20"></div>
              <p className="text-[#10B981] font-semibold">
                {signupsToday} signed up today
              </p>
            </div>
          </div>
        </div>

        {/* Restaurant Management */}
        <div className="p-8 pt-4 flex flex-col gap-6">
          <div className="">
            <div className="bg-white border border-[#F1F5F9] rounded-2xl overflow-x-auto shadow-sm">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead className="bg-[#F8FAFC]">
                  <tr className="border-b border-[#F1F5F9] text-[11px] font-bold font-inter text-[#64748B] uppercase tracking-[0.08em]">
                    <th className="py-4 px-6">Tenant Name</th>
                    <th className="py-4 px-6">Owner Email</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6">Joined Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {restaurants?.map((restaurant) => (
                    <tr
                      key={restaurant.id}
                      className="hover:bg-[#FAFAFA] transition-colors group"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-black/40 font-bold text-xs shrink-0">
                            {restaurant.name.charAt(0)}
                          </div>
                          <span className="font-semibold text-[14px] text-black/90">
                            {restaurant.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#64748B] font-medium text-[13px]">
                        {restaurant.owner_email || "N/A"}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                            restaurant.status === "ACTIVE"
                              ? "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]"
                              : "bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]"
                          }`}
                        >
                          {restaurant.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-black/50 font-medium text-[13px]">
                        {new Date(restaurant.created_at).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )}
                      </td>
                      <td className="py-4 px-6 text-right space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <TenantActions
                          id={restaurant.id}
                          currentStatus={restaurant.status}
                        />
                      </td>
                    </tr>
                  ))}
                  {restaurants?.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-12 text-center text-[#64748B] font-medium text-[14px]"
                      >
                        No tenants found. Start onboarding!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <PlatformSettings initialSettings={platformSettings} />

            {/* System Integrity Alert */}
            <div className="bg-[#FFF4F4] border border-[#FFE4E6] rounded-2xl p-5 flex gap-4 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <div className="text-[#E11D48] shrink-0 mt-0.5">
                <InfoIcon size={20} weight="fill" />
              </div>
              <div>
                <h3 className="text-[#BE123C] text-[13px] font-bold tracking-tight mb-1">
                  Production Database Alert
                </h3>
                <p className="text-[#9F1239] text-[13px] leading-relaxed font-medium">
                  You are operating in God Mode. Actions taken here immediately
                  alter live tenant data. Suspending a tenant will revoke their
                  API and dashboard access instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
