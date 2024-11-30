package com.xyz.aopdemo.dao;

import com.xyz.aopdemo.Account;

import java.util.List;

public interface AccountDAO {
    void addAccount(Account account);
    List<Account> findAccounts();
    List<Account> findAccounts(boolean tripWire);
    String getName();
    void setName(String name);
    String getServiceCode();
    void setServiceCode(String serviceCode);
}
