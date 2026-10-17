import { cn } from "@/lib/utils";

type TechChipProps = {
  label: string;
  className?: string;
  accentHoverClass?: string;
};

export function TechChip({ label, className, accentHoverClass }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex h-9 items-center rounded-full border border-white/10 bg-white/[0.04] px-3.5 text-sm font-medium text-zinc-100 md:h-10",
        accentHoverClass,
        className
      )}
    >
      {label}
    </span>
  );
}
