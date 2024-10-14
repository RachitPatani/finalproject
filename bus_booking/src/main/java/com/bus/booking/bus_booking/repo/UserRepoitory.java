package com.bus.booking.bus_booking.repo;

import com.bus.booking.bus_booking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepoitory extends JpaRepository<User,Integer> {
    boolean existsByEmail(String email);


    User findByEmail(String email);
}
