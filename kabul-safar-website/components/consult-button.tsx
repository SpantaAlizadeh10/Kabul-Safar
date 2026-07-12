import { ArrowLeft } from "lucide-react";
import { CONTACT_WHATSAPP_URL } from "@/lib/contact";

type ConsultButtonProps = {
  href?: string;
  className?: string;
  label?: string;
};

export const ConsultButton = ({
  href = CONTACT_WHATSAPP_URL,
  className = "",
  label = "دریافت ویزا و مشاوره",
}: ConsultButtonProps) => {
  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-3 py-1.5 text-white transition-transform hover:-translate-y-0.5 ${className}`}
    >
      <span>{label}</span>
      <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
};
