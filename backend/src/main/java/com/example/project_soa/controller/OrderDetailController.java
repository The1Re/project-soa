package com.example.project_soa.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_soa.model.Orderdetail;
import com.example.project_soa.service.OrderDetailService;

@RestController
@RequestMapping("/order-details")
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class OrderDetailController {
	@Autowired
	protected OrderDetailService service;
	
	@GetMapping
	public List<Orderdetail> getAll() {
		return service.getAll();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Orderdetail> getById(@PathVariable("id") int id) {
		try {
			Orderdetail obj = service.getById(id);
			return ResponseEntity.ok(obj);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		}
	}
	
	@GetMapping("/orders/{orderId}")
	public List<Orderdetail> getAllByOrderId(@PathVariable("orderId") int orderId) {
		return service.getAllByOrderId(orderId);
	}
	
	@PostMapping
	public ResponseEntity<Orderdetail> createOrderDetail(@RequestBody Orderdetail orderDetail) {
		return ResponseEntity.ok(service.create(orderDetail));
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<Orderdetail> updateOrderDetail(@PathVariable("id") int id, @RequestBody Orderdetail orderDetail) {
		return ResponseEntity.ok(service.update(id, orderDetail));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteOrderDetail(@PathVariable("id") int id) {
		service.delete(id);
		return new ResponseEntity<String>("Delete Successfully", HttpStatus.OK);
	}
}
