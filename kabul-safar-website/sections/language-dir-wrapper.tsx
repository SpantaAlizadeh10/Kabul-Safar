"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/components/i18n-provider";

export function LanguageDirWrapper({ children }: { children: ReactNode }) {
  const { dir } = useI18n();
  return <div dir={dir}>{children}</div>;
}

