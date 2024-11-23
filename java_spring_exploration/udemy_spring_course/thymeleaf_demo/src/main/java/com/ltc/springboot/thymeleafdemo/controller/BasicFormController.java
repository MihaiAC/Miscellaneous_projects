package com.ltc.springboot.thymeleafdemo.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BasicFormController {
    @RequestMapping("/showForm")
    public String showForm() {
        return "basicform";
    }

    @RequestMapping("/processForm")
    public String processForm() {
        return "basicformresponse";
    }

    // Controller method that reads form data and adds data to the model.
    @RequestMapping("/processFormVersionTwo")
    public String capitaliseFormInput(HttpServletRequest request, Model model) {
        // Read user input.
        String name = request.getParameter("studentName");

        // Capitalise user input.
        String capitalised_name = name.toUpperCase();

        // Create a model variable containing the transformed input.
        model.addAttribute("message", capitalised_name);

        return "basicformresponse";
    }
}
