import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

/* Catalog layout primitives (stage 4 of the CSS → Tailwind migration). */

interface CapGridProps {
  children: ReactNode;
  className?: string;
}

/** 2 columns on mobile, 4 from 900px, matching the prototype grid. */
export function CapGrid({ children, className }: CapGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 min-[900px]:grid-cols-4 min-[900px]:gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface HScrollProps {
  children: ReactNode;
  className?: string;
  /** Accessible name for the scroller region. */
  label?: string;
}

/** Edge-to-edge horizontal snap scroller with no visible scrollbar. */
export function HScroll({ children, className, label }: HScrollProps) {
  return (
    <div
      className={cn(
        "-mx-3.5 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-3.5 pt-0.5 pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>*]:shrink-0 [&>*]:snap-start",
        className
      )}
      {...(label ? { role: "region", "aria-label": label } : {})}
    >
      {children}
    </div>
  );
}

interface CardProps extends ComponentProps<"article"> {
  children: ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-[18px] border border-line bg-paper shadow-[0_8px_24px_rgba(10,59,34,0.10)]",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
}

/** Fixed-width card used inside horizontal scrollers. */
export const hCardClass = "w-[156px] min-[900px]:w-[210px]";
