package com.example.project_soa.controller;

import com.example.project_soa.model.Productorder;
import com.example.project_soa.service.ProductorderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/orders")
public class ProductorderController {

    @Autowired
    private ProductorderService service;

    @GetMapping
    public List<Productorder> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/{id}")
    public Optional<Productorder> getOrderById(@PathVariable Integer id) {
        return service.getOrderById(id);
    }

    @PostMapping
    public Productorder createOrder(@RequestBody Productorder order) {
        return service.createOrder(order);
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
