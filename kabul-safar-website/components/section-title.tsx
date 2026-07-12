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
  const alignmentClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <header className={`space-y-1 ${alignmentClass}`}>
      {kicker ? (
        <p className="text-[11px] font-semibold text-cyan-500">{kicker}</p>
      ) : null}
      <h2 className="text-lg font-black text-[#193643]">{title}</h2>
      {subtitle ? (
        <p className="text-xs leading-5 text-slate-600">{subtitle}</p>
      ) : null}
    </header>
  );
};
