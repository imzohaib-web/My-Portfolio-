import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SurfaceProps {
  children: ReactNode;
  className?: string;
}

export function Surface({ children, className }: SurfaceProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-white/[0.08] bg-[#131315] p-6 text-[#ededed]",
        className
      )}
    >
      {children}
    </div>
  );
}

