import { useState } from "react";
import { pdf, type DocumentProps } from "@react-pdf/renderer";
import type { ReactElement } from "react";
import type { CVData } from "./types";
import { emptyData } from "./data/emptyData";
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

async function downloadPdf(doc: ReactElement<DocumentProps>, filename: string) {
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function App() {
  const [data, setData] = useState<CVData>(emptyData);
  const [downloading, setDownloading] = useState<"cv" | "letter" | null>(null);

  async function handleDownloadCv() {
    setDownloading("cv");
    try {
      await downloadPdf(<CVDocument data={data} />, `CV-${slugify(data.personal.fullName)}.pdf`);
    } finally {
      setDownloading(null);
    }
  }

  async function handleDownloadLetter() {
    setDownloading("letter");
    try {
      await downloadPdf(
        <CoverLetterDocument data={data} />,
        `Lettre-de-motivation-${slugify(data.personal.fullName)}.pdf`,
      );
    } finally {
      setDownloading(null);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
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
          personal={data.personal}
          onChange={(coverLetter) => setData({ ...data, coverLetter })}
        />
      </main>
    </div>
  );
}

export default App;
