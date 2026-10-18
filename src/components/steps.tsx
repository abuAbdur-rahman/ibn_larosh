import type { Step } from "@/lib/steps";

interface StepsProps {
  steps: readonly Step[];
}

/** Numbered "how it works" steps, shared by home, delivery, and size guide. */
export function Steps({ steps }: StepsProps) {
  return (
    <div className="grid gap-3.5 min-[900px]:grid-cols-3 min-[900px]:gap-4.5">
      {steps.map((step) => (
        <div
          key={step.n}
          className="flex items-center gap-4.5 rounded-[18px] border border-line bg-paper p-5"
        >
          <span className="grid size-9 flex-none place-items-center rounded-full bg-gold font-bold text-g9">
            {step.n}
          </span>
          <div>
            <b className="block text-g9">{step.title}</b>
            <span className="text-[13px] text-mut">{step.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
