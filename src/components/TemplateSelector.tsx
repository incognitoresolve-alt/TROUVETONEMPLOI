import type { CvTemplate } from "../types";
import { CV_TEMPLATES } from "../lib/templates";

interface Props {
  value: CvTemplate;
  onChange: (value: CvTemplate) => void;
}

export function TemplateSelector({ value, onChange }: Props) {
  return (
    <div className="template-selector" role="radiogroup" aria-label="Mise en page du CV">
      <span className="template-selector-label">Mise en page du CV</span>
      <div className="template-options">
        {CV_TEMPLATES.map((opt) => (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={value === opt.id}
            className={`template-option${value === opt.id ? " active" : ""}`}
            onClick={() => onChange(opt.id)}
          >
            <span className="template-option-label">{opt.label}</span>
            <span className="template-option-hint">{opt.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
