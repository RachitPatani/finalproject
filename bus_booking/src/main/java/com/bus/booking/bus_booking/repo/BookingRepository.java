package com.bus.booking.bus_booking.repo;

import com.bus.booking.bus_booking.dto.BookingDTO;
import com.bus.booking.bus_booking.entity.Booking;
import lombok.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findByUserId(int userId);
    List<Booking> findByBusId(int busId);

    @Query(nativeQuery = true, value = "SELECT * FROM bookings inner join users on users.id = user_id ")
    List<Booking> findAllBookingsWithUsers();
    List<Booking>getUserById(long uid);

    @Query("SELECT new com.bus.booking.bus_booking.dto.BookingDTO(b.id, b.name, b.age, b.phone, bs.id, bs.busName, bs.from, bs.to, bs.busDate,bs.time, bs.cost) " +
            "FROM Booking b INNER JOIN b.bus bs WHERE b.user.id = :userId")
    List<BookingDTO> findBookingsWithBusDetailsByUserId(int userId);

}
