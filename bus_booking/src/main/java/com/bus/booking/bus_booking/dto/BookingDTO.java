package com.bus.booking.bus_booking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private int id;
    private String name;
    private int age;
    private long phone;
    private int busId;
    private String busName;
    private String to;
    private String from;
    private String time;
    private LocalDate busDate;
    private float cost;

    public BookingDTO(int id, String name, int age, long phone, int busId, String busName, String from, String to, LocalDate busDate, String time,float cost) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.phone = phone;
        this.busId = busId;
        this.busName = busName;
        this.from = from;
        this.to = to;
        this.busDate = busDate;
        this.cost = cost;
        this.time = time;
    }

}
