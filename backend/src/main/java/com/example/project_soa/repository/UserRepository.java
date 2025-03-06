package com.example.project_soa.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.project_soa.model.User;

public interface UserRepository extends JpaRepository<User, String> {

}
