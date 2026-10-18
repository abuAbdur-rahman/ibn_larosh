import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

/* Form control styles as Tailwind utilities. Exported as constants so native
   elements keep working with FormData and server actions. */

export const inputClass =
  "w-full min-h-12 rounded-[14px] border-[1.5px] border-line bg-white px-3.5 text-ink outline-none transition-[border-color,box-shadow] duration-150 focus:border-g7 focus:shadow-[0_0_0_3px_rgba(18,104,58,0.18)]";

export const textareaClass = cn(inputClass, "min-h-24 resize-y py-3");
export const fileInputClass = cn(inputClass, "h-auto py-2.5");
export const fieldRowClass = "grid grid-cols-2 gap-3";
export const formClass =
  "grid gap-3.5 [&_label]:grid [&_label]:gap-1.5 [&_label]:text-[13px] [&_label]:font-semibold";

interface PanelProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export function Panel({ className, children, ...props }: PanelProps) {
  return (
    <div
      className={cn(
        "rounded-[18px] border border-line bg-paper p-[clamp(18px,2.5vw,24px)] shadow-[0_8px_24px_rgba(10,59,34,0.10)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
