package com.teamiq.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.event.EventListener;
import org.springframework.modulith.moments.HourHasPassed;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class TeamIqApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(TeamIqApiApplication.class, args);
    }

}
