import { useState, useEffect } from "react";
import { getPriorityClasses } from "../utils";

const EMPTY_FORM = {
  title: "",
  subject: "",
  due: "",
  priority: "Medium",
  status: "Pending",
  desc: "",
};

const inputClass =
  "w-full bg-[#0F0D06] border border-[#2E2B1A] text-[#FEF3C7] placeholder-[#5C5840] px-3 py-2 rounded-lg text-sm font-body transition-all duration-150 outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[rgba(245,158,11,0.2)]";

const labelClass =
  "block text-[11px] font-medium text-[#8C8060] uppercase tracking-wider mb-1.5";

export default function AssignmentDrawer({
  isOpen,
  onClose,
  onSave,
  editingAssignment,
}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingAssignment) {
      setForm({
        title: editingAssignment.title,
        subject: editingAssignment.subject,
        due: editingAssignment.due,
        priority: editingAssignment.priority,
        status: editingAssignment.status,
        desc: editingAssignment.desc || "",
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editingAssignment, isOpen]);

  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!form.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!form.due) {
      newErrors.due = "Due date is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(form);
    }
  };

  const priorities = ["Low", "Medium", "High"];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[420px] max-w-full bg-[#1A1710] border-l border-[#2E2B1A] z-50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2E2B1A] shrink-0">
          <h2 className="font-head text-base font-bold text-[#FEF3C7]">
            {editingAssignment ? "Edit Assignment" : "Add Assignment"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-md bg-transparent border border-[#2E2B1A] text-[#8C8060] text-base transition-all duration-150 hover:border-[#EF4444] hover:text-[#EF4444] cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Title */}
          <div>
            <label className={labelClass}>Title</label>
            <input
              className={`${inputClass} ${errors.title ? "border-red-500" : ""}`}
              type="text"
              placeholder="Assignment title..."
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className={labelClass}>Subject</label>
            <input
              className={`${inputClass} ${errors.subject ? "border-red-500" : ""}`}
              type="text"
              placeholder="e.g. Mathematics, Physics..."
              value={form.subject}
              onChange={(e) => set("subject", e.target.value)}
            />
            {errors.subject && (
              <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
            )}
          </div>

          {/* Due Date */}
          <div>
            <label className={labelClass}>Due Date</label>
            <input
              className={`${inputClass} ${errors.due ? "border-red-500" : ""}`}
              type="date"
              value={form.due}
              onChange={(e) => set("due", e.target.value)}
            />
            {errors.due && (
              <p className="text-red-500 text-xs mt-1">{errors.due}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className={labelClass}>Priority</label>
            <div className="flex gap-2">
              {priorities.map((p) => {
                const cls = getPriorityClasses(p);
                const isActive = form.priority === p;
                return (
                  <button
                    key={p}
                    onClick={() => set("priority", p)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-medium font-body transition-all duration-150 cursor-pointer
                      ${
                        isActive
                          ? cls.btn
                          : "bg-transparent border-[#2E2B1A] text-[#8C8060] hover:border-[#3D3920] hover:text-[#FEF3C7]"
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <select
              className={inputClass}
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              className={`${inputClass} resize-y min-h-[90px]`}
              placeholder="Add notes or details..."
              value={form.desc}
              onChange={(e) => set("desc", e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2.5 px-6 py-4 border-t border-[#2E2B1A] shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-transparent border border-[#2E2B1A] text-[#8C8060] text-sm font-body transition-all duration-150 hover:border-[#3D3920] hover:text-[#FEF3C7] cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-lg bg-[#F59E0B] text-[#0F0D06] font-head font-bold text-sm tracking-wide transition-all duration-200 hover:bg-[#FDB827] active:scale-[0.98] cursor-pointer"
          >
            {editingAssignment ? "Update Assignment" : "Save Assignment"}
          </button>
        </div>
      </div>
    </>
  );
}
