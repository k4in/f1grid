import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  createDefaultAssignments,
  DEFAULT_GRID_ID,
  DEFAULT_GRID_LABEL,
} from "@/data/initial-grid";
import { cloneAssignments } from "@/lib/containers";
import { moveDriver, parseGridPayload, serializeGrid } from "@/lib/grid-io";
import type {
  Assignments,
  ContainerId,
  Grid,
  GridStoreState,
} from "@/types/types";

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `grid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createDefaultGrid(): Grid {
  return {
    id: DEFAULT_GRID_ID,
    label: DEFAULT_GRID_LABEL,
    isDefault: true,
    assignments: createDefaultAssignments(),
  };
}

function createInitialState(): GridStoreState {
  const defaultGrid = createDefaultGrid();
  return {
    activeGridId: defaultGrid.id,
    grids: { [defaultGrid.id]: defaultGrid },
  };
}

type GridStore = GridStoreState & {
  setActiveGrid: (id: string) => void;
  moveDriver: (driverId: string, to: ContainerId, index?: number) => void;
  restoreDefaults: () => void;
  saveAsNewGrid: (label: string) => { ok: true; id: string } | { ok: false; error: string };
  deleteGrid: (id: string) => { ok: true } | { ok: false; error: string };
  exportActiveGrid: () => string;
  importGrid: (
    label: string,
    raw: string,
  ) => { ok: true; id: string } | { ok: false; error: string };
  getActiveGrid: () => Grid;
};

function normalizeLabel(label: string): string {
  return label.trim().replace(/\s+/g, " ");
}

export const useGridStore = create<GridStore>()(
  persist(
    (set, get) => ({
      ...createInitialState(),

      getActiveGrid: () => {
        const { activeGridId, grids } = get();
        return grids[activeGridId] ?? grids[DEFAULT_GRID_ID] ?? createDefaultGrid();
      },

      setActiveGrid: (id) => {
        const { grids } = get();
        if (!grids[id]) return;
        set({ activeGridId: id });
      },

      moveDriver: (driverId, to, index) => {
        const { activeGridId, grids } = get();
        const grid = grids[activeGridId];
        if (!grid) return;

        const assignments = moveDriver(grid.assignments, driverId, to, index);
        set({
          grids: {
            ...grids,
            [activeGridId]: { ...grid, assignments },
          },
        });
      },

      restoreDefaults: () => {
        const { grids } = get();
        const defaultGrid = grids[DEFAULT_GRID_ID];
        if (!defaultGrid?.isDefault) return;

        set({
          activeGridId: DEFAULT_GRID_ID,
          grids: {
            ...grids,
            [DEFAULT_GRID_ID]: {
              ...defaultGrid,
              assignments: createDefaultAssignments(),
            },
          },
        });
      },

      saveAsNewGrid: (label) => {
        const name = normalizeLabel(label);
        if (!name) return { ok: false, error: "Enter a name for the new grid." };
        if (name.toLowerCase() === DEFAULT_GRID_LABEL.toLowerCase()) {
          return { ok: false, error: "Choose a name other than the default grid." };
        }

        const { grids, activeGridId } = get();
        const source = grids[activeGridId];
        if (!source) return { ok: false, error: "No active grid to copy." };

        const id = newId();
        const grid: Grid = {
          id,
          label: name,
          isDefault: false,
          assignments: cloneAssignments(source.assignments),
        };

        set({
          activeGridId: id,
          grids: { ...grids, [id]: grid },
        });
        return { ok: true, id };
      },

      deleteGrid: (id) => {
        const { grids, activeGridId } = get();
        const grid = grids[id];
        if (!grid) return { ok: false, error: "Grid not found." };
        if (grid.isDefault) {
          return { ok: false, error: "The default grid cannot be deleted." };
        }

        const nextGrids = { ...grids };
        delete nextGrids[id];
        const nextActive =
          activeGridId === id ? DEFAULT_GRID_ID : activeGridId;

        set({
          grids: nextGrids,
          activeGridId: nextGrids[nextActive] ? nextActive : DEFAULT_GRID_ID,
        });
        return { ok: true };
      },

      exportActiveGrid: () => {
        const grid = get().getActiveGrid();
        return serializeGrid(grid.assignments);
      },

      importGrid: (label, raw) => {
        const name = normalizeLabel(label);
        if (!name) return { ok: false, error: "Enter a name for the imported grid." };
        if (name.toLowerCase() === DEFAULT_GRID_LABEL.toLowerCase()) {
          return { ok: false, error: "Choose a name other than the default grid." };
        }

        const parsed = parseGridPayload(raw);
        if (!parsed.ok) return parsed;

        const id = newId();
        const grid: Grid = {
          id,
          label: name,
          isDefault: false,
          assignments: parsed.assignments,
        };

        set((state) => ({
          activeGridId: id,
          grids: { ...state.grids, [id]: grid },
        }));
        return { ok: true, id };
      },
    }),
    {
      name: "f1grid-store",
      version: 1,
      partialize: (state) => ({
        activeGridId: state.activeGridId,
        grids: state.grids,
      }),
      merge: (persisted, current) => {
        const raw = (persisted ?? {}) as Partial<GridStoreState>;
        const base = createInitialState();
        const grids = { ...base.grids, ...(raw.grids ?? {}) };

        // Always re-anchor default grid metadata; keep persisted assignments if present.
        const defaultAssignments: Assignments =
          grids[DEFAULT_GRID_ID]?.assignments ?? createDefaultAssignments();
        grids[DEFAULT_GRID_ID] = {
          id: DEFAULT_GRID_ID,
          label: DEFAULT_GRID_LABEL,
          isDefault: true,
          assignments: defaultAssignments,
        };

        const activeGridId =
          raw.activeGridId && grids[raw.activeGridId]
            ? raw.activeGridId
            : DEFAULT_GRID_ID;

        return {
          ...current,
          grids,
          activeGridId,
        };
      },
    },
  ),
);
