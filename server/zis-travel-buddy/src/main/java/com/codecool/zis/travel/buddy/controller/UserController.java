package com.codecool.zis.travel.buddy.controller;

import com.codecool.zis.travel.buddy.model.User;
import com.codecool.zis.travel.buddy.service.entityServices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<User> findAllUsers(){
        return userService.findAllUsers();
    }

    @PostMapping("/login")
    public ResponseEntity<User> authenticateUser(@RequestBody User user){
        User savedUser = userService.findUserByEmailAndPassword(user);
        return savedUser != null ? ResponseEntity.ok(savedUser) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    @PostMapping("/signup")
    public User createUser(@RequestBody User user){
        if (user.getCities() == null) {
            user.setCities(new ArrayList<>());
        }
        return userService.createUser(user);
    }
}
