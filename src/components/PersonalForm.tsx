import { useState } from "react";
import type { PersonalInfo } from "../types";
import { fileToResizedDataUrl } from "../lib/image";
import { makeSetter } from "../lib/makeSetter";

interface Props {
  value: PersonalInfo;
  onChange: (value: PersonalInfo) => void;
}

export function PersonalForm({ value, onChange }: Props) {
  const [photoError, setPhotoError] = useState<string | null>(null);
  const set = makeSetter(value, onChange);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setPhotoError("Veuillez choisir un fichier image.");
      return;
    }
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      set("photoDataUrl", dataUrl);
      setPhotoError(null);
    } catch {
      setPhotoError("Impossible de charger cette image.");
    }
  }

  return (
    <section className="card">
      <div className="card-heading">
        <span className="kicker">01</span>
        <h2>Informations personnelles</h2>
      </div>

      <div className="photo-row">
        <div className="photo-preview">
          {value.photoDataUrl ? (
            <img src={value.photoDataUrl} alt="Photo de profil" />
          ) : (
            <span>Photo</span>
          )}
        </div>
        <div className="photo-actions">
          <label className="file-btn">
            {value.photoDataUrl ? "Changer la photo" : "Ajouter une photo"}
            <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
          </label>
          {value.photoDataUrl && (
            <button type="button" className="link-btn" onClick={() => set("photoDataUrl", "")}>
              Supprimer
            </button>
          )}
          {photoError && <p className="field-error">{photoError}</p>}
        </div>
      </div>

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
