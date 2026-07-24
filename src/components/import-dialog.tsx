import { useState } from "react";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { useGridStore } from "@/store/grid-store";

type ImportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ImportDialog({ open, onOpenChange }: ImportDialogProps) {
  const importGrid = useGridStore((s) => s.importGrid);
  const [label, setLabel] = useState("");
  const [payload, setPayload] = useState("");
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setLabel("");
    setPayload("");
    setError(null);
  }

  function handleImport() {
    const result = importGrid(label, payload);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    reset();
    onOpenChange(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import grid</DialogTitle>
          <DialogDescription>
            Paste an exported grid string and give the new grid a name.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field data-invalid={error && !label.trim() ? true : undefined}>
            <FieldLabel htmlFor="import-label">Grid name</FieldLabel>
            <Input
              id="import-label"
              value={label}
              placeholder="e.g. My 2027 grid"
              onChange={(event) => {
                setLabel(event.target.value);
                setError(null);
              }}
            />
          </Field>
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor="import-payload">Grid string</FieldLabel>
            <Textarea
              id="import-payload"
              value={payload}
              placeholder='{"v":1,"assignments":{...}}'
              className="min-h-36 font-mono text-[11px]"
              aria-invalid={error ? true : undefined}
              onChange={(event) => {
                setPayload(event.target.value);
                setError(null);
              }}
            />
            <FieldDescription>
              Creates a new grid and switches to it. The default grid is left
              alone.
            </FieldDescription>
            {error ? <FieldError>{error}</FieldError> : null}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport}>Import grid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
