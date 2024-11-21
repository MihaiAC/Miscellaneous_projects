package com.ltc.demo.rest;

import com.ltc.demo.entity.Student;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentRestController {

    private List<Student> students;

    // Define @PostConstruct to load the student data.
    @PostConstruct
    public void loadData() {
        students = new ArrayList<>();

        students.add(new Student("Firstname1", "Lastname1"));
        students.add(new Student("Firstname2", "Lastname2"));
        students.add(new Student("Firstname3", "Lastname3"));
    }

    @GetMapping("/students")
    public List<Student> getStudents() {
        return students;
    }
}
