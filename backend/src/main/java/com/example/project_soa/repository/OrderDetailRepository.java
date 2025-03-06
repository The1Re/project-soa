package com.example.project_soa.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project_soa.model.Orderdetail;

public interface OrderDetailRepository extends JpaRepository<Orderdetail, Integer> {
	
	public List<Orderdetail> findAllByOrderId(int orderId);
}
