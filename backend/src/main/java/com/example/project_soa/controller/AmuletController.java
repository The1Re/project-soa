package com.example.project_soa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project_soa.model.Amulet;
import com.example.project_soa.service.AmuletService;

@RestController
@RequestMapping("/amulets")
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class AmuletController {

    @Autowired
    private AmuletService amuletService;

    @GetMapping
    public ResponseEntity<List<Amulet>> getAll() {
        return ResponseEntity.ok(amuletService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Amulet> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(amuletService.getById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Integer id) {
        amuletService.delete(id);
        return ResponseEntity.ok("Amulet has been removed.");
    }

    @PostMapping
    public ResponseEntity<Amulet> create(@RequestBody Amulet amulet) {
        return ResponseEntity.ok(amuletService.create(amulet));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Amulet> update(@PathVariable Integer id, @RequestBody Amulet updatedAmulet) {
        return ResponseEntity.ok(amuletService.update(id, updatedAmulet));
    }
    @GetMapping("/search")
    public ResponseEntity<List<Amulet>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(amuletService.search(keyword));
    }

    @GetMapping("/price-range")
    public ResponseEntity<List<Amulet>> searchByPriceRange(@RequestParam int minPrice,@RequestParam int maxPrice) 
    {
        return ResponseEntity.ok(amuletService.searchByPriceRange(minPrice, maxPrice));
    }

}
