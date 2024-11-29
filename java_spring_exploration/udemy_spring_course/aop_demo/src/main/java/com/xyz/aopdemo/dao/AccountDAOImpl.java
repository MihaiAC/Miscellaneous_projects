package com.xyz.aopdemo.dao;

import com.xyz.aopdemo.Account;
import org.springframework.stereotype.Repository;

// @Repository = for component scanning.
@Repository
public class AccountDAOImpl implements AccountDAO {

    @Override
    public void addAccount(Account account) {
        System.out.println("Placeholder DB work.");
    }
}
