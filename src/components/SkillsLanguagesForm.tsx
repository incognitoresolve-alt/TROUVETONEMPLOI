import type { LanguageItem, Skill } from "../types";
import { emptyLanguage, emptySkill } from "../data/emptyData";

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
  function updateSkill(id: string, name: string) {
    onSkillsChange(skills.map((s) => (s.id === id ? { ...s, name } : s)));
  }
  function removeSkill(id: string) {
    onSkillsChange(skills.filter((s) => s.id !== id));
  }
  function addSkill() {
    onSkillsChange([...skills, emptySkill()]);
  }

  function updateLanguage(id: string, patch: Partial<LanguageItem>) {
    onLanguagesChange(languages.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  }
  function removeLanguage(id: string) {
    onLanguagesChange(languages.filter((l) => l.id !== id));
  }
  function addLanguage() {
    onLanguagesChange([...languages, emptyLanguage()]);
  }

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
            onChange={(e) => updateSkill(s.id, e.target.value)}
            placeholder={`Compétence ${i + 1} (ex: Gestion de projet)`}
          />
          {skills.length > 1 && (
            <button type="button" className="link-btn" onClick={() => removeSkill(s.id)}>
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-btn" onClick={addSkill}>
        + Ajouter une compétence
      </button>

      <h3>Langues</h3>
      {languages.map((l) => (
        <div className="entry-row" key={l.id}>
          <input
            value={l.name}
            onChange={(e) => updateLanguage(l.id, { name: e.target.value })}
            placeholder="Anglais"
          />
          <input
            value={l.level}
            onChange={(e) => updateLanguage(l.id, { level: e.target.value })}
            placeholder="Courant"
          />
          {languages.length > 1 && (
            <button type="button" className="link-btn" onClick={() => removeLanguage(l.id)}>
              Supprimer
            </button>
          )}
        </div>
      ))}
      <button type="button" className="add-btn" onClick={addLanguage}>
        + Ajouter une langue
      </button>
    </section>
  );
}
