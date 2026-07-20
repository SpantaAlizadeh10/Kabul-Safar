"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_DISPLAY_2, CONTACT_PHONE_DISPLAY_FORMATTED, CONTACT_PHONE_DISPLAY_2_FORMATTED, CONTACT_PHONE_TEL, CONTACT_PHONE_TEL_2 } from "@/lib/contact";
import { getFooterContent } from "@/lib/data";

export const Footer = () => {
  const { lang } = useI18n();
  const content = getFooterContent(lang);

  return (
    <footer
      id="contact"
      className="bg-[#284d55] px-4 pb-3 pt-5 text-white md:px-8 md:pt-8"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-2">
          {content.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-bold md:text-sm">
                {group.title}
              </h3>
              <ul className="mt-0.5 space-y-0.5 md:mt-2 md:space-y-1">
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

        <div className="w-full shrink-0 space-y-2 text-right md:w-[320px] md:space-y-2.5">
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

          <div className="flex flex-col items-end gap-2">
            <a
              href={CONTACT_PHONE_TEL}
              className="inline-flex h-6.5 min-w-[100px] items-center gap-2 rounded-2.5xl bg-[#0a5174] px-2.5 text-[8px] font-semibold text-white whitespace-nowrap md:h-10 md:min-w-[140px] md:rounded-xl md:px-4 md:text-sm"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                ☎
              </span>
              <span dir="ltr">{content.phone || CONTACT_PHONE_DISPLAY_FORMATTED}</span>
            </a>
            <a
              href={CONTACT_PHONE_TEL_2}
              className="inline-flex h-6.5 min-w-[100px] items-center gap-2 rounded-2.5xl bg-[#0a5174] px-2.5 text-[8px] font-semibold text-white whitespace-nowrap md:h-10 md:min-w-[140px] md:rounded-xl md:px-4 md:text-sm"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                ☎
              </span>
              <span dir="ltr">{CONTACT_PHONE_DISPLAY_2_FORMATTED}</span>
            </a>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-[15px] border border-[rgba(137,130,130,0.38)] bg-white px-3 py-1.5 shadow-sm md:flex-nowrap md:gap-2.5 md:px-4 md:py-2">
              <span className="text-[9px] font-semibold text-[#434040] md:text-[10px]">
                {content.follow}
              </span>
              <a
                href="https://www.instagram.com/kabulsafar?igsh=c3dwaDBldTM2OTdn"
                target="_blank"
                rel="noreferrer"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390] md:h-5 md:w-5"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 md:h-4 md:w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="5" />
                  <circle cx="12" cy="12" r="3.5" />
                  <path d="M16.5 7.5h.01" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/17xH3H7WbN/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390] md:h-5 md:w-5"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 md:h-4 md:w-4"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@kabulsafar?si=BohGpBLBBrZ9dVqh"
                target="_blank"
                rel="noreferrer"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390] md:h-5 md:w-5"
                aria-label="YouTube"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 md:h-4 md:w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="18" height="12" rx="4" />
                  <polygon points="10 9 16 12 10 15 10 9" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@kabul.safar?_r=1&_t=ZN-97zx2im1yJK"
                target="_blank"
                rel="noreferrer"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390] md:h-5 md:w-5"
                aria-label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 md:h-4 md:w-4"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.threads.com/@kabulsafar28"
                target="_blank"
                rel="noreferrer"
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390] md:h-5 md:w-5"
                aria-label="Threads"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3 w-3 md:h-4 md:w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20a7.5 7.5 0 010-15" />
                  <path d="M12 5.5c2.5 0 4.5 2 4.5 4.5 0 3-3 5-4.5 5-2 0-3-1-3-2.5" />
                </svg>
              </a>
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

      <p className="mt-4 text-center text-[6px] text-white/50">
        {content.designer}
      </p>
    </footer>
  );
};
