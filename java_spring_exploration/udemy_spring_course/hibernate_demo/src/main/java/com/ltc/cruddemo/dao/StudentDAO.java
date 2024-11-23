package com.ltc.cruddemo.dao;

import com.ltc.cruddemo.entity.Student;

import java.util.List;

public interface StudentDAO {
    // C
    void save(Student theStudent);

    // R
    Student findById(Integer id);

    List<Student> findAll();

    List<Student> findByLastName(String theLastName);

    // U
    void update(Student theStudent);

    // D
    void delete(Integer id);

    int deleteAll();
}
