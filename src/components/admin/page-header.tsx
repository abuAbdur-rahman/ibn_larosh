import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  lead?: string;
  action?: ReactNode;
}

/** Admin page title row with an optional trailing action. */
export function AdminPageHeader({ title, lead, action }: AdminPageHeaderProps) {
  return (
    <div className="mb-4.5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[clamp(26px,3.4vw,34px)] text-g9">{title}</h1>
        {lead ? <p className="mt-1 text-sm text-mut">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}
