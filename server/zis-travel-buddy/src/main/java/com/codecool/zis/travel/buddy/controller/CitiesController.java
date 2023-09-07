package com.codecool.zis.travel.buddy.controller;

import com.codecool.zis.travel.buddy.model.Cities;
import com.codecool.zis.travel.buddy.model.User;
import com.codecool.zis.travel.buddy.service.entityServices.CitiesService;
import com.codecool.zis.travel.buddy.service.entityServices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cities")
public class CitiesController {
    private final CitiesService citiesService;
    private final UserService userService;
    @Autowired
    public CitiesController(CitiesService citiesService, UserService userService) {
        this.citiesService = citiesService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public List<Cities> findAllCities(){
        return citiesService.findAllCities();
    }

    @PostMapping()
    public List<Cities> getAllCitiesByUser(@RequestBody User user){
        User savedUser = userService.findByEmail(user.getEmail());
        return citiesService.findAllCitiesByUser(savedUser);
    }
}
