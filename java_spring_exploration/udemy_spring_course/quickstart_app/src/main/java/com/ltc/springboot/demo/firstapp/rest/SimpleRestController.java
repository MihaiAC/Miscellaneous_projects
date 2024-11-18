package com.ltc.springboot.demo.firstapp.rest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SimpleRestController {
    // Example of injecting properties.
    @Value("${some.property}")
    private String someProperty;

    @Value("${another.property}")
    private String anotherProperty;

    @GetMapping("/see_injected_properties")
    public String seeProperties() {
        return someProperty + " " + anotherProperty;
    }

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

