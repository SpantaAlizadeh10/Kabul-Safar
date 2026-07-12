export type Lang = "fa" | "en" | "ps";

export const supportedLangs: { id: Lang; label: string; dir: "rtl" | "ltr" }[] = [
  { id: "fa", label: "FA", dir: "rtl" },
  { id: "en", label: "EN", dir: "ltr" },
  { id: "ps", label: "PS", dir: "rtl" },
];

type Dict = Record<string, string>;

export const dictionaries: Record<Lang, Dict> = {
  fa: {
    "nav.home": "صفحه اصلی",
    "nav.services": "خدمات",
    "nav.about": "درباره ما",
    "nav.testimonials": "نظرات",
    "header.lang": "تغییر زبان",
    "dir": "rtl",
  },
  en: {
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.about": "About",
    "nav.testimonials": "Reviews",
    "header.lang": "Language",
    "dir": "ltr",
  },
  ps: {
    "nav.home": "کور",
    "nav.services": "خدمتونه",
    "nav.about": "زموږ په اړه",
    "nav.testimonials": "نظرونه",
    "header.lang": "ژبه بدلول",
    "dir": "rtl",
  },
};

export function getDirection(lang: Lang): "rtl" | "ltr" {
  return supportedLangs.find((l) => l.id === lang)?.dir ?? "rtl";
}

export function t(lang: Lang, key: string): string {
  return dictionaries[lang]?.[key] ?? dictionaries.fa[key] ?? key;
}

