package com.ltc.demo.rest;

import com.ltc.demo.entity.Student;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentRestController {
    @GetMapping("/students")
    public List<Student> getStudents() {
        List<Student> students = new ArrayList<>();

        students.add(new Student("Firstname1", "Lastname1"));
        students.add(new Student("Firstname2", "Lastname2"));
        students.add(new Student("Firstname3", "Lastname3"));

        return students;
    }
}
