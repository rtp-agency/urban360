"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
  AVAILABILITY_KINDS,
  LANGUAGES,
  LANGUAGE_LEVELS,
  LICENSES,
  PERMITS,
  RADII,
  SHIFTS,
  SKILLS,
  type AppLocale,
  type AvailabilityKind,
  type LanguageCode,
  type LanguageLevel,
  type License,
  type Permit,
  type Shift,
  type Skill,
} from "@/content/recruiting";
import {
  availabilityLabels,
  languageLabels,
  languageLevelLabels,
  licenseLabels,
  permitLabels,
  shiftLabels,
  skillLabels,
  tr,
  ui,
} from "@/content/application";
import { submitApplication } from "./actions";

/* Eingaben tragen 16px Schriftgröße. Darunter zoomt iOS beim Antippen
   automatisch hinein und der Mensch verliert den Überblick über das
   Formular. Höhe 48px, damit die Trefferfläche mit dem Daumen sitzt. */
const field =
  "w-full rounded-[var(--radius-field)] border border-hairline bg-surface px-4 " +
  "h-12 text-[16px] text-ink transition-colors duration-200 " +
  "focus:border-accent focus:outline-none";

const STEPS = 5;

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  whatsappSame: boolean;
  whatsapp: string;
  email: string;
  city: string;
  postalCode: string;
  radiusKm: number;
  hasCar: boolean;
  licenses: License[];
  languages: Partial<Record<LanguageCode, LanguageLevel>>;
  skills: Skill[];
  experienceNote: string;
  availability: AvailabilityKind[];
  shifts: Shift[];
  availableFrom: string;
  hoursPerWeek: string;
  permits: Permit[];
  consent: boolean;
};

const EMPTY: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  whatsappSame: true,
  whatsapp: "",
  email: "",
  city: "",
  postalCode: "",
  radiusKm: 25,
  hasCar: false,
  licenses: [],
  languages: {},
  skills: [],
  experienceNote: "",
  availability: [],
  shifts: [],
  availableFrom: "",
  hoursPerWeek: "",
  permits: [],
  consent: false,
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/** Auswahlmarke. Ersetzt Ankreuzlisten: mit dem Daumen deutlich schneller. */
function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-11 rounded-full border px-4 py-2.5 text-[15px] transition-colors duration-150 active:scale-[0.98] ${
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-hairline bg-surface text-ink hover:bg-sunken"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="text-[14px] font-medium text-ink">
        {label}
        {hint ? <span className="ml-2 font-normal text-muted">{hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Legend({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <legend className="mb-3 text-[14px] font-medium text-ink">
      {children}
      {hint ? <span className="ml-2 font-normal text-muted">{hint}</span> : null}
    </legend>
  );
}

export function ApplicationForm({ locale }: { locale: AppLocale }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [pending, startTransition] = useTransition();

  const T = useMemo(
    () => ({
      required: tr(ui.errRequired, locale),
      email: tr(ui.errEmail, locale),
      phone: tr(ui.errPhone, locale),
      plz: tr(ui.errPlz, locale),
      skills: tr(ui.errSkills, locale),
      consent: tr(ui.errConsent, locale),
    }),
    [locale],
  );

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setData((prev) => ({ ...prev, [key]: value }));

  function validateStep(current: number): boolean {
    const next: Record<string, string> = {};

    if (current === 0) {
      if (!data.firstName.trim()) next.firstName = T.required;
      if (!data.lastName.trim()) next.lastName = T.required;
      if (!data.phone.trim()) next.phone = T.required;
      else if (!/^[+0-9][0-9\s()/.-]{5,31}$/.test(data.phone.trim())) next.phone = T.phone;
      if (!data.whatsappSame && data.whatsapp.trim() && !/^[+0-9][0-9\s()/.-]{5,31}$/.test(data.whatsapp.trim()))
        next.whatsapp = T.phone;
      if (data.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email.trim()))
        next.email = T.email;
    }

    if (current === 1) {
      if (!data.city.trim()) next.city = T.required;
      if (!/^[0-9]{5}$/.test(data.postalCode.trim())) next.postalCode = T.plz;
    }

    if (current === 2) {
      if (data.skills.length === 0) next.skills = T.skills;
    }

    if (current === 4) {
      if (!data.consent) next.consent = T.consent;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validateStep(step)) return;
    if (step < STEPS - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      send();
    }
  }

  function goBack() {
    setErrors({});
    setStep(Math.max(0, step - 1));
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function send() {
    setFailed(false);
    startTransition(async () => {
      const payload = {
        locale,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phone: data.phone.trim(),
        whatsappSame: data.whatsappSame,
        whatsapp: data.whatsappSame ? undefined : data.whatsapp.trim() || undefined,
        email: data.email.trim(),
        city: data.city.trim(),
        postalCode: data.postalCode.trim(),
        radiusKm: data.radiusKm,
        hasCar: data.hasCar,
        licenses: data.licenses,
        languages: Object.entries(data.languages)
          .filter(([, level]) => Boolean(level))
          .map(([language, level]) => ({ language, level })),
        skills: data.skills,
        experienceNote: data.experienceNote.trim(),
        availability: data.availability,
        shifts: data.shifts,
        availableFrom: data.availableFrom,
        hoursPerWeek: data.hoursPerWeek,
        permits: data.permits,
        consent: data.consent,
      };

      const result = await submitApplication(payload, "");
      if (result.ok) {
        setDone(result.ref);
        window.scrollTo({ top: 0, behavior: "instant" });
      } else {
        setFailed(true);
      }
    });
  }

  if (done) {
    return (
      <div className="rounded-[var(--radius-panel)] bg-accent-soft px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-balance text-ink">
          {tr(ui.successTitle, locale)}
        </h2>
        <p className="mx-auto mt-4 max-w-[40ch] text-[16px] leading-relaxed text-muted">
          {tr(ui.successBody, locale)}
        </p>
        <p className="mt-8 text-[13px] text-muted">{tr(ui.yourRef, locale)}</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight text-accent">{done}</p>
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* Fortschritt. Ohne ihn wirkt ein mehrstufiges Formular endlos und
          wird häufiger abgebrochen. */}
      <div className="mb-8">
        <div className="flex items-baseline justify-between text-[13px] text-muted">
          <span>
            {tr(ui.stepOf, locale)} {step + 1} {tr(ui.of, locale)} {STEPS}
          </span>
          <span>{stepTitle(step, locale)}</span>
        </div>
        <div
          className="mt-2 flex gap-1.5"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS}
        >
          {Array.from({ length: STEPS }, (_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i <= step ? "bg-accent" : "bg-hairline"
              }`}
            />
          ))}
        </div>
      </div>

      {step === 0 ? (
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label={tr(ui.firstName, locale)} htmlFor="firstName" error={errors.firstName}>
              <input
                id="firstName"
                value={data.firstName}
                onChange={(e) => set("firstName", e.target.value)}
                autoComplete="given-name"
                className={field}
              />
            </Field>
            <Field label={tr(ui.lastName, locale)} htmlFor="lastName" error={errors.lastName}>
              <input
                id="lastName"
                value={data.lastName}
                onChange={(e) => set("lastName", e.target.value)}
                autoComplete="family-name"
                className={field}
              />
            </Field>
          </div>

          <Field
            label={tr(ui.phone, locale)}
            hint={tr(ui.phoneHint, locale)}
            htmlFor="phone"
            error={errors.phone}
          >
            <input
              id="phone"
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={field}
            />
          </Field>

          <label className="flex min-h-11 items-center gap-3 text-[15px] text-ink">
            <input
              type="checkbox"
              checked={data.whatsappSame}
              onChange={(e) => set("whatsappSame", e.target.checked)}
              className="h-5 w-5 shrink-0 accent-[var(--color-accent)]"
            />
            {tr(ui.whatsappSame, locale)}
          </label>

          {!data.whatsappSame ? (
            <Field label={tr(ui.whatsapp, locale)} htmlFor="whatsapp" error={errors.whatsapp}>
              <input
                id="whatsapp"
                value={data.whatsapp}
                onChange={(e) => set("whatsapp", e.target.value)}
                type="tel"
                inputMode="tel"
                className={field}
              />
            </Field>
          ) : null}

          <Field
            label={tr(ui.email, locale)}
            hint={tr(ui.optional, locale)}
            htmlFor="email"
            error={errors.email}
          >
            <input
              id="email"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              type="email"
              inputMode="email"
              autoComplete="email"
              className={field}
            />
          </Field>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr]">
            <Field label={tr(ui.city, locale)} htmlFor="city" error={errors.city}>
              <input
                id="city"
                value={data.city}
                onChange={(e) => set("city", e.target.value)}
                autoComplete="address-level2"
                className={field}
              />
            </Field>
            <Field label={tr(ui.postalCode, locale)} htmlFor="plz" error={errors.postalCode}>
              <input
                id="plz"
                value={data.postalCode}
                onChange={(e) => set("postalCode", e.target.value.replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                className={field}
              />
            </Field>
          </div>

          <fieldset>
            <Legend>{tr(ui.radius, locale)}</Legend>
            <div className="flex flex-wrap gap-2">
              {RADII.map((radius) => (
                <Chip
                  key={radius}
                  active={data.radiusKm === radius}
                  onClick={() => set("radiusKm", radius)}
                >
                  {radius} km
                </Chip>
              ))}
            </div>
          </fieldset>

          <label className="flex min-h-11 items-center gap-3 text-[15px] text-ink">
            <input
              type="checkbox"
              checked={data.hasCar}
              onChange={(e) => set("hasCar", e.target.checked)}
              className="h-5 w-5 shrink-0 accent-[var(--color-accent)]"
            />
            {tr(ui.hasCar, locale)}
          </label>

          <fieldset>
            <Legend hint={tr(ui.optional, locale)}>{tr(ui.licenses, locale)}</Legend>
            <div className="flex flex-wrap gap-2">
              {LICENSES.map((license) => (
                <Chip
                  key={license}
                  active={data.licenses.includes(license)}
                  onClick={() => set("licenses", toggle(data.licenses, license))}
                >
                  {tr(licenseLabels[license], locale)}
                </Chip>
              ))}
            </div>
          </fieldset>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="flex flex-col gap-8">
          <fieldset>
            <Legend hint={tr(ui.languageLevelHint, locale)}>{tr(ui.languages, locale)}</Legend>
            <div className="flex flex-col gap-3">
              {LANGUAGES.map((code) => {
                const level = data.languages[code];
                return (
                  <div key={code} className="border-b border-hairline pb-3 last:border-0">
                    <Chip
                      active={Boolean(level)}
                      onClick={() =>
                        setData((prev) => {
                          const next = { ...prev.languages };
                          if (next[code]) delete next[code];
                          else next[code] = "gut";
                          return { ...prev, languages: next };
                        })
                      }
                    >
                      {tr(languageLabels[code], locale)}
                    </Chip>
                    {level ? (
                      <div className="mt-2.5 flex flex-wrap gap-2 pl-1">
                        {LANGUAGE_LEVELS.map((lvl) => (
                          <button
                            key={lvl}
                            type="button"
                            onClick={() =>
                              setData((prev) => ({
                                ...prev,
                                languages: { ...prev.languages, [code]: lvl },
                              }))
                            }
                            aria-pressed={level === lvl}
                            className={`min-h-9 rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                              level === lvl
                                ? "bg-ink text-canvas"
                                : "bg-sunken text-muted hover:text-ink"
                            }`}
                          >
                            {tr(languageLevelLabels[lvl], locale)}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <Legend hint={tr(ui.chooseMultiple, locale)}>{tr(ui.skills, locale)}</Legend>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Chip
                  key={skill}
                  active={data.skills.includes(skill)}
                  onClick={() => set("skills", toggle(data.skills, skill))}
                >
                  {tr(skillLabels[skill], locale)}
                </Chip>
              ))}
            </div>
            {errors.skills ? (
              <p role="alert" className="mt-3 text-[13px] text-danger">
                {errors.skills}
              </p>
            ) : null}
          </fieldset>

          <Field
            label={tr(ui.experience, locale)}
            hint={tr(ui.optional, locale)}
            htmlFor="experience"
          >
            <textarea
              id="experience"
              rows={4}
              value={data.experienceNote}
              onChange={(e) => set("experienceNote", e.target.value)}
              placeholder={tr(ui.experienceHint, locale)}
              className={`${field} h-auto resize-y py-3 placeholder:text-muted/60`}
            />
          </Field>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="flex flex-col gap-8">
          <fieldset>
            <Legend hint={tr(ui.chooseMultiple, locale)}>{tr(ui.availability, locale)}</Legend>
            <div className="flex flex-wrap gap-2">
              {AVAILABILITY_KINDS.map((kind) => (
                <Chip
                  key={kind}
                  active={data.availability.includes(kind)}
                  onClick={() => set("availability", toggle(data.availability, kind))}
                >
                  {tr(availabilityLabels[kind], locale)}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <Legend hint={tr(ui.chooseMultiple, locale)}>{tr(ui.shifts, locale)}</Legend>
            <div className="flex flex-wrap gap-2">
              {SHIFTS.map((shift) => (
                <Chip
                  key={shift}
                  active={data.shifts.includes(shift)}
                  onClick={() => set("shifts", toggle(data.shifts, shift))}
                >
                  {tr(shiftLabels[shift], locale)}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label={tr(ui.availableFrom, locale)}
              hint={tr(ui.optional, locale)}
              htmlFor="availableFrom"
            >
              <input
                id="availableFrom"
                type="date"
                value={data.availableFrom}
                onChange={(e) => set("availableFrom", e.target.value)}
                className={field}
              />
            </Field>
            <Field
              label={tr(ui.hoursPerWeek, locale)}
              hint={tr(ui.optional, locale)}
              htmlFor="hours"
            >
              <input
                id="hours"
                type="number"
                inputMode="numeric"
                min={1}
                max={60}
                value={data.hoursPerWeek}
                onChange={(e) => set("hoursPerWeek", e.target.value)}
                className={field}
              />
            </Field>
          </div>
        </div>
      ) : null}

      {step === 4 ? (
        <div className="flex flex-col gap-8">
          <fieldset>
            <Legend hint={tr(ui.optional, locale)}>{tr(ui.permits, locale)}</Legend>
            <p className="mb-3 max-w-[52ch] text-[14px] leading-relaxed text-muted">
              {tr(ui.permitsHint, locale)}
            </p>
            <div className="flex flex-wrap gap-2">
              {PERMITS.map((permit) => (
                <Chip
                  key={permit}
                  active={data.permits.includes(permit)}
                  onClick={() => set("permits", toggle(data.permits, permit))}
                >
                  {tr(permitLabels[permit], locale)}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2 border-t border-hairline pt-6">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-accent)]"
              />
              <span className="text-[14px] leading-relaxed text-muted">
                {tr(ui.consent, locale)}{" "}
                <Link
                  href="/de/datenschutz"
                  className="text-accent underline underline-offset-2"
                  target="_blank"
                >
                  {tr(ui.privacyLink, locale)}
                </Link>
              </span>
            </label>
            {errors.consent ? (
              <p role="alert" className="text-[13px] text-danger">
                {errors.consent}
              </p>
            ) : null}
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              {tr(ui.consentRetention, locale)}
            </p>
          </div>

          {failed ? (
            <p role="alert" className="text-[15px] text-danger">
              {tr(ui.errGeneric, locale)}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Steuerung klebt unten: auf dem Telefon ist das die Zone, die der
          Daumen ohne Umgreifen erreicht. */}
      <div className="fixed inset-x-0 bottom-0 border-t border-hairline bg-canvas/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[640px] items-center gap-3 px-5 py-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex h-12 items-center rounded-full border border-hairline px-6 text-[15px] font-medium text-ink"
            >
              {tr(ui.back, locale)}
            </button>
          ) : null}
          <button
            type="button"
            onClick={goNext}
            disabled={pending}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-accent px-6 text-[16px] font-medium text-accent-ink transition-opacity active:scale-[0.99] disabled:opacity-60"
          >
            {pending
              ? tr(ui.sending, locale)
              : step === STEPS - 1
                ? tr(ui.submit, locale)
                : tr(ui.next, locale)}
          </button>
        </div>
      </div>
    </div>
  );
}

function stepTitle(step: number, locale: AppLocale): string {
  const titles = [ui.stepContact, ui.stepLocation, ui.stepSkills, ui.stepAvailability, ui.stepStatus];
  return tr(titles[step], locale);
}
