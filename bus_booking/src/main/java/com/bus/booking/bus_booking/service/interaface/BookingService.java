package com.bus.booking.bus_booking.service.interaface;

import com.bus.booking.bus_booking.dto.BookingDTO;
import com.bus.booking.bus_booking.entity.Booking;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingService {

    Booking saveBooking(Booking booking);
    Optional<Booking> getBookingById(int id);
    List<Booking> getAllBookings();
    Booking updateBooking(int id, Booking bookingDetails);
    void deleteBooking(int id);
    List<Booking> findBookingsByUserId(int userId);
    List<Booking> findBookingsByBusId(int busId);
    List<Booking> getUserById(int userId);
    public List<Booking> getAllBookingsWithUsers();
    public List<BookingDTO> getBookingsWithBusDetailsByUserId(int userId);
}
