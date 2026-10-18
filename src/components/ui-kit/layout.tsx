import type { ComponentProps, ReactNode } from "react";
import { cn } from "cn";

/* Page-level layout primitives (stage 2 of the CSS → Tailwind migration).
   The page fade stays a CSS keyframe; everything else is utilities. */

interface PageProps extends ComponentProps<"div"> {
  children: ReactNode;
}

/** Centred content column. Fade only — a transform here would capture the
    fixed order bar on /caps/[id]. */
export function Page({ className, children, ...props }: PageProps) {
  return (
    <div
      className={cn("mx-auto max-w-[1100px] px-3.5 animate-[page-in_280ms_ease]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface PageTitleProps {
  title: string;
  lead?: string;
}

export function PageTitle({ title, lead }: PageTitleProps) {
  return (
    <div className="pt-[clamp(32px,5vw,48px)] pb-4.5">
      <h1 className="text-[clamp(30px,4vw,40px)] text-g9">{title}</h1>
      {lead ? <p className="mt-2 max-w-[55ch] text-[15px] text-mut">{lead}</p> : null}
    </div>
  );
}

type SectionProps = ComponentProps<"section">;

export function Section({ className, children, ...props }: SectionProps) {
  return (
    <section className={cn("pt-[clamp(40px,5vw,56px)]", className)} {...props}>
      {children}
    </section>
  );
}

interface NoteProps {
  children: ReactNode;
  tone?: "tip" | "alert" | "status";
  className?: string;
}

/** Inline advice, validation message, or status block. */
export function Note({ children, tone = "tip", className }: NoteProps) {
  const role = tone === "alert" ? "alert" : tone === "status" ? "status" : undefined;

  return (
    <div
      role={role}
      className={cn(
        "rounded-[14px] border border-note-line bg-note-bg px-3.5 py-2.75 text-[13px] text-note-ink",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BannerProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  eyebrow?: ReactNode;
}

/** Green call-to-action banner with the warm corner glow. */
export function Banner({ title, children, action, eyebrow }: BannerProps) {
  return (
    <div className="grid gap-3.5 rounded-[24px] bg-g9 bg-[image:var(--banner-glow)] p-[clamp(24px,4vw,36px)] text-white">
      {eyebrow}
      <h2 className="text-[clamp(24px,3vw,30px)]">{title}</h2>
      <p className="max-w-[60ch] text-[15px] text-white/78">{children}</p>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
