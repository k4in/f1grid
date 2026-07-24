import { cloneAssignments, emptyAssignments } from "@/lib/containers";
import type { Assignments } from "@/types/types";

/**
 * Provisional default distribution for the first draft.
 * Replace with a locked default map later.
 */
const SEED: Partial<Record<keyof Assignments, string[]>> = {
  mclaren: ["norris", "piastri"],
  mercedes: ["russell", "antonelli"],
  "red-bull": ["verstappen", "hadjar"],
  ferrari: ["hamilton", "leclerc"],
  williams: ["sainz", "albon"],
  "racing-bulls": ["lawson", "lindblad"],
  "aston-martin": ["stroll", "alonso"],
  haas: ["ocon", "bearman"],
  audi: ["hulkenberg", "bortoleto"],
  alpine: ["gasly", "colapinto"],
  cadillac: ["bottas", "perez"],
  junior: ["aron", "tsolov", "camara", "herta", "fornaroli", "dunne"],
  outOfContract: ["tsunoda"],
  outNextSeason: [],
};

export function createDefaultAssignments(): Assignments {
  const base = emptyAssignments();
  for (const [containerId, driverIds] of Object.entries(SEED)) {
    base[containerId as keyof Assignments] = [...(driverIds ?? [])];
  }
  return cloneAssignments(base);
}

export const DEFAULT_GRID_ID = "default";
export const DEFAULT_GRID_LABEL = "Default grid";
