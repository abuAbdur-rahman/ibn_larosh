import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

/* Filter/size chips. `Chip` is interactive, `ChipTag` is static (e.g. colours
   shown as labels). Both keep the same visual language. */

const BASE =
  "inline-flex h-11 shrink-0 items-center rounded-full border-[1.5px] border-line bg-paper px-4 text-[13.5px] font-semibold text-ink transition-colors";

const SELECTED = "border-g9 bg-g9 text-white";

interface ChipProps extends Omit<ComponentProps<"button">, "className" | "children"> {
  selected?: boolean;
  className?: string;
  children: ReactNode;
}

export function Chip({ selected, className, children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(BASE, selected ? SELECTED : "hover:border-g7", className)}
      {...props}
    >
      {children}
    </button>
  );
}

interface ChipTagProps extends Omit<ComponentProps<"span">, "className" | "children"> {
  selected?: boolean;
  className?: string;
  children: ReactNode;
}

export function ChipTag({ selected, className, children, ...props }: ChipTagProps) {
  return (
    <span className={cn(BASE, selected && SELECTED, className)} {...props}>
      {children}
    </span>
  );
}
