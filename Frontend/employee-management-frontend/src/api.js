// src/api.js
import axios from "axios";

// Backend base URL
const API = axios.create({
  baseURL: "http://localhost:8080/api" // <-- backend
});

// API functions used by components
export const getEmployees = () => API.get("/employees");
export const getEmployeeById = (id) => API.get(`/employees/${id}`);
export const searchEmployees = (q) => API.get(`/employees/search?q=${encodeURIComponent(q)}`);
export const createEmployee = (data) => API.post("/employees", data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);
