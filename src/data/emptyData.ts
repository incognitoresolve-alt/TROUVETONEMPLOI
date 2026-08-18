import type { CVData } from "../types";

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
  };
}
