package com.xyz.aopdemo.dao;

import com.xyz.aopdemo.Account;

public interface AccountDAO {
    void addAccount(Account account);
    public String getName();
    public void setName(String name);
    public String getServiceCode();
    public void setServiceCode(String serviceCode);
}
