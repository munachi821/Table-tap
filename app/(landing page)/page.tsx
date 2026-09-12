"use client";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
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

          <ul className="flex items-center gap-8 font-medium py-3 px-10 rounded-full glass-card">
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              For Restaurants
            </li>
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              How it works
            </li>
            <li className="cursor-pointer hover:text-[#E85D2A] transition-colors">
              Benefits
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
      <div className="hero-img w-full h-screen pl-15">
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
      </div>
    </div>
  );
}
