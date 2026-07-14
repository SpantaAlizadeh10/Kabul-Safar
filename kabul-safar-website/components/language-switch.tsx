"use client";

import { Languages } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { supportedLangs } from "@/lib/i18n";
import { useI18n } from "@/components/i18n-provider";

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label={t("header.lang")}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="flex h-5 w-5 items-center justify-center text-[#022d37] transition-opacity hover:opacity-80 z-40"
      >
        <Languages className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className={`absolute right-0 top-7 z-50 min-w-20 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg transition-all ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {supportedLangs.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => {
              setLang(l.id);
              setOpen(false);
            }}
            className={`flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold transition-colors hover:bg-slate-50 ${
              l.id === lang ? "text-[#377bc9]" : "text-slate-700"
            }`}
          >
            <span>{l.label}</span>
            <span className="text-[10px] text-slate-400">{l.dir.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

