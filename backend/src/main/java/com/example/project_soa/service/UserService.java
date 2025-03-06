package com.example.project_soa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_soa.model.User;
import com.example.project_soa.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	protected UserRepository userRepository;
	
	public List<User> getUser() {
		return userRepository.findAll();
	}
	
	public User getUserById(String id) {
		return userRepository.findById(id).orElseThrow();
	}
	
	public void deleteUser(String id) {
		userRepository.deleteById(id);
	}
	
	public User createUser(User user) {
		return userRepository.save(user);
	}
}
