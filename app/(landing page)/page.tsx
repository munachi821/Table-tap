"use client";
import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import login from "@/public/login.png";
import menu from "@/public/menu.png";
import tables from "@/public/qr-screen.png";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fef5e2] font-inter">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0">
        <div className="mx-auto px-13 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/tabletap-logo.png"
              alt="TableTap"
              width={34}
              height={34}
              priority
              className="h-8 w-auto object-contain"
            />
            <h2 className="text-2xl font-bold text-[#101828]">TableTap</h2>
          </Link>

          <ul className="flex items-center gap-10 font-medium py-3 px-10 rounded-full">
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              For Restaurants
            </li>
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              How it works
            </li>
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              Pricing
            </li>
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              FAQ
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-[15px] font-semibold text-[#101828] hover:text-white/80 px-4 py-2 rounded-lg transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="text-sm flex items-center gap-2 font-semibold rounded-full bg-[#fa7933] text-white px-5 py-2.5 transition-all active:scale-95 group"
            >
              Get Started{" "}
              <ArrowRightIcon
                weight="bold"
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Landing Canvas */}
      <section className="hero-img w-full h-screen pl-15">
        <div className="max-w-md h-full flex items-center">
          <div>
            <div>
              <p className="font-bold text-5xl text-[#101828]">Less Waiting.</p>
              <p className="font-bold text-5xl text-[#E85D2A]">More eating.</p>
            </div>

            <p className="text-xl text-[#101828] mt-8">
              No waving down waiters. No waiting for the bill. Just scan, order,
              pay, and enjoy.
            </p>

            <button className="flex items-center gap-3 rounded-full bg-[#E85D2A] text-white px-6 py-3 mt-8 cursor-pointer group hover:bg-[#E85D2A]/90">
              Get Started{" "}
              <CaretRightIcon
                weight="bold"
                className="group-hover:translate-x-1 transition-all"
              />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-8 mt-13 p-8">
        <div className="w-fit mx-auto flex items-center flex-col gap-4">
          <h2 className="text-5xl text-center text-[#101828] font-bold">
            Get your restaurant <span className="text-[#E85D2A]">ready.</span>
          </h2>
          <p className="text-center text-lg max-w-lg text-[#6e6e6e]">
            Set up your account, add your menu, create your tables, and
            you&apos;re ready to take orders.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24 mt-16 max-w-6xl mx-auto">
          {/* Step 01 */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E85D2A] bg-[#E85D2A]/10 px-3 py-1 rounded-full block w-fit">
                Step 01
              </span>
              <h3 className="text-[#101828] text-3xl font-bold font-manrope">
                Sign up your Restaurant
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Set up your restaurant profile, upload your branding, and
                connect instant payouts in just a few clicks.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 rounded-full bg-[#101828] text-white px-6 py-3 mt-8 cursor-pointer group hover:bg-[#101828]/90 text-sm font-semibold transition-all active:scale-95"
              >
                <span>Register</span>
                <CaretRightIcon
                  weight="bold"
                  className="group-hover:translate-x-1 transition-all"
                />
              </Link>
            </div>

            <div className="w-[520px] h-[500px] overflow-hidden rounded-4xl">
              <Image
                src={login}
                alt="login onboarding screen"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Step 02 */}
          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10">
            <div className="space-y-4 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E85D2A] bg-[#E85D2A]/10 px-3 py-1 rounded-full block w-fit">
                Step 02
              </span>
              <h3 className="text-[#101828] text-3xl font-bold font-manrope">
                Add your menu
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Add your dishes, prices, photos, and categories. Toggle item
                availability in real-time as orders roll in.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 rounded-full bg-[#101828] text-white px-6 py-3 mt-8 cursor-pointer group hover:bg-[#101828]/90 text-sm font-semibold transition-all active:scale-95"
              >
                <CaretLeftIcon
                  weight="bold"
                  className="group-hover:-translate-x-1 transition-all"
                />
                <span>Build Your Menu</span>
              </Link>
            </div>

            <div className="w-[520px] h-[500px] overflow-hidden rounded-4xl">
              <Image
                src={menu}
                alt="menu onboarding screen"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Step 03 */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E85D2A] bg-[#E85D2A]/10 px-3 py-1 rounded-full block w-fit">
                Step 03
              </span>
              <h3 className="text-[#101828] text-3xl font-bold font-manrope">
                Set up your tables
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Create custom dining tables and generate high-resolution,
                printable QR codes ready for instant guest ordering.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 rounded-full bg-[#101828] text-white px-6 py-3 mt-8 cursor-pointer group hover:bg-[#101828]/90 text-sm font-semibold transition-all active:scale-95"
              >
                <span>Generate QR Codes</span>
                <CaretRightIcon
                  weight="bold"
                  className="group-hover:translate-x-1 transition-all"
                />
              </Link>
            </div>

            <div className="w-[520px] h-[500px] overflow-hidden rounded-4xl">
              <Image
                src={tables}
                alt="tables onboarding screen"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
