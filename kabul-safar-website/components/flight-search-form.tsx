"use client";

import { useState, useEffect, useRef } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getFooterContent } from "@/lib/data";
import { Search, Calendar, Users, Plane, ArrowRightLeft } from "lucide-react";

export const FlightSearchForm = () => {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [returnDate, setReturnDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [originDisplay, setOriginDisplay] = useState("");
  const [destinationDisplay, setDestinationDisplay] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [showOriginList, setShowOriginList] = useState(false);
  const [showDestinationList, setShowDestinationList] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const originRef = useRef<HTMLDivElement | null>(null);
  const destRef = useRef<HTMLDivElement | null>(null);

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

  const swapCities = () => {
    const tempOrigin = origin;
    const tempOriginDisplay = originDisplay;
    setOrigin(destination);
    setOriginDisplay(destinationDisplay);
    setDestination(tempOrigin);
    setDestinationDisplay(tempOriginDisplay);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSearching(true);

    try {
      const params = new URLSearchParams({
        origin,
        destination,
        date,
        passengers,
        tripType,
      });

      if (tripType === "round-trip" && returnDate) {
        params.append("returnDate", returnDate);
      }

      const response = await fetch(`/api/flights/search?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        // If we have an affiliate link, redirect to it
        if (data.affiliateLink) {
          window.open(data.affiliateLink, '_blank');
        }
        // If we have flight data, we could display it (for future enhancement)
        else if (data.data) {
          // For now, still redirect to affiliate link as fallback
          let affiliateUrl = `https://www.aviasales.com/search?currency=usd&locale=en&origin_iata=${origin}&destination_iata=${destination}&depart_date=${date}&adults=${passengers}`;
          if (tripType === "round-trip" && returnDate) {
            affiliateUrl += `&return_date=${returnDate}`;
          }
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Trip Type Selector */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => {
            setTripType("one-way");
            setReturnDate("");
          }}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${tripType === "one-way"
            ? "bg-gradient-to-r from-[#0dadd1] to-[#377bc9] text-white shadow-lg"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
        >
          {lang === "fa" ? "رفت" : lang === "ps" ? "رفت" : "One-way"}
        </button>
        <button
          type="button"
          onClick={() => setTripType("round-trip")}
          className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${tripType === "round-trip"
            ? "bg-gradient-to-r from-[#0dadd1] to-[#377bc9] text-white shadow-lg"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
        >
          {lang === "fa" ? "رفت و برگشت" : lang === "ps" ? "رفت او ورست" : "Round-trip"}
        </button>
      </div>

      {/* Origin and Destination */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Origin */}
        <div ref={originRef} className="relative md:col-span-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {lang === "fa" ? "مبدأ" : lang === "ps" ? "مبدا" : "From"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={originDisplay}
              onChange={(e) => {
                setOriginDisplay(e.target.value);
                const matched = allCities.find(c => c.name.includes(e.target.value));
                if (matched) {
                  setOrigin(matched.iata);
                }
              }}
              onFocus={() => setShowOriginList(true)}
              placeholder={lang === "fa" ? "شهر مبدا" : lang === "ps" ? "د مبدا ښار" : "Origin city"}
              className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'}`}
            />
            <Plane className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`} />
          </div>
          {showOriginList && (
            <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
              {allCities.map((city) => (
                <button
                  key={city.iata}
                  type="button"
                  onClick={() => {
                    setOrigin(city.iata);
                    setOriginDisplay(city.name);
                    setShowOriginList(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {city.name} ({city.iata})
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <div className="hidden md:flex items-center justify-center md:col-span-2">
          <button
            type="button"
            onClick={swapCities}
            className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all hover:scale-110"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>
        </div>

        {/* Destination */}
        <div ref={destRef} className="relative md:col-span-5">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {lang === "fa" ? "مقصد" : lang === "ps" ? "مقصد" : "To"}
          </label>
          <div className="relative">
            <input
              type="text"
              value={destinationDisplay}
              onChange={(e) => {
                setDestinationDisplay(e.target.value);
                const matched = allCities.find(c => c.name.includes(e.target.value));
                if (matched) {
                  setDestination(matched.iata);
                }
              }}
              onFocus={() => setShowDestinationList(true)}
              placeholder={lang === "fa" ? "شهر مقصد" : lang === "ps" ? "د مقصد ښار" : "Destination city"}
              className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'}`}
            />
            <Plane className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4 rotate-180' : 'right-4 rotate-180'}`} />
          </div>
          {showDestinationList && (
            <div className="absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
              {allCities.map((city) => (
                <button
                  key={city.iata}
                  type="button"
                  onClick={() => {
                    setDestination(city.iata);
                    setDestinationDisplay(city.name);
                    setShowDestinationList(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {city.name} ({city.iata})
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date and Passengers */}
      <div className={`grid gap-4 ${tripType === "round-trip" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
        {/* Departure Date */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {lang === "fa" ? "تاریخ رفت" : lang === "ps" ? "د رفت نېټه" : "Departure Date"}
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={today}
                required
                className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-4 pl-4' : 'pl-4 pr-4'}`}
              />
            </div>
            <button
              type="button"
              onClick={() => setDate(today)}
              className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-3 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow-md border border-blue-200"
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
              className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-3 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow-md border border-blue-200"
            >
              {lang === "fa" ? "فردا" : lang === "ps" ? "پرېږده" : "Tomorrow"}
            </button>
          </div>
        </div>

        {/* Return Date (only for round-trip) */}
        {tripType === "round-trip" && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              {lang === "fa" ? "تاریخ برگشت" : lang === "ps" ? "د ورست نېټه" : "Return Date"}
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={date || today}
                  required={tripType === "round-trip"}
                  className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all ${isRtl ? 'pr-4 pl-4' : 'pl-4 pr-4'}`}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const nextDay = new Date(date || today);
                  nextDay.setDate(nextDay.getDate() + 1);
                  setReturnDate(nextDay.toISOString().split("T")[0]);
                }}
                className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-3 text-xs font-semibold text-blue-700 shadow-sm transition-all hover:from-blue-100 hover:to-blue-200 hover:shadow-md border border-blue-200"
              >
                {lang === "fa" ? "روز بعد" : lang === "ps" ? "بل ورځ" : "+1 Day"}
              </button>
            </div>
          </div>
        )}

        {/* Passengers */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            {lang === "fa" ? "تعداد مسافران" : lang === "ps" ? "د مسافرینو شمیر" : "Passengers"}
          </label>
          <div className="relative">
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className={`w-full rounded-xl border-2 border-slate-200 py-3 text-base text-slate-900 focus:border-[#0dadd1] focus:outline-none focus:ring-2 focus:ring-[#0dadd1]/20 transition-all appearance-none ${isRtl ? 'pr-14 pl-4' : 'pl-14 pr-4'}`}
            >
              <option value="1">1 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passenger"}</option>
              <option value="2">2 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
              <option value="3">3 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
              <option value="4">4 {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
              <option value="5">5+ {lang === "fa" ? "مسافر" : lang === "ps" ? "مسافر" : "Passengers"}</option>
            </select>
            <Users className={`absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none ${isRtl ? 'left-4' : 'right-4'}`} />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSearching}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:from-[#0a9bbf] hover:to-[#2d6aa8] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSearching ? (
          <>
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            {lang === "fa" ? "در حال جستجو..." : lang === "ps" ? "په لټون کې..." : "Searching..."}
          </>
        ) : (
          <>
            <Search className="h-5 w-5" />
            {lang === "fa" ? "جستجوی پرواز" : lang === "ps" ? "الوتنه وپلټئ" : "Search Flights"}
          </>
        )}
      </button>
    </form>
  );
};