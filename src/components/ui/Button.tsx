import { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: "primary" | "ghost";
  href?: string;
  download?: boolean | string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
}

export function Button({
  children,
  onClick,
  className,
  variant = "primary",
  href,
  download,
  type = "button",
  disabled,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c6f432] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0c] disabled:opacity-50 disabled:pointer-events-none select-none px-5 py-2.5";

  const variantStyles =
    variant === "primary"
      ? "bg-[#c6f432] text-[#0b0b0c] font-semibold hover:bg-[#b5e028]"
      : "bg-transparent border border-white/[0.08] text-[#ededed] hover:bg-white/[0.06] hover:text-white";

  const combinedClass = cn(baseStyles, variantStyles, className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    if (isExternal) {
      return (
        <a
          href={href}
          download={download}
          className={combinedClass}
          onClick={onClick}
          aria-label={ariaLabel}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClass} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClass}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

