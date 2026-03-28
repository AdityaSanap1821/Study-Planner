import { useState, useEffect } from "react";
import Header from "./components/Header";
import StatsBar from "./components/StatsBar";
import FilterBar from "./components/FilterBar";
import AssignmentGrid from "./components/AssignmentGrid";
import AssignmentDrawer from "./components/AssignmentDrawer";
import {
  fetchAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from "./api";

const DEFAULT_FILTERS = { status: "all", priority: "all", subject: "all" };

export default function App() {
  const [assignments, setAssignments] = useState([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load assignments on mount
  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAssignments();
      setAssignments(data);
    } catch (err) {
      setError(
        "Failed to load assignments. Make sure the backend is running on http://localhost:8000",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // --- Filter logic ---
  const filtered = assignments.filter((a) => {
    if (filters.status !== "all" && a.status !== filters.status) return false;
    if (filters.priority !== "all" && a.priority !== filters.priority)
      return false;
    if (filters.subject !== "all" && a.subject !== filters.subject)
      return false;
    return true;
  });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  // --- Drawer ---
  const openAdd = () => {
    setEditingAssignment(null);
    setDrawerOpen(true);
  };

  const openEdit = (assignment) => {
    setEditingAssignment(assignment);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setEditingAssignment(null);
  };

  // --- CRUD ---
  const handleSave = async (formData) => {
    try {
      if (editingAssignment) {
        // Update
        const updated = await updateAssignment(editingAssignment.id, formData);
        setAssignments((prev) =>
          prev.map((a) => (a.id === editingAssignment.id ? updated : a)),
        );
      } else {
        // Create
        const created = await createAssignment(formData);
        setAssignments((prev) => [...prev, created]);
      }
      closeDrawer();
    } catch (err) {
      setError("Failed to save assignment");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAssignment(id);
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError("Failed to delete assignment");
      console.error(err);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const assignment = assignments.find((a) => a.id === id);
      if (!assignment) return;

      const newStatus =
        assignment.status === "Pending" ? "Completed" : "Pending";
      const updated = await updateAssignment(id, {
        ...assignment,
        status: newStatus,
      });
      setAssignments((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      setError("Failed to toggle status");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0D06] font-body">
      <Header onAddClick={openAdd} />

      {error && (
        <div className="mx-7 mt-4 p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-96 text-[#8C8060]">
          Loading assignments...
        </div>
      ) : (
        <>
          <StatsBar assignments={assignments} />
          <FilterBar
            assignments={assignments}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <main className="px-7 py-6">
            <AssignmentGrid
              assignments={filtered}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </main>
        </>
      )}

      <AssignmentDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        onSave={handleSave}
        editingAssignment={editingAssignment}
      />
    </div>
  );
}
