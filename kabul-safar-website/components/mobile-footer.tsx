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
    <nav className="fixed bottom-3 left-3 right-3 z-40 md:hidden">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg shadow-black/5 border border-white/30">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative group flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ease-out
                  ${isActive
                    ? "text-white"
                    : "text-gray-400"
                  }
                `}
              >
                {/* Background with gradient */}
                <div className={`
                  absolute inset-0 rounded-xl transition-all duration-300 ease-out
                  ${isActive
                    ? "bg-gradient-to-br from-[#0dadd1] to-[#0a8bb0] shadow-md shadow-[#0dadd1]/30 scale-100"
                    : "bg-transparent scale-95 group-hover:bg-gradient-to-br group-hover:from-[#0dadd1]/8 group-hover:to-[#0a8bb0]/8 group-hover:scale-100"
                  }
                `} />

                {/* Icon container */}
                <span className={`
                  relative z-10 transition-all duration-300 ease-out
                  ${isActive ? "scale-105" : "group-hover:scale-100"}
                `}>
                  {item.icon}
                </span>

                {/* Label */}
                <span className="relative z-10 text-[10px] font-medium transition-all duration-300">
                  {item.label}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -top-1.5 z-20">
                    <span className="flex h-4 w-4 items-center justify-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0dadd1]" />
                    </span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
