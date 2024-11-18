package com.ltc.springcoredemo;

import org.springframework.stereotype.Component;

@Component
public class CricketCoach implements Coach {
    @Override
    public String getDailyWorkout() {
        return "Do some cricket training.";
    }
}
