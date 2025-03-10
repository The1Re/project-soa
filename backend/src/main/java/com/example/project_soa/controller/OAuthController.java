package com.example.project_soa.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.project_soa.service.OAuthService;
import com.fasterxml.jackson.databind.JsonNode;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "http://localhost:5173" , allowCredentials = "true")
public class OAuthController {

	@Autowired
	private OAuthService oAuthService;

	@PostMapping("/oauth2/callback")
	public ResponseEntity<String> handleOAuthCallBack(@RequestBody Map<String, String> payload,HttpServletResponse response) {
		String token = payload.get("token");
		try {
			String userInfo = oAuthService.getUserProfile(token);
			JsonNode userJson = oAuthService.parseJson(userInfo);
			oAuthService.saveUserToDatabase(userJson);

			Cookie cookie = new Cookie("token", token);
			cookie.setHttpOnly(true);
			cookie.setPath("/");
			cookie.setMaxAge(60 * 60 * 24);

			response.addCookie(cookie);
			return ResponseEntity.ok("User data saved successfully.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
		}
	}

	@PostMapping("/oauth2/logout")
	public ResponseEntity<String> logout(HttpServletResponse response){
		Cookie cookie = new Cookie("token", "");
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(0);

		response.addCookie(cookie);
		
		return ResponseEntity.ok("Logout successfully.");
	}

}
