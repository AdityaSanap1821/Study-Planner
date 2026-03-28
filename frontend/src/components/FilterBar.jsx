const Pill = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full text-xs border transition-all duration-150 font-body cursor-pointer
      ${active
        ? "bg-[rgba(245,158,11,0.12)] border-[#F59E0B] text-[#F59E0B]"
        : "bg-transparent border-[#2E2B1A] text-[#8C8060] hover:border-[#3D3920] hover:text-[#FEF3C7]"
      }`}
  >
    {label}
  </button>
);

const Sep = () => (
  <div className="w-px h-5 bg-[#2E2B1A] mx-1 self-center" />
);

const Label = ({ children }) => (
  <span className="text-[11px] text-[#5C5840] uppercase tracking-wider mr-1 self-center">
    {children}
  </span>
);

export default function FilterBar({ assignments, filters, onFilterChange }) {
  const subjects = [...new Set(assignments.map((a) => a.subject))];

  return (
    <div className="flex items-center gap-2 px-7 py-3.5 border-b border-[#2E2B1A] flex-wrap">
      <Label>Status</Label>
      {["all", "Pending", "Completed"].map((v) => (
        <Pill
          key={v}
          label={v === "all" ? "All" : v}
          active={filters.status === v}
          onClick={() => onFilterChange("status", v)}
        />
      ))}

      <Sep />

      <Label>Priority</Label>
      {["all", "High", "Medium", "Low"].map((v) => (
        <Pill
          key={v}
          label={v === "all" ? "All" : v}
          active={filters.priority === v}
          onClick={() => onFilterChange("priority", v)}
        />
      ))}

      <Sep />

      <Label>Subject</Label>
      <Pill
        label="All"
        active={filters.subject === "all"}
        onClick={() => onFilterChange("subject", "all")}
      />
      {subjects.map((s) => (
        <Pill
          key={s}
          label={s}
          active={filters.subject === s}
          onClick={() => onFilterChange("subject", s)}
        />
      ))}
    </div>
  );
}
