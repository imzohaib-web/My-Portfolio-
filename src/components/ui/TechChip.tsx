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
        "inline-flex h-8 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 text-xs md:text-sm font-normal text-[#ededed]",
        accentHoverClass,
        className
      )}
    >
      {label}
    </span>
  );
}
