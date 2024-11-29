package com.xyz.aopdemo.dao;

import org.springframework.stereotype.Repository;

// @Repository = for component scanning.
@Repository
public class AccountDAOImpl implements AccountDAO {

    @Override
    public void addAccount() {
        System.out.println("Placeholder DB work.");
    }
}
