import type { CoverLetterInfo } from "../types";

interface Props {
  value: CoverLetterInfo;
  autoUpdating: boolean;
  onChange: (value: CoverLetterInfo) => void;
  onCorpsEdit: (corps: string) => void;
  onRegenerate: () => void;
}

export function CoverLetterForm({
  value,
  autoUpdating,
  onChange,
  onCorpsEdit,
  onRegenerate,
}: Props) {
  function set<K extends keyof CoverLetterInfo>(key: K, v: CoverLetterInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <section className="card">
      <div className="card-heading">
        <span className="kicker">05</span>
        <h2>Lettre de motivation</h2>
      </div>
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
        <span>
          Corps de la lettre
          {autoUpdating ? " — générée automatiquement" : " — modifiée manuellement"}
        </span>
        {!autoUpdating && (
          <button type="button" className="link-btn accent" onClick={onRegenerate}>
            Revenir au modèle automatique
          </button>
        )}
      </div>
      <textarea
        value={value.corps}
        onChange={(e) => onCorpsEdit(e.target.value)}
        placeholder="Se génère automatiquement à partir de vos informations. Modifiez-la librement si besoin."
        rows={12}
      />
    </section>
  );
}
