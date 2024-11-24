package com.ltc.validdemo.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = CourseCodeConstraintValidator.class)
@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface CourseCode {
    // Define default course code
    public String value() default "BCK";

    // Define default error message
    public String message() default "must start with BCK";

    // Define default groups
    public Class<?>[] groups() default {};

    // Define default payloads
    // Payloads provide custom details about errors that have occurred.
    public Class<? extends Payload>[] payload() default {};
}
