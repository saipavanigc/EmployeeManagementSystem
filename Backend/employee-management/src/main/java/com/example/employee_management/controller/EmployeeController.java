package com.example.employee_management.controller;

import com.example.employee_management.dto.EmployeeDTO;
import com.example.employee_management.model.Employee;
import com.example.employee_management.service.EmployeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing Employees.
 * Provides CRUD and search endpoints for frontend.
 */
@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000") // Allow React app access
public class EmployeeController {

    private final EmployeeService employeeService;

    // Constructor injection
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * Get all employees
     * Example: GET http://localhost:8080/api/employees
     */
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAll();
    }

    /**
     * Get employee by ID
     * Example: GET http://localhost:8080/api/employees/1
     */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
        return employeeService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Search employees by first name
     * Example: GET http://localhost:8080/api/employees/search?q=John
     */
    @GetMapping("/search")
    public List<Employee> searchEmployees(@RequestParam("q") String query) {
        return employeeService.searchByName(query);
    }

    /**
     * Create a new employee
     * Example: POST http://localhost:8080/api/employees
     * Request body (JSON):
     * {
     *   "firstName": "John",
     *   "lastName": "Doe",
     *   "email": "john@example.com",
     *   "role": "Developer",
     *   "departmentId": 1
     * }
     */
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDTO dto) {
        Employee created = employeeService.create(dto);
        return ResponseEntity.ok(created);
    }

    /**
     * Update an existing employee
     * Example: PUT http://localhost:8080/api/employees/1
     */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody EmployeeDTO dto) {
        Employee updated = employeeService.update(id, dto);
        return ResponseEntity.ok(updated);
    }

    /**
     * Delete employee by ID
     * Example: DELETE http://localhost:8080/api/employees/1
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
