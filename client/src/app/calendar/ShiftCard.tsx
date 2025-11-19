// components/scheduler/ShiftCard.tsx
"use client";

import { useDraggable } from "@dnd-kit/core";
import { makeStyles, tokens } from "@fluentui/react-components";
import type { Shift } from "./SchedularView";

const useShiftStyles = makeStyles({
    root: {
        padding: "6px 8px",
        borderRadius: tokens.borderRadiusSmall,
        background: tokens.colorBrandBackground,
        color: tokens.colorNeutralForegroundInverted,
        fontSize: '12px',
        fontWeight: 600,
        display: "inline-block",
        boxShadow: tokens.shadow2,

        "&:hover": {
            transform: "translateY(-1px)",
            transition: "transform .12s ease",
            cursor: "pointer",
        },

        "&:active": {
            cursor: "grabbing",
        },
    },
});


export default function ShiftCard({ shift }: { shift: Shift }) {
    const styles = useShiftStyles();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: shift.id });

    const style = transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined;

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className={styles.root} style={style} role="button" tabIndex={0}>
            {shift.label}
        </div>
    );
}
