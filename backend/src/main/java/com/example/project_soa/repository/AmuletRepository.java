package com.example.project_soa.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.project_soa.model.Amulet;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AmuletRepository extends JpaRepository<Amulet, Integer> {
    @Query("SELECT a FROM Amulet a WHERE " +
           "LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.templeName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.type) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Amulet> findByKeyWord(@Param("keyword") String keyword);

    List<Amulet> findByPriceBetween(int minPrice, int maxPrice);
}
