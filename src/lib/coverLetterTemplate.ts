import type { CVData } from "../types";

export function generateCoverLetterBody(data: CVData): string {
  const { personal, experiences, skills, coverLetter } = data;

  const poste = coverLetter.objet || "ce poste";
  const entreprise = coverLetter.entreprise || "votre entreprise";
  const titre = personal.jobTitle || "professionnel(le) motivé(e)";
  const topExperience = experiences.find((e) => e.poste.trim() || e.entreprise.trim());
  const topSkills = skills
    .filter((s) => s.name.trim())
    .slice(0, 3)
    .map((s) => s.name)
    .join(", ");

  const intro = `Actuellement ${titre}, je vous propose ma candidature pour ${poste} au sein de ${entreprise}. Votre offre a particulièrement retenu mon attention car elle correspond à la fois à mon expérience et à mes aspirations professionnelles.`;

  let body: string;
  if (topExperience && (topExperience.poste.trim() || topExperience.entreprise.trim())) {
    const posteExp = topExperience.poste || "un poste similaire";
    const entrepriseExp = topExperience.entreprise
      ? ` chez ${topExperience.entreprise}`
      : "";
    body = `En tant que ${posteExp}${entrepriseExp}, j'ai développé des compétences solides que je souhaite aujourd'hui mettre au service de votre entreprise.${
      topSkills ? ` Je maîtrise notamment ${topSkills}.` : ""
    } Mon sens de l'organisation, ma capacité d'adaptation et mon envie d'apprendre sont autant d'atouts que je pourrai mobiliser dans ce poste.`;
  } else {
    body = `Au cours de mon parcours, j'ai développé des compétences solides que je souhaite aujourd'hui mettre au service de votre entreprise.${
      topSkills ? ` Je maîtrise notamment ${topSkills}.` : ""
    } Mon sens de l'organisation, ma capacité d'adaptation et mon envie d'apprendre sont autant d'atouts que je pourrai mobiliser dans ce poste.`;
  }

  const closing = `Je serais ravi(e) de vous rencontrer afin de vous exposer plus en détail ma motivation et de vous démontrer ce que je pourrai apporter à votre équipe.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`;

  return `Madame, Monsieur,\n\n${intro}\n\n${body}\n\n${closing}`;
}
