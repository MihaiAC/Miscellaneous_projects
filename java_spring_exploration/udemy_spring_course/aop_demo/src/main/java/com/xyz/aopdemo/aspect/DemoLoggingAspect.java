package com.xyz.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DemoLoggingAspect {
    // Match any method in a package.
    // @Before("execution(* com.xyz.aopdemo.dao.*.*(..))")

    // Match any function starting with "add" that takes an Account object as param.
    @Before("execution(* add*(com.xyz.aopdemo.Account))")
    public void beforeAddAccountAdvice() {
        System.out.println("Executing @Before advice on addAccount");
    }
}
