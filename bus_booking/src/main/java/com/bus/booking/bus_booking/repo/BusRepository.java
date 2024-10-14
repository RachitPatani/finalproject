package com.bus.booking.bus_booking.repo;

import com.bus.booking.bus_booking.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BusRepository extends JpaRepository<Bus,Integer> {
    List<Bus> findByFromAndToAndBusDate(String from, String to, LocalDate busDate);

}
