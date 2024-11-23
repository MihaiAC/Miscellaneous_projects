package com.ltc.springboot.thymeleafdemo.controller;

import com.ltc.springboot.thymeleafdemo.model.Student;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class StudentController {
    @GetMapping("/studentForm")
    public String showForm(Model model) {
        // Create a student object.
        Student student = new Student();

        // Add the student object to the model.
        model.addAttribute("student", student);

        return "student-form";
    }

    @PostMapping("/processStudentForm")
    public String processForm(@ModelAttribute("student") Student student) {

        return "student-confirmation";
    }
}
