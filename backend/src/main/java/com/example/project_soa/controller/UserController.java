package com.example.project_soa.controller;


import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_soa.model.User;
import com.example.project_soa.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	public ResponseEntity<List<User>> getAll() {
		return ResponseEntity.ok(userService.getUser());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<User> getUser(@PathVariable String id) {
		return ResponseEntity.ok(userService.getUserById(id));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable String id){
		userService.deleteUser(id);
		return ResponseEntity.ok("User already removed.");
	}
}
