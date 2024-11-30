package com.xyz.aopdemo.dao;

import com.xyz.aopdemo.Account;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

// @Repository = for component scanning.
@Repository
public class AccountDAOImpl implements AccountDAO {

    private String name;
    private String serviceCode;

    @Override
    public void addAccount(Account account) {
        System.out.println("Called add account.");
    }

    @Override
    public List<Account> findAccounts() {
        List<Account> accounts = new ArrayList<>();
        Account account1 = new Account("AccountX", "levelX");
        Account account2 = new Account("AccountY", "levelY");
        Account account3 = new Account("AccountZ", "levelZ");

        accounts.add(account1);
        accounts.add(account2);
        accounts.add(account3);

        return accounts;
    }

    public String getName() {
        System.out.println("Called AccountDAOImpl getName.");
        return name;
    }

    public void setName(String name) {
        System.out.println("Called AccountDAOImpl setName.");
        this.name = name;
    }

    public String getServiceCode() {
        System.out.println("Called AccountDAOImpl getServiceCode.");
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        System.out.println("Called AccountDAOImpl setServiceCode.");
        this.serviceCode = serviceCode;
    }
}
