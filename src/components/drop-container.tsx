import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type DropContainerProps = {
  id: string;
  title: string;
  subtitle?: string;
  accent?: string;
  count: number;
  isOver?: boolean;
  compact?: boolean;
  children: ReactNode;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

export function DropContainer({
  id,
  title,
  subtitle,
  accent,
  count,
  isOver,
  compact,
  children,
  onDragOver,
  onDragLeave,
  onDrop,
}: DropContainerProps) {
  return (
    <section
      data-container-id={id}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-white/6 bg-[#0a0e14]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
        "transition-[border-color,box-shadow,background-color] duration-150",
        isOver && "border-papaya/50 bg-papaya/5 shadow-[0_0_0_1px_rgba(255,128,0,0.25)]",
      )}
      style={
        accent
          ? {
              backgroundImage: `linear-gradient(180deg, color-mix(in oklab, ${accent} 14%, transparent), transparent 42%)`,
            }
          : undefined
      }
    >
      <header
        className={cn(
          "flex items-start justify-between gap-2 border-b border-white/5 px-2.5 py-2",
          compact && "py-1.5",
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {accent ? (
              <span
                aria-hidden
                className="size-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 10px ${accent}88`,
                }}
              />
            ) : null}
            <h2 className="truncate font-heading text-[11px] font-semibold tracking-[0.04em] text-foreground uppercase">
              {title}
            </h2>
          </div>
          {subtitle ? (
            <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
        </div>
        <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
          {String(count).padStart(2, "0")}
        </span>
      </header>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto p-2",
          compact && "gap-1 p-1.5",
        )}
      >
        {children}
      </div>
    </section>
  );
}
