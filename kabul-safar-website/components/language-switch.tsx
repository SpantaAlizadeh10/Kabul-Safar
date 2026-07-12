"use client";

import { Languages } from "lucide-react";
import { useState } from "react";
import { supportedLangs } from "@/lib/i18n";
import { useI18n } from "@/components/i18n-provider";

export function LanguageSwitch() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={t("header.lang")}
        onClick={() => setOpen((v) => !v)}
        className="flex h-5 w-5 items-center justify-center text-[#022d37] transition-opacity hover:opacity-80"
      >
        <Languages className="h-5 w-5" aria-hidden="true" />
      </button>

      <div
        className={`absolute left-0 top-7 z-30 min-w-20 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg transition-all ${
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

