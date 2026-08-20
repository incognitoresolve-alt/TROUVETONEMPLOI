import type { CvTemplate } from "../types";

interface Props {
  value: CvTemplate;
  onChange: (value: CvTemplate) => void;
}

const options: { value: CvTemplate; label: string; hint: string }[] = [
  { value: "sidebar", label: "Moderne", hint: "bandeau latéral coloré" },
  { value: "classic", label: "Classique", hint: "sobre, compatible ATS" },
];

export function TemplateSelector({ value, onChange }: Props) {
  return (
    <div className="template-selector" role="radiogroup" aria-label="Mise en page du CV">
      <span className="template-selector-label">Mise en page du CV</span>
      <div className="template-options">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={value === opt.value}
            className={`template-option${value === opt.value ? " active" : ""}`}
            onClick={() => onChange(opt.value)}
          >
            <span className="template-option-label">{opt.label}</span>
            <span className="template-option-hint">{opt.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
