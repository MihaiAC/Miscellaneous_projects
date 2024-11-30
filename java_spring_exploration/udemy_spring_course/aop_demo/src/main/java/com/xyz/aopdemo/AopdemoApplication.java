package com.xyz.aopdemo;

import com.xyz.aopdemo.dao.AccountDAO;
import com.xyz.aopdemo.dao.MembershipDAO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class AopdemoApplication {

	@Bean
	public CommandLineRunner commandLineRunner(AccountDAO accountDAO, MembershipDAO membershipDAO) {
		return runner -> {
			// demoAfterAdvice(accountDAO);
			demoAfterThrowingAdvice(accountDAO);
		};
	}

	private void demoAfterThrowingAdvice(AccountDAO accountDAO) {
		List<Account> accounts = null;

		try {
			boolean tripWire = true;
			accounts = accountDAO.findAccounts(tripWire);
		}
		catch (Exception exc) {
			System.out.println("Caught exception: " + exc);
		}
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

	private void demoAfterAdvice(AccountDAO accountDAO) {
		List<Account> accounts = accountDAO.findAccounts();
		System.out.println(accounts);
	}

	public static void main(String[] args) {
		SpringApplication.run(AopdemoApplication.class, args);
	}

}
