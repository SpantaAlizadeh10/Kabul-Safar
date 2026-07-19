"use client";

import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { ConsultButton } from "@/components/consult-button";
import { getServiceFeatureContent } from "@/lib/data";

export const ServiceFeature = () => {
  const { lang } = useI18n();
  const content = getServiceFeatureContent(lang);

  return (
    <section aria-labelledby="service-feature-title">
      <div className="flex gap-3 md:items-center md:gap-6">
        <div className="relative h-44.75 w-[42%] shrink-0 overflow-hidden rounded-[26px] md:h-85 md:w-[34%]">
          <Image
            src="/images/bamiyan.jpg"
            alt="بت‌های بامیان"
            width={152}
            height={179}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center text-right">
          <h2
            id="service-feature-title"
            className="text-xs font-semibold leading-5 text-black md:text-3xl md:leading-tight"
          >
            {content.titlePrefix}{" "}
            <span className="text-[#0dadd1]">{content.titleAccent}</span>{" "}
            {content.titleSuffix}
          </h2>
          <p className="mt-2 text-[8px] leading-4 tracking-wide text-[rgba(59,57,57,0.96)] md:mt-4 md:text-sm md:leading-7">
            {content.body}
          </p>
          <div className="mt-3 flex items-center justify-end gap-2 md:mt-5 md:gap-3">
            <span className="inline-flex h-5.25 items-center rounded-[10px] bg-[#0dadd1] px-2.5 text-[8px] font-semibold text-white md:h-9 md:rounded-xl md:px-4 md:text-sm">
              {content.discount}
            </span>
            <ConsultButton
              compact
              className="h-8 px-3 text-[10px] md:h-10 md:px-4 md:text-xs"
              label={
                lang === "fa"
                  ? "ویزای سریع"
                  : lang === "en"
                    ? "Quick visa"
                    : "ژر ویزه"
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};
