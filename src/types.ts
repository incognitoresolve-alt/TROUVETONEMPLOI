export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  linkedin: string;
  website: string;
  summary: string;
  photoDataUrl: string;
}

export type CvTemplate = "sidebar" | "classic";

export interface Experience {
  id: string;
  poste: string;
  entreprise: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
  enCours: boolean;
  description: string;
}

export interface Education {
  id: string;
  diplome: string;
  etablissement: string;
  lieu: string;
  dateDebut: string;
  dateFin: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  level: string;
}

export interface CoverLetterInfo {
  destinataire: string;
  entreprise: string;
  adresseEntreprise: string;
  ville: string;
  date: string;
  objet: string;
  corps: string;
}

export interface CVData {
  personal: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skills: Skill[];
  languages: LanguageItem[];
  coverLetter: CoverLetterInfo;
  template: CvTemplate;
}
