import type { LanguageItem, Skill } from "../types";
import { emptyLanguage, emptySkill } from "../data/emptyData";
import { useEntryList } from "../lib/useEntryList";

interface Props {
  skills: Skill[];
  languages: LanguageItem[];
  onSkillsChange: (value: Skill[]) => void;
  onLanguagesChange: (value: LanguageItem[]) => void;
}

export function SkillsLanguagesForm({
  skills,
  languages,
  onSkillsChange,
  onLanguagesChange,
}: Props) {
  const skillEntries = useEntryList(skills, onSkillsChange, emptySkill);
  const languageEntries = useEntryList(languages, onLanguagesChange, emptyLanguage);

  return (
    <section className="card">
      <div className="card-heading">
        <span className="kicker">04</span>
        <h2>Compétences & langues</h2>
      </div>

      <h3>Compétences</h3>
      {skills.map((s, i) => (
        <div className="entry-row" key={s.id}>
          <input
            value={s.name}
            onChange={(e) => skillEntries.update(s.id, { name: e.target.value })}
            placeholder={`Compétence ${i + 1} (ex: Gestion de projet)`}
          />
          {skills.length > 1 && (
            <button type="button" className="link-btn" onClick={() => skillEntries.remove(s.id)}>
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-btn" onClick={skillEntries.add}>
        + Ajouter une compétence
      </button>

      <h3>Langues</h3>
      {languages.map((l) => (
        <div className="entry-row" key={l.id}>
          <input
            value={l.name}
            onChange={(e) => languageEntries.update(l.id, { name: e.target.value })}
            placeholder="Anglais"
          />
          <input
            value={l.level}
            onChange={(e) => languageEntries.update(l.id, { level: e.target.value })}
            placeholder="Courant"
          />
          {languages.length > 1 && (
            <button
              type="button"
              className="link-btn"
              onClick={() => languageEntries.remove(l.id)}
            >
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-btn" onClick={languageEntries.add}>
        + Ajouter une langue
      </button>
    </section>
  );
}
