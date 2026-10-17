"use client";

import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "./actions";

const initialState: { error?: string } = {};

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="site-form" action={action}>
      {state.error ? (
        <div className="note" role="alert">
          {state.error}
        </div>
      ) : null}

      <label>
        Username
        <input
          className="input"
          name="username"
          autoComplete="username"
          spellCheck={false}
          required
        />
      </label>

      <label>
        Password
        <span className="password-field">
          <input
            className="input"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
          />
          <button
            type="button"
            className="password-toggle"
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

      <button className="btn green block" type="submit" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
