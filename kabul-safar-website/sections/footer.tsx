"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/contact";
import { getFooterContent } from "@/lib/data";

export const Footer = () => {
  const { lang } = useI18n();
  const content = getFooterContent(lang);

  return (
    <footer
      id="contact"
      className="bg-[#284d55] px-4 pb-4 pt-5 text-white md:px-8 md:pt-8"
    >
      <div className="flex items-start justify-between gap-4 md:gap-8">
        <div className="grid flex-1 grid-cols-3 gap-2">
          {content.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-bold md:text-sm">
                {group.title}
              </h3>
              <ul className="mt-1 space-y-0.5 md:mt-2 md:space-y-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[8px] text-white/90 transition-colors hover:text-white md:text-xs"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-[181px] shrink-0 space-y-6 text-right md:w-[320px]">
          <div className="space-y-2.5">
            <div className="flex items-center justify-end gap-2">
              <Image
                src="/images/Logo.jpeg"
                alt="Kabul Safar"
                width={140}
                height={50}
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="text-[8px] leading-4 text-white/80 md:text-sm md:leading-6">
              {content.blurb}
            </p>
          </div>

          <div className="inline-flex items-center gap-2.5 rounded-[15px] border border-[rgba(137,130,130,0.38)] bg-white px-4 py-2 shadow-sm">
            <span className="text-[10px] font-semibold text-[#434040]">
              {content.follow}
            </span>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-[8px] text-white">
              f
            </div>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-[8px] text-white">
              in
            </div>
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-[8px] text-white">
              x
            </div>
          </div>
        </div>
      </div>

      {/* Embedded map of France */}
      <div className="mt-4">
        <div className="overflow-hidden rounded-lg border border-white/10">
          <iframe
            title="France map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-5.142222,41.333333,9.560000,51.089062&layer=mapnik&marker=46.2276,2.2137"
            className="w-full h-40 md:h-48"
            loading="lazy"
          />
        </div>
        <p className="mt-2 text-center text-[8px] text-white/70">
          نقشه فرانسه — منبع: OpenStreetMap
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between md:mt-8">
        <a
          href={CONTACT_PHONE_TEL}
          className="inline-flex h-[26px] items-center gap-2 rounded-[10px] bg-[#0a5174] px-3 text-[8px] font-semibold text-white md:h-10 md:rounded-xl md:px-5 md:text-sm"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10">
            ☎
          </span>
          {content.phone || CONTACT_PHONE_DISPLAY}
        </a>
      </div>

      <p className="mt-4 text-center text-[6px] text-white/50">
        {content.designer}
      </p>
    </footer>
  );
};
