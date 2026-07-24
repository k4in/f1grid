export function EmptySlot({ label = "Drop drivers here" }: { label?: string }) {
  return (
    <div className="flex min-h-12 flex-1 items-center justify-center rounded-md border border-dashed border-white/8 px-2 py-3 text-center text-[10px] text-muted-foreground/80">
      {label}
    </div>
  );
}
