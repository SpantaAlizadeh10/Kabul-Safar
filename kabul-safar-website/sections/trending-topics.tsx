"use client";

import { FileText, Plane, MapPin, Ticket, MessageCircle, Star, Compass, Newspaper } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

const iconMap = {
  FileText,
  Plane,
  MapPin,
  Ticket,
  MessageCircle,
  Star,
  Compass,
  Newspaper,
};

export const TrendingTopics = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 py-10 md:py-14">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230dadd1' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v5.5a2.5 2.5 0 0 1 0 5v5.5H20v-2h20v2H20v-5.5a2.5 2.5 0 0 1 0-5z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-[#0dadd1]/30 to-transparent" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900">
            {lang === "fa" ? "موضوعات محبوب را کاوش کنید" : lang === "ps" ? "غوره موضوعات وګورئ" : "EXPLORE TRENDING TOPICS"}
          </h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-transparent via-[#0dadd1]/30 to-transparent" />
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {content.trendingTopics.map((topic) => {
            const Icon = iconMap[topic.icon as keyof typeof iconMap];
            return (
              <button
                key={topic.id}
                className="group flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-[#0dadd1] hover:bg-gradient-to-r hover:from-[#0dadd1] hover:to-[#377bc9] hover:text-white hover:shadow-lg hover:-translate-y-0.5"
              >
                <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                {topic.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
