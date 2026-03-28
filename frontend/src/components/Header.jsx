export default function Header({ onAddClick }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-7 py-5 border-b border-[#2E2B1A] bg-[#0F0D06]">
      <div className="font-head text-xl font-bold tracking-tight">
        <span className="text-[#F59E0B]">Study</span>
        <span className="text-[#8C8060] font-normal">Planner</span>
      </div>
      <button
        onClick={onAddClick}
        className="bg-[#F59E0B] text-[#0F0D06] px-4 py-2 rounded-lg font-head font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-[#FDB827] hover:-translate-y-px active:translate-y-0"
      >
        + Add Assignment
      </button>
    </header>
  );
}
