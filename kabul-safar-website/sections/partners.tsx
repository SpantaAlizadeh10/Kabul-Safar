"use client";

import Image from "next/image";
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
            className="flex shrink-0 items-center justify-center opacity-80"
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width}
              height={partner.height}
              className="h-auto max-h-6 w-auto object-contain grayscale md:max-h-8"
            />
          </div>
        ))}
      </div>

      {/* Search header */}
      <h3 className="mt-4 text-center text-lg font-bold text-slate-900 md:text-left md:ml-2">
        {isRtl ? "سفر خود را آغاز کنید" : "Start your trip"}
      </h3>

      {/* Travel search form */}
      <form
        ref={formRef}
        className={`mt-3 grid w-full gap-2 ${isRtl ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[1fr_auto]"} items-center`}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-4 gap-2 md:grid-cols-4 md:gap-3">
          <div className="relative" ref={originRef}>
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              onFocus={() => {
                setShowOriginList(true);
                setShowDestinationList(false);
              }}
              onBlur={() =>
                setTimeout(() => {
                  if (!originRef.current?.contains(document.activeElement)) {
                    setShowOriginList(false);
                  }
                }, 100)
              }
              placeholder={isRtl ? "مبدأ" : "Origin"}
              aria-label="origin"
              className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-sm w-full placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/30"
            />
            {showOriginList && (
              <ul className="absolute left-0 right-0 z-50 mt-1 max-h-40 overflow-auto rounded-lg bg-white shadow-md">
                {allCountries.map((c) => (
                  <li
                    key={c}
                    onMouseDown={(ev) => ev.preventDefault()}
                    onClick={() => {
                      setOrigin(c);
                      setShowOriginList(false);
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setOrigin(c);
                        setShowOriginList(false);
                      }
                    }}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-slate-100"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative" ref={destRef}>
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onFocus={() => {
                setShowDestinationList(true);
                setShowOriginList(false);
              }}
              onBlur={() =>
                setTimeout(() => {
                  if (!destRef.current?.contains(document.activeElement)) {
                    setShowDestinationList(false);
                  }
                }, 100)
              }
              placeholder={isRtl ? "مقصد" : "Destination"}
              aria-label="destination"
              className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-sm w-full placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/30"
            />
            {showDestinationList && (
              <ul className="absolute left-0 right-0 z-50 mt-1 max-h-40 overflow-auto rounded-lg bg-white shadow-md">
                {destCountries.map((c) => (
                  <li
                    key={c}
                    onMouseDown={(ev) => ev.preventDefault()}
                    onClick={() => {
                      setDestination(c);
                      setShowDestinationList(false);
                    }}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setDestination(c);
                        setShowDestinationList(false);
                      }
                    }}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-slate-100"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder={isRtl ? "تاریخ" : "Date"}
            aria-label="date"
            min={today}
            className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/30"
          />

          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            aria-label="passengers"
            className="rounded-lg border border-slate-200 bg-white/95 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/30"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mt-2 flex md:mt-0 md:ml-3 md:justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-[#0dadd1] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/40"
          >
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
            {isRtl ? "ارسال به واتساپ" : "Send to WhatsApp"}
          </button>
        </div>
      </form>

      {/* (logos shown above) */}
    </section>
  );
};
