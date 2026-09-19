"use client";
import {
  ArrowRightIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import login from "@/public/login.png";
import menu from "@/public/menu.png";
import tables from "@/public/qr-screen.png";
import tables_qrcode from "@/public/table-qrcode.png";
import scan_img from "@/public/scan_image.png";
import order_img from "@/public/order_image.png";
import enjoy_img from "@/public/enjoy_image.png";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#fef5e2] font-inter">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
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
              <p className="font-bold text-5xl text-[#101828]">Less waiting.</p>
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

      <section className="bg-[#D1E7FB] my-25 py-15 rounded-3xl max-w-7xl mx-auto">
        <div className="max-w-262 mx-auto flex items-center flex-col">
          <h2 className="text-[#101828] text-[32px] tracking-tight text-center font-bold leading-[2.8rem] font-fraunces">
            From the first scan to the final plate, TableTap keeps orders
            moving, payments simple, and your team in sync — so your restaurant
            can focus on{" "}
            <span className="text-[#E85D2A]">
              great food and even happier guests.
            </span>
          </h2>

          <button className="flex items-center gap-3 rounded-full bg-[#E85D2A] text-white px-6 py-3 mt-12 cursor-pointer group hover:bg-[#E85D2A]/90">
            See TableTap in action
          </button>
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

          <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-10">
            <div className="space-y-4 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-[#E85D2A] bg-[#E85D2A]/10 px-3 py-1 rounded-full block w-fit">
                Step 04
              </span>
              <h3 className="text-[#101828] text-3xl font-bold font-manrope">
                Go live & take orders
              </h3>
              <p className="text-[#64748B] text-base leading-relaxed">
                Place your table QR codes and start serving guests. Diners scan,
                order, and pay upfront while tickets route straight to your
                kitchen.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-3 rounded-full bg-[#101828] text-white px-6 py-3 mt-8 cursor-pointer group hover:bg-[#101828]/90 text-sm font-semibold transition-all active:scale-95"
              >
                <CaretLeftIcon
                  weight="bold"
                  className="group-hover:-translate-x-1 transition-all"
                />
                <span>Start Taking Orders</span>
              </Link>
            </div>

            <div className="w-[520px] h-[500px] overflow-hidden rounded-4xl">
              <Image
                src={tables_qrcode}
                alt="table QR code in dining area"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-8 mt-13 p-8">
        <div className="w-fit mx-auto flex items-center flex-col gap-1">
          <h2 className="text-[43px] text-center text-[#101828] font-bold">
            And for your guests? It&apos;s even{" "}
            <span className="text-[#E85D2A]">simpler.</span>
          </h2>
          <p className="text-center text-lg max-w-lg text-[#6e6e6e]">
            Scan the table, Order what you want. Enjoy your meal.
          </p>
        </div>

        <div className="grid grid-cols-3 mt-20 max-w-300 mx-auto">
          <div className="bg-[#FCEFDD] rounded-2xl max-w-sm w-full relative">
            <div className="max-w-60 pl-6 pb-5 pt-5 absolute">
              <h2 className="text-[#101828] text-4xl font-bold font-inter">
                Scan.
              </h2>
              <p className="text-lg font-manrope text-[#5A6C7B] font-medium leading-6 mt-1">
                Scan the TableTap
                <br /> QR code at your table.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden w-full">
              <Image
                src={scan_img}
                alt="scan image"
                className="object-cover w-full"
              />
            </div>
          </div>

          <div className="bg-[#FCEFDD] rounded-2xl max-w-sm w-full relative">
            <div className="max-w-60 pl-6 pb-5 pt-5 absolute">
              <h2 className="text-[#101828] text-4xl font-bold font-inter">
                Order.
              </h2>
              <p className="text-lg font-manrope text-[#5A6C7B] font-medium leading-6 mt-1">
                Choose what you want
                <br /> and pay securely.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden w-full">
              <Image
                src={order_img}
                alt="order image"
                className="object-cover w-full"
              />
            </div>
          </div>

          <div className="bg-[#FCEFDD] rounded-2xl max-w-sm w-full relative">
            <div className="max-w-60 pl-6 pb-5 pt-5 absolute">
              <h2 className="text-[#101828] text-4xl font-bold font-inter">
                Enjoy.
              </h2>
              <p className="text-lg font-manrope text-[#5A6C7B] font-medium leading-6 mt-1">
                Sit back.
                <br /> Your order is on it&apos;s way.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden w-full">
              <Image
                src={enjoy_img}
                alt="scan image"
                className="object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-300 mx-auto my-20">
        <div className="w-fit mx-auto flex items-center flex-col gap-1">
          <h2 className="text-[43px] text-center text-[#101828] font-bold">
            Service without the{" "}
            <span className="text-[#E85D2A]">friction.</span>
          </h2>
          <p className="text-center text-lg max-w-xl text-[#6e6e6e]">
            From the first order to the final sale, TableTap gives your team the
            tools to keep service running smoothly.
          </p>
        </div>

        <div className="grid grid-cols-3 mt-15 gap-3">
          <div className="border border-[#EDEDEB] p-4 bg-[#FEFAF4] rounded-3xl group cursor-pointer transition-all duration-300 hover:border-[#E85D2A]/30 hover:shadow-sm">
            <div className="bg-[#FEEFE3] w-fit rounded-xl transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <svg
                width="55"
                height="55"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>{`
                  .fork {
                    stroke: #101828;
                    transform-origin: 24.5px 45px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .knife {
                    stroke: #E85D2A;
                    transform-origin: 44px 45px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .icon-container {
                    transform-origin: 32px 32px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  @media (hover: hover) and (pointer: fine) {
                    .group:hover .icon-container {
                      transform: translateY(-1px);
                    }

                    .group:hover .fork {
                      transform: translateY(-1.5px) rotate(-3deg);
                    }

                    .group:hover .knife {
                      transform: translateY(-1.5px) rotate(3deg);
                    }
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .fork,
                    .knife,
                    .icon-container {
                      transition: none;
                      transform: none;
                    }
                  }
                `}</style>

                <g className="icon-container">
                  <path
                    className="fork"
                    d="
                  M18 14
                  V24
                  C18 28.5 21 31.5 24.5 31.5
                  C28 31.5 31 28.5 31 24
                  V14

                  M24.5 14
                  V23

                  M24.5 31.5
                  V50
                "
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    className="knife"
                    d="
                  M48 48
                  V16
                  C48 14.2 46.5 13.5 44 13.5
                  C39.5 14.5 37 19.5 37 25
                  C37 30.5 38.5 34 41.5 36
                  V48
                  C41.5 49.5 42.5 50 44.5 50
                  C46.5 50 48 49.5 48 48
                  Z
                "
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>

            <h4 className="font-semibold font-manrope text-lg my-3">
              Digital Menu & Ordering
            </h4>
            <p>
              Let guests browse, customize, and place their orders directly from
              their phones.
            </p>
          </div>
          <div className="border border-[#EDEDEB] p-4 bg-[#FEFAF4] rounded-3xl group cursor-pointer transition-all duration-300 hover:border-[#E85D2A]/30 hover:shadow-sm">
            <div className="bg-[#FEEFE3] w-fit rounded-xl transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <svg
                width="55"
                height="55"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>{`
                  .card-group {
                    transform-origin: 32px 32px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .card-coin {
                    transform-origin: 44px 44px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  @media (hover: hover) and (pointer: fine) {
                    .group:hover .card-group {
                      transform: translateY(-1.5px) rotate(-1.5deg);
                    }

                    .group:hover .card-coin {
                      transform: scale(1.08) translateY(-1px);
                    }
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .card-group,
                    .card-coin {
                      transition: none;
                      transform: none;
                    }
                  }
                `}</style>

                <g className="card-group">
                  <path
                    d="M33 46 H16 C13.2 46 11 43.8 11 41 V21 C11 18.2 13.2 16 16 16 H46 C48.8 16 51 18.2 51 21 V33"
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 25 H51"
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 35.5 H21.5 M26 35.5 H29.5"
                    stroke="#101828"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>

                <circle
                  className="card-coin"
                  cx="44"
                  cy="44"
                  r="8"
                  stroke="#E85D2A"
                  strokeWidth="4"
                />
              </svg>
            </div>

            <h4 className="font-semibold font-manrope text-lg my-3">
              Upfront Payments
            </h4>
            <p>
              Guests pay when they order, keeping payments simple and orders
              moving.
            </p>
          </div>
          <div className="border border-[#EDEDEB] p-4 bg-[#FEFAF4] rounded-3xl group cursor-pointer transition-all duration-300 hover:border-[#E85D2A]/30 hover:shadow-sm">
            <div className="bg-[#FEEFE3] w-fit rounded-xl transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <svg
                width="55"
                height="55"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>{`
                  .clipboard-container {
                    transform-origin: 32px 32px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .clip-clamp {
                    transform-origin: 32px 16px;
                    transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .clip-line-1 {
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .clip-line-2 {
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1) 40ms;
                  }

                  .clip-badge {
                    transform-origin: 44px 45px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  @media (hover: hover) and (pointer: fine) {
                    .group:hover .clipboard-container {
                      transform: translateY(-1.5px);
                    }

                    .group:hover .clip-clamp {
                      transform: translateY(1px);
                    }

                    .group:hover .clip-line-1 {
                      transform: translateX(3px);
                    }

                    .group:hover .clip-line-2 {
                      transform: translateX(4px);
                    }

                    .group:hover .clip-badge {
                      transform: scale(1.08) rotate(14deg);
                    }
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .clipboard-container,
                    .clip-clamp,
                    .clip-line-1,
                    .clip-line-2,
                    .clip-badge {
                      transition: none;
                      transform: none;
                    }
                  }
                `}</style>

                <g className="clipboard-container">
                  {/* Clip loop */}
                  <path
                    className="clip-clamp"
                    d="M28 13 V11 C28 9.3 29.5 8 32 8 C34.5 8 36 9.3 36 11 V13"
                    stroke="#101828"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                  />

                  {/* Clipboard shoulders and body (stops cleanly before the badge) */}
                  <path
                    d="
                      M23 18
                      H19
                      C16 18 14 20.2 14 23.5
                      V46
                      C14 49.3 16 52 19.5 52
                      H33
                    "
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="
                      M41 18
                      H45
                      C48 18 50 20.2 50 23.5
                      V34
                    "
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Clamp clamp bar */}
                  <rect
                    className="clip-clamp"
                    x="23"
                    y="13"
                    width="18"
                    height="6"
                    rx="2"
                    stroke="#101828"
                    strokeWidth="3"
                  />

                  {/* Checklist lines */}
                  <line
                    className="clip-line-1"
                    x1="22"
                    y1="28"
                    x2="40"
                    y2="28"
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                  <line
                    className="clip-line-2"
                    x1="22"
                    y1="36"
                    x2="33"
                    y2="36"
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />

                  {/* Orange status badge */}
                  <circle
                    className="clip-badge"
                    cx="44"
                    cy="45"
                    r="8.5"
                    stroke="#E85D2A"
                    strokeWidth="4"
                  />
                </g>
              </svg>
            </div>

            <h4 className="font-semibold font-manrope text-lg my-3">
              Live Order Management
            </h4>
            <p>
              Every order arrives with the table number and details, keeping
              your team in control.
            </p>
          </div>
          <div className="border border-[#EDEDEB] p-4 bg-[#FEFAF4] rounded-3xl group cursor-pointer transition-all duration-300 hover:border-[#E85D2A]/30 hover:shadow-sm">
            <div className="bg-[#FEEFE3] w-fit rounded-xl transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <svg
                width="55"
                height="55"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>{`
                  .chef-hat-container {
                    transform-origin: 32px 48px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  @media (hover: hover) and (pointer: fine) {
                    .group:hover .chef-hat-container {
                      transform: translateY(-2px) rotate(-2deg);
                    }
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .chef-hat-container {
                      transition: none;
                      transform: none;
                    }
                  }
                `}</style>

                <g className="chef-hat-container">
                  <path
                    d="
                      M17 38
                      C12 38 9 33.5 9 27
                      C9 20.5 13.5 17 19.5 17.5
                      C21 13 25.5 11 32 11
                      C38.5 11 43 13 44.5 17.5
                      C50.5 17 55 20.5 55 27
                      C55 33.5 52 38 47 38
                      V51
                      C47 52.1 46.1 53 45 53
                      H19
                      C17.9 53 17 52.1 17 51
                      Z
                    "
                    stroke="#101828"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="18"
                    y1="44"
                    x2="46"
                    y2="44"
                    stroke="#E85D2A"
                    strokeWidth="3.2"
                  />
                </g>
              </svg>
            </div>

            <h4 className="font-semibold font-manrope text-lg my-3">
              Kitchen & Bar Coordination
            </h4>
            <p>
              Send orders to the right place and keep kitchen and bar teams in
              sync.
            </p>
          </div>
          <div className="border border-[#EDEDEB] p-4 bg-[#FEFAF4] rounded-3xl group cursor-pointer transition-all duration-300 hover:border-[#E85D2A]/30 hover:shadow-sm">
            <div className="bg-[#FEEFE3] w-fit rounded-xl transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <svg
                width="55"
                height="55"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>{`
                  .menu-toggle-container {
                    transform-origin: 32px 32px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .menu-line {
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .toggle-track {
                    transform-origin: 41px 41px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .toggle-thumb {
                    transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  @media (hover: hover) and (pointer: fine) {
                    .group:hover .menu-toggle-container {
                      transform: translateY(-1.5px);
                    }

                    .group:hover .line-1 {
                      transform: translateX(2px);
                    }

                    .group:hover .line-2 {
                      transform: translateX(3px);
                    }

                    .group:hover .line-3 {
                      transform: translateX(1.5px);
                    }

                    .group:hover .line-4 {
                      transform: translateX(1.5px);
                    }

                    .group:hover .toggle-track {
                      transform: scale(1.05);
                    }

                    .group:hover .toggle-thumb {
                      transform: translateX(-2.5px);
                    }
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .menu-toggle-container,
                    .menu-line,
                    .toggle-track,
                    .toggle-thumb {
                      transition: none;
                      transform: none;
                    }
                  }
                `}</style>

                <g className="menu-toggle-container">
                  <line
                    className="menu-line line-1"
                    x1="13"
                    y1="17"
                    x2="38"
                    y2="17"
                    stroke="#101828"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  <line
                    className="menu-line line-2"
                    x1="13"
                    y1="26"
                    x2="35"
                    y2="26"
                    stroke="#101828"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  <line
                    className="menu-line line-3"
                    x1="13"
                    y1="35"
                    x2="25"
                    y2="35"
                    stroke="#101828"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  <line
                    className="menu-line line-4"
                    x1="13"
                    y1="44"
                    x2="20"
                    y2="44"
                    stroke="#101828"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />

                  <g className="toggle-track">
                    <rect
                      x="30"
                      y="33"
                      width="22"
                      height="15"
                      rx="7.5"
                      fill="#E85D2A"
                    />
                    <circle
                      className="toggle-thumb"
                      cx="44.5"
                      cy="40.5"
                      r="4.5"
                      fill="#FEFAF4"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <h4 className="font-semibold font-manrope text-lg my-3">
              Menu & Availability
            </h4>
            <p>
              Update dishes, prices and availability in real time, so your menu
              stays current.
            </p>
          </div>
          <div className="border border-[#EDEDEB] p-4 bg-[#FEFAF4] rounded-3xl group cursor-pointer transition-all duration-300 hover:border-[#E85D2A]/30 hover:shadow-sm">
            <div className="bg-[#FEEFE3] w-fit rounded-xl transition-transform duration-200 ease-out group-hover:scale-[1.03]">
              <svg
                width="55"
                height="55"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <style>{`
                  .chart-container {
                    transform-origin: 32px 52px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .chart-bar-1 {
                    transform-origin: 19px 52px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1);
                  }

                  .chart-bar-2 {
                    transform-origin: 32px 52px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1) 30ms;
                  }

                  .chart-bar-3 {
                    transform-origin: 45px 52px;
                    transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1) 60ms;
                  }

                  @media (hover: hover) and (pointer: fine) {
                    .group:hover .chart-bar-1 {
                      transform: translateY(-2px);
                    }

                    .group:hover .chart-bar-2 {
                      transform: translateY(-3.5px);
                    }

                    .group:hover .chart-bar-3 {
                      transform: translateY(-5px);
                    }
                  }

                  @media (prefers-reduced-motion: reduce) {
                    .chart-container,
                    .chart-bar-1,
                    .chart-bar-2,
                    .chart-bar-3 {
                      transition: none;
                      transform: none;
                    }
                  }
                `}</style>

                <g className="chart-container">
                  <rect
                    className="chart-bar-1"
                    x="15"
                    y="38"
                    width="8"
                    height="14"
                    rx="4"
                    fill="#101828"
                  />

                  <rect
                    className="chart-bar-2"
                    x="28"
                    y="24"
                    width="8"
                    height="28"
                    rx="4"
                    fill="#101828"
                  />

                  <rect
                    className="chart-bar-3"
                    x="41"
                    y="10"
                    width="8"
                    height="42"
                    rx="4"
                    fill="#E85D2A"
                  />
                </g>
              </svg>
            </div>

            <h4 className="font-semibold font-manrope text-lg my-3">
              Sales & Analytics
            </h4>
            <p>
              See what&apos;s happening across your restaurant, from sales to
              your best-selling dishes.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
