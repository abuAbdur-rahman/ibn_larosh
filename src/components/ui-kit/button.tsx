import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { cn } from "cn";

/* Tailwind-based button primitives (stage 1 of the CSS → Tailwind migration).
   Visual parity with the previous .btn classes from DESIGN.md. */

type Variant = "gold" | "green" | "wa" | "line";

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold text-g9 hover:bg-[#b8872a]",
  green: "bg-g9 text-white hover:bg-[#0d4a2b]",
  wa: "bg-wa-solid text-white hover:bg-wa-solid-hover",
  line: "border-[1.5px] border-g9 text-g9 hover:bg-g9/[0.06]",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-[22px] text-[15px] font-semibold transition-[transform,background-color,color] duration-150 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 [&_.ic.wa]:size-5";

interface ButtonStyle {
  variant?: Variant;
  block?: boolean;
  className?: string;
  children: ReactNode;
}

function classes({ variant = "green", block, className }: Omit<ButtonStyle, "children">) {
  return cn(BASE, VARIANTS[variant], block && "w-full", className);
}

type ButtonProps = ButtonStyle & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ variant, block, className, children, ...props }: ButtonProps) {
  return (
    <button className={classes({ variant, block, className })} {...props}>
      {children}
    </button>
  );
}

type ButtonLinkProps = ButtonStyle & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function ButtonLink({ variant, block, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={classes({ variant, block, className })} {...props}>
      {children}
    </Link>
  );
}

type ButtonAnchorProps = ButtonStyle & Omit<ComponentProps<"a">, "className" | "children">;

export function ButtonAnchor({ variant, block, className, children, ...props }: ButtonAnchorProps) {
  return (
    <a className={classes({ variant, block, className })} {...props}>
      {children}
    </a>
  );
}
