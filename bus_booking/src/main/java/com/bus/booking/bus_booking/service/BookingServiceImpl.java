package com.bus.booking.bus_booking.service;

import com.bus.booking.bus_booking.dto.BookingDTO;
import com.bus.booking.bus_booking.entity.Booking;
import com.bus.booking.bus_booking.entity.Bus;
import com.bus.booking.bus_booking.repo.BookingRepository;
import com.bus.booking.bus_booking.repo.BusRepository;
import com.bus.booking.bus_booking.service.interaface.BookingService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BookingServiceImpl implements BookingService {


    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private BusRepository busRepository;

    @Override
    @Transactional
    public Booking saveBooking(Booking booking) {
        Bus bus = busRepository.findById(booking.getBus().getId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        // Increment the booked seats (bseats)
        bus.setBseats(bus.getBseats() + 1);
        return bookingRepository.save(booking);
    }

    @Override
    public Optional<Booking> getBookingById(int id) {
        return bookingRepository.findById(id);
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public Booking updateBooking(int id, Booking bookingDetails) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            booking.setName(bookingDetails.getName());
            booking.setAge(bookingDetails.getAge());
            booking.setPhone(bookingDetails.getPhone());
            booking.setUser(bookingDetails.getUser());
            booking.setBus(bookingDetails.getBus());

            return bookingRepository.save(booking);
        }
        return null;
    }

    @Override
    @Transactional
    public void deleteBooking(int id) {
        // Fetch the booking by ID
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Fetch the bus
        Bus bus = booking.getBus();

        // Decrement the booked seats (bseats)
        bus.setBseats(bus.getBseats() - 1);
        busRepository.save(bus);

        bookingRepository.deleteById(id);
    }

    @Override
    public List<Booking> findBookingsByUserId(int userId) {
        return bookingRepository.findByUserId(userId);
    }

    @Override
    public List<Booking> findBookingsByBusId(int busId) {
        return bookingRepository.findByBusId(busId);
    }

    @Override
    public List<Booking>getUserById(int userId)
    {
        List<Booking>res = bookingRepository.getUserById(userId);
        return res;
    }
    @Override
    public List<Booking> getAllBookingsWithUsers() {
        return bookingRepository.findAllBookingsWithUsers();
    }

    @Override
    public List<BookingDTO> getBookingsWithBusDetailsByUserId(int userId) {
        return bookingRepository.findBookingsWithBusDetailsByUserId(userId);
    }
}
