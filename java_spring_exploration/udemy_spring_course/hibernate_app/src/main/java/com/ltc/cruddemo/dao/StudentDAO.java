package com.ltc.cruddemo.dao;

import com.ltc.cruddemo.entity.Student;

public interface StudentDAO {
    // C
    void save(Student theStudent);
    // R
    Student findById(Integer id);
}
