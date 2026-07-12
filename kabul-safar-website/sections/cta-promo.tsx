"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { getCtaContent } from "@/lib/data";

export const CtaPromo = () => {
  const { lang } = useI18n();
  const content = getCtaContent(lang);

  return (
    <section aria-label="فراخوان اقدام" className="grid grid-cols-2 gap-4 md:gap-6">
      <a href={CONTACT_WHATSAPP_URL} className="flex items-start gap-2">
        <Image
          src="/images/cta-phone.png"
          alt=""
          width={39}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
          aria-hidden="true"
        />
        <div className="text-right">
          <p className="text-[8px] font-bold leading-4 text-black md:text-sm">
            {content.visaTitle}
          </p>
          <p className="mt-1 text-[6px] leading-4 text-black md:text-xs md:leading-5">
            {content.visaBody}
          </p>
        </div>
      </a>

      <a href={CONTACT_WHATSAPP_URL} className="flex items-start gap-2">
        <Image
          src="/images/cta-passport.png"
          alt=""
          width={39}
          height={40}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
          aria-hidden="true"
        />
        <div className="text-right">
          <p className="text-[8px] font-bold leading-4 text-black md:text-sm">
            {content.planTitle}
          </p>
          <p className="mt-1 text-[6px] leading-4 text-black md:text-xs md:leading-5">
            {content.planBody}
          </p>
        </div>
      </a>
    </section>
  );
};
