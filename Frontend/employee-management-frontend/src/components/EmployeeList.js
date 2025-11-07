// src/components/EmployeeList.js
import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee, searchEmployees } from "../api";
import EmployeeForm from "./EmployeeForm";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState("");

  const loadEmployees = () => {
    getEmployees()
      .then(res => setEmployees(res.data))
      .catch(err => {
        console.error(err);
        alert("Failed to load employees: " + (err?.message || err));
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this employee?")) return;
    deleteEmployee(id)
      .then(() => loadEmployees())
      .catch(err => {
        console.error(err);
        alert("Delete failed: " + (err?.response?.data || err.message));
      });
  };

  const handleSearch = () => {
    if (!search.trim()) {
      loadEmployees();
    } else {
      searchEmployees(search)
        .then(res => setEmployees(res.data))
        .catch(err => {
          console.error(err);
          alert("Search failed: " + (err?.message || err));
        });
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      <EmployeeForm onSave={loadEmployees} editingEmployee={editing} onCancel={() => setEditing(null)} />

      <div style={{ marginBottom: 12 }}>
        <input placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: 6 }} />
        <button onClick={handleSearch}>Search</button>
        <button onClick={loadEmployees} style={{ marginLeft: 8 }}>Reload</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 && (
            <tr><td colSpan="6" style={{ textAlign: "center" }}>No employees found</td></tr>
          )}
          {employees.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.firstName} {e.lastName}</td>
              <td>{e.email}</td>
              <td>{e.role}</td>
              <td>{e.department ? e.department.name : "—"}</td>
              <td>
                <button className="edit" onClick={() => setEditing(e)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
