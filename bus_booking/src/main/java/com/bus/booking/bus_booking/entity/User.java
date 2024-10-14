package com.bus.booking.bus_booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(unique = true)
    private String email;

    private String name;

    private String phoneNumber;
    private String password;
    private String role;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
//    @JsonManagedReference
    private List<Booking> bookings;
}
