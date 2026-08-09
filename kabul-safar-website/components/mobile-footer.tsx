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
          className="h-6 w-6"
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
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      href: "/flights",
      label: lang === "fa" ? "جستجو بلیط" : lang === "ps" ? "د لټون" : "Search",
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
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
          className="h-6 w-6"
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
          className="h-6 w-6"
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
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#0dadd1]/20 to-[#377bc9]/20 rounded-3xl blur-xl opacity-50" />

        {/* Main container */}
        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/10 border border-white/40 overflow-hidden">
          {/* Top gradient line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0dadd1] via-[#377bc9] to-[#0dadd1]" />

          <div className="flex items-center justify-around py-3 px-4">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative group flex flex-col items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl transition-all duration-500 ease-out
                    ${isActive
                      ? "text-white transform -translate-y-1"
                      : "text-gray-400"
                    }
                  `}
                >
                  {/* Animated background */}
                  <div className={`
                    absolute inset-0 rounded-2xl transition-all duration-500 ease-out
                    ${isActive
                      ? "bg-gradient-to-br from-[#0dadd1] to-[#377bc9] shadow-lg shadow-[#0dadd1]/40 scale-100"
                      : "bg-transparent scale-95 group-hover:bg-gradient-to-br group-hover:from-[#0dadd1]/5 group-hover:to-[#377bc9]/5 group-hover:scale-100"
                    }
                  `} />

                  {/* Icon container with glow */}
                  <span className={`
                    relative z-10 transition-all duration-500 ease-out
                    ${isActive ? "scale-110 drop-shadow-md" : "group-hover:scale-105"}
                  `}>
                    {item.icon}
                  </span>

                  {/* Label */}
                  <span className="relative z-10 text-[10px] font-semibold transition-all duration-500">
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute -top-2 z-20 animate-pulse">
                      <span className="flex h-5 w-5 items-center justify-center">
                        <span className="h-2 w-2 rounded-full bg-[#0dadd1] shadow-lg shadow-[#0dadd1]/50" />
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
