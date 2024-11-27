package com.xyz.mappingdemo.dao;

import com.xyz.mappingdemo.entity.Instructor;
import com.xyz.mappingdemo.entity.InstructorDetail;

public interface AppDAO {
    void save(Instructor instructor);
    Instructor findInstructorById(int id);
    void deleteInstructorById(int id);
    InstructorDetail findInstructorDetailById(int id);
}
