import type { CVData } from "../types";

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Rough "amount of content" score. Weighted so a filled-in entry (with its
 * header line, dates, etc.) counts even with an empty description, and long
 * free-text fields (profil, descriptions) count roughly per character.
 */
export function computeContentScore(data: CVData): number {
  const { personal, experiences, educations, skills, languages } = data;
  let score = personal.summary.trim().length;

  for (const e of experiences) {
    if (!e.poste.trim() && !e.entreprise.trim()) continue;
    score += 60 + e.description.trim().length;
  }
  for (const ed of educations) {
    if (!ed.diplome.trim() && !ed.etablissement.trim()) continue;
    score += 45 + ed.description.trim().length;
  }
  score += skills.filter((s) => s.name.trim()).length * 18;
  score += languages.filter((l) => l.name.trim()).length * 18;

  return score;
}

/** Calibrated so ~1600 content-score units comfortably fill one A4 page at base scale. */
const FULL_PAGE_SCORE = 1600;

/** 0 = very little content (page mostly empty at base scale), 1 = a full page or more. */
export function computeDensity(data: CVData): number {
  return clamp(computeContentScore(data) / FULL_PAGE_SCORE, 0, 1);
}

/** Calibrated so ~1100 characters of letter body comfortably fill one A4 page at base scale. */
const FULL_LETTER_SCORE = 1100;

/** Same 0..1 density concept as {@link computeDensity}, scaled for a short cover-letter body instead of a full CV. */
export function computeLetterDensity(corps: string): number {
  return clamp(corps.trim().length / FULL_LETTER_SCORE, 0, 1);
}

export interface LayoutScale {
  /** Multiplier applied to font sizes: bigger text when content is sparse, smaller when dense. */
  fontScale: number;
  /** Multiplier applied to margins/paddings/gaps — the main lever for filling or tightening space. */
  spaceScale: number;
  /** True when content is sparse enough that centering it in the page reads better than top-aligning it. */
  center: boolean;
}

export function getLayoutScale(density: number): LayoutScale {
  const fontScale = clamp(1.16 - density * 0.32, 0.82, 1.16);
  const spaceScale = clamp(1.55 - density * 0.9, 0.7, 1.55);
  // Below ~two-thirds of a full page, vertically centering the content reads as a
  // deliberate layout; past that the page is full enough that top-aligning (and
  // letting overflow paginate normally) is the safer, more document-like choice.
  return { fontScale, spaceScale, center: density < 0.65 };
}

export function fontPx(base: number, scale: LayoutScale): number {
  return Math.round(base * scale.fontScale * 10) / 10;
}

export function spacePx(base: number, scale: LayoutScale): number {
  return Math.round(base * scale.spaceScale);
}
