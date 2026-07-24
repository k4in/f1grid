import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/shadcn/field";
import { Textarea } from "@/components/shadcn/textarea";

type ExportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  payload: string;
};

export function ExportDialog({
  open,
  onOpenChange,
  payload,
}: ExportDialogProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: select text for manual copy
      const el = document.getElementById(
        "export-payload",
      ) as HTMLTextAreaElement | null;
      el?.select();
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setCopied(false);
        onOpenChange(next);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Export grid</DialogTitle>
          <DialogDescription>
            Copy this string to share the active grid&apos;s driver placements.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="export-payload">Grid string</FieldLabel>
            <Textarea
              id="export-payload"
              readOnly
              value={payload}
              className="min-h-36 font-mono text-[11px]"
              onFocus={(event) => event.currentTarget.select()}
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleCopy}>
            {copied ? (
              <CheckIcon data-icon="inline-start" />
            ) : (
              <CopyIcon data-icon="inline-start" />
            )}
            {copied ? "Copied" : "Copy string"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
