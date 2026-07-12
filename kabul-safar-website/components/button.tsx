import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type CommonProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  variant?: "primary" | "secondary";
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type Props = LinkButtonProps | NativeButtonProps;

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-bold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00acc1]";

const variantStyles = {
  primary: "bg-[#00acc1] text-white shadow-sm hover:bg-[#00838f]",
  secondary: "bg-[#263238] text-white hover:bg-[#1a2a30]",
};

export const Button = ({
  children,
  className,
  ariaLabel,
  variant = "primary",
  ...rest
}: Props) => {
  const styles = `${baseStyles} ${variantStyles[variant]} ${className ?? ""}`;

  if ("href" in rest && rest.href) {
    return (
      <a aria-label={ariaLabel} className={styles} {...rest}>
        {children}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as NativeButtonProps;

  return (
    <button
      aria-label={ariaLabel}
      className={styles}
      type={type}
      {...buttonRest}
    >
      {children}
    </button>
  );
};
