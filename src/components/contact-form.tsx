"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { useFormStatus } from "react-dom";
import { contactPage } from "@/content/copy";
import { servicePackages } from "@/content/services";
import type { Locale } from "@/content/site.config";
import { href, t } from "@/lib/i18n";
import { submitEnquiry } from "@/app/[locale]/kontakt/actions";
import { initialEnquiryState, type EnquiryState } from "@/lib/enquiry";

/* Eingaben tragen die Feldform 14px. Label immer über dem Feld,
   Fehlermeldung immer darunter. Platzhalter ersetzen niemals ein Label. */
const field =
  "w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-4 py-3 " +
  "text-[16px] text-ink placeholder:text-muted/70 transition-colors duration-200 " +
  "focus:border-accent focus:outline-none";

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-ink">
        {label}
        {hint ? <span className="ml-2 font-normal text-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Submit({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-7 text-base font-medium whitespace-nowrap text-accent-ink transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
    >
      {t(pending ? contactPage.formSending : contactPage.formSubmit, locale)}
    </button>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, action] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    initialEnquiryState,
  );
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const err = (name: string) => state.fieldErrors[name];

  if (state.status === "ok") {
    return (
      <div
        role="status"
        className="rounded-[var(--radius-panel)] bg-accent-soft px-6 py-10 text-center"
      >
        <p className="mx-auto max-w-[38ch] text-[17px] leading-relaxed text-ink">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot. Aus dem Layout und aus der Vorlesereihenfolge entfernt. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label={t(contactPage.formName, locale)} error={err("name")}>
          <input
            id={id("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={Boolean(err("name"))}
            aria-describedby={err("name") ? `${id("name")}-error` : undefined}
            className={field}
          />
        </Field>

        <Field
          id={id("company")}
          label={t(contactPage.formCompany, locale)}
          hint={t(contactPage.formCompanyHint, locale)}
        >
          <input
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            className={field}
          />
        </Field>

        <Field id={id("email")} label={t(contactPage.formEmail, locale)} error={err("email")}>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={Boolean(err("email"))}
            aria-describedby={err("email") ? `${id("email")}-error` : undefined}
            className={field}
          />
        </Field>

        <Field
          id={id("phone")}
          label={t(contactPage.formPhone, locale)}
          hint={t(contactPage.formPhoneHint, locale)}
        >
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={field}
          />
        </Field>
      </div>

      <Field id={id("subject")} label={t(contactPage.formSubject, locale)}>
        <select id={id("subject")} name="subject" defaultValue="" className={field}>
          <option value="">{locale === "de" ? "Bitte wählen" : "Please choose"}</option>
          {servicePackages.map((pack) => (
            <option key={pack.id} value={pack.id}>
              {t(pack.title, locale)}
            </option>
          ))}
          <option value="mehrere">{locale === "de" ? "Mehreres" : "Several areas"}</option>
        </select>
      </Field>

      <Field
        id={id("message")}
        label={t(contactPage.formMessage, locale)}
        hint={t(contactPage.formMessageHint, locale)}
        error={err("message")}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(err("message"))}
          aria-describedby={err("message") ? `${id("message")}-error` : undefined}
          className={`${field} resize-y`}
        />
      </Field>

      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            aria-invalid={Boolean(err("consent"))}
            aria-describedby={err("consent") ? `${id("consent")}-error` : undefined}
            className="mt-1 h-[18px] w-[18px] shrink-0 accent-[var(--color-accent)]"
          />
          <label htmlFor={id("consent")} className="text-[14px] leading-relaxed text-muted">
            {t(contactPage.formConsent, locale)}{" "}
            <Link href={href(locale, "datenschutz")} className="text-accent underline underline-offset-2">
              {t(contactPage.formConsentLink, locale)}
            </Link>
          </label>
        </div>
        {err("consent") ? (
          <p id={`${id("consent")}-error`} role="alert" className="text-[13px] text-danger">
            {err("consent")}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-[15px] text-ink">
          {state.message}
        </p>
      ) : null}

      <div>
        <Submit locale={locale} />
      </div>
    </form>
  );
}
