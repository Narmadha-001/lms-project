import React, { useState } from "react";

const Assignments = () => {
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "React Basics Assignment",
      dueDate: "2025-11-15",
      status: "Pending",
    },
    {
      id: 2,
      title: "Java Spring Boot Project",
      dueDate: "2025-11-18",
      status: "Submitted",
    },
    {
      id: 3,
      title: "Database Design Homework",
      dueDate: "2025-11-20",
      status: "Late",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [modalType, setModalType] = useState("");

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-700";
      case "Submitted":
        return "bg-green-200 text-green-700";
      case "Late":
        return "bg-red-200 text-red-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const openModal = (assignment, type) => {
    setSelected(assignment);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
    setSelected(null);
  };

  const submitAssignment = () => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === selected.id ? { ...item, status: "Submitted" } : item
      )
    );
    closeModal();
  };

  const deleteAssignment = () => {
    setAssignments((prev) => prev.filter((item) => item.id !== selected.id));
    closeModal();
  };

  const saveEdit = () => {
    setAssignments((prev) =>
      prev.map((item) =>
        item.id === selected.id ? selected : item
      )
    );
    closeModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Assignments</h1>

      <table className="w-full border bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Due Date</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id} className="border-t">
              <td className="p-4">{assignment.title}</td>
              <td className="p-4">{assignment.dueDate}</td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    assignment.status
                  )}`}
                >
                  {assignment.status}
                </span>
              </td>
              <td className="p-4 text-center space-x-2">
                <button
                  onClick={() => openModal(assignment, "view")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  View
                </button>

                <button
                  onClick={() => openModal(assignment, "submit")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>

                <button
                  onClick={() => openModal(assignment, "edit")}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => openModal(assignment, "delete")}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {modalType && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {/* VIEW MODAL */}
            {modalType === "view" && (
              <>
                <h2 className="text-xl font-bold mb-4">Assignment Details</h2>
                <p><strong>Title:</strong> {selected.title}</p>
                <p><strong>Due Date:</strong> {selected.dueDate}</p>
                <p><strong>Status:</strong> {selected.status}</p>

                <button
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            )}

            {/* SUBMIT CONFIRMATION */}
            {modalType === "submit" && (
              <>
                <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
                <p>Are you sure you want to submit the assignment?</p>

                <div className="flex justify-end mt-5 space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded"
                    onClick={submitAssignment}
                  >
                    Yes, Submit
                  </button>
                </div>
              </>
            )}

            {/* EDIT MODAL */}
            {modalType === "edit" && (
              <>
                <h2 className="text-xl font-bold mb-4">Edit Assignment</h2>

                <input
                  value={selected.title}
                  onChange={(e) =>
                    setSelected((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="border p-2 w-full mb-2 rounded"
                  placeholder="Title"
                />

                <input
                  type="date"
                  value={selected.dueDate}
                  onChange={(e) =>
                    setSelected((prev) => ({ ...prev, dueDate: e.target.value }))
                  }
                  className="border p-2 w-full mb-2 rounded"
                />

                <select
                  value={selected.status}
                  onChange={(e) =>
                    setSelected((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="border p-2 w-full rounded"
                >
                  <option>Pending</option>
                  <option>Submitted</option>
                  <option>Late</option>
                </select>

                <div className="flex justify-end mt-5 space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-600 text-white rounded"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                </div>
              </>
            )}

            {/* DELETE CONFIRMATION */}
            {modalType === "delete" && (
              <>
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p>Do you really want to delete this assignment?</p>

                <div className="flex justify-end mt-5 space-x-3">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded"
                    onClick={deleteAssignment}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
