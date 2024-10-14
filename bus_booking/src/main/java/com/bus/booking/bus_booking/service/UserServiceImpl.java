package com.bus.booking.bus_booking.service;

import com.bus.booking.bus_booking.dto.LoginRequestDTO;
import com.bus.booking.bus_booking.dto.UserDTO;
import com.bus.booking.bus_booking.entity.User;
import com.bus.booking.bus_booking.repo.UserRepoitory;
import com.bus.booking.bus_booking.service.interaface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepoitory userRepository;


    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(int id, User userDetails) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setEmail(userDetails.getEmail());
            user.setName(userDetails.getName());
            user.setPhoneNumber(userDetails.getPhoneNumber());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        }
        return null;
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }



    @Override
    public UserDTO getUserDetailsById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Manually map User entity to UserDTO
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setName(user.getName());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        return userDTO;
    }


    public boolean validateLogin(LoginRequestDTO loginRequestDTO) {
        // Find user by email
        User user = userRepository.findByEmail(loginRequestDTO.getEmail());

        // Check if user exists
        if (user == null) {
            return false; // User not found
        }

        // Check if password matches (assuming password is stored as a hashed value)
        return loginRequestDTO.getPassword().equals(user.getPassword())?true:false;
    }

    @Override
    public UserDTO loginUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.getPassword().equals(password)) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setEmail(user.getEmail());
            userDTO.setName(user.getName());
            userDTO.setPhoneNumber(user.getPhoneNumber());
            userDTO.setRole(user.getRole());
            return userDTO;
        }
        return null;
    }
@Override
    public boolean isUserExists(String email) {
        return userRepository.findByEmail(email) != null;
    }


}
