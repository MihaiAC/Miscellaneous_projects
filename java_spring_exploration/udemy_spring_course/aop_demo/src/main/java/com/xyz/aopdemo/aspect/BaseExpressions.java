package com.xyz.aopdemo.aspect;

import com.xyz.aopdemo.Account;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;

import java.util.List;

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
    public void beforeSignatureAndParamsAdvice(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        System.out.println("Method: " + methodSignature);

        Object[] args = joinPoint.getArgs();
        for (Object tmpArg: args) {
            System.out.println(tmpArg);
            if (tmpArg instanceof Account) {
                Account account = (Account) tmpArg;
                System.out.println(account.getName());
                System.out.println(account.getLevel());
            }
        }
    }

    @AfterReturning(
            pointcut = "execution(* com.xyz.aopdemo.dao.AccountDAO.findAccounts(..))",
            returning = "result"
    )
    public void afterReturnFindAccountsAdvice(JoinPoint joinPoint, List<Account> result) {
        String method = joinPoint.getSignature().toShortString();
        System.out.println("Executing after returning from: " + method);
        System.out.println("Result is: " + result);
    }

}
