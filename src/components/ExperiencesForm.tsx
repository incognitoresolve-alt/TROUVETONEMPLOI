import type { Experience } from "../types";
import { emptyExperience } from "../data/emptyData";

interface Props {
  value: Experience[];
  onChange: (value: Experience[]) => void;
}

export function ExperiencesForm({ value, onChange }: Props) {
  function update(id: string, patch: Partial<Experience>) {
    onChange(value.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }

  function remove(id: string) {
    onChange(value.filter((e) => e.id !== id));
  }

  function add() {
    onChange([...value, emptyExperience()]);
  }

  return (
    <section className="card">
      <div className="card-heading">
        <span className="kicker">02</span>
        <h2>Expérience professionnelle</h2>
      </div>
      {value.map((exp, i) => (
        <div className="entry" key={exp.id}>
          <div className="entry-header">
            <span>Expérience {i + 1}</span>
            {value.length > 1 && (
              <button type="button" className="link-btn" onClick={() => remove(exp.id)}>
                Supprimer
              </button>
            )}
          </div>
          <div className="grid-2">
            <label>
              Poste
              <input
                value={exp.poste}
                onChange={(e) => update(exp.id, { poste: e.target.value })}
                placeholder="Chef de projet"
              />
            </label>
            <label>
              Entreprise
              <input
                value={exp.entreprise}
                onChange={(e) => update(exp.id, { entreprise: e.target.value })}
                placeholder="Acme SA"
              />
            </label>
            <label>
              Lieu
              <input
                value={exp.lieu}
                onChange={(e) => update(exp.id, { lieu: e.target.value })}
                placeholder="Lyon"
              />
            </label>
            <div className="grid-2">
              <label>
                Début
                <input
                  value={exp.dateDebut}
                  onChange={(e) => update(exp.id, { dateDebut: e.target.value })}
                  placeholder="01/2021"
                />
              </label>
              <label>
                Fin
                <input
                  value={exp.dateFin}
                  onChange={(e) => update(exp.id, { dateFin: e.target.value })}
                  placeholder="06/2023"
                  disabled={exp.enCours}
                />
              </label>
            </div>
          </div>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={exp.enCours}
              onChange={(e) => update(exp.id, { enCours: e.target.checked })}
            />
            Poste actuel
          </label>
          <label>
            Description
            <textarea
              value={exp.description}
              onChange={(e) => update(exp.id, { description: e.target.value })}
              placeholder="Missions et réalisations principales."
              rows={3}
            />
          </label>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={add}>
        + Ajouter une expérience
      </button>
    </section>
  );
}
