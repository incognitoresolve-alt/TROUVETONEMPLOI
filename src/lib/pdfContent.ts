import type { Education, Experience, LanguageItem, PersonalInfo, Skill } from "../types";
import type { LayoutScale } from "./density";

export function formatPeriod(debut: string, fin: string, enCours?: boolean): string {
  const end = enCours ? "Aujourd'hui" : fin;
  if (!debut && !end) return "";
  return `${debut || "?"} — ${end || "?"}`;
}

/** Filters once and returns null when empty, so callers can do `{filtered ?? null}` without a separate `.some()` pass. */
export function filterFilled<T>(items: T[], predicate: (item: T) => boolean): T[] | null {
  const filled = items.filter(predicate);
  return filled.length ? filled : null;
}

export const hasExperienceContent = (e: Experience): boolean =>
  Boolean(e.poste.trim() || e.entreprise.trim());
export const hasEducationContent = (ed: Education): boolean =>
  Boolean(ed.diplome.trim() || ed.etablissement.trim());
export const hasSkillContent = (s: Skill): boolean => Boolean(s.name.trim());
export const hasLanguageContent = (l: LanguageItem): boolean => Boolean(l.name.trim());

/** Ordered list of the non-empty contact fields, shared by every CV template's own presentation (one per line, joined inline, ...). */
export function buildContactLines(personal: PersonalInfo): string[] {
  return [
    personal.email,
    personal.phone,
    [personal.address, personal.city].filter(Boolean).join(", "),
    personal.linkedin,
    personal.website,
  ].filter(Boolean);
}

/** Scales a base photo size (px) with the layout's spacing scale, clamped so the photo never gets comically large or small. */
export function scaledPhotoSize(base: number, scale: LayoutScale, min = 0.85, max = 1.3): number {
  return Math.round(base * Math.min(max, Math.max(min, scale.spaceScale)));
}
