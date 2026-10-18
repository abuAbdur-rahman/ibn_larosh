"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui-kit/button";
import { formClass, inputClass } from "@/components/ui-kit/field";
import { Note } from "@/components/ui-kit/layout";
import { loginAction } from "./actions";

const initialState: { error?: string } = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className={formClass} action={action}>
      {state.error ? <Note tone="alert">{state.error}</Note> : null}

      <label htmlFor="admin-username">
        Username
        <input
          className={inputClass}
          id="admin-username"
          name="username"
          autoComplete="username"
          spellCheck={false}
          required
        />
      </label>

      <label htmlFor="admin-password">
        Password
        <span className="relative block [&_input]:pr-14">
          <input
            className={inputClass}
            id="admin-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="absolute top-1/2 right-0.5 grid size-11 -translate-y-1/2 place-items-center rounded-full text-mut hover:bg-g9/[0.07] hover:text-g9"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff className="ic" aria-hidden="true" />
            ) : (
              <Eye className="ic" aria-hidden="true" />
            )}
          </button>
        </span>
      </label>

      <Button variant="green" block type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
