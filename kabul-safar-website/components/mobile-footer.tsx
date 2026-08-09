"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";

export const MobileFooter = () => {
  const pathname = usePathname();
  const { lang } = useI18n();

  const navItems = [
    {
      href: "/",
      label: lang === "fa" ? "خانه" : lang === "ps" ? "کور" : "Home",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      href: "/services",
      label: lang === "fa" ? "خدمات" : lang === "ps" ? "خدمتونه" : "Services",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
          <path d="M12 15l-3-3a22 22 0 01 2-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
    },
    {
      href: "/flights",
      label: lang === "fa" ? "جستجو بلیط" : lang === "ps" ? "د لټون" : "Search",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      href: "/blog",
      label: lang === "fa" ? "مقاله" : lang === "ps" ? "مقاله" : "Blog",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      ),
    },
    {
      href: "/about",
      label: lang === "fa" ? "درباره ما" : lang === "ps" ? "زمونږ په اړه" : "About",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="fixed bottom-3 left-3 right-3 z-50 md:hidden">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0dadd1]/15 to-[#377bc9]/15 rounded-2xl blur-lg opacity-40" />

        {/* Main container */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/10 border border-white/40 overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0dadd1] via-[#377bc9] to-[#0dadd1]" />

          <div className="flex items-center justify-around py-2 px-3">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative group flex flex-col items-center justify-center gap-1 px-4 py-1.5 rounded-xl transition-all duration-400 ease-out
                    ${isActive
                      ? "text-white transform -translate-y-0.5"
                      : "text-gray-400"
                    }
                  `}
                >
                  {/* Animated background */}
                  <div className={`
                    absolute inset-0 rounded-xl transition-all duration-400 ease-out
                    ${isActive
                      ? "bg-gradient-to-br from-[#0dadd1] to-[#377bc9] shadow-md shadow-[#0dadd1]/30 scale-100"
                      : "bg-transparent scale-95 group-hover:bg-gradient-to-br group-hover:from-[#0dadd1]/5 group-hover:to-[#377bc9]/5 group-hover:scale-100"
                    }
                  `} />

                  {/* Icon container */}
                  <span className={`
                    relative z-10 transition-all duration-400 ease-out
                    ${isActive ? "scale-105" : "group-hover:scale-100"}
                  `}>
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span className="relative z-10 text-[9px] font-medium transition-all duration-400">
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -top-1.5 z-20">
                      <span className="flex h-4 w-4 items-center justify-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0dadd1] shadow-md shadow-[#0dadd1]/40" />
                      </span>
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
