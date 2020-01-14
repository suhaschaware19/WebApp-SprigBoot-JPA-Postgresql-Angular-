package com.user.usermanagement.controller;

import com.user.usermanagement.model.User;
import com.user.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/user")
    public ResponseEntity<String> user(@RequestBody User user) {
        return new ResponseEntity(userService.user(user), new HttpHeaders(), HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> users() {
        return new ResponseEntity(userService.users(), new HttpHeaders(), HttpStatus.OK);
    }

    @DeleteMapping("/user/{user_id}")
    public ResponseEntity deleteUser(@PathVariable(name = "user_id") String user_id) {

        return new ResponseEntity(userService.deleteUser(user_id), new HttpHeaders(), HttpStatus.CREATED);
    }
    @PutMapping("/user")
    public ResponseEntity updateUser(@RequestBody User user) {

        return new ResponseEntity(userService.addOrUpdateUser(user), new HttpHeaders(), HttpStatus.CREATED);
    }
}
