package com.example.project_soa.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project_soa.model.Amulet;
import com.example.project_soa.repository.AmuletRepository;

@Service
public class AmuletService {
    
    @Autowired
    private AmuletRepository amuletRepository;

    public List<Amulet> getAll() {
        return amuletRepository.findAll();
    }

    public Amulet getById(int id) {
        return amuletRepository.findById(id).orElseThrow(() -> 
            new RuntimeException("Amulet not found with ID: " + id));
    }

    public Amulet update(int id, Amulet updatedAmulet) {
        Amulet existingAmulet = this.getById(id);
        
        if (updatedAmulet.getName() != null && !updatedAmulet.getName().isEmpty())
            existingAmulet.setName(updatedAmulet.getName());
        
        if (updatedAmulet.getTempleName() != null && !updatedAmulet.getTempleName().isEmpty())
            existingAmulet.setTempleName(updatedAmulet.getTempleName());
        
        if (updatedAmulet.getPrice() > 0)
            existingAmulet.setPrice(updatedAmulet.getPrice());

        if (updatedAmulet.getType() != null && !updatedAmulet.getType().isEmpty())
            existingAmulet.setType(updatedAmulet.getType());
        
        return amuletRepository.save(existingAmulet);
    }

    public Amulet create(Amulet amulet) {
        return amuletRepository.save(amulet);
    }

    public void delete(int id) {
        amuletRepository.deleteById(id);
    }
    
    public List<Amulet> search(String keyword) {
        return amuletRepository.findByKeyWord(keyword);
    }
    
    public List<Amulet> searchByPriceRange(int minPrice,int maxPrice){
    	return amuletRepository.findByPriceBetween(minPrice, maxPrice);
    }
}
