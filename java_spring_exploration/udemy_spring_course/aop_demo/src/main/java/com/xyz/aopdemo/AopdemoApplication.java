package com.xyz.aopdemo;

import com.xyz.aopdemo.dao.AccountDAO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AopdemoApplication {

	@Bean
	public CommandLineRunner commandLineRunner(AccountDAO accountDAO) {
		return runner -> {
			demoBeforeAdvice(accountDAO);
		};
	}

	private void demoBeforeAdvice(AccountDAO accountDAO) {
		accountDAO.addAccount();
	}

	public static void main(String[] args) {
		SpringApplication.run(AopdemoApplication.class, args);
	}

}
