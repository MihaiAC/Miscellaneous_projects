package com.xyz.mappingdemo.dao;

import com.xyz.mappingdemo.entity.Course;
import com.xyz.mappingdemo.entity.Instructor;
import com.xyz.mappingdemo.entity.InstructorDetail;
import com.xyz.mappingdemo.entity.Student;

import java.util.List;

public interface AppDAO {
    void save(Instructor instructor);
    Instructor findInstructorById(int id);
    void deleteInstructorById(int id);
    InstructorDetail findInstructorDetailById(int id);
    void deleteInstructorDetailById(int id);
    List<Course> findCoursesByInstructorId(int instructorId);
    Instructor findInstructorByIdJoinFetch(int instructorId);
    void update(Instructor instructor);
    Course findCourseById(int courseId);
    void update(Course course);
    void deleteCourseById(int courseId);
    void save(Course course);
    Course findCourseAndReviewsByCourseId(int courseId);
    Course findCourseAndStudentsByCourseId(int courseId);
    Student findStudentAndCoursesByStudentId(int studentId);
}
