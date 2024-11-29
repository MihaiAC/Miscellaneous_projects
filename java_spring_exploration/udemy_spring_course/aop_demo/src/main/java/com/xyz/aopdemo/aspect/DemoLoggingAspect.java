package com.xyz.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class DemoLoggingAspect {
    // Match any method in a package.
    // @Before("execution(* com.xyz.aopdemo.dao.*.*(..))")

    // Match any function starting with "add" that takes an Account object as param.
    // @Before("execution(* add*(com.xyz.aopdemo.Account))")

    @Pointcut("execution(* com.xyz.aopdemo.dao.*.*(..))")
    private void pointcutDaoPackage() { }

    @Before("pointcutDaoPackage()")
    public void beforeAddAccountAdvice() {
        System.out.println("Executing @Before advice on addAccount");
    }
}
