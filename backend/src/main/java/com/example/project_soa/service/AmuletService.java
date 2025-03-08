package com.example.project_soa.service;

import com.example.project_soa.model.Amulet;
import com.example.project_soa.repository.AmuletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AmuletService {

    @Autowired
    private AmuletRepository amuletRepository;

    public List<Amulet> getAllAmulets() {
        return amuletRepository.findAll();
    }

    public Amulet getAmuletById(Integer id) {
        Optional<Amulet> amulet = amuletRepository.findById(id);
        return amulet.orElseThrow(() -> new RuntimeException("Amulet not found with ID: " + id));
    }

    public void deleteAmulet(Integer id) {
        if (!amuletRepository.existsById(id)) {
            throw new RuntimeException("Amulet not found with ID: " + id);
        }
        amuletRepository.deleteById(id);
    }
}
