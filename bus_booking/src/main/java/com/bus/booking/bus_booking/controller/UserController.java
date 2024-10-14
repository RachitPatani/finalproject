package com.bus.booking.bus_booking.controller;

import com.bus.booking.bus_booking.dto.LoginRequestDTO;
import com.bus.booking.bus_booking.dto.UserDTO;
import com.bus.booking.bus_booking.entity.User;
import com.bus.booking.bus_booking.service.interaface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/adduser")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

//    @GetMapping("/user/{id}")
//    public ResponseEntity<User> getUserById(@PathVariable int id) {
//        Optional<User> user = userService.getUserById(id);
//        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    //to get user by id
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserDTO> getUserDetails(@PathVariable int userId) {
        UserDTO userDTO = userService.getUserDetailsById(userId);
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/alluser")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }


    @PostMapping("/checklogin")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO loginRequestDTO) {
        boolean isAuthenticated = userService.validateLogin(loginRequestDTO);

        if (isAuthenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @PostMapping("/auth/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        boolean isUserExists = userService.isUserExists(user.getEmail());
        if (isUserExists) {
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        } else {
            User newUser = userService.saveUser(user);
            return ResponseEntity.ok(newUser);
        }
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        UserDTO loggedInUser = userService.loginUser(user.getEmail(), user.getPassword());
        if (loggedInUser != null) {
            return ResponseEntity.ok(loggedInUser); // Optionally return a JWT token or session id
        } else {
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }

}
