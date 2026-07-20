"use client";

import { Globe, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supportedLangs } from "@/lib/i18n";
import { useI18n } from "@/components/i18n-provider";

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        aria-label={t("header.lang")}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-[#377bc9] px-3 py-1.5 text-white transition-opacity hover:opacity-85"
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs font-semibold">
          {supportedLangs.find((l) => l.id === lang)?.label || lang}
        </span>
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      <div
        className={`absolute left-0 top-7 z-30 min-w-20 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg transition-all ${open ? "opacity-100" : "pointer-events-none opacity-0"
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
            className={`flex w-full items-center justify-between px-3 py-2 text-[11px] font-semibold transition-colors hover:bg-slate-50 ${l.id === lang ? "text-[#377bc9]" : "text-slate-700"
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

