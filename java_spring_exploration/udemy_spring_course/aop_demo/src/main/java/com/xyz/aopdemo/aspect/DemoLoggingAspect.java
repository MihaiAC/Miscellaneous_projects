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

    @Before("forDaoPackageNoGetterSetter()")
    public void beforeAddAccountAdvice() {
        System.out.println("Logging placeholder");
    }

    @Before("forDaoPackageNoGetterSetter()")
    public void beforeSecurityAdvice() {
        System.out.println("Security placeholder");
    }

    // Create a pointcut for getter methods.
    @Pointcut("execution(* com.xyz.aopdemo.dao.*.get*(..))")
    private void getter() {}

    // Create a pointcut for setter methods.
    @Pointcut("execution(* com.xyz.aopdemo.dao.*.set*(..))")
    private void setter() {}

    // Create a pointcut for the package, but exclude the getters and setters.
    @Pointcut("pointcutDaoPackage() && !(getter() || setter())")
    private void forDaoPackageNoGetterSetter() {}
}
