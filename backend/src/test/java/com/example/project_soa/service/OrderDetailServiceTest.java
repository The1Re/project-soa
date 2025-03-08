package com.example.project_soa.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.project_soa.model.Orderdetail;
import com.example.project_soa.repository.OrderDetailRepository;

class OrderDetailServiceTest {

    @Mock
    private OrderDetailRepository repo;

    @InjectMocks
    private OrderDetailService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Should get all order details")
    void testGetAll() {
        List<Orderdetail> orderDetails = Arrays.asList(new Orderdetail(1, 2), new Orderdetail(3, 4));
        when(repo.findAll()).thenReturn(orderDetails);

        List<Orderdetail> result = service.getAll();
        assertEquals(2, result.size());
        verify(repo, times(1)).findAll();
    }

    @Test
    @DisplayName("Should get order detail by order detail id")
    void testGetById() {
        Orderdetail orderDetail = new Orderdetail(1, 2);
        when(repo.findById(1)).thenReturn(Optional.of(orderDetail));

        Orderdetail result = service.getById(1);
        assertEquals(2, result.getOrderId());
        verify(repo, times(1)).findById(1);
    }

    @Test
    @DisplayName("Should return not found if order detail id not exists")
    void testGetById_NotFound() {
        when(repo.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> service.getById(1));
        assertEquals("Orderdetail not found", exception.getMessage());
    }

    @Test
    @DisplayName("Should create order detail")
    void testCreate() {
        Orderdetail orderDetail = new Orderdetail(1, 2);
        when(repo.save(orderDetail)).thenReturn(orderDetail);

        Orderdetail result = service.create(orderDetail);
        assertEquals(2, result.getOrderId());
        verify(repo, times(1)).save(orderDetail);
    }

    @Test
    @DisplayName("Should update order detail")
    void testUpdate() {
        Orderdetail existing = new Orderdetail(1, 2);
        Orderdetail updated = new Orderdetail(3, 4);
        when(repo.findById(1)).thenReturn(Optional.of(existing));
        when(repo.save(existing)).thenReturn(existing);

        Orderdetail result = service.update(1, updated);
        assertEquals(3, result.getProductId());
        assertEquals(4, result.getOrderId());
        verify(repo, times(1)).save(existing);
    }

    @Test
    @DisplayName("Should delete order detail by id")
    void testDelete() {
        doNothing().when(repo).deleteById(1);
        service.delete(1);
        verify(repo, times(1)).deleteById(1);
    }
}
