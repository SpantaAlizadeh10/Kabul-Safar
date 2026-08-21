"use client";

import { ArrowRight, Check, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent, getHeroContent } from "@/lib/data";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

const featureIcons = [Heart, Check, ArrowRight] as const;

function HeroTags({
  tags,
  variant,
  isRtl,
}: {
  tags: string[];
  variant: "mobile" | "desktop";
  isRtl: boolean;
}) {
  const positions = isRtl
    ? [
        "top-[18px] right-[48px]",
        "top-[210px] right-[108px]",
        "top-[320px] right-[8px]",
      ]
    : [
        "top-[18px] left-[48px]",
        "top-[210px] left-[108px]",
        "top-[320px] left-[8px]",
      ];

  return (
    <>
      {tags.map((tag, index) => {
        const percentMatch = tag.match(/^(.+?[%٪])\s*(.+)$/);

        return (
          <div
            key={tag}
            className={
              variant === "mobile"
                ? "flex items-center gap-1.5 rounded-full border border-[#e7e5df] bg-white px-3 py-2 text-center text-[11px] font-bold text-[#141d2b] shadow-[0_10px_24px_-12px_rgba(20,29,43,0.25)]"
                : `absolute z-40 flex max-w-[160px] items-center gap-1.5 rounded-full border border-[#e7e5df] bg-white px-3 py-2 text-[10.5px] font-bold leading-snug text-[#141d2b] shadow-[0_10px_24px_-12px_rgba(20,29,43,0.25)] sm:max-w-[180px] sm:px-4 sm:py-[9px] sm:text-[11.5px] ${positions[index] ?? ""}`
            }
          >
            {percentMatch ? (
              <>
                <span className="font-extrabold text-[#c1512f]">
                  {percentMatch[1]}
                </span>
                <span>{percentMatch[2]}</span>
              </>
            ) : (
              <>
                <span className="text-[15px] font-black text-[#C89A3E]">
                  &rdquo;
                </span>
                {tag}
              </>
            )}
          </div>
        );
      })}
    </>
  );
}

function ArchImage({
  src,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  className: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-t-[200px] rounded-b-2xl ${className}`}
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover"
          priority={priority}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export const Hero = () => {
  const { lang } = useI18n();
  const content = getHeroContent(lang);
  const blogImages = getBlogContent(lang)
    .posts.slice(0, 3)
    .map((post) => post.image);
  const isRtl = lang === "fa" || lang === "ps";

  const titleLine1 = isRtl
    ? `${content.titlePrefix} ${content.titleIran} ${content.titleAsia}`.trim()
    : content.titlePrefix;

  const desktopArches = isRtl
    ? [
        "absolute top-[120px] right-0 z-10 h-[260px] w-[150px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-[60px] right-[199px] z-20 h-[250px] w-[170px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-0 right-[80px] z-30 h-[300px] w-[190px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]",
      ]
    : [
        "absolute top-[120px] left-0 z-10 h-[260px] w-[150px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-[60px] left-[199px] z-20 h-[250px] w-[170px] shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
        "absolute top-0 left-[80px] z-30 h-[300px] w-[150px] shadow-[0_20px_40px_-16px_rgba(0,0,0,0.35)]",
      ];

  const mobileArches = [
    "relative z-10 h-[190px] w-[34%] max-w-[150px] shrink-0 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
    "relative z-20 -mx-3.5 mb-[30px] h-[160px] w-[30%] max-w-[130px] shrink-0 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
    "relative z-30 mb-2.5 h-[190px] w-[34%] max-w-[150px] shrink-0 shadow-[0_12px_24px_-14px_rgba(0,0,0,0.3)]",
  ];

  return (
    <section
      aria-labelledby="hero-title"
      dir={isRtl ? "rtl" : "ltr"}
      className="overflow-hidden rounded-[10px] bg-white px-5 py-6 shadow-[0_30px_70px_-30px_rgba(20,29,43,0.35)] md:rounded-2xl md:px-10 md:pb-10 md:pt-7"
    >
      <div className="mt-4 flex flex-col items-center gap-6 md:mt-7 md:flex-row md:items-center md:gap-8 lg:gap-9">
        {/* Text */}
        <div
          className={`w-full min-w-0 flex-1 ${isRtl ? "text-right" : "text-left"} text-center md:text-start`}
        >
          <h1
            id="hero-title"
            className="text-[30px] font-extrabold leading-[1.35] tracking-tight text-[#141d2b] md:text-[44px] lg:text-[52px]"
          >
            {titleLine1}
            <br className="mt-2 block" />
            {content.subTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-[440px] text-[15px] leading-[1.9] text-[#5a5f68] md:mx-0 md:mt-5 md:max-w-[420px] md:text-base md:leading-[1.85]">
            {content.description}
          </p>

          <div className="mt-5 flex flex-wrap justify-center gap-3 md:mb-9 md:justify-start">
            <a
              href={CONTACT_WHATSAPP_URL}
              className="rounded-lg bg-[#141d2b] px-[22px] py-[13px] text-[13.5px] font-bold text-white transition-transform hover:-translate-y-0.5"
            >
              {content.consultCta}
            </a>
            <Link
              href="/services"
              className="rounded-lg border-[1.4px] border-[#141d2b] px-[22px] py-[13px] text-[13.5px] font-bold text-[#141d2b] transition-transform hover:-translate-y-0.5"
            >
              {content.secondaryCta}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-5 md:mt-0 md:justify-start md:gap-[34px]">
            {content.bullets.map((label, index) => {
              const Icon = featureIcons[index] ?? Heart;
              return (
                <div
                  key={label}
                  className="max-w-[100px] text-center text-[11px] font-semibold leading-snug text-[#565a63]"
                >
                  <div className="mx-auto mb-2 flex h-[30px] w-[30px] items-center justify-center text-[#141d2b]">
                    <Icon
                      className="h-6 w-6"
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: blog images */}
        <div className="w-full md:hidden">
          <div className="flex w-full items-end justify-center">
            {blogImages.map((src, index) => (
              <ArchImage
                key={src}
                src={src}
                className={mobileArches[index] ?? mobileArches[0]}
                priority={index === 0}
                sizes="(max-width: 768px) 34vw, 150px"
              />
            ))}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <HeroTags tags={content.tags} variant="mobile" isRtl={isRtl} />
          </div>
        </div>

        {/* Desktop: blog images in arch cluster */}
        <div className="hidden min-w-0 shrink-0 md:flex md:flex-[1_1_380px] md:justify-center lg:flex-[0_0_380px]">
          <div className="relative h-[400px] w-full max-w-[380px] overflow-hidden">
            {blogImages.map((src, index) => (
              <ArchImage
                key={src}
                src={src}
                className={desktopArches[index] ?? desktopArches[0]}
                priority={index === 0}
                sizes="190px"
              />
            ))}

            <HeroTags tags={content.tags} variant="desktop" isRtl={isRtl} />
          </div>
        </div>
      </div>
    </section>
  );
};
