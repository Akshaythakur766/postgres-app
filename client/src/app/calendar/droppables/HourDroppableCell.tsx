// components/scheduler/droppables/HourDroppable.tsx
"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { makeStyles, tokens } from "@fluentui/react-components";

const useHourStyles = makeStyles({
  overlay: {
    position: "absolute",
    inset: 0,
    borderRadius: tokens.borderRadiusSmall,
    selectors: {
      '&[data-over="true"]': {
        background: tokens.colorBrandBackground,
        opacity: 0.08,
      },
    },
  },
});

export default function HourDroppable({ positionId, dateKey }: { positionId: string; dateKey: string }) {
  const styles = useHourStyles();
  const { setNodeRef, isOver } = useDroppable({ id: `${positionId}__${dateKey}` });
  return <div ref={setNodeRef} data-over={isOver} className={styles.overlay} />;
}
