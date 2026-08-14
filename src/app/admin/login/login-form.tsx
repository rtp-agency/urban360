"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { t } from "@/content/admin";
import { login, type LoginState } from "./actions";

const field =
  "w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-4 h-12 " +
  "text-[16px] text-ink transition-colors focus:border-accent focus:outline-none";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent text-[16px] font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {pending ? t.loginPending : t.loginSubmit}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] font-medium text-ink">
          {t.loginEmail}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className={field}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-[14px] font-medium text-ink">
          {t.loginPassword}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={field}
        />
      </div>

      {state.error ? (
        <p role="alert" className="text-[14px] text-danger">
          {state.error}
        </p>
      ) : null}

      <Submit />
    </form>
  );
}
