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

function withDefaults<T extends object>(defaults: T, item: unknown): T {
  return { ...defaults, ...(item && typeof item === "object" ? (item as Partial<T>) : {}) };
}

/** Normalizes an arbitrary array (from localStorage or imported JSON) onto one blank item at minimum. */
function normalizeArray<T extends { id: string }>(raw: unknown, makeEmpty: () => T): T[] {
  const items = Array.isArray(raw) ? raw : [];
  return items.length ? items.map((item) => withDefaults(makeEmpty(), item)) : [makeEmpty()];
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
