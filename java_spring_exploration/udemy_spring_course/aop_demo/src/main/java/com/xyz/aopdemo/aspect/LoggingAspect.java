package com.xyz.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(1)
public class LoggingAspect {
    @Before("com.xyz.aopdemo.aspect.BaseExpressions.forDaoPackageNoGetterSetter()")
    public void beforeLoggerAdvice() {
        System.out.println("Logging placeholder");
    }
}
