import AssignmentCard from "./AssignmentCard";

export default function AssignmentGrid({ assignments, onEdit, onDelete, onToggleStatus }) {
  if (assignments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-[#5C5840]">
        <div className="text-5xl mb-4 opacity-40">📋</div>
        <p className="text-base text-[#8C8060]">No assignments found</p>
        <p className="text-sm mt-1">Try adjusting your filters or add a new assignment</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {assignments.map((a) => (
        <AssignmentCard
          key={a.id}
          assignment={a}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}
