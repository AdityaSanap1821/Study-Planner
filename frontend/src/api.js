const API_URL = "http://localhost:8000";

// Helper: Convert frontend format to backend format
const toBackendFormat = (assignment) => ({
  title: assignment.title,
  description: assignment.desc || "",
  subject: assignment.subject,
  priority: assignment.priority,
  status: assignment.status,
  due_date: assignment.due,
});

// Helper: Convert backend format to frontend format
const toFrontendFormat = (assignment) => ({
  id: assignment.id,
  title: assignment.title,
  subject: assignment.subject,
  due: assignment.due_date,
  priority: assignment.priority,
  status: assignment.status,
  desc: assignment.description || "",
});

// GET all assignments
export const fetchAssignments = async () => {
  try {
    const res = await fetch(`${API_URL}/assignments`);
    if (!res.ok) throw new Error("Failed to fetch assignments");
    const data = await res.json();
    return data.map(toFrontendFormat);
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

// GET single assignment
export const fetchAssignment = async (id) => {
  try {
    const res = await fetch(`${API_URL}/assignments/${id}`);
    if (!res.ok) throw new Error("Failed to fetch assignment");
    const data = await res.json();
    return toFrontendFormat(data);
  } catch (error) {
    console.error("Error fetching assignment:", error);
    throw error;
  }
};

// POST create assignment
export const createAssignment = async (assignment) => {
  try {
    const res = await fetch(`${API_URL}/assignments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toBackendFormat(assignment)),
    });
    if (!res.ok) throw new Error("Failed to create assignment");
    const data = await res.json();
    return toFrontendFormat(data);
  } catch (error) {
    console.error("Error creating assignment:", error);
    throw error;
  }
};

// PUT update assignment
export const updateAssignment = async (id, assignment) => {
  try {
    const res = await fetch(`${API_URL}/assignments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toBackendFormat(assignment)),
    });
    if (!res.ok) throw new Error("Failed to update assignment");
    const data = await res.json();
    return toFrontendFormat(data);
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
};

// DELETE assignment
export const deleteAssignment = async (id) => {
  try {
    const res = await fetch(`${API_URL}/assignments/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete assignment");
    return res.json();
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};
