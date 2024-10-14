package com.bus.booking.bus_booking.controller;

import com.bus.booking.bus_booking.dto.BusDTO;
import com.bus.booking.bus_booking.entity.Bus;
import com.bus.booking.bus_booking.service.interaface.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class BusController {

    @Autowired
    private BusService busService;

    @PostMapping("/bus/add")
    public ResponseEntity<Bus> createBus(@RequestBody Bus bus) {
        Bus savedBus = busService.saveBus(bus);
        return ResponseEntity.ok(savedBus);
    }

//    @GetMapping("/bus/{id}")
//    public ResponseEntity<Bus> getBusById(@PathVariable int id) {
//        Optional<Bus> bus = busService.getBusById(id);
//        return bus.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }

    @GetMapping("/bus/{busId}")
    public ResponseEntity<BusDTO> getBusDetails(@PathVariable int busId) {
        BusDTO busDTO = busService.getBusDetailsById(busId);
        return ResponseEntity.ok(busDTO);
    }
//no need
    @GetMapping("/bus/all")
    public ResponseEntity<List<BusDTO>> getAllBuses() {
        List<BusDTO> busDTOs = busService.getDTOAllBuses();
        return ResponseEntity.ok(busDTOs);
    }

    @PutMapping("/busupdate/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable int id, @RequestBody Bus busDetails) {
        Bus updatedBus = busService.updateBus(id, busDetails);
        if (updatedBus != null) {
            return ResponseEntity.ok(updatedBus);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/busdelete/{id}")
    public ResponseEntity<Void> deleteBus(@PathVariable int id) {
        busService.deleteBus(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bus/search")
    public ResponseEntity<List<BusDTO>> findBuses(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam LocalDate busDate) {
        List<BusDTO> buses = busService.findBuses(from, to, busDate);
        return ResponseEntity.ok(buses);
    }
}

