"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/components/i18n-provider";
import { getTestimonialsContent } from "@/lib/data";

export const Testimonials = () => {
  const { lang } = useI18n();
  const content = getTestimonialsContent(lang);

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="space-y-3">
      <h2
        id="testimonials-title"
        className="text-right text-xs font-bold text-black md:text-2xl"
      >
        {content.title}
      </h2>

      <div className="flex gap-3 overflow-x-auto px-1 pb-2 pt-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0 md:pt-6">
        {content.testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="relative min-w-[180px] rounded-xl bg-white px-3 pb-3 pt-8 shadow-sm md:min-w-0 md:rounded-xl md:px-4 md:pb-4 md:pt-10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
              />
            </div>

            <div className="absolute bottom-2 left-2 h-5 w-1 rounded-full bg-[#0dadd1]" />
            <div className="absolute right-1 top-1 h-5 w-1 rounded-full bg-[#0dadd1]" />

            <div className="flex justify-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-2 w-2 fill-[#377bc9] text-[#377bc9]"
                  aria-hidden="true"
                />
              ))}
            </div>

            <p className="mt-2 text-right text-[6px] font-bold leading-4 text-black md:text-xs md:leading-6">
              {testimonial.message}
            </p>

            <div className="mt-2 text-right">
              <p className="text-[6px] font-bold text-black md:text-sm">{testimonial.name}</p>
              <p className="text-[4px] text-[rgba(0,0,0,0.67)] md:text-[10px]">{testimonial.role}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
