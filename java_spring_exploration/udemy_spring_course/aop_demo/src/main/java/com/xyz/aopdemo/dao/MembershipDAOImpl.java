package com.xyz.aopdemo.dao;

import org.springframework.stereotype.Repository;

@Repository
public class MembershipDAOImpl implements MembershipDAO {

    @Override
    public void addAccount() {
        System.out.println("Called MembershipDAOImpl.addAccount()");
    }
}
