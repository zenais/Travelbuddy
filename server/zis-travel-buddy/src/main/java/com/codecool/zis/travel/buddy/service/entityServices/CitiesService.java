package com.codecool.zis.travel.buddy.service.entityServices;

import com.codecool.zis.travel.buddy.model.Cities;
import com.codecool.zis.travel.buddy.model.User;
import com.codecool.zis.travel.buddy.service.repositories.CitiesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CitiesService {
    private final CitiesRepository citiesRepository;
    @Autowired
    public CitiesService(CitiesRepository citiesRepository) {
        this.citiesRepository = citiesRepository;
    }

    public List<Cities> findAllCitiesByUser(User user) {
        return citiesRepository.findAllByUser(user);
    }

    public List<Cities> findAllCities() {
        return citiesRepository.findAll();
    }
}
