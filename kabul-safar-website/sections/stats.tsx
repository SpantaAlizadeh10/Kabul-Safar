"use client";

import { useI18n } from "@/components/i18n-provider";
import { getStatsContent } from "@/lib/data";

export const Stats = () => {
  const { lang } = useI18n();
  const content = getStatsContent(lang);

  return (
    <section aria-labelledby="stats-title" className="space-y-3">
      <h2 id="stats-title" className="text-center text-[10px] font-bold text-black md:text-2xl">
        {content.title}
      </h2>

      <div className="flex justify-between gap-2 md:gap-5">
        {content.stats.map((stat) => (
          <article
            key={stat.id}
            className="flex h-[65px] w-full max-w-[66px] flex-col items-center justify-center rounded-[10px] bg-[#f6f8f8] px-1 py-2 text-center md:h-[120px] md:max-w-none md:flex-1 md:rounded-2xl"
          >
            <p className="text-base font-medium tracking-wider text-[#0dadd1] md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-[6px] font-medium tracking-wide text-[#333] md:text-sm">
              {stat.label}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};
