"use client";

import type { ReactNode } from "react";

interface ConfirmSubmitProps {
  message: string;
  className?: string;
  children: ReactNode;
}

/** Submit button that asks for confirmation (destructive actions). */
export function ConfirmSubmit({ message, className, children }: ConfirmSubmitProps) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
