import { ALL_CONTAINER_IDS, cloneAssignments, emptyAssignments } from "@/lib/containers";
import { driverById } from "@/lib/drivers";
import type { Assignments, ContainerId, GridExportPayload } from "@/types/types";

export function serializeGrid(assignments: Assignments): string {
  const payload: GridExportPayload = {
    v: 1,
    assignments: cloneAssignments(assignments),
  };
  return JSON.stringify(payload);
}

export type ParseGridResult =
  | { ok: true; assignments: Assignments }
  | { ok: false; error: string };

export function parseGridPayload(raw: string): ParseGridResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Paste a grid string to import." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    return { ok: false, error: "That string is not valid JSON." };
  }

  if (!parsed || typeof parsed !== "object") {
    return { ok: false, error: "Grid payload must be a JSON object." };
  }

  const record = parsed as Partial<GridExportPayload> & {
    assignments?: unknown;
  };

  if (record.v !== 1) {
    return { ok: false, error: "Unsupported grid version. Expected v: 1." };
  }

  if (!record.assignments || typeof record.assignments !== "object") {
    return { ok: false, error: "Payload is missing assignments." };
  }

  const next = emptyAssignments();
  const seen = new Set<string>();
  const source = record.assignments as Record<string, unknown>;

  for (const containerId of ALL_CONTAINER_IDS) {
    const value = source[containerId];
    if (value === undefined) continue;
    if (!Array.isArray(value)) {
      return {
        ok: false,
        error: `Container "${containerId}" must be an array of driver ids.`,
      };
    }

    const ids: string[] = [];
    for (const item of value) {
      if (typeof item !== "string") {
        return {
          ok: false,
          error: `Driver ids in "${containerId}" must be strings.`,
        };
      }
      if (!driverById[item]) {
        return { ok: false, error: `Unknown driver id: "${item}".` };
      }
      if (seen.has(item)) {
        return {
          ok: false,
          error: `Driver "${item}" appears more than once.`,
        };
      }
      seen.add(item);
      ids.push(item);
    }
    next[containerId] = ids;
  }

  // Unknown container keys are ignored; missing drivers stay unplaced only if
  // export was partial — for draft, require every known driver once.
  const catalogIds = Object.keys(driverById);
  const missing = catalogIds.filter((id) => !seen.has(id));
  if (missing.length > 0) {
    // Place leftovers into outOfContract so import still works with partials.
    next.outOfContract = [...next.outOfContract, ...missing];
  }

  return { ok: true, assignments: next };
}

export function moveDriver(
  assignments: Assignments,
  driverId: string,
  to: ContainerId,
  index?: number,
): Assignments {
  const next = cloneAssignments(assignments);

  for (const containerId of ALL_CONTAINER_IDS) {
    next[containerId] = next[containerId].filter((id) => id !== driverId);
  }

  const target = [...next[to]];
  const insertAt =
    index === undefined || index < 0 || index > target.length
      ? target.length
      : index;
  target.splice(insertAt, 0, driverId);
  next[to] = target;
  return next;
}
