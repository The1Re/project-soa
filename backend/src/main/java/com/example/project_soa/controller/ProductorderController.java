package com.example.project_soa.controller;

import com.example.project_soa.model.Productorder;
import com.example.project_soa.model.User;
import com.example.project_soa.service.OAuthService;
import com.example.project_soa.service.ProductorderService;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class ProductorderController {

    @Autowired
    private ProductorderService service;
    
    @Autowired
    private OAuthService authService;

    @GetMapping
    public List<Productorder> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Productorder> getOrderById(@PathVariable Integer id) {
        return service.getOrderById(id);
    }

    @PostMapping
    public ResponseEntity<Productorder> createOrder(@RequestBody Productorder order , HttpServletRequest request) throws Exception {
        if(!authService.isAuthenticate(request)) {
        	return ResponseEntity.status(401).body(null);
        }
        
        return ResponseEntity.ok(service.createOrder(order));
    }

    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Integer id) {
        service.deleteOrder(id);
    }
    
   
    @PutMapping("/{id}")
    public Productorder updateOrder(@PathVariable Integer id, @RequestBody Productorder order) {
        return service.updateOrder(id, order);
    }
}
