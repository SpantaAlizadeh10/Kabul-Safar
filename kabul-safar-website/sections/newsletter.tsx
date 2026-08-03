"use client";

import { Mail } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { getBlogContent } from "@/lib/data";

export const Newsletter = () => {
  const { lang } = useI18n();
  const content = getBlogContent(lang);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0dadd1] to-[#377bc9] p-8 md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">
          {content.newsletter.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/90 md:text-base">
          {content.newsletter.subtitle}
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={content.newsletter.placeholder}
            required
            className="flex-1 rounded-full px-6 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-[#0dadd1] transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {content.newsletter.button}
          </button>
        </form>
      </div>
    </section>
  );
};
