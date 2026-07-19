"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_DISPLAY_2, CONTACT_PHONE_TEL, CONTACT_PHONE_TEL_2 } from "@/lib/contact";
import { getFooterContent } from "@/lib/data";

export const Footer = () => {
  const { lang } = useI18n();
  const content = getFooterContent(lang);

  return (
    <footer
      id="contact"
      className="bg-[#284d55] px-4 pb-3 pt-5 text-white md:px-8 md:pt-8"
    >
      <div className="flex items-start justify-between gap-4 md:gap-8">
        <div className="grid flex-1 grid-cols-3 gap-2">
          {content.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-[10px] font-bold md:text-sm">
                {group.title}
              </h3>
              <ul className="mt-1 space-y-0 md:mt-2 md:space-y-1">
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

        <div className="w-45.25 shrink-0 space-y-2.5 text-right md:w-[320px]">
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

          <div className="flex items-center justify-end gap-2">
            <a
              href={CONTACT_PHONE_TEL}
              className="inline-flex h-6.5 min-w-[100px] items-center gap-2 rounded-2.5xl bg-[#0a5174] px-2.5 text-[8px] font-semibold text-white whitespace-nowrap md:h-10 md:min-w-[140px] md:rounded-xl md:px-4 md:text-sm"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                ☎
              </span>
              <span dir="ltr">{content.phone || CONTACT_PHONE_DISPLAY}</span>
            </a>
            <a
              href={CONTACT_PHONE_TEL_2}
              className="inline-flex h-6.5 min-w-[100px] items-center gap-2 rounded-2.5xl bg-[#0a5174] px-2.5 text-[8px] font-semibold text-white whitespace-nowrap md:h-10 md:min-w-[140px] md:rounded-xl md:px-4 md:text-sm"
            >
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                ☎
              </span>
              <span dir="ltr">{CONTACT_PHONE_DISPLAY_2}</span>
            </a>
            <div className="inline-flex items-center gap-2.5 rounded-[15px] border border-[rgba(137,130,130,0.38)] bg-white px-4 py-2 shadow-sm">
              <span className="text-[10px] font-semibold text-[#434040]">
                {content.follow}
              </span>
              <a
                href="https://www.instagram.com/kabulsafar?igsh=c3dwaDBldTM2OTdn"
                target="_blank"
                rel="noreferrer"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390]"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
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
                href="https://youtube.com/@kabulsafar?si=BohGpBLBBrZ9dVqh"
                target="_blank"
                rel="noreferrer"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390]"
                aria-label="YouTube"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
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
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390]"
                aria-label="TikTok"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 8c2 .5 3.5 1.5 4 4s0 5-3 5a3.5 3.5 0 01-3.5-3.5" />
                  <path d="M16 8v5a3 3 0 01-3 3" />
                  <path d="M16 8h3" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://www.threads.com/@kabulsafar28"
                target="_blank"
                rel="noreferrer"
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#377bc9] text-white transition-colors hover:bg-[#2c6390]"
                aria-label="Threads"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
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
