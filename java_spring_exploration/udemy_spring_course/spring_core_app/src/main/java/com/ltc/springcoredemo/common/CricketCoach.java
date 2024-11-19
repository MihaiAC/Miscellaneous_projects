package com.ltc.springcoredemo.common;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class CricketCoach implements Coach {
    public CricketCoach() {
        System.out.println("In constructor: " + getClass().getSimpleName());
    }

    @Override
    public String getDailyWorkout() {
        return "Do some cricket training.";
    }
//    // Define init method.
//    @PostConstruct
//    public void initializeBean() {
//        System.out.println("Initialized bean: " + getClass().getSimpleName());
//    }
//
//    // Define destroy method.
//    @PreDestroy
//    public void cleanupBean() {
//        System.out.println("Called pre-destroy bean: " + getClass().getSimpleName());
//    }


}
