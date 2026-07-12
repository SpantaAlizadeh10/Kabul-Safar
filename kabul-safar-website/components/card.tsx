import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  accent?: boolean;
};

export const Card = ({ children, className, accent }: CardProps) => {
  return (
    <article
      className={`rounded-2xl border border-white/70 p-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
        accent ? "bg-[#2f7cbf] text-white" : "bg-[#bef2ff]"
      } ${className ?? ""}`}
    >
      {children}
    </article>
  );
};
