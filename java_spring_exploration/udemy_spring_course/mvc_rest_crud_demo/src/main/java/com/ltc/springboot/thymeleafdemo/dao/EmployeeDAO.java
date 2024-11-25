package com.ltc.springboot.thymeleafdemo.dao;

import com.ltc.springboot.thymeleafdemo.entity.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> findAll();
    Employee findById(int employeeId);
    Employee save(Employee employee);
    void deleteById(int employeeId);
}
