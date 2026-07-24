import { formatAge } from "@/lib/age";
import { flagUrl, formatDriverName, type DriverRecord } from "@/lib/drivers";
import { cn } from "@/lib/utils/cn";
import type { DriverStatusState } from "@/types/types";

const STATUS_PIP: Record<DriverStatusState, string> = {
  contract: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]",
  current: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.45)]",
  junior: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.45)]",
  previous: "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.45)]",
};

const STATUS_LABEL: Record<DriverStatusState, string> = {
  contract: "Under contract",
  current: "Current seat, open future",
  junior: "Junior",
  previous: "Previous F1",
};

type DriverCardProps = {
  driver: DriverRecord;
  isDragging?: boolean;
};

export function DriverCard({ driver, isDragging }: DriverCardProps) {
  return (
    <article
      className={cn(
        "group relative flex cursor-grab items-center gap-2 rounded-md border border-border/50 bg-card/90 px-2 py-1.5 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] active:cursor-grabbing",
        "transition-[transform,box-shadow,opacity] duration-150",
        "hover:border-border hover:bg-card",
        isDragging && "opacity-40 ring-1 ring-ring/40",
      )}
      title={STATUS_LABEL[driver.status.state]}
    >
      <span
        aria-hidden
        className={cn(
          "size-2.5 shrink-0 rounded-full",
          STATUS_PIP[driver.status.state],
        )}
      />
      <img
        src={flagUrl(driver.countryCode)}
        alt=""
        width={22}
        height={16}
        className="h-4 w-[22px] shrink-0 rounded-[2px] object-cover ring-1 ring-border/60"
        loading="lazy"
        draggable={false}
      />
      <div className="min-w-0 flex-1">
        <p className="truncate font-heading text-[11px] font-semibold tracking-tight text-foreground">
          {formatDriverName(driver)}
        </p>
        <p className="font-mono text-[10px] tracking-wide text-muted-foreground tabular-nums">
          {formatAge(driver.birthday)}
        </p>
      </div>
    </article>
  );
}
