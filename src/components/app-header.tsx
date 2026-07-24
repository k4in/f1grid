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
import { Separator } from "@/components/shadcn/separator";
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
  const [pendingDelete, setPendingDelete] = useState<{
    id: string;
    label: string;
  } | null>(null);

  const orderedGrids = useMemo(() => {
    return Object.values(grids).sort((a, b) => {
      if (a.isDefault) return -1;
      if (b.isDefault) return 1;
      return a.label.localeCompare(b.label);
    });
  }, [grids]);

  const activeIsDefault = activeGridId === DEFAULT_GRID_ID;

  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-border/60 bg-background/80 px-4 py-2.5 backdrop-blur-md">
      <div className="flex min-w-0 items-center">
        <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
          Next Year&apos;s Grid
        </span>
      </div>

      <Separator
        orientation="vertical"
        className="data-[orientation=vertical]:h-5"
      />

      <div className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto">
        {orderedGrids.map((grid) => {
          const active = grid.id === activeGridId;

          // selected → accent | default → muted | additional → primary
          const tone = active
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : grid.isDefault
              ? "bg-muted text-muted-foreground hover:bg-muted/80"
              : "bg-primary text-primary-foreground hover:bg-primary/80";

          return (
            <div
              key={grid.id}
              className="inline-flex h-5 shrink-0 items-center leading-none"
            >
              <button
                type="button"
                onClick={() => setActiveGrid(grid.id)}
                className="inline-flex h-5 items-center leading-none outline-none"
              >
                <Badge
                  variant="default"
                  className={cn(
                    "max-w-40 cursor-pointer border-transparent leading-none",
                    !grid.isDefault && "rounded-r-none",
                    tone,
                  )}
                >
                  <span className="truncate leading-none">{grid.label}</span>
                </Badge>
              </button>
              {!grid.isDefault ? (
                <button
                  type="button"
                  aria-label={`Delete ${grid.label}`}
                  className={cn(
                    "inline-flex h-5 items-center rounded-r-full pr-1.5 leading-none",
                    tone,
                  )}
                  onClick={() =>
                    setPendingDelete({ id: grid.id, label: grid.label })
                  }
                >
                  <XIcon className="size-2.5" />
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        {activeIsDefault ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRestoreOpen(true)}
          >
            <RotateCcwIcon data-icon="inline-start" />
            Restore
          </Button>
        ) : null}
        <Button variant="outline" size="sm" onClick={() => setSaveAsOpen(true)}>
          <SaveIcon data-icon="inline-start" />
          Save as new grid
        </Button>
        <Separator orientation="vertical" className="mx-1 data-[orientation=vertical]:h-5" />
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

      <AlertDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {pendingDelete?.label ?? "grid"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the grid and its driver placements. This
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (pendingDelete) {
                  deleteGrid(pendingDelete.id);
                }
                setPendingDelete(null);
              }}
            >
              Delete grid
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
