import { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import type { CVData } from "./types";
import { emptyData } from "./data/emptyData";
import { savePdf } from "./lib/savePdf";
import { generateCoverLetterBody } from "./lib/coverLetterTemplate";
import { PersonalForm } from "./components/PersonalForm";
import { ExperiencesForm } from "./components/ExperiencesForm";
import { EducationsForm } from "./components/EducationsForm";
import { SkillsLanguagesForm } from "./components/SkillsLanguagesForm";
import { CoverLetterForm } from "./components/CoverLetterForm";
import { CVDocument } from "./pdf/CVDocument";
import { CoverLetterDocument } from "./pdf/CoverLetterDocument";
import "./App.css";

function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "document"
  );
}

const statusMessages: Record<string, string> = {
  declined: "Téléchargement annulé.",
  unavailable: "Le téléchargement n'est pas disponible dans cet environnement.",
  error: "Une erreur est survenue pendant la génération du PDF.",
};

function App() {
  const [data, setData] = useState<CVData>(emptyData);
  const [downloading, setDownloading] = useState<"cv" | "letter" | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [letterAuto, setLetterAuto] = useState(true);

  useEffect(() => {
    if (!letterAuto) return;
    setData((d) => ({
      ...d,
      coverLetter: { ...d.coverLetter, corps: generateCoverLetterBody(d) },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    letterAuto,
    data.personal,
    data.experiences,
    data.skills,
    data.coverLetter.destinataire,
    data.coverLetter.entreprise,
    data.coverLetter.objet,
  ]);

  function handleCorpsEdit(corps: string) {
    setLetterAuto(false);
    setData((d) => ({ ...d, coverLetter: { ...d.coverLetter, corps } }));
  }

  function handleRegenerate() {
    setLetterAuto(true);
  }

  async function handleDownloadCv() {
    setDownloading("cv");
    setStatus(null);
    try {
      const blob = await pdf(<CVDocument data={data} />).toBlob();
      const result = await savePdf(blob, `CV-${slugify(data.personal.fullName)}.pdf`);
      if (!result.ok) setStatus(statusMessages[result.reason]);
    } finally {
      setDownloading(null);
    }
  }

  async function handleDownloadLetter() {
    setDownloading("letter");
    setStatus(null);
    try {
      const blob = await pdf(<CoverLetterDocument data={data} />).toBlob();
      const result = await savePdf(
        blob,
        `Lettre-de-motivation-${slugify(data.personal.fullName)}.pdf`,
      );
      if (!result.ok) setStatus(statusMessages[result.reason]);
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">TrouveTonEmploi</p>
          <h1>Générateur de CV & lettre de motivation</h1>
          <p>Renseignez vos informations, puis téléchargez vos documents en PDF.</p>
        </div>
        <div className="header-actions">
          <button type="button" onClick={handleDownloadCv} disabled={downloading !== null}>
            {downloading === "cv" ? "Génération…" : "Télécharger le CV (PDF)"}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={handleDownloadLetter}
            disabled={downloading !== null}
          >
            {downloading === "letter" ? "Génération…" : "Télécharger la lettre (PDF)"}
          </button>
        </div>
      </header>

      {status && <p className="status-message">{status}</p>}

      <main className="app-main">
        <PersonalForm
          value={data.personal}
          onChange={(personal) => setData({ ...data, personal })}
        />
        <ExperiencesForm
          value={data.experiences}
          onChange={(experiences) => setData({ ...data, experiences })}
        />
        <EducationsForm
          value={data.educations}
          onChange={(educations) => setData({ ...data, educations })}
        />
        <SkillsLanguagesForm
          skills={data.skills}
          languages={data.languages}
          onSkillsChange={(skills) => setData({ ...data, skills })}
          onLanguagesChange={(languages) => setData({ ...data, languages })}
        />
        <CoverLetterForm
          value={data.coverLetter}
          autoUpdating={letterAuto}
          onChange={(coverLetter) => setData({ ...data, coverLetter })}
          onCorpsEdit={handleCorpsEdit}
          onRegenerate={handleRegenerate}
        />
      </main>
    </div>
  );
}

export default App;
