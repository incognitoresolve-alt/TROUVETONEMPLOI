import type { CvTemplate } from "../types";

export interface TemplateOption {
  id: CvTemplate;
  label: string;
  hint: string;
}

/** Single source of truth for CV template identity — the selector, and JSON normalization all read from this. */
export const CV_TEMPLATES: TemplateOption[] = [
  { id: "sidebar", label: "Moderne", hint: "bandeau latéral coloré" },
  { id: "classic", label: "Classique", hint: "sobre, compatible ATS" },
];

export const DEFAULT_TEMPLATE: CvTemplate = "sidebar";

export function isCvTemplate(value: unknown): value is CvTemplate {
  return CV_TEMPLATES.some((t) => t.id === value);
}
