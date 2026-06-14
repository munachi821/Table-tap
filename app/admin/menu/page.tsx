"use client";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSimpleIcon,
  TrashIcon,
  CaretRightIcon,
  CaretLeftIcon,
  XIcon,
  UploadIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

interface MenuItems {
  id: string;
  name: string;
  description: string;
  price: string;
  is_available: boolean;
  menu_categories: {
    name: string;
  };
  image_url: string;
  restaurant_id: string;
}

const Page = () => {
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [foodDescription, setFoodDescription] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [foodImagePrev, setFoodImagePrev] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 1024 * 1024) {
      setFoodImage(file);
      const prevUrl = URL.createObjectURL(file);
      setFoodImagePrev(prevUrl);
    } else if (file) {
      alert("File size must be less than 1MB");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("id")
      .eq("owner_id", user?.id)
      .single();

    let finalImagePath = "";

    if (foodImage) {
      const fileExt = foodImage?.name.split(".").pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `menu-items/${fileName}`;

      const { data: image, error } = await supabase.storage
        .from("items")
        .upload(filePath, foodImage);

      if (error) {
        console.error("error uploading image", error);
        alert("Error uploading image");
        setIsLoading(false);
        return;
      }

      const { data: url } = supabase.storage
        .from("items")
        .getPublicUrl(filePath);
      finalImagePath = url.publicUrl;
    }

    let { data: category } = await supabase
      .from("menu_categories")
      .select("id")
      .eq("restaurant_id", restaurant?.id)
      .ilike("name", foodCategory)
      .maybeSingle();

    if (!category) {
      const { data: newCategory } = await supabase
        .from("menu_categories")
        .insert({
          name: foodCategory,
          restaurant_id: restaurant?.id,
        })
        .select("id")
        .single();

      category = newCategory;
    }

    if (editMode) {
      const originalItem = menuItems.find((item) => item.id === editMode);
      const hasChanges =
        foodName !== originalItem?.name ||
        foodDescription !== originalItem?.description ||
        foodPrice !== originalItem?.price ||
        foodCategory !== originalItem?.menu_categories?.name ||
        foodImage !== null;

      if (!hasChanges) {
        setIsLoading(false);
        handleCancel();
        return;
      }
      const { error } = await supabase
        .from("menu_items")
        .update({
          name: foodName,
          description: foodDescription,
          price: foodPrice,
          category_id: category?.id,
          image_url: finalImagePath ? finalImagePath : foodImagePrev,
        })
        .eq("id", editMode);

      if (error) {
        console.error("Error updating menu item", error);
        alert("Error updating menu item");
        setIsLoading(false);
        return;
      }
    } else {
      const { error } = await supabase
        .from("menu_items")
        .insert({
          name: foodName,
          description: foodDescription,
          price: foodPrice,
          category_id: category?.id,
          image_url: finalImagePath,
          restaurant_id: restaurant?.id,
        })
        .select();

      if (error) {
        console.error("Error creating menu item", error);
        alert("Error creating menu item");
        setIsLoading(false);
        return;
      }
    }

    setIsLoading(false);
    setIsModalOpen(false);
    setFoodName("");
    setFoodDescription("");
    setFoodPrice("");
    setFoodCategory("");
    setFoodImage(null);
    setFoodImagePrev("");
    setEditMode(null);
    fetchMenuItems();
  };

  const fetchMenuItems = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: restaurant } = await supabase
      .from("restaurants")
      .select("id")
      .eq("owner_id", user?.id)
      .single();

    const { data: items, error } = await supabase
      .from("menu_items")
      .select("*, menu_categories(name)")
      .eq("restaurant_id", restaurant?.id);

    if (error) {
      console.error("Error fetching menu items", error);
      alert("Error fetching menu items");
      setIsFetching(false);
      return;
    }

    setMenuItems(items);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleItemAvailability = async (id: string, is_available: boolean) => {
    const { data, error } = await supabase
      .from("menu_items")
      .update({ is_available: !is_available })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating menu item availability", error);
      alert("Error updating menu item availability");
      return;
    }

    fetchMenuItems();
  };

  const handleCancel = () => {
    setFoodName("");
    setFoodDescription("");
    setFoodPrice("");
    setFoodCategory("");
    setFoodImage(null);
    setFoodImagePrev("");
    setEditMode(null);
    setIsModalOpen(false);
  };

  const handleEditItem = async (item: MenuItems) => {
    setFoodName(item.name);
    setFoodDescription(item.description);
    setFoodPrice(item.price);
    setFoodCategory(item.menu_categories?.name);
    setFoodImagePrev(item.image_url);
    setEditMode(item.id);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 py-6 relative">
      <nav className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Menu Inventory</h2>
        <p className="text-lg text-[#64748B]">
          Curate and manage your culinary offerings
        </p>
      </nav>

      <div className="mt-6 flex items-center justify-between">
        <div className="bg-white flex items-center pl-4 pr-1 gap-3 w-fit rounded-lg border border-[#E2E8F0] shadow-sm overflow-hidden h-11">
          <MagnifyingGlassIcon size={20} className="text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-lg h-full text-[14px] text-[#0F172A] placeholder:text-[#94A3B8] font-inter outline-0"
          />
        </div>

        <button
          className="rounded-full px-5 h-10 text-[14.5px] font-semibold bg-orange-400 hover:bg-orange-500 transition-colors text-white flex items-center gap-2 font-inter"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon size={18} weight="bold" color="#ffffff" />
          Add New Item
        </button>
      </div>

      <div className="mt-8 bg-white border border-[#F1F5F9] rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#F8FAFC]">
            <tr className="border-b border-[#F1F5F9] text-[11.5px] font-bold font-inter text-[#64748B] uppercase tracking-[0.08em]">
              <th className="py-4 px-6">Item</th>
              <th className="py-4 px-6 w-[15%]">Category</th>
              <th className="py-4 px-6 w-[15%] text-left">Price</th>
              <th className="py-4 px-6 w-[15%] text-left">Status</th>
              <th className="py-4 px-6 w-[15%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {isFetching ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 border-4 border-[#E2E8F0] border-t-orange-400 rounded-full animate-spin"></div>
                    <p className="text-[#64748B] font-inter text-sm font-medium">
                      Loading menu items...
                    </p>
                  </div>
                </td>
              </tr>
            ) : menuItems.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-20 text-center">
                  <p className="text-[#64748B] font-inter text-sm">
                    No menu items found. Click &quot;Add New Item&quot; to get
                    started!
                  </p>
                </td>
              </tr>
            ) : (
              menuItems
                .filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase()),
                )
                .map((items) => (
                  <tr
                    key={items.id}
                    className="hover:bg-[#F8FAFC]/50 transition-colors group"
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-5">
                        <div className="size-16 rounded-[14px] overflow-hidden bg-gray-100 shrink-0 border border-gray-100 shadow-sm relative">
                          <Image
                            src={items.image_url}
                            alt={items.description || "Food preview"}
                            className="object-cover"
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <h3 className="font-bold text-[17px] text-[#0F172A] font-manrope">
                            {items.name}
                          </h3>
                          <p className="text-[13.5px] text-[#64748B] font-inter">
                            {items.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="bg-[#F4F7F9] text-[#475569] font-bold px-3 py-1.5 text-[10px] rounded-full uppercase tracking-widest font-inter">
                        {items.menu_categories?.name}
                      </span>
                    </td>
                    <td className="py-5 px-6">
                      <p className="font-bold text-[16px] text-[#0F172A] font-manrope">
                        {items.price}
                      </p>
                    </td>
                    <td className="py-5 px-6">
                      <button
                        onClick={() =>
                          handleItemAvailability(items.id, items.is_available)
                        }
                        className={`inline-flex w-11 h-6 ${items.is_available ? "bg-orange-400" : "bg-gray-200"} rounded-full p-0.5 cursor-pointer relative items-center`}
                      >
                        <div
                          className={`size-5 bg-white rounded-full shadow-sm absolute ${items.is_available ? "right-0.5" : "left-0.5"} transition-all`}
                        ></div>
                      </button>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-end gap-5 text-[#94A3B8]">
                        <PencilSimpleIcon
                          size={20}
                          className="hover:text-[#64748B] cursor-pointer transition-colors"
                          weight="bold"
                          onClick={() => handleEditItem(items)}
                        />
                        <TrashIcon
                          size={20}
                          className="hover:text-red-500 cursor-pointer transition-colors"
                          weight="bold"
                        />
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 py-5 px-4">
          <div>
            <p className="text-[14px] text-[#64748B] font-inter">
              Showing 4 to 25 of menu items
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="cursor-pointer text-[#94A3B8] hover:text-[#9D4300] transition-colors">
              <CaretLeftIcon size={20} weight="bold" />
            </button>
            <button className="cursor-pointer text-[#94A3B8] hover:text-[#9D4300] transition-colors">
              <CaretRightIcon size={20} weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 bottom-0 right-0 left-0 bg-black/50 backdrop-blur-xs ${isModalOpen ? "block" : "hidden"}`}
        onClick={() => setIsModalOpen(false)}
      >
        <div
          className="bg-[#F7F9FB] max-w-xl w-full h-full float-right flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <header className="flex items-center justify-between bg-white p-5 shrink-0 relative z-10">
            <div>
              <h3 className="font-bold text-lg text-[#0F172A] font-manrope">
                {editMode ? "Edit Menu Item" : "Add New Item"}
              </h3>
              <p className="text-[13.5px] font-medium text-[#584237] font-inter">
                {editMode
                  ? "Update your menu item"
                  : "Create a new culinary experience"}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="cursor-pointer p-2 rounded-full hover:shadow-xs hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            >
              <XIcon size={20} weight="bold" />
            </button>
          </header>

          <div className="p-5 overflow-auto flex-1">
            <form
              id="add-item-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="menu-image"
                  className="font-bold text-[#584237] font-manrope uppercase text-sm tracking-wider mb-2 block"
                >
                  Item Image
                </label>
                <label
                  htmlFor="menu-image"
                  className="w-full border-dashed border-2 border-[#E8D9D3] bg-[#F2F4F6] rounded-xl p-2 h-45 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden"
                >
                  {editMode ? (
                    <input
                      type="file"
                      id="menu-image"
                      accept="image/png, image/jpeg, image/gif"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  ) : (
                    <input
                      type="file"
                      id="menu-image"
                      accept="image/png, image/jpeg, image/gif"
                      onChange={handleFileChange}
                      required
                      className="sr-only"
                    />
                  )}

                  {foodImagePrev ? (
                    <Image
                      src={foodImagePrev}
                      alt="Food preview"
                      className="w-full h-full object-cover rounded-lg"
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2 h-fit">
                        <div className="bg-white p-4 rounded-full shadow-sm text-[#9D4300]">
                          <UploadIcon size={25} weight="bold" />
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-[#0F172A] font-manrope">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-[13.5px] text-[#64748B] font-inter">
                            PNG, JPG, GIF up to 1MB
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>

              <div>
                <label
                  htmlFor="item-name"
                  className="font-bold text-[#584237] font-manrope uppercase text-sm tracking-wider mb-2 block"
                >
                  ITEM NAME
                </label>
                <input
                  type="text"
                  name="item-name"
                  id="item-name"
                  required
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder="e.g. Jollof Rice"
                  className="w-full border-2 border-[#F6ECE7] outline-none bg-white rounded-xl p-2.5 pl-4 font-semibold"
                />
              </div>

              <div className="flex gap-2">
                <div className="w-full relative">
                  <label
                    htmlFor="item-price"
                    className="font-bold text-[#584237] font-manrope uppercase text-sm tracking-wider mb-2 block"
                  >
                    PRICE (₦)
                  </label>
                  <input
                    type="number"
                    name="item-price"
                    id="item-price"
                    required
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(e.target.value)}
                    placeholder="e.g. 3500"
                    className="w-full border-2 border-[#F6ECE7] outline-none bg-white rounded-xl p-3 pl-7 font-semibold"
                  />
                  <span className="absolute left-3 top-10.5 font-manrope font-bold text-[#A9A4A0]">
                    ₦
                  </span>
                </div>

                <div className="w-full">
                  <label
                    htmlFor="item-category"
                    className="font-bold text-[#584237] font-manrope uppercase text-sm tracking-wider mb-2 block"
                  >
                    CATEGORY
                  </label>
                  <select
                    name="item-category"
                    id="item-category"
                    value={foodCategory}
                    required
                    onChange={(e) => setFoodCategory(e.target.value)}
                    className="w-full border-2 border-[#F6ECE7] outline-none bg-white rounded-xl p-3 pl-4 font-semibold capitalize appearance-none"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="rice">Rice</option>
                    <option value="swallow">Swallow</option>
                    <option value="beverage">Beverage</option>
                    <option value="snacks">Snacks</option>
                    <option value="dessert">Dessert</option>
                    <option value="mocktails">Mocktails</option>
                    <option value="cocktails">Cocktails</option>
                    <option value="continental">Continental</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="item-description"
                  className="font-bold text-[#584237] font-manrope uppercase text-sm tracking-wider mb-2 block"
                >
                  DESCRIPTION
                </label>

                <textarea
                  name="item-description"
                  id="item-description"
                  cols={5}
                  rows={5}
                  value={foodDescription}
                  onChange={(e) => setFoodDescription(e.target.value)}
                  required
                  placeholder="Briefly describe the food"
                  className="w-full border-2 border-[#F6ECE7] outline-none bg-white rounded-xl p-2.5 pl-4 font-semibold"
                ></textarea>
              </div>
            </form>
          </div>

          <div className="bg-white p-5 border-t border-[#F1F5F9] shrink-0">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 rounded-full border border-[#E8D9D3] text-[#584237] font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-item-form"
                disabled={isLoading}
                className="flex-1 py-3 rounded-full bg-linear-to-r from-[#D76000] to-[#E86700] text-white font-semibold shadow-[0_8px_16px_rgba(232,103,0,0.2)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading
                  ? "Adding..."
                  : editMode
                    ? "Update Item"
                    : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
