package com.codecool.zis.travel.buddy.service.repositories;


import com.codecool.zis.travel.buddy.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmailAndPassword(String email, String password);

    User findByEmail(String email);
}
