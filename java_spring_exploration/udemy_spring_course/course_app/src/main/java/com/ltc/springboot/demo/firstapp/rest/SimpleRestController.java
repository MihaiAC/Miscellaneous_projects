package com.ltc.springboot.demo.firstapp.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleRestController {
    @GetMapping("/")
    public String sayHello() {
        return "Hello world!";
    }

    //Test devtools.
    @GetMapping("/devtools")
    public String simpleDevtoolsTest() {
        return "It works!";
    }
}
