package com.ltc.springboot.cruddemo.dao;

import com.ltc.springboot.cruddemo.entity.Employee;

import java.util.List;

public interface EmployeeDAO {
    List<Employee> findAll();
}
