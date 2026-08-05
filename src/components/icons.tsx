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
  ForkKnifeIcon,
  HouseLineIcon,
  LeafIcon,
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
  | "house";

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
};

export function Icon({
  name,
  className,
  size = 22,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  const Glyph = registry[name];
  return <Glyph className={className} size={size} weight="regular" aria-hidden />;
}

export { ArrowRightIcon, ArrowUpRightIcon, CheckIcon };
