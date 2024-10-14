package com.bus.booking.bus_booking.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequestDTO {

    @NotBlank(message = "Email is required")
    private String email;
    @NotBlank(message = "Password is required")
    private String password;
}