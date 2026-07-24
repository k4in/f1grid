import { TEAM_IDS } from "@/data/teams";
import type { Assignments, ContainerId, PoolId } from "@/types/types";

export const POOL_IDS = ["junior", "outOfContract", "outNextSeason"] as const satisfies readonly PoolId[];

export const POOL_META: Record<PoolId, { label: string; shortLabel: string; hint: string }> = {
  junior: {
    label: "Junior drivers",
    shortLabel: "Junior drivers",
    hint: "Prospects yet to race in Formula 1",
  },
  outOfContract: {
    label: "Out of contract",
    shortLabel: "Free agents",
    hint: "Not on the grid this year",
  },
  outNextSeason: {
    label: "Out next season",
    shortLabel: "Outbound",
    hint: "No contract for next season",
  },
};

export const ALL_CONTAINER_IDS: ContainerId[] = [...TEAM_IDS, ...POOL_IDS];

export function emptyAssignments(): Assignments {
  return Object.fromEntries(ALL_CONTAINER_IDS.map((id) => [id, [] as string[]])) as Assignments;
}

export function cloneAssignments(assignments: Assignments): Assignments {
  return Object.fromEntries(ALL_CONTAINER_IDS.map((id) => [id, [...(assignments[id] ?? [])]])) as Assignments;
}
