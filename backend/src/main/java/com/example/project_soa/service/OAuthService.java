package com.example.project_soa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.project_soa.model.User;
import com.example.project_soa.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class OAuthService {
	
	@Autowired
    private UserRepository userRepository;
	
    private static final String GOOGLE_USERINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    
    public String getUserProfile(String accessToken) {
        
        HttpHeaders headers = new HttpHeaders();

       
        HttpEntity<String> entity = new HttpEntity<>(headers);

        
        //Request GET method with token to google for get user data from google.
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(GOOGLE_USERINFO_URL+accessToken, HttpMethod.GET, entity, String.class);

        
        String responseBody = response.getBody();
        
        return responseBody;  
    }

    public JsonNode parseJson(String json) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(json);
    }

    public void saveUserToDatabase(JsonNode userJson) {
        String googleId = userJson.get("sub").asText();
        String email = userJson.get("email").asText();
        String name = userJson.get("name").asText();

        if (!userRepository.findById(googleId).isPresent()) {
            User newUser = new User();
            newUser.setId(googleId);
            newUser.setEmail(email);
            newUser.setUsername(name);
            userRepository.save(newUser);
        }
    }
    
    public boolean isAuthenticate(HttpServletRequest request) throws Exception {
    	Cookie[] cookies = request.getCookies();
    	
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("token".equals(cookie.getName())) {
                    String token = cookie.getValue();
                    System.out.println(token);
                    if(token == null) {
                    	return false;
                    }
                    String userInfo = getUserProfile(token);
                    
                    return true;
                }
            }
        }
    	
      
		return false;
    }
    
}
