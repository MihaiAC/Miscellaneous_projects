package com.ltc.springboot.cruddemo.service;

import com.ltc.springboot.cruddemo.entity.Employee;

import java.util.List;

public interface EmployeeService {
    List<Employee> findAll();
}
