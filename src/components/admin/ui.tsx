import Link from "next/link";
import { STATUS_TONE, type Status } from "@/content/recruiting";
import { toWhatsAppNumber } from "@/lib/validation";

export const STATUS_LABEL: Record<Status, string> = {
  neu: "Neu",
  geprueft: "Geprüft",
  verfuegbar: "Verfügbar",
  beschaeftigt: "Im Einsatz",
  inaktiv: "Inaktiv",
};

export const LEVEL_LABEL: Record<string, string> = {
  einsteiger: "Einsteiger",
  erfahren: "Erfahren",
  profi: "Profi",
};

const TONE_CLASS = {
  accent: "bg-accent-soft text-accent",
  neutral: "bg-sunken text-ink",
  warn: "bg-sunken text-danger",
  muted: "bg-sunken text-muted",
} as const;

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[12px] font-medium ${TONE_CLASS[STATUS_TONE[status]]}`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

export function TagChip({ tag, muted = false }: { tag: string; muted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-wide ${
        muted ? "border-hairline text-muted" : "border-hairline bg-sunken text-ink"
      }`}
    >
      {tag}
    </span>
  );
}

/**
 * Kontaktwege. Bewusst als echte Links und nicht als Kopierknöpfe:
 * auf dem Telefon führt ein Antippen direkt in Anruf oder WhatsApp,
 * und genau so wird disponiert.
 */
export function ContactLinks({
  phone,
  whatsapp,
  email,
  compact = false,
}: {
  phone: string;
  whatsapp: string | null;
  email: string | null;
  compact?: boolean;
}) {
  const waNumber = toWhatsAppNumber(whatsapp ?? phone);
  const cls = compact
    ? "inline-flex h-9 items-center rounded-full border border-hairline px-3 text-[13px] text-ink transition-colors hover:bg-sunken"
    : "inline-flex h-11 items-center rounded-full border border-hairline px-5 text-[15px] text-ink transition-colors hover:bg-sunken";

  return (
    <div className="flex flex-wrap gap-2">
      <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className={cls}>
        Anrufen
      </a>
      <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className={cls}>
        WhatsApp
      </a>
      {email ? (
        <a href={`mailto:${email}`} className={cls}>
          E-Mail
        </a>
      ) : null}
    </div>
  );
}

/** Filterknopf für die Leiste über der Liste. */
export function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-9 items-center rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
        active
          ? "border-accent bg-accent text-accent-ink"
          : "border-hairline bg-surface text-muted hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
