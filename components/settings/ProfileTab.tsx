"use client";
import { createClient } from "@/utils/supabase/client";
import { CameraIcon, ImageIcon } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileTab = () => {
  const supabase = createClient();
  const [originalData, setOriginalData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    taxNo: "",
  });
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    taxNo: "",
  });
  const [logoImage, setLogoImage] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data } = await supabase.auth.getUser();
      const { data: userData, error: userError } = await supabase
        .from("restaurants")
        .select("*")
        .eq("owner_id", data?.user?.id)
        .single();
      if (userError) {
        console.error("Error fetching user data", userError);
      }
      setUserData({
        name: userData?.name || "",
        phone: userData?.phone_number || "",
        email: userData?.support_email || "",
        address: userData?.address || "",
        taxNo: userData?.tax_no || "",
      });
      setOriginalData({
        name: userData?.name || "",
        phone: userData?.phone_number || "",
        email: userData?.support_email || "",
        address: userData?.address || "",
        taxNo: userData?.tax_no || "",
      });
      setLogoPreview(userData?.logo_url || "");
      setBannerPreview(userData?.banner_url || "");
    };
    fetchUserData();
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoImage(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const updateUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      JSON.stringify(userData) === JSON.stringify(originalData) &&
      !logoImage &&
      !bannerImage
    ) {
      alert("No changes made");
      return;
    }
    setIsSaving(true);
    const { data } = await supabase.auth.getUser();
    const generatedSlug = userData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    let finalLogoUrl = logoPreview;
    let finalBannerUrl = bannerPreview;

    if (logoImage) {
      const fileExt = logoImage.name.split(".").pop();
      const fileName = `${data.user?.id}-logo-${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("items")
        .upload(`restaurants/${fileName}`, logoImage);
      if (!error) {
        finalLogoUrl = supabase.storage
          .from("items")
          .getPublicUrl(`restaurants/${fileName}`).data.publicUrl;
      }
    }

    if (bannerImage) {
      const fileExt = bannerImage.name.split(".").pop();
      const fileName = `${data.user?.id}-banner-${Date.now()}.${fileExt}`;
      const { error } = await supabase.storage
        .from("items")
        .upload(`restaurants/${fileName}`, bannerImage);
      if (!error) {
        finalBannerUrl = supabase.storage
          .from("items")
          .getPublicUrl(`restaurants/${fileName}`).data.publicUrl;
      }
    }

    const { data: usrData, error: userError } = await supabase
      .from("restaurants")
      .update({
        name: userData?.name,
        slug: generatedSlug,
        phone_number: userData?.phone,
        support_email: userData?.email,
        address: userData?.address,
        tax_no: userData?.taxNo,
        logo_url: finalLogoUrl,
        banner_url: finalBannerUrl,
      })
      .eq("owner_id", data?.user?.id);
    setIsSaving(false);
    if (userError) {
      console.error("Error updating user data", userError);
      alert("Error updating profile");
    } else {
      alert("Profile updated successfully!");

      setOriginalData(userData);
      setLogoImage(null);
      setBannerImage(null);
    }
  };

  const hasChanges = JSON.stringify(userData) !== JSON.stringify(originalData);
  return (
    <div>
      <div className="border-b border-[#D6C9B9] p-5">
        <p className="text-[#1B1D1E] text-2xl font-bold">Restaurant Profile</p>
        <p className="text-[#584237] text-base font-medium">
          Update your restaurant information and preferences.
        </p>
      </div>

      <form className="p-5 space-y-6" onSubmit={(e) => updateUserData(e)}>
        <div>
          <label
            htmlFor="brand"
            className="mb-2 block font-inter font-semibold"
          >
            Brand Assets
          </label>
          <div className="flex items-center gap-6">
            <label
              htmlFor="logo-upload"
              className="w-76 h-50 border-2 border-dashed border-[#E0C0B1] transition-all hover:border-[#9D4300] rounded-2xl flex flex-col items-center justify-center font-inter space-y-1.5 cursor-pointer overflow-hidden relative"
            >
              <input
                type="file"
                id="logo-upload"
                className="sr-only"
                accept="image/*"
                onChange={handleLogoChange}
              />
              {logoPreview ? (
                <Image
                  src={logoPreview}
                  alt="Logo"
                  className="w-full h-full object-cover"
                  width={250}
                  height={250}
                  loading="eager"
                />
              ) : (
                <>
                  <div className="p-4 rounded-full bg-[#F8EEE9] text-[#584237]">
                    <CameraIcon size={25} weight="bold" />
                  </div>
                  <p className="font-semibold text-sm tracking-wide">
                    UPLOAD LOGO
                  </p>
                  <p className="text-xs">PNG, JPG (max 3MB)</p>
                </>
              )}
            </label>
            <label
              htmlFor="banner-upload"
              className="w-full h-50 border-2 border-dashed border-[#E0C0B1] transition-all hover:border-[#9D4300] rounded-2xl flex flex-col items-center justify-center font-inter space-y-1.5 cursor-pointer overflow-hidden relative"
            >
              <input
                type="file"
                id="banner-upload"
                className="sr-only"
                accept="image/*"
                onChange={handleBannerChange}
              />
              {bannerPreview ? (
                <Image
                  src={bannerPreview}
                  alt="Banner"
                  className="w-full h-full object-cover"
                  width={1200}
                  height={400}
                  loading="eager"
                />
              ) : (
                <>
                  <ImageIcon size={26} className="text-[#584237]" />
                  <p className="font-semibold text-sm tracking-wide">
                    MENU BANNER
                  </p>
                  <p className="text-xs tracking-wider">
                    Recommended 1200 x 400px
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        <div>
          <p className="border-l-4 border-[#9D4300] font-semibold pl-2.5 font-inter">
            Restaurant Details
          </p>

          <div className="grid grid-cols-2 gap-4 mt-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-[#584237] text-sm font-semibold mb-2 block"
              >
                RESTAURANT NAME
              </label>
              <input
                type="text"
                id="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                placeholder="e.g. The Italian Place"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="number"
                className="text-[#584237] text-sm font-semibold mb-2 block"
              >
                PHONE NUMBER
              </label>
              <input
                type="number"
                id="number"
                value={userData.phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                placeholder="08011223345"
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="support"
              className="text-[#584237] text-sm font-semibold mb-2 block"
            >
              SUPPORT EMAIL
            </label>
            <input
              type="text"
              id="support"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className="w-full h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
              placeholder="hello@restaurant.com"
            />
          </div>

          <div className="mt-5">
            <label
              htmlFor="address"
              className="text-[#584237] text-sm font-semibold mb-2 block"
            >
              PHYSICAL ADDRESS
            </label>
            <textarea
              id="address"
              className="w-full h-24 p-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
              rows={4}
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              placeholder="12 hero road, apapa lagos street, jigawa"
            />
          </div>
        </div>

        <p className="border-l-4 border-[#9D4300] font-semibold pl-2.5 font-inter mt-6">
          Legal Information
        </p>

        <div className="mt-5">
          <label
            htmlFor="tax-no"
            className="text-[#584237] text-sm font-semibold mb-2 block"
          >
            Tax Identification Number (TIN) / VAT
          </label>
          <input
            type="text"
            id="tax-no"
            className="w-1/2 h-12 px-4 rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
            value={userData.taxNo}
            onChange={(e) =>
              setUserData({ ...userData, taxNo: e.target.value })
            }
            placeholder="1122-3348221"
          />
        </div>

        <div className="mt-6 border-t border-[#F2F4F6] pt-5 flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-full text-[#9D4300] hover:text-gray-700 hover:bg-[#C6C9CF] text-[14px] font-semibold cursor-pointer transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={!hasChanges || isSaving}
            className="bg-[#9D4300] hover:bg-[#833800] disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-full text-white text-[14px] font-semibold cursor-pointer transition-colors"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default ProfileTab;
