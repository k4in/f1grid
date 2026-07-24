import { useState } from "react";

import { DriverCard } from "@/components/driver-card";
import { DropContainer } from "@/components/drop-container";
import { EmptySlot } from "@/components/empty-slot";
import { teams } from "@/data/teams";
import { POOL_IDS, POOL_META } from "@/lib/containers";
import { driverById } from "@/lib/drivers";
import { cn } from "@/lib/utils/cn";
import { useGridStore } from "@/store/grid-store";
import type { ContainerId } from "@/types/types";

const DRAG_TYPE = "application/x-f1-driver";

export function GridBoard() {
  const activeGridId = useGridStore((s) => s.activeGridId);
  const grids = useGridStore((s) => s.grids);
  const moveDriver = useGridStore((s) => s.moveDriver);

  const assignments =
    grids[activeGridId]?.assignments ?? grids.default?.assignments;

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overId, setOverId] = useState<ContainerId | null>(null);

  if (!assignments) return null;

  function handleDragStart(
    event: React.DragEvent<HTMLDivElement>,
    driverId: string,
  ) {
    event.dataTransfer.setData(DRAG_TYPE, driverId);
    event.dataTransfer.setData("text/plain", driverId);
    event.dataTransfer.effectAllowed = "move";
    setDraggingId(driverId);
  }

  function handleDragEnd() {
    setDraggingId(null);
    setOverId(null);
  }

  function handleDragOver(
    event: React.DragEvent<HTMLElement>,
    containerId: ContainerId,
  ) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    if (overId !== containerId) setOverId(containerId);
  }

  function handleDragLeave(
    event: React.DragEvent<HTMLElement>,
    containerId: ContainerId,
  ) {
    const related = event.relatedTarget as Node | null;
    if (related && event.currentTarget.contains(related)) return;
    if (overId === containerId) setOverId(null);
  }

  function handleDrop(
    event: React.DragEvent<HTMLElement>,
    containerId: ContainerId,
  ) {
    event.preventDefault();
    const driverId =
      event.dataTransfer.getData(DRAG_TYPE) ||
      event.dataTransfer.getData("text/plain");
    if (driverId) moveDriver(driverId, containerId);
    setDraggingId(null);
    setOverId(null);
  }

  function renderDrivers(containerId: ContainerId) {
    const ids = assignments![containerId] ?? [];
    if (ids.length === 0) return <EmptySlot />;

    return ids.map((id) => {
      const driver = driverById[id];
      if (!driver) return null;
      return (
        <div
          key={id}
          draggable
          onDragStart={(event) => handleDragStart(event, id)}
          onDragEnd={handleDragEnd}
          className={cn(
            "outline-none",
            draggingId === id && "opacity-50",
          )}
        >
          <DriverCard driver={driver} isDragging={draggingId === id} />
        </div>
      );
    });
  }

  return (
    <div className="flex min-h-0 flex-1 gap-3 p-3">
      <aside className="flex w-56 shrink-0 flex-col gap-2">
        <p className="px-1 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Free agent pools
        </p>
        {POOL_IDS.map((poolId) => {
          const meta = POOL_META[poolId];
          const count = assignments[poolId]?.length ?? 0;
          return (
            <DropContainer
              key={poolId}
              id={poolId}
              title={meta.shortLabel}
              subtitle={meta.hint}
              count={count}
              isOver={overId === poolId}
              compact
              onDragOver={(event) => handleDragOver(event, poolId)}
              onDragLeave={(event) => handleDragLeave(event, poolId)}
              onDrop={(event) => handleDrop(event, poolId)}
            >
              {renderDrivers(poolId)}
            </DropContainer>
          );
        })}
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-end justify-between px-1">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Constructor bays
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/80">
            Drag freely · no seat limits
          </p>
        </div>
        <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-12 gap-2">
          {teams.map((team, index) => {
            const count = assignments[team.id]?.length ?? 0;
            // 4 + 4 + 3 across a 12-col track
            const spanClass = index < 8 ? "col-span-3" : "col-span-4";
            return (
              <div key={team.id} className={cn("min-h-0", spanClass)}>
                <DropContainer
                  id={team.id}
                  title={team.shortName}
                  subtitle={team.fullName}
                  accent={team.teamColor}
                  count={count}
                  isOver={overId === team.id}
                  onDragOver={(event) => handleDragOver(event, team.id)}
                  onDragLeave={(event) => handleDragLeave(event, team.id)}
                  onDrop={(event) => handleDrop(event, team.id)}
                >
                  {renderDrivers(team.id)}
                </DropContainer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
