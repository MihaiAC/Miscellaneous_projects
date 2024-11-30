package com.xyz.aopdemo;

import com.xyz.aopdemo.dao.AccountDAO;
import com.xyz.aopdemo.dao.MembershipDAO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AopdemoApplication {

	@Bean
	public CommandLineRunner commandLineRunner(AccountDAO accountDAO, MembershipDAO membershipDAO) {
		return runner -> {
			demoBeforeAdvice(accountDAO, membershipDAO);
		};
	}

	private void demoBeforeAdvice(AccountDAO accountDAO, MembershipDAO membershipDAO) {
		membershipDAO.addAccount();
		Account account = new Account("FN", "LN");
		accountDAO.addAccount(account);

		accountDAO.setName("foobar");
		accountDAO.setServiceCode("silver");

		String name = accountDAO.getName();
		String serviceCode = accountDAO.getServiceCode();

	}

	public static void main(String[] args) {
		SpringApplication.run(AopdemoApplication.class, args);
	}

}
