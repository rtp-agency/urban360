/**
 * Icon-Set der Seite.
 *
 * Eine Familie für das ganze Projekt: Phosphor, Variante "regular",
 * durchgehend strokeWidth-neutral. Der SSR-Einstiegspunkt des Pakets
 * liefert reine Server-Komponenten, deshalb entsteht durch Icons keine
 * Client-Grenze und kein zusätzliches JavaScript im Browser.
 */
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  BedIcon,
  BriefcaseIcon,
  BroomIcon,
  BuildingsIcon,
  CheckIcon,
  ClipboardTextIcon,
  ForkKnifeIcon,
  HouseLineIcon,
  KeyIcon,
  LeafIcon,
  PhoneCallIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  TruckIcon,
  WrenchIcon,
} from "@phosphor-icons/react/ssr";
import type { IconProps } from "@phosphor-icons/react";
import type { ComponentType } from "react";

export type IconName =
  | "buildings"
  | "broom"
  | "leaf"
  | "truck"
  | "wrench"
  | "bed"
  | "fork"
  | "briefcase"
  | "house"
  | "phone"
  | "clipboard"
  | "shield"
  | "key"
  | "seal";

const registry: Record<IconName, ComponentType<IconProps>> = {
  buildings: BuildingsIcon,
  broom: BroomIcon,
  leaf: LeafIcon,
  truck: TruckIcon,
  wrench: WrenchIcon,
  bed: BedIcon,
  fork: ForkKnifeIcon,
  briefcase: BriefcaseIcon,
  house: HouseLineIcon,
  phone: PhoneCallIcon,
  clipboard: ClipboardTextIcon,
  shield: ShieldCheckIcon,
  key: KeyIcon,
  seal: SealCheckIcon,
};

export function Icon({
  name,
  className,
  size = 22,
  weight = "regular",
}: {
  name: IconName;
  className?: string;
  size?: number;
  /** "duotone" nur in gefüllten Kacheln, wo eine Strichzeichnung zu dünn
      wirkt. Innerhalb einer Fläche bleibt die Stärke immer dieselbe. */
  weight?: "regular" | "bold" | "duotone" | "fill";
}) {
  const Glyph = registry[name];
  return <Glyph className={className} size={size} weight={weight} aria-hidden />;
}

export { ArrowRightIcon, ArrowUpRightIcon, CheckIcon };
