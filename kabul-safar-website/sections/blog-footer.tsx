"use client";

import { Share2 } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

export const BlogFooter = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);

  return (
    <footer className="mt-12 border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#0dadd1] to-[#377bc9]">
                <span className="text-xl font-bold text-white">K</span>
              </div>
              <span className="text-2xl font-black text-slate-900">{content.footer.brand}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              {content.footer.description}
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="text-slate-400 transition-colors hover:text-[#0dadd1]">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-[#0dadd1]">
                <Share2 className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 transition-colors hover:text-[#0dadd1]">
                <Share2 className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Homepages */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">
              {lang === "fa" ? "صفحات اصلی" : lang === "ps" ? "اصلي پاڼې" : "Homepages"}
            </h3>
            <ul className="space-y-2">
              {content.footer.homepages.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 transition-colors hover:text-[#0dadd1]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">
              {lang === "fa" ? "دسته‌بندی‌ها" : lang === "ps" ? "دسته بندي" : "Categories"}
            </h3>
            <ul className="space-y-2">
              {content.footer.categories.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 transition-colors hover:text-[#0dadd1]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-900">
              {lang === "fa" ? "صفحات" : lang === "ps" ? "پاڼې" : "Pages"}
            </h3>
            <ul className="space-y-2">
              {content.footer.pages.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-slate-600 transition-colors hover:text-[#0dadd1]">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-500">
          <p>© 2024 {content.footer.brand}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
