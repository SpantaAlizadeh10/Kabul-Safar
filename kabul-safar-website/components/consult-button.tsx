import { ChevronLeft } from "lucide-react";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

type ConsultButtonProps = {
  href?: string;
  className?: string;
  label?: string;
  compact?: boolean;
};

export const ConsultButton = ({
  href = CONTACT_WHATSAPP_URL,
  className = "",
  label = "دریافت ویزا و مشاوره",
  compact = false,
}: ConsultButtonProps) => {
  return (
    <a
      dir="ltr"
      href={href}
      className={`inline-flex max-w-full flex-row items-center rounded-full bg-[#1a1a1a] font-semibold text-white transition-transform hover:-translate-y-0.5 ${
        compact
          ? "gap-1.5 py-1 pl-1 pr-2.5 text-[10px] leading-tight md:gap-3 md:py-2 md:pl-2 md:pr-5 md:text-sm"
          : "gap-3 py-2 pl-2 pr-5 text-sm"
      } ${className}`}
    >
      <span
        className={`flex shrink-0 items-center justify-start rounded-full bg-white text-[#1a1a1a] ${
          compact ? "h-6 w-6 pl-0.5 md:h-8 md:w-8 md:pl-1" : "h-8 w-8 pl-1"
        }`}
      >
        <ChevronLeft
          className={compact ? "h-3 w-3 md:h-4 md:w-4" : "h-4 w-4"}
          aria-hidden="true"
        />
      </span>
      <span className="truncate">{label}</span>
    </a>
  );
};
