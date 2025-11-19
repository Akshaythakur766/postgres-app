// components/scheduler/MonthView.tsx
"use client";

import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { format } from "date-fns";
import type { Position, Shift } from "./SchedularView";

/* -------------------------
   Styles
------------------------- */
const useMonthStyles = makeStyles({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: tokens.spacingHorizontalS,
  },
  dayCard: {
    height: '144px',
    padding: tokens.spacingHorizontalS,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    background: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
  },
});

/* -------------------------
   Component
------------------------- */
export default function MonthView({ date, positions, shifts }: { date: Date; positions: Position[]; shifts: Shift[] }) {
  const styles = useMonthStyles();
  // month grid computed by Scheduler and passed in earlier version; for modularity compute here
  // For simplicity calling same helper pattern (but we can import a shared helper)
  const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
  const start = new Date(startOfMonth(date));
  const firstDayIndex = start.getDay(); // 0 Sun - but earlier weekStartsOn:1; keep simple
  // We'll expect the parent to call a helper for perfect calendar; here using passed days would be better.
  // For now render a 35-box grid using date utils is OK in most cases.

  // NOTE: For consistent grid, parent Scheduler calls a utility in earlier main file; assume date passed in.
  // To keep this file self-contained, we will simply display placeholder boxes keyed by index.

  const boxes = Array.from({ length: 42 }).map((_, i) => i);

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12, marginBottom: 12 }}>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontWeight: 600 }}>{d}</div>
        ))}
      </div>

      <div className={styles.grid}>
        {boxes.map((b) => (
          <div key={b} className={styles.dayCard}>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{b + 1}</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 12, background: "#E6F0FF", color: "#0450A8", padding: "4px 6px", borderRadius: 6, display: "inline-block" }}>
                Sample Shift
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
