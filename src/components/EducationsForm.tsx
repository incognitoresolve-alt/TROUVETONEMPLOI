import type { Education } from "../types";
import { emptyEducation } from "../data/emptyData";
import { useEntryList } from "../lib/useEntryList";

interface Props {
  value: Education[];
  onChange: (value: Education[]) => void;
}

export function EducationsForm({ value, onChange }: Props) {
  const { update, remove, add } = useEntryList(value, onChange, emptyEducation);

  return (
    <section className="card">
      <div className="card-heading">
        <span className="kicker">03</span>
        <h2>Formation</h2>
      </div>
      {value.map((ed, i) => (
        <div className="entry" key={ed.id}>
          <div className="entry-header">
            <span>Formation {i + 1}</span>
            {value.length > 1 && (
              <button type="button" className="link-btn" onClick={() => remove(ed.id)}>
                Supprimer
              </button>
            )}
          </div>
          <div className="grid-2">
            <label>
              Diplôme
              <input
                value={ed.diplome}
                onChange={(e) => update(ed.id, { diplome: e.target.value })}
                placeholder="Master en informatique"
              />
            </label>
            <label>
              Établissement
              <input
                value={ed.etablissement}
                onChange={(e) => update(ed.id, { etablissement: e.target.value })}
                placeholder="Université de Lyon"
              />
            </label>
            <label>
              Lieu
              <input
                value={ed.lieu}
                onChange={(e) => update(ed.id, { lieu: e.target.value })}
                placeholder="Lyon"
              />
            </label>
            <div className="grid-2">
              <label>
                Début
                <input
                  value={ed.dateDebut}
                  onChange={(e) => update(ed.id, { dateDebut: e.target.value })}
                  placeholder="2018"
                />
              </label>
              <label>
                Fin
                <input
                  value={ed.dateFin}
                  onChange={(e) => update(ed.id, { dateFin: e.target.value })}
                  placeholder="2020"
                />
              </label>
            </div>
          </div>
          <label>
            Description
            <textarea
              value={ed.description}
              onChange={(e) => update(ed.id, { description: e.target.value })}
              placeholder="Mention, spécialisation, projets marquants..."
              rows={2}
            />
          </label>
        </div>
      ))}
      <button type="button" className="add-btn" onClick={add}>
        + Ajouter une formation
      </button>
    </section>
  );
}
