package com.bus.booking.bus_booking.controller;

import com.bus.booking.bus_booking.dto.BookingDTO;
import com.bus.booking.bus_booking.entity.Booking;
import com.bus.booking.bus_booking.service.interaface.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/createbooking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking savedBooking = bookingService.saveBooking(booking);
        return ResponseEntity.ok(savedBooking);
    }
//nouse
    @GetMapping("/getbooking/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable int id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
//nouse
    @GetMapping("/getallbooking")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    //nouse
    @PutMapping("/updatebooking/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable int id, @RequestBody Booking bookingDetails) {
        Booking updatedBooking = bookingService.updateBooking(id, bookingDetails);
        if (updatedBooking != null) {
            return ResponseEntity.ok(updatedBooking);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deletebooking/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable int id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
//npuse
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUserId(@PathVariable int userId) {
        return ResponseEntity.status(HttpStatus.OK).body(bookingService.getUserById(userId));
    }
//nouse
    @GetMapping("/bus/{busId}")
    public ResponseEntity<List<Booking>> getBookingsByBusId(@PathVariable int busId) {
        return ResponseEntity.ok(bookingService.findBookingsByBusId(busId));
    }
    //nouse
    @GetMapping("/withusers")
    public ResponseEntity<List<Booking>> getAllBookingsWithUsers() {
        List<Booking> bookings = bookingService.getAllBookingsWithUsers();
        return ResponseEntity.ok(bookings);
    }

//get booking by uid
    @GetMapping("/bususer/{userId}")
    public ResponseEntity<List<BookingDTO>> getBookingsWithBusDetailsByUserId(@PathVariable int userId) {
        List<BookingDTO> bookings = bookingService.getBookingsWithBusDetailsByUserId(userId);
        return ResponseEntity.ok(bookings);
    }

}