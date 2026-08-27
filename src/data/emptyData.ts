import type { CVData } from "../types";
import { DEFAULT_TEMPLATE, isCvTemplate } from "../lib/templates";

let counter = 0;
export function newId(): string {
  counter += 1;
  return `id-${Date.now()}-${counter}`;
}

export function emptyExperience() {
  return {
    id: newId(),
    poste: "",
    entreprise: "",
    lieu: "",
    dateDebut: "",
    dateFin: "",
    enCours: false,
    description: "",
  };
}

export function emptyEducation() {
  return {
    id: newId(),
    diplome: "",
    etablissement: "",
    lieu: "",
    dateDebut: "",
    dateFin: "",
    description: "",
  };
}

export function emptySkill() {
  return { id: newId(), name: "" };
}

export function emptyLanguage() {
  return { id: newId(), name: "", level: "" };
}

export function emptyData(): CVData {
  return {
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      linkedin: "",
      website: "",
      summary: "",
      photoDataUrl: "",
    },
    experiences: [emptyExperience()],
    educations: [emptyEducation()],
    skills: [emptySkill()],
    languages: [emptyLanguage()],
    coverLetter: {
      destinataire: "",
      entreprise: "",
      adresseEntreprise: "",
      ville: "",
      date: "",
      objet: "",
      corps: "",
    },
    template: DEFAULT_TEMPLATE,
  };
}

/**
 * Merges `item` onto `defaults`, field by field, keeping the default whenever the
 * incoming value is missing, null, or the wrong primitive type. Every field here
 * eventually flows into `.trim()` calls (density scoring, slugify, PDF text) or a
 * controlled `<input>`'s `value` — a stray `null` or a number from a hand-edited or
 * third-party JSON file would otherwise crash those, or silently break the input.
 */
function withDefaults<T extends object>(defaults: T, item: unknown): T {
  const result = { ...defaults };
  if (item && typeof item === "object") {
    for (const key of Object.keys(defaults) as (keyof T)[]) {
      const value = (item as Record<string, unknown>)[key as string];
      if (value !== null && value !== undefined && typeof value === typeof defaults[key]) {
        result[key] = value as T[keyof T];
      }
    }
  }
  return result;
}

/**
 * Normalizes an arbitrary array (from localStorage or imported JSON) onto one blank
 * item at minimum. Regenerates the id of any item that arrives with a duplicate —
 * two entries sharing an id would otherwise both update/delete together in the UI,
 * since useEntryList matches by id.
 */
function normalizeArray<T extends { id: string }>(raw: unknown, makeEmpty: () => T): T[] {
  const items = Array.isArray(raw) ? raw : [];
  if (!items.length) return [makeEmpty()];

  const seenIds = new Set<string>();
  return items.map((item) => {
    const merged = withDefaults(makeEmpty(), item);
    if (seenIds.has(merged.id)) merged.id = newId();
    seenIds.add(merged.id);
    return merged;
  });
}

/** Defensively merges arbitrary/older-shaped data (localStorage, imported JSON) onto a fresh default. */
export function normalizeData(input: unknown): CVData {
  const base = emptyData();
  if (!input || typeof input !== "object") return base;
  const raw = input as Record<string, unknown>;

  return {
    personal: withDefaults(base.personal, raw.personal),
    experiences: normalizeArray(raw.experiences, emptyExperience),
    educations: normalizeArray(raw.educations, emptyEducation),
    skills: normalizeArray(raw.skills, emptySkill),
    languages: normalizeArray(raw.languages, emptyLanguage),
    coverLetter: withDefaults(base.coverLetter, raw.coverLetter),
    template: isCvTemplate(raw.template) ? raw.template : DEFAULT_TEMPLATE,
  };
}
