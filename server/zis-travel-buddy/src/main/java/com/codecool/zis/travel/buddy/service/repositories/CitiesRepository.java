package com.codecool.zis.travel.buddy.service.repositories;

import com.codecool.zis.travel.buddy.model.Cities;
import com.codecool.zis.travel.buddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CitiesRepository extends JpaRepository<Cities, Long> {
    List<Cities> findAllByUser(User user);
}
