"use client";
import {
  CopyIcon,
  EyeIcon,
  EyeSlashIcon,
  ShieldCheckIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { generateKDSCredentials } from "@/app/actions/kds";
const TerminalTab = () => {
  const supabase = createClient();
  const [restaurantId, setRestaurantId] = useState("");
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("••••••••");
  const [email, setEmail] = useState("Loading...");
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchTerminalData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from("restaurants")
        .select("id, slug, name, kds_password, kds_email")
        .eq("owner_id", user?.id)
        .maybeSingle();

      if (!error && data) {
        const fallbackSlug =
          data.slug ||
          (data.name
            ? data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)+/g, "")
            : "");
        setSlug(fallbackSlug);
        setRestaurantId(data.id);

        if (data.kds_password) {
          setPassword(data.kds_password);
        }
        if (data.kds_email) {
          setEmail(data.kds_email);
        } else if (fallbackSlug) {
          setEmail(`kitchen@${fallbackSlug}.tabletap.com`);
        } else {
          setEmail("kitchen@tabletap.com");
        }
      }
    };
    fetchTerminalData();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);

    const result = await generateKDSCredentials(slug, restaurantId);

    setIsGenerating(false);
    if (result.error) {
      alert("Error generating KDS password: " + result.error);
      console.error(result.error);
    } else if (result.email && result.password) {
      setPassword(result.password);
      setEmail(result.email);
      alert("New KDS password generated successfully!");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div>
      <div className="border-b border-[#D6C9B9] p-5">
        <p className="text-[#1B1D1E] text-xl font-bold">
          Kitchen Display System (KDS) Access
        </p>
        <p className="text-[#584237] text-base font-medium mt-1">
          Use these credentials to log into your kitchen&apos;s iPad or tablet.
          Keep these details secure for back-of-house operations.
        </p>
      </div>

      <div className="p-8">
        <div className="bg-[#F2F4F6] rounded-2xl p-6">
          <div className="space-y-6">
            <div>
              <label className="text-[#64748B] text-xs font-bold tracking-widest uppercase mb-2 block">
                Login Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  readOnly
                  className="w-full h-12 px-4 pr-12 rounded-xl bg-white text-[#1B1D1E] font-medium text-base focus:outline-none"
                />
                <button
                  onClick={() => copyToClipboard(email)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9D4300] hover:text-[#724237] transition-colors cursor-pointer"
                >
                  <CopyIcon size={20} weight="bold" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-[#64748B] text-xs font-bold tracking-widest uppercase mb-2 block">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  readOnly
                  className="w-full h-12 px-4 pr-24 rounded-xl bg-white text-[#1B1D1E] font-medium text-xl tracking-widest focus:outline-none"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#64748B] hover:text-[#1B1D1E] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeIcon size={20} weight={"bold"} />
                    ) : (
                      <EyeSlashIcon size={20} weight={"bold"} />
                    )}
                  </button>
                  <div className="w-px h-5 bg-[#E6E8EA]"></div>
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="text-[#9D4300] hover:text-[#724237] transition-colors cursor-pointer"
                  >
                    <CopyIcon size={20} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="border-2 border-[#1B1D1E] hover:bg-[#F2F4F6] text-[#1B1D1E] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer"
          >
            {isGenerating ? "Generating..." : "Generate Password"}
          </button>
        </div>
      </div>

      <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 rounded-b-3xl">
        <div className="flex items-center gap-2 text-[#475569] text-sm font-medium">
          <ShieldCheckIcon size={20} />
          <p>End-to-end encrypted management for secure kitchen operations.</p>
        </div>
      </div>
    </div>
  );
};
export default TerminalTab;
