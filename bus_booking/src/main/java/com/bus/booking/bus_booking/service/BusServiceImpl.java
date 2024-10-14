package com.bus.booking.bus_booking.service;


import com.bus.booking.bus_booking.dto.BusDTO;
import com.bus.booking.bus_booking.entity.Bus;
import com.bus.booking.bus_booking.repo.BusRepository;
import com.bus.booking.bus_booking.service.interaface.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BusServiceImpl implements com.bus.booking.bus_booking.service.interaface.BusService {

    @Autowired
    private BusRepository busRepository;

    @Override
    public Bus saveBus(Bus bus) {
        return busRepository.save(bus);
    }

    @Override
    public Optional<Bus> getBusById(int id) {
        return busRepository.findById(id);
    }

    @Override
    public List<Bus> getAllBuses() {
        return busRepository.findAll();
    }
    @Override
    public Bus updateBus(int id, Bus busDetails) {
        Optional<Bus> busOptional = busRepository.findById(id);
        if (busOptional.isPresent()) {
            Bus bus = busOptional.get();

            // Update fields only if they are not null in busDetails
            if (busDetails.getBusName() != null) {
                bus.setBusName(busDetails.getBusName());
            }
            if (busDetails.getFrom() != null) {
                bus.setFrom(busDetails.getFrom());
            }
            if (busDetails.getTo() != null) {
                bus.setTo(busDetails.getTo());
            }
            if (busDetails.getTime() != null) {
                bus.setTime(busDetails.getTime());
            }
            if (busDetails.getBusDate() != null) {
                bus.setBusDate(busDetails.getBusDate());
            }
            if (busDetails.getCost() != 0) {
                bus.setCost(busDetails.getCost());
            }
            if (busDetails.getTseats() != 0) {
                bus.setTseats(busDetails.getTseats());
            }
            if (busDetails.getBseats() != 0) {
                bus.setBseats(busDetails.getBseats());
            }

            return busRepository.save(bus);
        }
        return null;
    }

    @Override
    public void deleteBus(int id) {
        busRepository.deleteById(id);
    }

    @Override
    public List<BusDTO> findBuses(String from, String to, LocalDate busDate) {
        List<Bus> buses = busRepository.findByFromAndToAndBusDate(from, to, busDate);

        // Map each Bus entity to BusDTO
        return buses.stream().map(bus -> {
            BusDTO busDTO = new BusDTO();
            busDTO.setId(bus.getId());
            busDTO.setBusName(bus.getBusName());
            busDTO.setTo(bus.getFrom());
            busDTO.setFrom(bus.getTo());
            busDTO.setBusDate(bus.getBusDate());
            busDTO.setCost(bus.getCost());
            busDTO.setTseats(bus.getTseats());
            busDTO.setBseats(bus.getBseats());
            busDTO.setTime(bus.getTime());
            return busDTO;
        }).collect(Collectors.toList());
    }
    @Override
    public BusDTO getBusDetailsById(int busId) {
        Bus bus = busRepository.findById(busId)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        // Manually map Bus entity to BusDTO
        BusDTO busDTO = new BusDTO();
        busDTO.setId(bus.getId());
        busDTO.setBusName(bus.getBusName());
        busDTO.setFrom(bus.getFrom());  // Assuming 'from' in Bus entity represents the source
        busDTO.setTo(bus.getTo());  // Assuming 'to' in Bus entity represents the destination
        busDTO.setBusDate(bus.getBusDate());
        busDTO.setCost(bus.getCost());
        busDTO.setTseats(bus.getTseats());
        busDTO.setBseats(bus.getBseats());
        busDTO.setTime(bus.getTime());

        return busDTO;
    }

    @Override
    public List<BusDTO> getDTOAllBuses() {
        List<Bus> buses = busRepository.findAll();
        return buses.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    private BusDTO convertToDTO(Bus bus) {
        BusDTO dto = new BusDTO();
        dto.setId(bus.getId());
        dto.setBusName(bus.getBusName());
        dto.setFrom(bus.getFrom());
        dto.setTo(bus.getTo());
        dto.setBusDate(bus.getBusDate());
        dto.setCost(bus.getCost());
        dto.setTseats(bus.getTseats());
        dto.setBseats(bus.getBseats());
        dto.setTime(bus.getTime());
        return dto;
    }
}
