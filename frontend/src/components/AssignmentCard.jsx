import { isOverdue, formatDate, getPriorityClasses, getStatusClasses } from "../utils";
import { CalendarIcon, EditIcon, TrashIcon } from "./Icons";

export default function AssignmentCard({ assignment, onEdit, onDelete, onToggleStatus }) {
  const { id, title, subject, due, priority, status, desc } = assignment;
  const overdue = isOverdue(due, status);
  const priClasses = getPriorityClasses(priority);
  const statusClasses = getStatusClasses(status);

  return (
    <div
      className={`
        group relative bg-[#201E12] border rounded-xl p-4 flex flex-col gap-3
        transition-all duration-200 cursor-default
        hover:bg-[#252210] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]
        ${overdue
          ? "border-l-[3px] border-l-[#EF4444] border-t-[#2E2B1A] border-r-[#2E2B1A] border-b-[#2E2B1A]"
          : "border-[#2E2B1A] hover:border-[#3D3920]"
        }
        ${status === "Completed" ? "opacity-50" : ""}
      `}
    >
      {/* Overdue banner */}
      {overdue && (
        <div className="flex items-center gap-1.5 bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.2)] rounded-md px-2.5 py-1.5 text-[11px] text-[#EF4444]">
          <span>⚠</span>
          <span>Overdue</span>
        </div>
      )}

      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[rgba(245,158,11,0.12)] text-[#F59E0B] border border-[rgba(245,158,11,0.2)] uppercase tracking-wider">
          {subject}
        </span>
        <span className={`text-[10px] font-medium px-2 py-1 rounded-full uppercase tracking-wider shrink-0 ${priClasses.badge}`}>
          {priority}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-head text-[15px] font-semibold text-[#FEF3C7] leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#8C8060] leading-relaxed line-clamp-2 flex-1">
        {desc || "No description provided."}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex flex-col gap-1.5">
          <span className={`flex items-center gap-1 text-[11px] ${overdue ? "text-[#EF4444]" : "text-[#8C8060]"}`}>
            <CalendarIcon />
            {formatDate(due)}
          </span>
          <button
            onClick={() => onToggleStatus(id)}
            className={`text-[10px] font-medium px-2 py-1 rounded-full transition-all duration-150 cursor-pointer ${statusClasses}`}
          >
            {status}
          </button>
        </div>

        {/* Action buttons — visible on hover */}
        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            onClick={() => onEdit(assignment)}
            title="Edit"
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#1A1710] border border-[#2E2B1A] text-[#8C8060] transition-all duration-150 hover:border-[#F59E0B] hover:text-[#F59E0B] hover:bg-[rgba(245,158,11,0.12)] cursor-pointer"
          >
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(id)}
            title="Delete"
            className="w-7 h-7 flex items-center justify-center rounded-md bg-[#1A1710] border border-[#2E2B1A] text-[#8C8060] transition-all duration-150 hover:border-[#EF4444] hover:text-[#EF4444] hover:bg-[rgba(239,68,68,0.15)] cursor-pointer"
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
