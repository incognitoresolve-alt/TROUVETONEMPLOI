import type { CVData } from "../types";
import { normalizeData } from "../data/emptyData";

const STORAGE_KEY = "trouvetonemploi-cv-data";

interface StoredState {
  data: CVData;
  letterAuto: boolean;
}

export function loadStoredState(): StoredState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.data) return null;
    return {
      data: normalizeData(parsed.data),
      letterAuto: typeof parsed.letterAuto === "boolean" ? parsed.letterAuto : true,
    };
  } catch {
    return null;
  }
}

export function saveStoredState(state: StoredState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private browsing, quota, sandboxed frame) — ignore.
  }
}

export function clearStoredState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
