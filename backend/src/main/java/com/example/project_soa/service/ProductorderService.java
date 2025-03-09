package com.example.project_soa.service;

import com.example.project_soa.model.Productorder;
import com.example.project_soa.repository.ProductorderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductorderService {
	private List<Productorder> mockOrders = new ArrayList<>();

   @Autowired
   private ProductorderRepository repository;
	
	

    public List<Productorder> getAllOrders() {
        return repository.findAll();
    }

    public Optional<Productorder> getOrderById(Integer id) {
        return repository.findById(id);
    }

    public Productorder createOrder(Productorder order) {
        return repository.save(order);
    }

    public void deleteOrder(Integer id) {
        repository.deleteById(id);
    }
    
    //update
    public Productorder updateOrder(Integer id, Productorder updatedOrder) {
        if (repository.existsById(id)) {
            updatedOrder.setId(id);
            return repository.save(updatedOrder);
        }
        return null;
    }
}
