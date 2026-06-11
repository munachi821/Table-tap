"use client";

import {
  CameraIcon,
  CreditCardIcon,
  DesktopIcon,
  HouseIcon,
  ImageIcon,
  PersonIcon,
  ReceiptIcon,
  DownloadSimpleIcon,
  ArrowRightIcon,
  WalletIcon,
  ListDashesIcon,
  FloppyDiskIcon,
  CopyIcon,
  EyeIcon,
  WarningIcon,
  ShieldCheckIcon,
} from "@phosphor-icons/react";
import { SealCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 py-6 font-manrope">
      <div className="font-manrope">
        <h2 className="font-bold text-[#0F172A] text-3xl">Settings</h2>
        <p className="text-lg text-[#64748B]">
          Configure your restaurant preferences and settings.
        </p>
      </div>

      <div className="grid grid-cols-11 mt-5 gap-6">
        <div className="col-span-3 space-y-2">
          <div
            className={`py-3.5 px-4.5 ${activeTab === "profile" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("profile")}
          >
            <HouseIcon size={21} weight="bold" /> <p>Restaurant Profile</p>
          </div>
          <div
            className={`py-3.5 px-4.5 ${activeTab === "terminal" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("terminal")}
          >
            <DesktopIcon size={21} weight="bold" /> <p>Terminal Access</p>
          </div>
          <div
            className={`py-3.5 px-4.5 ${activeTab === "operations" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("operations")}
          >
            <PersonIcon size={21} weight="bold" /> <p>Operations</p>
          </div>
          <div
            className={`py-3.5 px-4.5 ${activeTab === "billing" ? "bg-[#F8EEE9] text-[#9D4300]" : "hover:bg-[#F2F4F6] text-[#724237]"} transition-colors cursor-pointer font-semibold flex items-center gap-3 rounded-2xl`}
            onClick={() => setActiveTab("billing")}
          >
            <CreditCardIcon size={21} weight="bold" /> <p>Billing & Plans</p>
          </div>
        </div>

        <div className="col-span-8 bg-white rounded-3xl border border-[#E6E8EA]">
          {activeTab === "profile" && (
            <div>
              <div className="border-b border-[#D6C9B9] p-5">
                <p className="text-[#1B1D1E] text-2xl font-bold">
                  Restaurant Profile
                </p>
                <p className="text-[#584237] text-base font-medium">
                  Update your restaurant information and preferences.
                </p>
              </div>

              <form className="p-5 space-y-6">
                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block font-inter font-semibold"
                  >
                    Brand Assets
                  </label>
                  <div className="flex items-center gap-6">
                    <div className="w-76 h-50 border-2 border-dashed border-[#E0C0B1] transition-all hover:border-[#9D4300] rounded-2xl flex flex-col items-center justify-center font-inter space-y-1.5">
                      <div className="p-4 rounded-full bg-[#F8EEE9] text-[#584237]">
                        <CameraIcon size={25} weight="bold" />
                      </div>
                      <p className="font-semibold text-sm tracking-wide">
                        UPLOAD LOGO
                      </p>
                      <p className="text-xs">PNG, JPG (max 3MB)</p>
                    </div>
                    <div className="w-full h-50 border-2 border-dashed border-[#E0C0B1] transition-all hover:border-[#9D4300] rounded-2xl flex flex-col items-center justify-center font-inter space-y-1.5">
                      <ImageIcon size={26} className="text-[#584237]" />
                      <p className="font-semibold text-sm tracking-wide">
                        MENU BANNER
                      </p>
                      <p className="text-xs tracking-wider">
                        Recommended 1200 x 400px
                      </p>
                    </div>
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
                      id="support"
                      className="w-full h-18 p-4! rounded-xl border border-[#C6C9CF] bg-[#F7F9FB] font-inter font-medium text-base focus:outline-[#9D4300]"
                      rows={10}
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
                    placeholder="1122-3348221"
                  />
                </div>

                <div className="mt-6 border-t border-[#F2F4F6] pt-5 flex justify-end gap-4">
                  <button className="px-4 py-2 rounded-full text-[#9D4300] hover:text-gray-700 hover:bg-[#C6C9CF] text-[14px] font-semibold cursor-pointer">
                    Discard
                  </button>
                  <button className="bg-[#9D4300] px-4 py-2 rounded-full text-white text-[14px] font-semibold cursor-pointer">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "billing" && (
            <div>
              <div className="border-b border-[#D6C9B9] p-5">
                <p className="text-[#1B1D1E] text-2xl font-bold">
                  Billing & Plans
                </p>
                <p className="text-[#584237] text-base font-medium">
                  Manage your software license, payment methods, and download
                  invoices.
                </p>
              </div>

              <div className="p-5">
                <div>
                  <div className="bg-[#FFF4EE] px-6 py-7 rounded-xl border border-[#FFE0CE] flex justify-between">
                    <div className="flex items-center gap-4">
                      <div className="bg-[#974800] text-white p-2 rounded-lg w-fit h-fit">
                        <SealCheckIcon size={23} weight="bold" />
                      </div>

                      <div className="font-semibold">
                        <p className="text-xl">Table-tap Full License</p>
                        <p className="text-gray-500">
                          QR Tables & KDS Displays
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        <span className="text-3xl font-bold font-inter text-[#974800]">
                          ₦80,000
                        </span>{" "}
                        /month
                      </p>
                      <p className="text-gray-500 text-sm text-right">
                        Next billing date: july 8 2026
                      </p>
                    </div>
                  </div>
                  <p className="text-[#BA1A1A] font-semibold mt-2.5 text-right">
                    Need to cancel your license? Contact Support.
                  </p>
                </div>

                <div className="mt-8">
                  <div className="flex gap-2">
                    <CreditCardIcon size={28} />{" "}
                    <p className="text-xl">Payment Method</p>
                  </div>

                  <div className="border border-[#E4EAF1] rounded-lg p-5 flex items-center justify-between mt-4">
                    <div className="flex gap-2 items-center">
                      <div className="w-12 h-7.5 bg-black/90 rounded-sm"></div>
                      <div className="text-sm font-bold">
                        <p className="text-[#0F172A]">
                          Mastercard ending in 4242
                        </p>
                        <p className="text-gray-600">EXPIRES 12/28</p>
                      </div>
                    </div>

                    <button className="border border-[#974800] hover:bg-[#974800] transition-colors hover:text-white px-3 py-1.5 text-[#974800] cursor-pointer font-semibold rounded-lg text-sm">
                      Update Card
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex gap-2 items-center mb-4">
                    <ReceiptIcon size={24} />
                    <p className="text-xl text-[#1B1D1E]">Invoice History</p>
                  </div>

                  <div className="border border-[#E4EAF1] bg-[#F8FAFC] rounded-xl overflow-hidden mt-4">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#E4EAF1] text-[#64748B] text-xs font-bold tracking-wider">
                          <th className="py-4 px-6 uppercase font-inter">
                            Date
                          </th>
                          <th className="py-4 px-6 uppercase font-inter">
                            Amount
                          </th>
                          <th className="py-4 px-6 uppercase font-inter text-center">
                            Status
                          </th>
                          <th className="py-4 px-6 uppercase font-inter text-right">
                            Invoice
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white">
                        {[
                          {
                            date: "June 8, 2026",
                            amount: "₦80,000",
                            status: "PAID",
                          },
                          {
                            date: "May 8, 2026",
                            amount: "₦80,000",
                            status: "PAID",
                          },
                          {
                            date: "April 8, 2026",
                            amount: "₦80,000",
                            status: "PAID",
                          },
                        ].map((invoice, index) => (
                          <tr
                            key={index}
                            className="border-b border-[#E4EAF1] last:border-b-0"
                          >
                            <td className="py-4 px-6 font-medium text-[#475569] text-sm">
                              {invoice.date}
                            </td>
                            <td className="py-4 px-6 font-bold text-[#1B1D1E] font-inter text-sm">
                              {invoice.amount}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="bg-[#E6F4EA] text-[#1E7E34] text-xs font-bold px-2.5 py-1 rounded-full">
                                {invoice.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button className="flex items-center gap-1.5 ml-auto text-[#9D4300] font-bold text-sm hover:underline cursor-pointer">
                                <DownloadSimpleIcon size={16} weight="bold" />{" "}
                                Download PDF
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="py-4 flex justify-center bg-white border-t border-[#E4EAF1]">
                      <button className="flex items-center gap-2 text-[#475569] hover:text-[#0F172A] font-semibold text-sm transition-colors cursor-pointer">
                        View All History{" "}
                        <ArrowRightIcon size={16} weight="bold" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-between rounded-b-3xl">
                <p className="text-[#64748B] text-sm italic font-medium">
                  All prices exclude local tax unless stated otherwise.
                </p>
                <button className="bg-[#0F172A] hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer">
                  Save Billing Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "operations" && (
            <div>
              <div className="border-b border-[#D6C9B9] p-5">
                <p className="text-[#1B1D1E] text-2xl font-bold">
                  Operational Preferences
                </p>
                <p className="text-[#584237] text-base font-medium">
                  Configure your financial rules and kitchen routing logic.
                </p>
              </div>

              <div className="p-8">
                {/* FINANCIAL RULES */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <WalletIcon
                      size={20}
                      className="text-[#F97316]"
                      weight="bold"
                    />
                    <p className="text-[#64748B] font-bold text-sm tracking-widest uppercase">
                      Financial Rules
                    </p>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[#1B1D1E] font-bold text-base mb-1">
                          Apply Value Added Tax (VAT)
                        </p>
                        <p className="text-[#64748B] text-sm">
                          Automatically append a standard 7.5% tax to all
                          customer checkouts.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#10B981] shrink-0 cursor-pointer"
                      >
                        <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-6"></div>
                      </button>
                    </div>

                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[#1B1D1E] font-bold text-base mb-1">
                          Mandatory Service Charge
                        </p>
                        <p className="text-[#64748B] text-sm">
                          Apply a flat 5% service charge to cover digital
                          platform and convenience fees.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#E2E8F0] shrink-0 cursor-pointer"
                      >
                        <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-0"></div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ORDER WORKFLOW */}
                <div className="mt-12">
                  <div className="flex items-center gap-2 mb-6">
                    <ListDashesIcon
                      size={20}
                      className="text-[#F97316]"
                      weight="bold"
                    />
                    <p className="text-[#64748B] font-bold text-sm tracking-widest uppercase">
                      Order Workflow
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-[#1B1D1E] font-bold text-base mb-1">
                          KDS Auto-Sync (Bypass Waiter)
                        </p>
                        <p className="text-[#64748B] text-sm">
                          When a customer pays digitally, instantly send the
                          ticket to the Kitchen Display System without requiring
                          manual waiter approval.
                        </p>
                      </div>
                      <button
                        type="button"
                        className="w-12 h-6 rounded-full flex items-center p-1 transition-colors bg-[#10B981] shrink-0 cursor-pointer"
                      >
                        <div className="bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform translate-x-6"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-end gap-6 rounded-b-3xl">
                <button className="text-[#64748B] hover:text-[#0F172A] text-sm font-semibold transition-colors cursor-pointer">
                  Cancel Changes
                </button>
                <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2">
                  <FloppyDiskIcon size={18} weight="bold" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === "terminal" && (
            <div>
              <div className="border-b border-[#D6C9B9] p-5">
                <p className="text-[#1B1D1E] text-2xl font-bold">
                  Kitchen Display System (KDS) Access
                </p>
                <p className="text-[#584237] text-base font-medium mt-1">
                  Use these credentials to log into your kitchen&apos;s iPad or
                  tablet. Keep these details secure for back-of-house
                  operations.
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
                          value="kds@nanaskitchen.ng"
                          readOnly
                          className="w-full h-12 px-4 pr-12 rounded-xl bg-white text-[#1B1D1E] font-medium text-base focus:outline-none"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9D4300] hover:text-[#724237] transition-colors cursor-pointer">
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
                          type="password"
                          value="password123"
                          readOnly
                          className="w-full h-12 px-4 pr-24 rounded-xl bg-white text-[#1B1D1E] font-medium text-xl tracking-widest focus:outline-none"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                          <button className="text-[#64748B] hover:text-[#1B1D1E] transition-colors cursor-pointer">
                            <EyeIcon size={20} weight="bold" />
                          </button>
                          <div className="w-px h-5 bg-[#E6E8EA]"></div>
                          <button className="text-[#9D4300] hover:text-[#724237] transition-colors cursor-pointer">
                            <CopyIcon size={20} weight="bold" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-center space-y-4">
                  <button className="border-2 border-[#1B1D1E] hover:bg-[#F2F4F6] text-[#1B1D1E] px-6 py-3 rounded-lg text-sm font-bold transition-colors cursor-pointer">
                    Generate New Password
                  </button>
                  <div className="flex items-center gap-2 text-[#BA1A1A] text-sm font-semibold">
                    <WarningIcon size={18} weight="bold" />
                    <p>
                      Generating a new password will immediately log out all
                      active KDS devices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#F8FAFC] border-t border-[#E6E8EA] p-5 flex items-center justify-between rounded-b-3xl">
                <div className="flex items-center gap-2 text-[#475569] text-sm font-medium">
                  <ShieldCheckIcon size={20} />
                  <p>
                    End-to-end encrypted management for secure kitchen
                    operations.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[#64748B] text-xs font-bold tracking-widest uppercase">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  System Active
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
