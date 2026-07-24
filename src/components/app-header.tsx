import { useMemo, useState } from "react";
import {
  DownloadIcon,
  RotateCcwIcon,
  SaveIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";

import { ExportDialog } from "@/components/export-dialog";
import { ImportDialog } from "@/components/import-dialog";
import { SaveAsDialog } from "@/components/save-as-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/shadcn/alert-dialog";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { DEFAULT_GRID_ID } from "@/data/initial-grid";
import { cn } from "@/lib/utils/cn";
import { useGridStore } from "@/store/grid-store";

export function AppHeader() {
  const grids = useGridStore((s) => s.grids);
  const activeGridId = useGridStore((s) => s.activeGridId);
  const setActiveGrid = useGridStore((s) => s.setActiveGrid);
  const deleteGrid = useGridStore((s) => s.deleteGrid);
  const restoreDefaults = useGridStore((s) => s.restoreDefaults);
  const exportActiveGrid = useGridStore((s) => s.exportActiveGrid);

  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [saveAsOpen, setSaveAsOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);
  const [exportPayload, setExportPayload] = useState("");

  const orderedGrids = useMemo(() => {
    return Object.values(grids).sort((a, b) => {
      if (a.isDefault) return -1;
      if (b.isDefault) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [grids]);

  const activeIsDefault = activeGridId === DEFAULT_GRID_ID;

  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-white/6 bg-[#070b10]/90 px-4 py-2.5 backdrop-blur-md">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-heading text-sm font-bold tracking-[0.22em] text-papaya uppercase">
            F1
          </span>
          <span className="font-heading text-sm font-semibold tracking-[0.18em] text-foreground uppercase">
            Grid
          </span>
        </div>
        <div
          aria-hidden
          className="hidden h-4 w-px bg-white/10 sm:block"
        />
        <p className="hidden text-[11px] text-muted-foreground sm:block">
          Build next season&apos;s line-up
        </p>
      </div>

      <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
        {orderedGrids.map((grid) => {
          const active = grid.id === activeGridId;
          return (
            <div
              key={grid.id}
              className={cn(
                "flex shrink-0 items-center rounded-full",
                active && "ring-1 ring-papaya/50",
              )}
            >
              <button
                type="button"
                onClick={() => setActiveGrid(grid.id)}
                className="outline-none"
              >
                <Badge
                  variant={grid.isDefault ? "secondary" : "default"}
                  className={cn(
                    "max-w-40 cursor-pointer transition-opacity",
                    !grid.isDefault && !active && "opacity-80 hover:opacity-100",
                    !grid.isDefault && "rounded-r-none",
                    grid.isDefault && "bg-muted text-muted-foreground",
                  )}
                >
                  <span className="truncate">{grid.label}</span>
                </Badge>
              </button>
              {!grid.isDefault ? (
                <button
                  type="button"
                  aria-label={`Delete ${grid.label}`}
                  className={cn(
                    "inline-flex h-5 items-center rounded-r-full border border-l-0 border-transparent bg-primary pr-1.5 text-primary-foreground",
                    !active && "opacity-80 hover:opacity-100",
                  )}
                  onClick={() => deleteGrid(grid.id)}
                >
                  <XIcon className="size-2.5" />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={!activeIsDefault}
          onClick={() => setRestoreOpen(true)}
          title={
            activeIsDefault
              ? "Restore the default grid"
              : "Restore is only available on the default grid"
          }
        >
          <RotateCcwIcon data-icon="inline-start" />
          Restore
        </Button>
        <Button variant="outline" size="sm" onClick={() => setSaveAsOpen(true)}>
          <SaveIcon data-icon="inline-start" />
          Save as
        </Button>
        <Button variant="outline" size="sm" onClick={() => setImportOpen(true)}>
          <UploadIcon data-icon="inline-start" />
          Import
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setExportPayload(exportActiveGrid());
            setExportOpen(true);
          }}
        >
          <DownloadIcon data-icon="inline-start" />
          Export
        </Button>
      </div>

      <ImportDialog open={importOpen} onOpenChange={setImportOpen} />
      <ExportDialog
        open={exportOpen}
        onOpenChange={setExportOpen}
        payload={exportPayload}
      />
      <SaveAsDialog open={saveAsOpen} onOpenChange={setSaveAsOpen} />

      <AlertDialog open={restoreOpen} onOpenChange={setRestoreOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore default grid?</AlertDialogTitle>
            <AlertDialogDescription>
              This replaces the default grid assignments with the built-in
              starting line-up. Other saved grids are not changed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                restoreDefaults();
                setRestoreOpen(false);
              }}
            >
              Restore defaults
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
