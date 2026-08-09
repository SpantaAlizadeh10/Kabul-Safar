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
      className="bg-gradient-to-b from-[#284d55] to-[#1a3a40] px-4 pb-6 pt-8 text-white md:px-8 md:pt-12"
    >
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-start md:justify-between md:gap-12">
        <div className="grid w-full grid-cols-3 gap-4 md:flex-1">
          {content.groups.map((group) => (
            <div key={group.title} className="min-w-0">
              <h3 className="text-xs font-bold md:text-base whitespace-nowrap text-white/95">
                {group.title}
              </h3>
              <ul className="mt-2 space-y-1.5 md:mt-3 md:space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[9px] text-white/80 transition-all hover:text-white hover:translate-x-1 md:text-xs block truncate"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="w-full shrink-0 space-y-4 text-right md:w-[340px]">
          <div className="flex items-center justify-between gap-6">
            <div className="flex shrink-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0dadd1] to-[#377bc9] blur-md opacity-50"></div>
                <Image
                  src="/images/Logo.jpeg"
                  alt="Kabul Safar"
                  width={70}
                  height={70}
                  priority
                  className="relative rounded-full border-2 border-white/20"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2.5">
              <a
                href={CONTACT_PHONE_TEL}
                className="inline-flex h-8 min-w-[110px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0a5174] to-[#0d6a8a] px-3 text-[9px] font-semibold text-white whitespace-nowrap shadow-lg transition-all hover:from-[#0d6a8a] hover:to-[#0a5174] hover:shadow-xl md:h-11 md:min-w-[150px] md:px-4 md:text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  ☎
                </span>
                <span dir="ltr">{content.phone || CONTACT_PHONE_DISPLAY_FORMATTED}</span>
              </a>
              <a
                href={CONTACT_PHONE_TEL_2}
                className="inline-flex h-8 min-w-[110px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#0a5174] to-[#0d6a8a] px-3 text-[9px] font-semibold text-white whitespace-nowrap shadow-lg transition-all hover:from-[#0d6a8a] hover:to-[#0a5174] hover:shadow-xl md:h-11 md:min-w-[150px] md:px-4 md:text-sm"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  ☎
                </span>
                <span dir="ltr">{CONTACT_PHONE_DISPLAY_2_FORMATTED}</span>
              </a>
            </div>
          </div>
          <p className="text-[9px] leading-5 text-white/85 md:text-sm md:leading-6">
            {content.blurb}
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] px-5 py-3 text-[11px] font-semibold text-white shadow-lg transition-all hover:from-[#0a9bbf] hover:to-[#2d6aa8] hover:shadow-xl hover:-translate-y-0.5 md:text-sm"
            >
              {lang === "fa" ? "مشاهده خدمات" : lang === "ps" ? "خدمتونه وګورئ" : "View Services"}
            </a>
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-sm shadow-md">
              <span className="text-[11px] font-semibold text-white/95">
                {content.follow}
              </span>
              <a
                href="https://www.instagram.com/kabulsafar?igsh=c3dwaDBldTM2OTdn"
                target="_blank"
                rel="noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#377bc9] text-white transition-all hover:bg-[#2c6390] hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#377bc9] text-white transition-all hover:bg-[#2c6390] hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@kabulsafar?si=BohGpBLBBrZ9dVqh"
                target="_blank"
                rel="noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#377bc9] text-white transition-all hover:bg-[#2c6390] hover:scale-110"
                aria-label="YouTube"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#377bc9] text-white transition-all hover:bg-[#2c6390] hover:scale-110"
                aria-label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a
                href="https://www.threads.com/@kabulsafar28"
                target="_blank"
                rel="noreferrer"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-[#377bc9] text-white transition-all hover:bg-[#2c6390] hover:scale-110"
                aria-label="Threads"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
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

      {/* Embedded map of Stockholm, Sweden */}
      <div className="mt-8">
        <div className="overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
          <iframe
            title="Stockholm, Sweden map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=17.5,59.0,18.5,59.6&layer=mapnik&marker=59.3293,18.0686"
            className="w-full h-48 md:h-56"
            loading="lazy"
          />
        </div>
        <p className="mt-3 text-center text-[9px] text-white/60 md:text-xs">
          نقشه استکهلم، سوئد — منبع: OpenStreetMap
        </p>
      </div>

      <div className="mt-6 border-t border-white/10 pt-4">
        <p className="text-center text-[8px] text-white/40 md:text-xs">
          {content.designer}
        </p>
      </div>
    </footer>
  );
};
