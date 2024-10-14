package com.bus.booking.bus_booking.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@Table(name = "buses")
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String busName;
    @Column(name = "destination")

    private String to;
    @Column(name = "source")

    private String from;
    private LocalDate busDate;
    private String time;
    private float cost;
    private int tseats;
    private int bseats;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL)
//    @JsonManagedReference
    private List<Booking> bookings;


}
