// app/scheduler/page.tsx  (or pages/scheduler.tsx)
import Scheduler from "./SchedularView";
// const Scheduler = dynamic(() => import("./SchedularView").then(m => m.default), {
//   ssr: false,
// });

const positions = [
    { id: "p1", name: "Cashier" },
    { id: "p2", name: "Kitchen" },
    { id: "p3", name: "Manager" },
];

const shifts = [
    { id: "s1", label: "9am - 5pm", positionId: "p1", date: "2025-11-20" },
    { id: "s2", label: "10am - 6pm", positionId: "p2", date: "2025-11-21" },
];

export default function Page() {
    return (
        <div className="p-6">
            <Scheduler positions={positions} shifts={shifts} initialView="week" cycleLength={7} />
        </div>
    );
}
