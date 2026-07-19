"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getDestinationContent } from "@/lib/data";

export const Destination = () => {
  const { lang } = useI18n();
  const content = getDestinationContent(lang);
  const slides = useMemo(() => content.slides, [content.slides]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [slides.length]);

  const active = slides[activeIndex] ?? slides[0];

  return (
    <section aria-label={content.title} className="space-y-2">
      <div className="flex items-center justify-between px-1 md:mb-1">
        <a href="#" className="text-[9px] font-semibold text-[#377bc9]">
          {content.viewAll}
        </a>
        <h2 className="text-[9px] font-semibold text-black md:text-sm">{content.title}</h2>
      </div>

      <article className="relative overflow-hidden rounded-2xl md:hidden">
        <div className="relative h-[152px] w-full">
          {slides.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Image
                key={slide.id}
                src={slide.imageSrc}
                alt={slide.subtitle}
                width={152}
                height={364}
                className={`absolute inset-0 h-[152px] w-full object-cover transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"
                  }`}
                priority={idx === 0}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-[rgba(60,117,158,0.2)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-[34px] font-semibold tracking-wide text-white drop-shadow-md">
            {active.title}
          </h3>
        </div>

        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`slide ${idx + 1}`}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${idx === activeIndex ? "bg-white" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </article>

      <div className="flex items-center justify-center gap-3 text-[12px] font-semibold text-black md:hidden">
        <MapPin className="h-4 w-4 text-[#377bc9]" aria-hidden="true" />
        <span>{active.subtitle}</span>
      </div>

      <div className="hidden grid-cols-2 gap-4 md:grid">
        {slides.map((slide) => (
          <article key={`desktop-${slide.id}`} className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <div className="relative">
              <Image
                src={slide.imageSrc}
                alt={slide.subtitle}
                width={180}
                height={560}
                className={`h-[160px] w-full object-cover`}
              />
              <div className="absolute inset-0 bg-[rgba(60,117,158,0.25)]" />
              <h3 className="absolute inset-0 flex items-center justify-center text-[30px] font-semibold text-white">
                {slide.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-black">
              <MapPin className="h-4 w-4 text-[#377bc9]" aria-hidden="true" />
              <span>{slide.subtitle}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
