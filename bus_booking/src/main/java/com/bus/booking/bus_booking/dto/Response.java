package com.bus.booking.bus_booking.dto;

import com.bus.booking.bus_booking.entity.Bus;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response {

    private String role;

    private UserDTO user;
    private BusDTO bus;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<BusDTO> busList;
    private List<BookingDTO> bookingList;
}
