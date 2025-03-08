package com.example.project_soa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project_soa.model.Amulet;
import com.example.project_soa.service.AmuletService;

@RestController
@RequestMapping("/amulets")
public class AmuletController {

    @Autowired
    private AmuletService amuletService;

    @GetMapping("/")
    public ResponseEntity<List<Amulet>> getAllAmulets() {
        return ResponseEntity.ok(amuletService.getAllAmulets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Amulet> getAmuletById(@PathVariable Integer id) {
        return ResponseEntity.ok(amuletService.getAmuletById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAmulet(@PathVariable Integer id) {
        amuletService.deleteAmulet(id);
        return ResponseEntity.ok("Amulet has been removed.");
    }
}
