import type { CoverLetterInfo, PersonalInfo } from "../types";

interface Props {
  value: CoverLetterInfo;
  personal: PersonalInfo;
  onChange: (value: CoverLetterInfo) => void;
}

export function CoverLetterForm({ value, personal, onChange }: Props) {
  function set<K extends keyof CoverLetterInfo>(key: K, v: CoverLetterInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  function generateTemplate() {
    const poste = value.objet || "ce poste";
    const entreprise = value.entreprise || "votre entreprise";
    const titre = personal.jobTitle || "professionnel(le) motivé(e)";
    const template = `Madame, Monsieur,

Actuellement ${titre}, je vous propose ma candidature pour ${poste} au sein de ${entreprise}. Votre offre a particulièrement retenu mon attention car elle correspond à la fois à mon expérience et à mes aspirations professionnelles.

Au cours de mon parcours, j'ai développé des compétences solides que je souhaite aujourd'hui mettre au service de votre entreprise. Mon sens de l'organisation, ma capacité d'adaptation et mon envie d'apprendre sont autant d'atouts que je pourrai mobiliser dans ce poste.

Je serais ravi(e) de vous rencontrer afin de vous exposer plus en détail ma motivation et de vous démontrer ce que je pourrai apporter à votre équipe.

Dans l'attente de votre retour, je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`;
    set("corps", template);
  }

  return (
    <section className="card">
      <h2>Lettre de motivation</h2>
      <div className="grid-2">
        <label>
          Destinataire
          <input
            value={value.destinataire}
            onChange={(e) => set("destinataire", e.target.value)}
            placeholder="Service Recrutement"
          />
        </label>
        <label>
          Entreprise
          <input
            value={value.entreprise}
            onChange={(e) => set("entreprise", e.target.value)}
            placeholder="Acme SA"
          />
        </label>
        <label>
          Adresse de l'entreprise
          <input
            value={value.adresseEntreprise}
            onChange={(e) => set("adresseEntreprise", e.target.value)}
            placeholder="10 avenue de la République, Lyon"
          />
        </label>
        <label>
          Ville (pour la date)
          <input
            value={value.ville}
            onChange={(e) => set("ville", e.target.value)}
            placeholder="Lyon"
          />
        </label>
        <label>
          Date
          <input
            value={value.date}
            onChange={(e) => set("date", e.target.value)}
            placeholder="18 août 2026"
          />
        </label>
        <label>
          Objet / poste visé
          <input
            value={value.objet}
            onChange={(e) => set("objet", e.target.value)}
            placeholder="Candidature au poste de développeur web"
          />
        </label>
      </div>
      <div className="entry-header">
        <span>Corps de la lettre</span>
        <button type="button" className="link-btn" onClick={generateTemplate}>
          Générer un modèle
        </button>
      </div>
      <textarea
        value={value.corps}
        onChange={(e) => set("corps", e.target.value)}
        placeholder="Rédigez ou générez votre lettre, puis modifiez-la librement."
        rows={12}
      />
    </section>
  );
}
