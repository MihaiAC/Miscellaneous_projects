package com.ltc.springboot.thymeleafdemo.controller;

import com.ltc.springboot.thymeleafdemo.model.Student;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class StudentController {

    @Value("${countries}")
    private List<String> countries;

    @Value("${languages}")
    private List<String> languages;

    @Value("${systems}")
    private List<String> systems;

    @GetMapping("/studentForm")
    public String showForm(Model model) {
        // Create a student object.
        Student student = new Student();

        // Add the student object to the model.
        model.addAttribute("student", student);

        // Add list of countries to the model.
        model.addAttribute("countries", countries);

        // Add a list of programming languages to the model.
        model.addAttribute("languages", languages);

        // Add a list of operating systems.
        model.addAttribute("systems", systems);

        return "student-form";
    }

    @PostMapping("/processStudentForm")
    public String processForm(@ModelAttribute("student") Student student) {

        return "student-confirmation";
    }
}
