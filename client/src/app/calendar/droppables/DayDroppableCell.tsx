// components/scheduler/droppables/DayDroppableCell.tsx
"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { makeStyles, tokens } from "@fluentui/react-components";
import { format } from "date-fns";
import ShiftCard from "../ShiftCard";
import type { Shift } from "../SchedularView";

const useCellStyles = makeStyles({
  root: {
    minHeight: "96px",
    padding: tokens.spacingHorizontalS,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    background: tokens.colorNeutralBackground1,
    selectors: {
      '&[data-over="true"]': {
        background: tokens.colorNeutralBackgroundInverted,
      },
    },
  },
});

export default function DayDroppableCell({ positionId, date, shifts }: { positionId: string; date: Date; shifts: Shift[] }) {
  const styles = useCellStyles();
  const dateKey = format(date, "yyyy-MM-dd");
  const { setNodeRef, isOver } = useDroppable({ id: `${positionId}__${dateKey}` });

  const dayShifts = shifts.filter((s) => s.positionId === positionId && s.date === dateKey);

  return (
    <div ref={setNodeRef} data-over={isOver} className={styles.root}>
      {dayShifts.map((s) => (
        <div key={s.id} style={{ marginBottom: 6 }}>
          <ShiftCard shift={s} />
        </div>
      ))}
    </div>
  );
}
