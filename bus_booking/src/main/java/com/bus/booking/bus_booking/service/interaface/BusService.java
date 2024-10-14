package com.bus.booking.bus_booking.service.interaface;

import com.bus.booking.bus_booking.dto.BusDTO;
import com.bus.booking.bus_booking.entity.Bus;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BusService {
    Bus saveBus(Bus bus);
    Optional<Bus> getBusById(int id);
    List<Bus> getAllBuses();
    Bus updateBus(int id, Bus busDetails);
    void deleteBus(int id);
    List<BusDTO> findBuses(String from, String to, LocalDate busDate);

    public BusDTO getBusDetailsById(int busId);
    public List<BusDTO> getDTOAllBuses();
}
