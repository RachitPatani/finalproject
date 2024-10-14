package com.bus.booking.bus_booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private int age;
    private  long phone;

    @ManyToOne
    @JoinColumn(name = "user_id")
//    @JsonBackReference
    private User user;

    @ManyToOne
    @JoinColumn(name = "bus_id")
//    @JsonBackReference
    private Bus bus;

}
