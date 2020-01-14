package com.user.usermanagement.service;

import com.user.usermanagement.model.User;

import java.util.List;

public interface UserService {

    public List<User> users();

    public String user(User user);

    public String deleteUser(String user_id);

    public String addOrUpdateUser(User user);
}
