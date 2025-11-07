// src/components/EmployeeForm.js
import React, { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../api";

export default function EmployeeForm({ onSave, editingEmployee, onCancel }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    departmentId: ""
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        firstName: editingEmployee.firstName || "",
        lastName: editingEmployee.lastName || "",
        email: editingEmployee.email || "",
        role: editingEmployee.role || "",
        departmentId: editingEmployee.department ? editingEmployee.department.id : ""
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // convert departmentId to number or null
    const payload = {
      ...form,
      departmentId: form.departmentId ? Number(form.departmentId) : null
    };

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, payload)
        .then(() => {
          onSave();
        })
        .catch(err => {
          console.error(err);
          alert("Update failed: " + (err?.response?.data || err.message));
        });
    } else {
      createEmployee(payload)
        .then(() => {
          onSave();
          setForm({ firstName: "", lastName: "", email: "", role: "", departmentId: "" });
        })
        .catch(err => {
          console.error(err);
          alert("Create failed: " + (err?.response?.data || err.message));
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 12 }}>
      <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} required />
      <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
      <input name="email" placeholder="Email" type="email" value={form.email} onChange={handleChange} required />
      <input name="role" placeholder="Role" value={form.role} onChange={handleChange} />
      <input name="departmentId" placeholder="Department ID (number)" type="number" value={form.departmentId || ""} onChange={handleChange} />
      <button type="submit" className="add">{editingEmployee ? "Update" : "Add"}</button>
      {editingEmployee && <button type="button" onClick={() => { onCancel(); setForm({ firstName: "", lastName: "", email: "", role: "", departmentId: "" }); }}>Cancel</button>}
    </form>
  );
}
