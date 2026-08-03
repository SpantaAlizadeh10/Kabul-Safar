"use client";

import { BlogHeader } from "@/sections/blog-header";
import { BlogHero } from "@/sections/blog-hero";
import { TrendingTopics } from "@/sections/trending-topics";
import { BlogPostsGrid } from "@/sections/blog-posts-grid";
import { BlogSidebar } from "@/sections/blog-sidebar";
import { Newsletter } from "@/sections/newsletter";
import { BlogFooter } from "@/sections/blog-footer";
import { I18nProvider } from "@/components/i18n-provider";

export default function BlogPage() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-slate-50">
        <BlogHeader />
        <BlogHero />
        <TrendingTopics />

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <BlogPostsGrid />

              {/* Pagination */}
              <div className="mt-8 flex items-center justify-center gap-2">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0dadd1] text-sm font-semibold text-white">
                  1
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                  2
                </button>
                <span className="px-2 text-slate-400">...</span>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                  4
                </button>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                  &gt;
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </main>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Newsletter />
        </div>

        <BlogFooter />
      </div>
    </I18nProvider>
  );
}
