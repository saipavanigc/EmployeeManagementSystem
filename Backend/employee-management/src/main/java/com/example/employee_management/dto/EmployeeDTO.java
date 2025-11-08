package com.example.employee_management.dto;


public class EmployeeDTO {
    public Long id;
    public String firstName;
    public String lastName;
    public String email;
    public String role;
    public Long departmentId;


    // Default constructor for JSON deserialization
    public EmployeeDTO() {}
}