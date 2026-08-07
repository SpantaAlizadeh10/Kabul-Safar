"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getPartnersTitle, partners, getFooterContent } from "@/lib/data";

export const Partners = () => {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";
  const [origin, setOrigin] = useState(""); // Stores IATA code
  const [destination, setDestination] = useState(""); // Stores IATA code
  const [originDisplay, setOriginDisplay] = useState(""); // Display name
  const [destinationDisplay, setDestinationDisplay] = useState(""); // Display name
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSearching(true);
    setSearchResults(null);

    try {
      const response = await fetch(`/api/flights/search?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&date=${date}&passengers=${passengers}`);
      const data = await response.json();

      if (data.success) {
        setSearchResults(data);

        // If we have an affiliate link, redirect to it
        if (data.affiliateLink) {
          window.open(data.affiliateLink, '_blank');
        }
        // If we have flight data, we could display it (for future enhancement)
        else if (data.data) {
          // For now, still redirect to affiliate link as fallback
          const affiliateUrl = `https://www.aviasales.com/search?currency=usd&locale=en&origin_iata=${origin}&destination_iata=${destination}&depart_date=${date}&adults=${passengers}`;
          window.open(affiliateUrl, '_blank');
        }
      } else {
        // Fallback to WhatsApp if API fails
        const footer = getFooterContent(lang);
        let phone = footer?.phone || "";
        phone = phone.replace(/\D/g, "");
        if (phone.startsWith("00")) phone = phone.replace(/^00/, "");
        if (phone.startsWith("+")) phone = phone.replace(/^\+/, "");

        const title = lang === "fa" ? "درخواست سفر" : lang === "ps" ? "د سفر غوښتنه" : "Trip request";
        const msgLines = [
          title,
          `${lang === "fa" ? "مبدأ" : lang === "ps" ? "مبدا" : "Origin"}: ${originDisplay || "-"}`,
          `${lang === "fa" ? "مقصد" : lang === "ps" ? "مقصد" : "Destination"}: ${destinationDisplay || "-"}`,
          `${lang === "fa" ? "تاریخ" : lang === "ps" ? "نېټه" : "Date"}: ${date || "-"}`,
          `${lang === "fa" ? "مسافران" : lang === "ps" ? "مسافرین" : "Passengers"}: ${passengers || "-"}`,
        ];
        const message = msgLines.join("\n");
        const encoded = encodeURIComponent(message);
        const waBase = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
        window.open(waBase, "_blank");
      }
    } catch (error) {
      console.error('Flight search error:', error);
      // Fallback to WhatsApp on error
      const footer = getFooterContent(lang);
      let phone = footer?.phone || "";
      phone = phone.replace(/\D/g, "");
      if (phone.startsWith("00")) phone = phone.replace(/^00/, "");
      if (phone.startsWith("+")) phone = phone.replace(/^\+/, "");

      const title = lang === "fa" ? "درخواست سفر" : lang === "ps" ? "د سفر غوښتنه" : "Trip request";
      const msgLines = [
        title,
        `${lang === "fa" ? "مبدأ" : lang === "ps" ? "مبدا" : "Origin"}: ${originDisplay || "-"}`,
        `${lang === "fa" ? "مقصد" : lang === "ps" ? "مقصد" : "Destination"}: ${destinationDisplay || "-"}`,
        `${lang === "fa" ? "تاریخ" : lang === "ps" ? "نېټه" : "Date"}: ${date || "-"}`,
        `${lang === "fa" ? "مسافران" : lang === "ps" ? "مسافرین" : "Passengers"}: ${passengers || "-"}`,
      ];
      const message = msgLines.join("\n");
      const encoded = encodeURIComponent(message);
      const waBase = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;
      window.open(waBase, "_blank");
    } finally {
      setIsSearching(false);
    }
  }

  // IATA code mappings for cities
  const cityIATAMapping: Record<string, { iata: string; fa: string; ps: string; en: string }> = {
    "KBL": { iata: "KBL", fa: "کابل", ps: "کابل", en: "Kabul" },
    "MZR": { iata: "MZR", fa: "مزار شریف", ps: "مزار شریف", en: "Mazar-i-Sharif" },
    "THR": { iata: "THR", fa: "تهران", ps: "تهران", en: "Tehran" },
    "MHD": { iata: "MHD", fa: "مشهد", ps: "مشهد", en: "Mashhad" },
    "SYZ": { iata: "SYZ", fa: "شیراز", ps: "شیراز", en: "Shiraz" },
    "IST": { iata: "IST", fa: "استانبول", ps: "استانبول", en: "Istanbul" },
    "AYT": { iata: "AYT", fa: "آنتالیا", ps: "آنتالیا", en: "Antalya" },
    "ESB": { iata: "ESB", fa: "آنکارا", ps: "آنکارا", en: "Ankara" },
    "BGW": { iata: "BGW", fa: "بغداد", ps: "بغداد", en: "Baghdad" },
    "BSR": { iata: "BSR", fa: "بصره", ps: "بصره", en: "Basra" },
    "CDG": { iata: "CDG", fa: "پاریس", ps: "پاریس", en: "Paris" },
    "ORY": { iata: "ORY", fa: "پاریس (اورلی)", ps: "پاریس (اورلی)", en: "Paris (Orly)" },
    "FRA": { iata: "FRA", fa: "فرانکفورت", ps: "فرانکفورت", en: "Frankfurt" },
    "MUC": { iata: "MUC", fa: "مونیخ", ps: "مونیخ", en: "Munich" },
    "WAW": { iata: "WAW", fa: "ورشو", ps: "ورشو", en: "Warsaw" },
    "BUD": { iata: "BUD", fa: "بوداپست", ps: "بوداپست", en: "Budapest" },
  };

  const allCities = Object.values(cityIATAMapping).map(city => ({
    iata: city.iata,
    name: lang === "fa" ? city.fa : lang === "ps" ? city.ps : city.en
  }));

  const destCities = ["KBL", "THR", "IST", "BGW"].map(iata => {
    const city = cityIATAMapping[iata];
    return {
      iata: city.iata,
      name: lang === "fa" ? city.fa : lang === "ps" ? city.ps : city.en
    };
  });

  return (
    <section
      aria-label="همکاران ما"
      className="rounded-xl bg-white px-4 py-4 md:rounded-2xl md:px-6 md:py-6"
    >
      <h2 className="text-center text-sm font-semibold text-slate-900 md:text-base">
        {getPartnersTitle(lang)}
      </h2>

      {/* Airline logos (show under title) */}
      <div className="mt-3 flex w-full items-center justify-center gap-2 px-2 md:mt-6 md:gap-8">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="flex shrink-0 items-center justify-center md:max-w-[120px]"
            style={{ width: 'calc(25% - 8px)' }}
          >
            <Image
              src={partner.src}
              alt={partner.name}
              width={partner.width * 2}
              height={partner.height * 2}
              className="h-auto w-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Search header */}
      <h3 className="mt-4 text-center text-lg font-bold text-slate-900 md:text-center md:ml-0">
        {lang === "fa" ? "سفر خود را آغاز کنید" : lang === "ps" ? "خپل سفر پیل کړئ" : "Start your trip"}
      </h3>

      {/* Flight search form */}
      <form ref={formRef} onSubmit={handleSubmit} className="mt-4 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 p-4 shadow-md md:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Origin */}
          <div className="relative" ref={originRef}>
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
              </svg>
              {lang === "fa" ? "مبدأ" : lang === "ps" ? "مبدا" : "Origin"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={originDisplay}
                onChange={(e) => {
                  setOriginDisplay(e.target.value);
                  setOrigin(""); // Reset IATA code when typing
                  setShowOriginList(true);
                }}
                onFocus={() => setShowOriginList(true)}
                placeholder={lang === "fa" ? "شهر مبدا" : lang === "ps" ? "د مبدا ښار" : "Origin city"}
                className="w-full rounded-lg border-2 border-slate-200 bg-white pl-4 pr-10 py-3 text-sm shadow-sm transition-all focus:border-blue-500 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <svg className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="6" />
              </svg>
            </div>
            {showOriginList && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border-2 border-blue-200 bg-white shadow-xl">
                {allCities.filter((c) => c.name.toLowerCase().includes(originDisplay.toLowerCase())).map((city) => (
                  <div
                    key={city.iata}
                    onClick={() => {
                      setOrigin(city.iata);
                      setOriginDisplay(city.name);
                      setShowOriginList(false);
                    }}
                    className="cursor-pointer border-b border-slate-100 px-4 py-3 text-sm transition-colors hover:bg-blue-50 last:border-0"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Destination */}
          <div className="relative" ref={destRef}>
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {lang === "fa" ? "مقصد" : lang === "ps" ? "مقصد" : "Destination"}
            </label>
            <div className="relative">
              <input
                type="text"
                value={destinationDisplay}
                onChange={(e) => {
                  setDestinationDisplay(e.target.value);
                  setDestination(""); // Reset IATA code when typing
                  setShowDestinationList(true);
                }}
                onFocus={() => setShowDestinationList(true)}
                placeholder={lang === "fa" ? "شهر مقصد" : lang === "ps" ? "د مقصد ښار" : "Destination city"}
                className="w-full rounded-lg border-2 border-slate-200 bg-white pl-4 pr-10 py-3 text-sm shadow-sm transition-all focus:border-blue-500 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <svg className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            {showDestinationList && (
              <div className="absolute z-20 mt-2 w-full rounded-xl border-2 border-blue-200 bg-white shadow-xl">
                {destCities.filter((c) => c.name.toLowerCase().includes(destinationDisplay.toLowerCase())).map((city) => (
                  <div
                    key={city.iata}
                    onClick={() => {
                      setDestination(city.iata);
                      setDestinationDisplay(city.name);
                      setShowDestinationList(false);
                    }}
                    className="cursor-pointer border-b border-slate-100 px-4 py-3 text-sm transition-colors hover:bg-blue-50 last:border-0"
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {lang === "fa" ? "تاریخ پرواز" : lang === "ps" ? "د الوتنې نېټه" : "Flight date"}
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                className="flex-1 rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition-all focus:border-blue-500 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                required
              />
              <button
                type="button"
                onClick={() => setDate(today)}
                className="rounded-xl bg-blue-100 px-4 py-3 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:bg-blue-200 hover:shadow-md"
              >
                {lang === "fa" ? "امروز" : lang === "ps" ? "نن" : "Today"}
              </button>
              <button
                type="button"
                onClick={() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  setDate(tomorrow.toISOString().split("T")[0]);
                }}
                className="rounded-xl bg-blue-100 px-4 py-3 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:bg-blue-200 hover:shadow-md"
              >
                {lang === "fa" ? "فردا" : lang === "ps" ? "پرېږده" : "Tomorrow"}
              </button>
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              {lang === "fa" ? "تعداد مسافران" : lang === "ps" ? "د مسافرینو شمېر" : "Passengers"}
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 text-sm shadow-sm transition-all focus:border-blue-500 focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <option key={num} value={num.toString()}>
                  {num} {lang === "fa" ? "نفر" : lang === "ps" ? "کس" : "passenger(s)"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search button */}
        <button
          type="submit"
          disabled={isSearching}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSearching ? (
            <>
              <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
              </svg>
              <span className="whitespace-nowrap">
                {lang === "fa" ? "در حال جستجو..." : lang === "ps" ? "لټون کیږي..." : "Searching..."}
              </span>
            </>
          ) : (
            <>
              <svg
                className="h-6 w-6"
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
              <span className="whitespace-nowrap">
                {lang === "fa" ? "جستجوی پرواز" : lang === "ps" ? "الوتنه وپلټئ" : "Search flights"}
              </span>
            </>
          )}
        </button>

        {/* External links display */}
        {searchResults && searchResults.affiliateLink && (
          <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-4 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
              <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              {lang === "fa" ? "لینک جستجوی پرواز:" : lang === "ps" ? "د الوتنې لټون لینک:" : "Flight search link:"}
            </p>
            <a
              href={searchResults.affiliateLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-sm transition-all hover:bg-blue-50 hover:shadow-md"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {lang === "fa" ? "جستجوی پرواز در Aviasales" : lang === "ps" ? "الوتنه په Aviasales کې وپلټئ" : "Search flights on Aviasales"}
            </a>
          </div>
        )}
      </form>

      {/* (logos shown above) */}
    </section>
  );
};
