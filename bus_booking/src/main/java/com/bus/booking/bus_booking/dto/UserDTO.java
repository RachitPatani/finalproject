package com.bus.booking.bus_booking.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {
    private int id;
    private String email;

    private String name;

    private String phoneNumber;
    private String role;

}
