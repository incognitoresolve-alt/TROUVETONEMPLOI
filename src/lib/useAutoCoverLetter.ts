import { useEffect } from "react";
import type { CVData } from "../types";
import { generateCoverLetterBody } from "./coverLetterTemplate";

/**
 * Keeps `data.coverLetter.corps` in sync with the rest of the profile while `enabled`,
 * regenerating it whenever the fields the template reads from change. Skips the update
 * when the regenerated text is unchanged, so an edit to an unrelated field that happens
 * to produce the same letter doesn't trigger a re-render or a debounced-save write.
 */
export function useAutoCoverLetter(
  data: CVData,
  setData: React.Dispatch<React.SetStateAction<CVData>>,
  enabled: boolean,
) {
  const { personal, experiences, skills, coverLetter } = data;
  const { destinataire, entreprise, objet } = coverLetter;

  useEffect(() => {
    if (!enabled) return;
    setData((d) => {
      const corps = generateCoverLetterBody(d);
      return corps === d.coverLetter.corps ? d : { ...d, coverLetter: { ...d.coverLetter, corps } };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, personal, experiences, skills, destinataire, entreprise, objet]);
}
