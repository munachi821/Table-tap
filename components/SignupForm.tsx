"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CloudArrowUpIcon, EyeIcon, LockKeyIcon } from "@phosphor-icons/react";
import { usePaystackPayment } from "react-paystack";

export default function SignupForm() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resLogo, setResLogo] = useState<File | null>(null);
  const [resLogoPrev, setResLogoPrev] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logoUrl, setLogoUrl] = useState<string>("");

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: 80000 * 100, // Amount is in kobo (80k Naira)
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setResLogo(file);
      const prevUrl = URL.createObjectURL(file);
      setResLogoPrev(prevUrl);
    } else {
      alert("File size must be less than 2MB");
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    let finalLogoUrl = "";

    // 1. Sign up the user first
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        options: {
          data: { name: name },
        },
        email: email,
        password: password,
      },
    );

    if (signUpError) {
      setIsLoading(false);
      return alert("Error signing up: " + signUpError.message);
    }

    // 2. Upload logo if it exists
    if (resLogo && signUpData.user) {
      const fileExt = resLogo.name.split(".").pop();
      const fileName = `${signUpData.user.id}-${Date.now()}.${fileExt}`;
      const filePath = `restaurants/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("logos")
        .upload(filePath, resLogo);

      if (uploadError) {
        setIsLoading(false);
        return alert(
          "Account created, but error uploading logo: " + uploadError.message,
        );
      }

      // 3. Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("logos")
        .getPublicUrl(filePath);

      finalLogoUrl = publicUrlData.publicUrl;
      setLogoUrl(finalLogoUrl);
      // 4. Update the user metadata with the logo URL
      await supabase.auth.updateUser({
        data: { logo_url: finalLogoUrl },
      });
    }

    setIsLoading(false);
    alert("Account created successfully! Proceeding to payment...");

    const onSuccess = async (response: any) => {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today.setDate(today.getDate() + 30));
      // Payment was successful! Update user metadata
      await supabase.auth.updateUser({
        data: {
          has_active_subscription: true,
          paystack_reference: response.reference,
          subscription_expires_at: thirtyDaysFromNow.toISOString(),
        },
      });
      alert("Payment successful! Welcome to your dashboard.");

      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Replaces spaces and special chars with hyphens
        .replace(/(^-|-$)+/g, ""); // Removes trailing hyphens

      const { error: dbError } = await supabase
        .from("restaurants")
        .insert([
          {
            owner_id: signUpData?.user?.id,
            name: name,
            status: "ACTIVE",
            slug: generatedSlug,
            logo_url: finalLogoUrl,
          },
        ])
        .select();

      if (dbError) {
        return alert("Error creating restaurant: " + dbError.message);
      }

      router.push("/admin/overview");
    };

    const onClose = () => {
      alert(
        "Payment cancelled. You must complete payment to access the dashboard.",
      );
    };

    // Trigger the Paystack popup
    initializePayment({ onSuccess, onClose });

    setName("");
    setEmail("");
    setPassword("");
    setResLogo(null);
    setResLogoPrev("");
  };

  return (
    <div className="w-full max-w-md mx-auto my-auto pt-8">
      <div className="mb-10">
        <h2 className="text-[#1B1D1E] text-2xl font-serif mb-2">
          Create your workspace
        </h2>
        <p className="text-[#64748B] text-[15px]">
          Start automating your Restaurant today.
        </p>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSignup();
        }}
      >
        <div>
          <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
            Restaurant Logo
          </label>
          <label htmlFor="resLogo">
            <input
              type="file"
              id="resLogo"
              className="sr-only"
              accept="image/png, image/jpeg, image/svg+xml"
              onChange={handleFileChange}
            />
            <div className="border-[1.5px] h-37.25 border-dashed border-[#E2E8F0] bg-white rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors">
              {resLogoPrev ? (
                <Image
                  src={resLogoPrev}
                  alt="restaurant logo"
                  className="max-w-80 object-cover"
                  width={100}
                  height={100}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <CloudArrowUpIcon size={32} className="text-[#64748B] mb-3" />
                  <p className="text-[#64748B] font-medium text-[13px]">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-[#94A3B8] text-xs mt-1">
                    (SVG, PNG, JPG up to 2MB)
                  </p>
                </div>
              )}
            </div>
          </label>
        </div>

        <div>
          <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
            Restaurant Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Nana's Kitchen"
            className="w-full h-11 px-4 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium placeholder:font-normal placeholder:text-[#94A3B8]"
          />
        </div>

        <div>
          <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
            Owner Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@restaurant.com"
            className="w-full h-11 px-4 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium placeholder:font-normal placeholder:text-[#94A3B8]"
          />
        </div>

        <div>
          <label className="text-[#64748B] text-[11px] font-semibold tracking-widest uppercase block mb-3">
            Secure Password
          </label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full h-11 px-4 pr-12 border border-[#E2E8F0] rounded-md focus:outline-none focus:border-[#CBD5E1] text-[#1B1D1E] text-sm font-medium tracking-widest placeholder:font-normal placeholder:tracking-normal placeholder:text-[#94A3B8]"
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
            >
              <EyeIcon size={18} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#EA580C] hover:bg-[#D97706] text-white h-12 rounded-md font-medium text-[15px] transition-colors mt-2"
        >
          {isLoading ? "Signing up..." : "Continue to Payment (₦80,000/mo)"}
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center gap-2 bg-[#F8FAFC] py-3.5 rounded-md border border-[#E2E8F0] text-[#64748B] text-[11px] font-semibold">
        <LockKeyIcon size={14} weight="fill" />
        <p>Secure checkout via Paystack</p>
      </div>

      <div className="mt-8 text-center text-[#64748B] text-[13px]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#EA580C] font-bold hover:underline"
        >
          Log in.
        </Link>
      </div>
    </div>
  );
}
