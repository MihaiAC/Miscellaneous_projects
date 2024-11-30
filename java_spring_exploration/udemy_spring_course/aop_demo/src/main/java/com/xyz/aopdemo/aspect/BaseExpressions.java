package com.xyz.aopdemo.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class BaseExpressions {
    @Pointcut("execution(* com.xyz.aopdemo.dao.*.*(..))")
    public void pointcutDaoPackage() { }

    // Create a pointcut for getter methods.
    @Pointcut("execution(* com.xyz.aopdemo.dao.*.get*(..))")
    public void getter() {}

    // Create a pointcut for setter methods.
    @Pointcut("execution(* com.xyz.aopdemo.dao.*.set*(..))")
    public void setter() {}

    // Create a pointcut for the package, but exclude the getters and setters.
    @Pointcut("pointcutDaoPackage() && !(getter() || setter())")
    public void forDaoPackageNoGetterSetter() {}

    @Before("forDaoPackageNoGetterSetter()")
    public void beforeSignatureAndParamsAdvice(JoinPoint jointPoint) {
        MethodSignature methodSignature = (MethodSignature) jointPoint.getSignature();
        System.out.println("Method: " + methodSignature);
    }

}
