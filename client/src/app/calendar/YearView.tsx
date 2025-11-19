// components/scheduler/YearView.tsx
"use client";

import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { eachMonthOfInterval, format } from "date-fns";
import type { Shift } from "./SchedularView";

/* -------------------------
   Styles
------------------------- */
const useYearStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: tokens.spacingHorizontalM,
    padding: tokens.spacingHorizontalM,
  },
  monthCard: {
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    background: tokens.colorNeutralBackground2,
  },
});

/* -------------------------
   Component
------------------------- */
export default function YearView({ yearDate, shifts }: { yearDate: Date; shifts: Shift[] }) {
  const styles = useYearStyles();
  const months = eachMonthOfInterval({ start: new Date(yearDate.getFullYear(), 0, 1), end: new Date(yearDate.getFullYear(), 11, 31) });

  return (
    <div className={styles.grid}>
      {months.map((m) => {
        const monthKey = format(m, "yyyy-MM");
        const count = shifts.filter((s) => s.date?.startsWith(monthKey)).length;
        return (
          <div key={monthKey} className={styles.monthCard}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>{format(m, "MMMM")}</div>
            <div style={{ fontSize: 28, color: tokens.colorBrandForeground1, fontWeight: 700 }}>{count}</div>
            <div style={{ color: tokens.colorNeutralForeground2 }}>shifts</div>
          </div>
        );
      })}
    </div>
  );
}
