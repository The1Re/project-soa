package com.example.project_soa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_soa.model.Orderdetail;
import com.example.project_soa.repository.OrderDetailRepository;

@Service
public class OrderDetailService {
	@Autowired
	protected OrderDetailRepository repo;
	
	public List<Orderdetail> getAll() {
		return repo.findAll();
	}
	
	public Orderdetail getById(int id) {
		return repo.findById(id).orElseThrow(() -> new RuntimeException("Orderdetail not found"));
	}
	
	public List<Orderdetail> getAllByOrderId(int id) {
		return repo.findAllByOrderId(id);
	}
	
	public Orderdetail update(int id, Orderdetail item) {
		Orderdetail i = this.getById(id);
		if (item.getOrderId() > 0)
			i.setOrderId(item.getOrderId());
		if (item.getProductId() > 0)
			i.setProductId(item.getProductId());
		return repo.save(i);
	}
	
	public Orderdetail create(Orderdetail item) {
		return repo.save(item);
	}
	
	public void delete(int id) {
		repo.deleteById(id);
	}
}
