import type { PersonalInfo } from "../types";

interface Props {
  value: PersonalInfo;
  onChange: (value: PersonalInfo) => void;
}

export function PersonalForm({ value, onChange }: Props) {
  function set<K extends keyof PersonalInfo>(key: K, v: PersonalInfo[K]) {
    onChange({ ...value, [key]: v });
  }

  return (
    <section className="card">
      <h2>Informations personnelles</h2>
      <div className="grid-2">
        <label>
          Nom complet
          <input
            value={value.fullName}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="Jeanne Dupont"
          />
        </label>
        <label>
          Titre professionnel
          <input
            value={value.jobTitle}
            onChange={(e) => set("jobTitle", e.target.value)}
            placeholder="Développeuse web"
          />
        </label>
        <label>
          Email
          <input
            value={value.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="jeanne.dupont@email.com"
          />
        </label>
        <label>
          Téléphone
          <input
            value={value.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="06 12 34 56 78"
          />
        </label>
        <label>
          Adresse
          <input
            value={value.address}
            onChange={(e) => set("address", e.target.value)}
            placeholder="12 rue des Lilas"
          />
        </label>
        <label>
          Ville
          <input
            value={value.city}
            onChange={(e) => set("city", e.target.value)}
            placeholder="Paris"
          />
        </label>
        <label>
          LinkedIn
          <input
            value={value.linkedin}
            onChange={(e) => set("linkedin", e.target.value)}
            placeholder="linkedin.com/in/jeanne-dupont"
          />
        </label>
        <label>
          Site web / portfolio
          <input
            value={value.website}
            onChange={(e) => set("website", e.target.value)}
            placeholder="jeannedupont.com"
          />
        </label>
      </div>
      <label>
        Profil / résumé
        <textarea
          value={value.summary}
          onChange={(e) => set("summary", e.target.value)}
          placeholder="Quelques phrases qui résument votre parcours et vos objectifs."
          rows={4}
        />
      </label>
    </section>
  );
}
