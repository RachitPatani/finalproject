package com.bus.booking.bus_booking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BusDTO {
    private int id;
    private String busName;
    private String to;
    private String from;
    private LocalDate busDate;
    private String time;
    private float cost;
    private int tseats;
    private int bseats;
}
