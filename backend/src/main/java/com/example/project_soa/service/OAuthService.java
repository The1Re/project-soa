package com.example.project_soa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
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

@Service
public class OAuthService {
	
	@Autowired
    private UserRepository userRepository;

    private final RestTemplate restTemplate = new RestTemplate();

    private static final String GOOGLE_USERINFO_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

    // ฟังก์ชันนี้จะดึงข้อมูลโปรไฟล์ของผู้ใช้จาก Google ด้วย access token
    public String getUserProfile(String accessToken) {
        // สร้าง headers และใส่ access token
        HttpHeaders headers = new HttpHeaders();

        // สร้าง entity สำหรับ request
        HttpEntity<String> entity = new HttpEntity<>(headers);

        // ใช้ RestTemplate เพื่อส่งคำขอไปยัง Google API
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(GOOGLE_USERINFO_URL+accessToken, HttpMethod.GET, entity, String.class);

        // ตรวจสอบ response และรับข้อมูล JSON
        String responseBody = response.getBody();
        
        System.out.println(responseBody);
        // สรุปผลลัพธ์ - คุณสามารถแปลง JSON เป็น object หรือ parse ข้อมูลที่ต้องการได้ที่นี่
        return responseBody;  // ข้อมูล JSON ของผู้ใช้จาก Google
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
    
}
