package com.example.project_soa.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_soa.service.UserService;

@RestController
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	
}
