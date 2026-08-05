import Image from "next/image";

/**
 * Bildfläche mit definiertem Reservat.
 *
 * Solange kein Foto hinterlegt ist, rendert die Komponente eine ruhige
 * Tonfläche mit der Beschreibung der benötigten Aufnahme. Die Seite bleibt
 * dadurch vollständig und maßhaltig, es entsteht kein Layout Shift, und
 * beim Austausch gegen echte Fotos verschiebt sich nichts.
 *
 * Das Seitenverhältnis kommt als Utility-Klasse und nicht als Inline-Style,
 * damit es je Breakpoint unterschiedlich sein kann. Ein Hochformat, das am
 * Desktop gut sitzt, frisst auf dem Telefon einen halben Bildschirm Scrollweg.
 *
 * Aufnahmeliste: /docs/03-content-todo.md
 */
export function Figure({
  src,
  alt,
  brief,
  aspect = "aspect-[4/3]",
  priority = false,
  className = "",
  imgClassName = "object-center",
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  src?: string;
  alt?: string;
  /** Beschreibung der benötigten Aufnahme, erscheint nur im Platzhalter. */
  brief: string;
  /** Tailwind-Klassen für das Seitenverhältnis, gern je Breakpoint. */
  aspect?: string;
  priority?: boolean;
  className?: string;
  /**
   * Bildausschnitt je Breakpoint. Nötig, sobald sich das Seitenverhältnis
   * zwischen Telefon und Desktop unterscheidet: der mittige Standardschnitt
   * kappt sonst genau den Bildteil, auf den es ankommt.
   */
  imgClassName?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[var(--radius-panel)] bg-sunken ${aspect} ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="absolute inset-0 flex items-end p-5 md:p-6"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--color-hairline) 0 1px, transparent 1px 11px)",
          }}
        >
          <span className="max-w-[34ch] text-[13px] leading-snug text-muted">{brief}</span>
        </div>
      )}
    </div>
  );
}
