import { isOverdue } from "../utils";

export default function StatsBar({ assignments }) {
  const total = assignments.length;
  const pending = assignments.filter((a) => a.status === "Pending").length;
  const completed = assignments.filter((a) => a.status === "Completed").length;
  const overdue = assignments.filter((a) => isOverdue(a.due, a.status)).length;

  const stats = [
    { label: "Total", value: total, color: "text-[#F59E0B]" },
    { label: "Pending", value: pending, color: "text-[#FEF3C7]" },
    { label: "Completed", value: completed, color: "text-[#34D399]" },
    { label: "Overdue", value: overdue, color: "text-[#EF4444]" },
  ];

  return (
    <div className="flex gap-3 px-7 py-4 border-b border-[#2E2B1A] flex-wrap">
      {stats.map((s) => (
        <div
          key={s.label}
          className="bg-[#1A1710] border border-[#2E2B1A] rounded-xl px-4 py-2.5 flex flex-col gap-0.5 min-w-[90px]"
        >
          <span className={`font-head text-2xl font-bold ${s.color}`}>
            {s.value}
          </span>
          <span className="text-[11px] text-[#8C8060] uppercase tracking-wider">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  );
}
