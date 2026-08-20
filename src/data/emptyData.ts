import type { CVData } from "../types";

type Loose = Record<string, unknown>;

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
    template: "sidebar",
  };
}

function withDefaults<T extends object>(defaults: T, item: unknown): T {
  return { ...defaults, ...(item && typeof item === "object" ? (item as Partial<T>) : {}) };
}

/** Defensively merges arbitrary/older-shaped data (localStorage, imported JSON) onto a fresh default. */
export function normalizeData(input: unknown): CVData {
  const base = emptyData();
  if (!input || typeof input !== "object") return base;
  const raw = input as Loose;

  const experiences = Array.isArray(raw.experiences) ? raw.experiences : [];
  const educations = Array.isArray(raw.educations) ? raw.educations : [];
  const skills = Array.isArray(raw.skills) ? raw.skills : [];
  const languages = Array.isArray(raw.languages) ? raw.languages : [];

  return {
    personal: withDefaults(base.personal, raw.personal),
    experiences: experiences.length
      ? experiences.map((e) => withDefaults(emptyExperience(), e))
      : base.experiences,
    educations: educations.length
      ? educations.map((e) => withDefaults(emptyEducation(), e))
      : base.educations,
    skills: skills.length ? skills.map((s) => withDefaults(emptySkill(), s)) : base.skills,
    languages: languages.length
      ? languages.map((l) => withDefaults(emptyLanguage(), l))
      : base.languages,
    coverLetter: withDefaults(base.coverLetter, raw.coverLetter),
    template: raw.template === "classic" ? "classic" : "sidebar",
  };
}
