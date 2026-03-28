export function isOverdue(due, status) {
  if (status === "Completed") return false;
  return new Date(due) < new Date(new Date().toDateString());
}

export function formatDate(d) {
  const dt = new Date(d + "T00:00:00");
  return dt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function getPriorityClasses(priority) {
  switch (priority) {
    case "High":
      return {
        badge: "bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.2)]",
        btn: "bg-[rgba(248,113,113,0.12)] border-[#F87171] text-[#F87171]",
      };
    case "Medium":
      return {
        badge: "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border border-[rgba(251,191,36,0.2)]",
        btn: "bg-[rgba(251,191,36,0.12)] border-[#FBBF24] text-[#FBBF24]",
      };
    case "Low":
      return {
        badge: "bg-[rgba(52,211,153,0.12)] text-[#34D399] border border-[rgba(52,211,153,0.2)]",
        btn: "bg-[rgba(52,211,153,0.12)] border-[#34D399] text-[#34D399]",
      };
    default:
      return { badge: "", btn: "" };
  }
}

export function getStatusClasses(status) {
  return status === "Completed"
    ? "bg-[rgba(52,211,153,0.15)] text-[#34D399] border border-[rgba(52,211,153,0.2)]"
    : "bg-[rgba(245,158,11,0.1)] text-[#F59E0B] border border-[rgba(245,158,11,0.2)]";
}
