"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getPartnersTitle, partners, getFooterContent } from "@/lib/data";

export const Partners = () => {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);
  const originRef = useRef<HTMLDivElement | null>(null);
  const destRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (originRef.current && !originRef.current.contains(e.target as Node)) {
        setShowOriginList(false);
      }
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestinationList(false);
      }
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowOriginList(false);
        setShowDestinationList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const footer = getFooterContent(lang);
    let phone = footer?.phone || "";
    phone = phone.replace(/\D/g, "");
    if (phone.startsWith("00")) phone = phone.replace(/^00/, "");
    if (phone.startsWith("+")) phone = phone.replace(/^\+/, "");
    // fallback: leave as-is if empty

    const title = isRtl ? "درخواست سفر" : "Trip request";
    const msgLines = [
      title,
      `${isRtl ? "مبدأ" : "Origin"}: ${origin || "-"}`,
      `${isRtl ? "مقصد" : "Destination"}: ${destination || "-"}`,
      `${isRtl ? "تاریخ" : "Date"}: ${date || "-"}`,
      `${isRtl ? "مسافران" : "Passengers"}: ${passengers || "-"}`,
    ];
    const message = msgLines.join("\n");
    const encoded = encodeURIComponent(message);
    const waBase = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
    window.open(waBase, "_blank");
  }

  const allCountries = isRtl
    ? [
      "افغانستان",
      "ایران",
      "ترکیه",
      "عراق",
      "فرانسه",
      "آلمان",
      "لهستان",
      "مجارستان",
    ]
    : [
      "Afghanistan",
      "Iran",
      "Turkey",
      "Iraq",
      "France",
      "Germany",
      "Poland",
      "Hungary",
    ];
  const destCountries = isRtl
    ? ["ایران", "افغانستان", "ترکیه", "عراق"]
    : ["Iran", "Afghanistan", "Turkey", "Iraq"];

  return (
    <section
      aria-label="همکاران ما"
      className="rounded-xl bg-white px-4 py-4 md:rounded-2xl md:px-6 md:py-6"
    >
      <h2 className="text-center text-sm font-semibold text-slate-900 md:text-base">
        {getPartnersTitle(lang)}
      </h2>

      {/* Airline logos (show under title) */}
      <div className="mt-3 flex items-center justify-center gap-3 px-2 md:mt-4 md:gap-12">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex shrink-0 items-center justify-center"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="h-auto max-h-8 w-auto object-contain md:max-h-10"
            />
          </div>
        ))}
      </div>

      {/* Search header */}
      <h3 className="mt-4 text-center text-lg font-bold text-slate-900 md:text-center md:ml-0">
        {isRtl ? "سفر خود را آغاز کنید" : "Start your trip"}
      </h3>

      {/* Beautiful visa form button (icon + label) */}
      <div className="mt-3 flex w-full items-center">
        <Link
          href="/visa"
          className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0f3e66] shadow-sm border border-transparent hover:border-[#0dadd1] hover:bg-[#0dadd1] hover:text-white transition-colors"
          aria-label={isRtl ? "رفتن به فرم ویزا" : "Go to visa form"}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0dadd1] text-white">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 21l-4.35-4.35"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
          </span>
          <span className="whitespace-nowrap">
            {isRtl ? "فرم ویزا" : "Visa form"}
          </span>
        </Link>
      </div>

      {/* (logos shown above) */}
    </section>
  );
};
