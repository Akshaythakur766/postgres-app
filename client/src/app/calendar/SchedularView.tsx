// components/scheduler/Scheduler.tsx
"use client";

import React, { useMemo, useState } from "react";
import { DndContext } from "@dnd-kit/core";
import {
  addDays,
  addMonths,
  addYears,
  format,
  startOfDay,
  startOfWeek,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { makeStyles, shorthands, tokens, mergeClasses } from "@fluentui/react-components";

import DayView from "./DayView";
import WeekView from "./WeekView";
import MonthView from "./MonthView";
import YearView from "./YearView";

/* -------------------------
  Types
------------------------- */
type ViewMode = "day" | "week" | "month" | "year";

export interface Position {
  id: string;
  name: string;
}

export interface Shift {
  id: string;
  positionId?: string;
  date?: string; // yyyy-MM-dd
  label: string;
}

/* -------------------------
  Styles (Griffel makeStyles)
------------------------- */
const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "100%",
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke1),
    borderRadius: tokens.borderRadiusLarge,
    background: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
    overflow: "hidden",
    // ensure text rendering looks crisp
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: tokens.spacingVerticalS,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    ...shorthands.borderBottom("1px", "solid", tokens.colorNeutralStroke1),
    background: tokens.colorNeutralBackground2,
  },

  leftGroup: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },

  navGroup: {
    display: "inline-flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },

  navButton: {
    padding: "6px 10px",
    borderRadius: tokens.borderRadiusSmall,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke1),
    background: tokens.colorNeutralBackground1,
    cursor: "pointer",
    fontSize: '13px',
    selectors: {
      "&:hover": {
        background: tokens.colorNeutralBackground3,
      },
      "&:active": {
        transform: "translateY(1px)",
      },
      "&:focus": {
        outlineStyle: "solid",
        outlineWidth: "2px",
        outlineColor: tokens.colorBrandStroke1,
        outlineOffset: "2px",
      },
    },
  },

  dateTitle: {
    marginLeft: tokens.spacingHorizontalM,
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    fontWeight: 600,
  },

  viewTabs: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
  },

  viewTab: {
    padding: "6px 12px",
    borderRadius: tokens.borderRadiusSmall,
    fontSize: '13px',
    cursor: "pointer",
    background: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    ...shorthands.border("1px", "solid", tokens.colorNeutralStroke1),

    selectors: {
      "&:hover": {
        background: tokens.colorNeutralBackground4,
        color: tokens.colorNeutralForeground1,
      },
      "&:focus": {
        outlineStyle: "solid",
        outlineWidth: "2px",
        outlineColor: tokens.colorBrandStroke1,
        outlineOffset: "2px",
      },
"&.active": {
  background: tokens.colorNeutralForegroundInverted,
  color: tokens.colorNeutralBackground1,
  boxShadow: tokens.shadow4,
  ...shorthands.border("1px", "solid", tokens.colorNeutralForegroundInverted),
  fontWeight: 700,
},
    },
  },

  content: {
    background: tokens.colorNeutralBackground1,
  },

  // small utility
  smallMuted: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground1,
  },
});

/* -------------------------
  Scheduler Component
------------------------- */
export default function Scheduler({
  positions,
  shifts,
  initialDate = new Date(),
  initialView = "week",
  cycleLength = 7,
}: {
  positions: Position[];
  shifts: Shift[];
  initialDate?: Date;
  initialView?: ViewMode;
  cycleLength?: number;
}) {
  const styles = useStyles();

  const [currentDate, setCurrentDate] = useState<Date>(() => startOfDay(initialDate));
  const [view, setView] = useState<ViewMode>(initialView);
  const [localShifts, setLocalShifts] = useState<Shift[]>(shifts);

  // weekDays memo (cycleLength days starting from startOfWeek)
  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    return Array.from({ length: cycleLength }).map((_, i) => addDays(start, i));
  }, [currentDate, cycleLength]);

  /* -------------------------
    Navigation helpers
  ------------------------- */
  function goToday() {
    setCurrentDate(startOfDay(new Date()));
  }
  function prev() {
    if (view === "day") setCurrentDate((d) => subDays(d, 1));
    else if (view === "week") setCurrentDate((d) => subDays(d, cycleLength));
    else if (view === "month") setCurrentDate((d) => subMonths(d, 1));
    else if (view === "year") setCurrentDate((d) => subYears(d, 1));
  }
  function next() {
    if (view === "day") setCurrentDate((d) => addDays(d, 1));
    else if (view === "week") setCurrentDate((d) => addDays(d, cycleLength));
    else if (view === "month") setCurrentDate((d) => addMonths(d, 1));
    else if (view === "year") setCurrentDate((d) => addYears(d, 1));
  }

  /* -------------------------
    DnD handler: simple move
  ------------------------- */
  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;
    const shiftId = active.id as string;
    const overId = over.id as string;
    const [positionId, dateStr] = overId.split("__");
    setLocalShifts((prev) => prev.map((s) => (s.id === shiftId ? { ...s, positionId, date: dateStr } : s)));
  }

  /* -------------------------
    Render
  ------------------------- */
  return (
    <div className={styles.root} role="application" aria-label="Scheduler">
      <div className={styles.header}>
        <div className={styles.leftGroup}>
          <div className={styles.navGroup}>
            <button className={styles.navButton} onClick={prev} aria-label="Previous">
              ←
            </button>

            <button className={styles.navButton} onClick={goToday} aria-label="Today">
              Today
            </button>

            <button className={styles.navButton} onClick={next} aria-label="Next">
              →
            </button>
          </div>

          <div className={styles.dateTitle}>
            {view === "day" && <span>{format(currentDate, "EEE, d MMM yyyy")}</span>}
            {view === "week" && (
              <span>
                {format(weekDays[0], "d MMM yyyy")} — {format(weekDays[weekDays.length - 1], "d MMM yyyy")}
              </span>
            )}
            {view === "month" && <span>{format(currentDate, "MMMM yyyy")}</span>}
            {view === "year" && <span>{currentDate.getFullYear()}</span>}
          </div>
        </div>

        <div>
          <div className={styles.viewTabs} role="tablist" aria-label="Calendar views">
            {(["day", "week", "month", "year"] as ViewMode[]).map((v) => {
              const className = mergeClasses(styles.viewTab, v === view ? "active" : "");
              return (
                <div
                  key={v}
                  role="tab"
                  tabIndex={0}
                  aria-selected={v === view}
                  onClick={() => setView(v)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setView(v);
                  }}
                  className={className}
                >
                  {v.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <DndContext onDragEnd={handleDragEnd}>
          {view === "day" && <DayView date={currentDate} positions={positions} shifts={localShifts} />}
          {view === "week" && <WeekView days={weekDays} positions={positions} shifts={localShifts} />}
          {view === "month" && <MonthView date={currentDate} positions={positions} shifts={localShifts} />}
          {view === "year" && <YearView yearDate={currentDate} shifts={localShifts} />}
        </DndContext>
      </div>
    </div>
  );
}
