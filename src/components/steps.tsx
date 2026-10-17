import type { Step } from "@/lib/steps";

interface StepsProps {
  steps: readonly Step[];
}

/** Numbered "how it works" steps, shared by home, delivery, and size guide. */
export function Steps({ steps }: StepsProps) {
  return (
    <div className="steps">
      {steps.map((step) => (
        <div className="step" key={step.n}>
          <span className="n">{step.n}</span>
          <div>
            <b>{step.title}</b>
            <span>{step.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
