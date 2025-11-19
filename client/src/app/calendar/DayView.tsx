// components/scheduler/DayView.tsx
"use client";

import React, { useMemo } from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { format, startOfDay } from "date-fns";
import ShiftCard from "./ShiftCard";
import HourDroppable from "./droppables/HourDroppableCell";

/* Types */
import type { Position, Shift } from "./SchedularView";

/* -------------------------
   Styles
------------------------- */
const useDayViewStyles = makeStyles({
  container: {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    minHeight: "420px",
  },
  hoursCol: {
    ...shorthands.borderRight("1px", "solid", tokens.colorNeutralStroke1),
    background: tokens.colorNeutralBackground2,
  },
  hourCell: {
    height: '48px',
    padding: tokens.spacingHorizontalS,
    color: tokens.colorNeutralForeground2,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    fontSize: '12px',
  },
  rightPanel: {
    overflow: "auto",
    padding: tokens.spacingHorizontalM,
  },
  positionCard: {
    minWidth: '240px',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    background: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    overflow: "hidden",
  },
  positionHeader: {
    padding: tokens.spacingVerticalS + " " + tokens.spacingHorizontalS,
    background: tokens.colorNeutralBackground2,
    fontSize: '13px',
    fontWeight: 600,
    textAlign: "center",
  },
});

/* -------------------------
   Component
------------------------- */
export default function DayView({
  date,
  positions,
  shifts,
}: {
  date: Date;
  positions: Position[];
  shifts: Shift[];
}) {
  const styles = useDayViewStyles();
  const dayKey = format(date, "yyyy-MM-dd");

  const hours = useMemo(() => Array.from({ length: 24 }).map((_, i) => i), []);

  return (
    <div className={styles.container}>
      <div className={styles.hoursCol}>
        <div style={{ padding: 12, fontWeight: 600 }}>Time</div>
        {hours.map((h) => (
          <div key={h} className={styles.hourCell}>
            {String(h).padStart(2, "0")}:00
          </div>
        ))}
      </div>

      <div className={styles.rightPanel}>
        <div style={{ display: "flex", gap: 16, minWidth: positions.length * 256 }}>
          {positions.map((pos) => (
            <div key={pos.id} className={styles.positionCard}>
              <div className={styles.positionHeader}>{pos.name}</div>

              <div>
                {hours.map((h) => (
                  <div key={h} style={{ height: 48, borderTop: `1px solid ${tokens.colorNeutralStroke1}`, position: "relative", padding: 8 }}>
                    {shifts
                      .filter((s) => s.positionId === pos.id && s.date === dayKey)
                      .map((s) => (
                        <ShiftCard key={s.id} shift={s} />
                      ))}

                    {/* Droppable full-hour zone */}
                    <HourDroppable positionId={pos.id} dateKey={dayKey} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
