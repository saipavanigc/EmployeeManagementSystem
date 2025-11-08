package com.example.employee_management.service;

import com.example.employee_management.dto.EmployeeDTO;
import com.example.employee_management.model.Department;
import com.example.employee_management.model.Employee;
import com.example.employee_management.repository.DepartmentRepository;
import com.example.employee_management.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    // Constructor Injection
    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
    }

    // Fetch all employees
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    // Fetch single employee by ID
    public Optional<Employee> getById(Long id) {
        return employeeRepository.findById(id);
    }

    // Create new employee
    public Employee create(EmployeeDTO dto) {
        Department dept = null;
        if (dto.departmentId != null) {
            dept = departmentRepository.findById(dto.departmentId).orElse(null);
        }
        Employee e = new Employee(dto.firstName, dto.lastName, dto.email, dto.role, dept);
        return employeeRepository.save(e);
    }

    // Update existing employee
    public Employee update(Long id, EmployeeDTO dto) {
        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        e.setFirstName(dto.firstName);
        e.setLastName(dto.lastName);
        e.setEmail(dto.email);
        e.setRole(dto.role);

        if (dto.departmentId != null) {
            Department dept = departmentRepository.findById(dto.departmentId).orElse(null);
            e.setDepartment(dept);
        } else {
            e.setDepartment(null);
        }

        return employeeRepository.save(e);
    }

    // Delete employee
    public void delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new RuntimeException("Cannot delete - Employee not found with id: " + id);
        }
        employeeRepository.deleteById(id);
    }

    // Search employees by first name (case insensitive)
    public List<Employee> searchByName(String name) {
        return employeeRepository.findByFirstNameContainingIgnoreCase(name);
    }
}
