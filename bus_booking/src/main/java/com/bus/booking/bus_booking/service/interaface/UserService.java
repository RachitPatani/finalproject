package com.bus.booking.bus_booking.service.interaface;

import com.bus.booking.bus_booking.dto.LoginRequestDTO;
import com.bus.booking.bus_booking.dto.UserDTO;
import com.bus.booking.bus_booking.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(int id);
    List<User> getAllUsers();
    User updateUser(int id, User userDetails);
    void deleteUser(int id);
    public UserDTO getUserDetailsById(int userId);
    public boolean validateLogin(LoginRequestDTO loginRequestDTO) ;
    public boolean isUserExists(String email);
    public UserDTO loginUser(String email, String password);

    }
