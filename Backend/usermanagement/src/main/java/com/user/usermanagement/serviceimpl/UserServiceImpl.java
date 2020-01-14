package com.user.usermanagement.serviceimpl;

import antlr.StringUtils;
import com.user.usermanagement.model.User;
import com.user.usermanagement.repository.UserRepository;
import com.user.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private static class Constants {
        private static String USER_SAVE = "User has been saved successfully";
        private static String USER_DELETED = "User has been deleted successfully";
    }

    @Autowired
    private UserRepository userRepository;

    public List<User> users() {
        return userRepository.findAll();
    }

    public String user(User user) {
        userRepository.save(user);
        return Constants.USER_SAVE;
    }

    public String deleteUser(String user_id) {
        User user = userRepository.findUserById(user_id);
        userRepository.delete(user);
        return Constants.USER_DELETED;
    }

    public String addOrUpdateUser(User user){
        User user1=userRepository.findUserById(user.getUser_id());
        if (user1 != null) {
            user1.setName(user.getName());
            user1.setCountry(user.getCountry());
            user1.setEmail(user.getEmail());
            user1.setAddress(user.getAddress());
            userRepository.save(user1);
        } else {
            user(user);
        }

        return Constants.USER_SAVE;
    }
}
