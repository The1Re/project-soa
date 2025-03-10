package com.example.project_soa.repository;

import com.example.project_soa.model.Productorder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductorderRepository extends JpaRepository<Productorder, Integer> {
}
