import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section">;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section
      className={cn("relative scroll-mt-24 overflow-hidden py-20 md:py-24", className)}
      {...props}
    >
      {children}
    </section>
  );
}
