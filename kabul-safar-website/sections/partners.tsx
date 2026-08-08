"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { FlightSearchForm } from "@/components/flight-search-form";
import { getPartnersTitle, partners } from "@/lib/data";

export const Partners = () => {
  const { lang } = useI18n();
  const isRtl = lang === "fa" || lang === "ps";

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
      <h3 id="flight-search-form" className="mt-4 text-center text-lg font-bold text-slate-900 md:text-center md:ml-0">
        {lang === "fa" ? "سفر خود را آغاز کنید" : lang === "ps" ? "خپل سفر پیل کړئ" : "Start your trip"}
      </h3>

      {/* Flight search form */}
      <div className="mt-4 w-full">
        <FlightSearchForm />
      </div>

      {/* (logos shown above) */}
    </section>
  );
};