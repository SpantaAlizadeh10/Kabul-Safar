import { useI18n } from "@/components/i18n-provider";

type SectionTitleProps = {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
};

export const SectionTitle = ({
  kicker,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) => {
  const { dir } = useI18n();
  const isRtl = dir === "rtl";
  const alignmentClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? isRtl
          ? "text-right"
          : "text-left"
        : "text-center";

  return (
    <header className={`space-y-1 ${alignmentClass}`}>
      {kicker ? (
        <p className="text-[11px] font-semibold text-cyan-500">{kicker}</p>
      ) : null}
      <h2 className="break-words text-base font-black leading-tight text-[#193643] md:text-lg" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
        {title}
      </h2>
      {subtitle ? (
        <p className="break-words text-[10px] leading-4 text-slate-600 md:text-xs md:leading-5" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {subtitle}
        </p>
      ) : null}
    </header>
  );
};
