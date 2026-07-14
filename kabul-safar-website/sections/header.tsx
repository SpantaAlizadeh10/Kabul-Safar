"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  FileText,
  Globe2,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  PhoneCall,
  Plane,
} from "lucide-react";
import { LanguageSwitch } from "@/components/language-switch";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { getNavItems } from "@/lib/data";
import { useI18n } from "@/components/i18n-provider";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

export const Header = () => {
  const { isOpen, toggle, close } = useMobileMenu();
  const { lang } = useI18n();
  const pathname = usePathname();
  const navItems = getNavItems(lang);
  const sidebarLabels =
    lang === "en"
      ? {
          home: "Home",
          article: "Article",
          visaAfghanistan: "Afghan visa",
          visaIran: "Iran visa",
          visaTurkey: "Turkey visa",
          visaIraq: "Iraq visa",
          about: "About us",
          contact: "Contact us",
          theme: "Theme",
          logout: "Logout",
        }
      : lang === "ps"
        ? {
            home: "کور",
            article: "مقاله",
            blog: "بلاګ",
            visaAfghanistan: "د افغانستان ویزه",
            visaIran: "د ایران ویزه",
            visaTurkey: "د ترکیې ویزه",
            visaIraq: "د عراق ویزه",
            about: "زموږ په اړه",
            contact: "له موږ سره اړیکه",
            theme: "تم",
            logout: "وتل",
          }
        : {
            home: "خانه",
            article: "مقاله",
            blog: "مقالات",
            visaAfghanistan: "ویزای افغانستان",
            visaIran: "ویزای ایران",
            visaTurkey: "ویزای ترکیه",
            visaIraq: "ویزای عراق",
            about: "درباره ما",
            contact: "تماس با ما",
            theme: "تم",
            logout: "خروج",
          };
  const sidebarItems = [
    { label: sidebarLabels.home, href: "/", icon: Home, active: true },
    {
      label: sidebarLabels.blog ?? sidebarLabels.article,
      href: "/blog",
      icon: FileText,
    },
    { label: sidebarLabels.visaAfghanistan, href: "/services", icon: Plane },
    { label: sidebarLabels.visaIran, href: "/services", icon: Plane },
    { label: sidebarLabels.visaTurkey, href: "/services", icon: Plane },
    { label: sidebarLabels.visaIraq, href: "/services", icon: Plane },
    { label: sidebarLabels.about, href: "/about", icon: Globe2 },
    { label: sidebarLabels.contact, href: "/contact", icon: PhoneCall },
  ];

  return (
    <header id="home" className="relative">
      <nav
        aria-label="منوی اصلی"
        dir="ltr"
        className="grid grid-cols-3 items-center rounded-[26px] bg-white px-5 py-4 shadow-sm md:grid-cols-[auto_1fr_auto] md:px-6"
      >
        <div className="flex items-center justify-start">
          <a
            href={CONTACT_WHATSAPP_URL}
            aria-label="تماس واتساپ"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-85"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="flex items-center justify-center">
          <Link
            href="/"
            aria-label="صفحه اصلی - Kabul Safar"
            className="md:hidden rounded-full overflow-hidden"
          >
            <Image
              src="/Logo.jpeg"
              alt="Kabul Safar"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          </Link>

          <div
            dir="ltr"
            className="hidden items-center gap-8 md:flex md:flex-row"
          >
            {navItems
              .slice()
              .reverse()
              .map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={`desktop-${item.href}`}
                    href={item.href}
                    className={`text-sm font-semibold transition-colors hover:text-[#377bc9] ${isActive ? "text-[#0f3e66]" : "text-slate-700"}`}
                  >
                    <span className="relative inline-flex items-center">
                      {item.label}
                      {isActive ? (
                        <span className="absolute inset-x-0 -bottom-2 mx-auto h-0.5 w-full rounded-full bg-[#0dadd1]" />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/"
              aria-label="صفحه اصلی - Kabul Safar"
              className="rounded-full overflow-hidden"
            >
              <Image
                src="/Logo.jpeg"
                alt="Kabul Safar"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-cover"
              />
            </Link>
            <LanguageSwitch />
          </div>
          <div className="md:hidden">
            <LanguageSwitch />
          </div>
          <button
            aria-label={isOpen ? "بستن منو" : "باز کردن منو"}
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f5f7fb] transition-opacity hover:bg-[#eef4fb] md:hidden z-50"
            type="button"
          >
            <Menu className="h-5 w-5 text-[#022d37]" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/20 px-2 py-1 md:hidden"
          onClick={close}
          role="presentation"
        >
          <aside
            className="absolute right-0 top-0 h-full w-[50vw] max-w-65 rounded-[14px] border-2 border-[#91D8E7] bg-[#f1f1f1] p-5 shadow-xl z-50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between" dir="ltr">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#377bc9] text-white">
                  <Globe2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-[#111]">
                  Kabul Safar
                </span>
              </div>
              <button
                type="button"
                aria-label="بستن منو"
                onClick={close}
                className="text-[#222]"
              >
                <ChevronDown className="h-7 w-7" />
              </button>
            </div>

            <div className="my-6 h-px bg-[#2b2b2b]" />

            <div className="space-y-3">
              {sidebarItems.map((item) => (
                <Link
                  key={`${item.label}-${item.href}`}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center justify-between rounded-full px-5 py-3 text-right text-[15px] font-semibold ${
                    item.active
                      ? "bg-[#A7DBEA] text-[#111]"
                      : "bg-[#fbfbfb] text-[#111]"
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="my-6 h-px bg-[#2b2b2b]" />

            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-full bg-[#fbfbfb] px-5 py-3 text-[15px] font-semibold text-[#111]">
                <Moon className="h-5 w-5" aria-hidden="true" />
                <span>{sidebarLabels.theme}</span>
              </div>
              <button
                type="button"
                onClick={close}
                className="flex w-full items-center justify-between rounded-full bg-[#fbfbfb] px-5 py-3 text-[15px] font-semibold text-[#111]"
              >
                <LogOut className="h-5 w-5" aria-hidden="true" />
                <span>{sidebarLabels.logout}</span>
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
};
