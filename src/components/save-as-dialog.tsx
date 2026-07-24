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
import { useGridStore } from "@/store/grid-store";

type SaveAsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SaveAsDialog({ open, onOpenChange }: SaveAsDialogProps) {
  const saveAsNewGrid = useGridStore((s) => s.saveAsNewGrid);
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setLabel("");
    setError(null);
  }

  function handleSave() {
    const result = saveAsNewGrid(label);
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save as new grid</DialogTitle>
          <DialogDescription>
            Snapshot the current placements under a new name and switch to it.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field data-invalid={error ? true : undefined}>
            <FieldLabel htmlFor="save-as-label">Grid name</FieldLabel>
            <Input
              id="save-as-label"
              value={label}
              placeholder="e.g. Red Bull shake-up"
              aria-invalid={error ? true : undefined}
              onChange={(event) => {
                setLabel(event.target.value);
                setError(null);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleSave();
                }
              }}
            />
            <FieldDescription>
              The current grid stays as it is. You&apos;ll land on the copy.
            </FieldDescription>
            {error ? <FieldError>{error}</FieldError> : null}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save grid</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
