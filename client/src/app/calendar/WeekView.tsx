// components/scheduler/WeekView.tsx
"use client";

import React from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { format } from "date-fns";
import DayDroppableCell from "./droppables/DayDroppableCell";
import type { Position, Shift } from "./SchedularView";

/* -------------------------
   Styles
------------------------- */
const useWeekStyles = makeStyles({
  wrapper: {
    overflowX: "auto",
  },
  gridRoot: {
    display: "grid",
    minWidth: "100%",
  },
  headerRow: {
    display: "grid",
    gridTemplateColumns: "200px repeat(7, minmax(140px, 1fr))",
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke1),
  },
  positionCell: {
    padding: tokens.spacingHorizontalM,
    fontWeight: 600,
    background: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
  },
});

/* -------------------------
   Component
------------------------- */
export default function WeekView({
  days,
  positions,
  shifts,
}: {
  days: Date[];
  positions: Position[];
  shifts: Shift[];
}) {
  const styles = useWeekStyles();
  const cycleLength = days.length;

  return (
    <div className={styles.wrapper}>
      <div style={{ minWidth: `${200 + cycleLength * 160}px` }}>
        <div className={styles.headerRow} style={{ gridTemplateColumns: `200px repeat(${cycleLength}, minmax(140px, 1fr))` }}>
          <div className={styles.positionCell}>Position</div>
          {days.map((d) => (
            <div key={format(d, "yyyy-MM-dd")} style={{ padding: 12, textAlign: "center", background: tokens.colorNeutralBackground2, borderRight: `1px solid ${tokens.colorNeutralStroke1}` }}>
              <div style={{ fontWeight: 600 }}>{format(d, "EEE")}</div>
              <div style={{ fontSize: 12, color: tokens.colorNeutralForeground2 }}>{format(d, "d MMM")}</div>
            </div>
          ))}
        </div>

        {positions.map((pos) => (
          <div key={pos.id} style={{ display: "grid", gridTemplateColumns: `200px repeat(${cycleLength}, minmax(140px, 1fr))`, borderTop: `1px solid ${tokens.colorNeutralStroke1}` }}>
            <div style={{ padding: 12, background: tokens.colorNeutralBackground1, borderRight: `1px solid ${tokens.colorNeutralStroke1}`, fontWeight: 600 }}>{pos.name}</div>

            {days.map((day) => (
              <DayDroppableCell key={format(day, "yyyy-MM-dd")} positionId={pos.id} date={day} shifts={shifts} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
