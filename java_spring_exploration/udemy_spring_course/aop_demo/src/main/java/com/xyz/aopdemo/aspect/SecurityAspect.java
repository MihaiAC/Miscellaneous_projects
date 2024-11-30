package com.xyz.aopdemo.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Order(2)
public class SecurityAspect {
    @Before("com.xyz.aopdemo.aspect.BaseExpressions.forDaoPackageNoGetterSetter()")
    public void beforeSecurityAdvice() {
        System.out.println("Security advice");
    }
}
