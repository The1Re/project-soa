package com.example.project_soa.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.project_soa.model.Orderdetail;
import com.example.project_soa.service.OrderDetailService;

class OrderDetailControllerTest {

    @Mock
    private OrderDetailService service;

    @InjectMocks
    private OrderDetailController controller;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Should return all order details")
    void testGetAll() {
        List<Orderdetail> orderDetails = Arrays.asList(new Orderdetail(1, 2), new Orderdetail(3, 4));
        when(service.getAll()).thenReturn(orderDetails);

        List<Orderdetail> result = controller.getAll();
        assertEquals(2, result.size());
        verify(service, times(1)).getAll();
    }

    @Test
    @DisplayName("Should return order detail by ID")
    void testGetById() {
        Orderdetail orderDetail = new Orderdetail(1, 2);
        when(service.getById(1)).thenReturn(orderDetail);

        ResponseEntity<Orderdetail> response = controller.getById(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(service, times(1)).getById(1);
    }

    @Test
    @DisplayName("Should return BAD_REQUEST when order detail is not found")
    void testGetById_NotFound() {
        when(service.getById(1)).thenThrow(new RuntimeException("Orderdetail not found"));

        ResponseEntity<Orderdetail> response = controller.getById(1);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    @DisplayName("Should return all order details for a specific order ID")
    void testGetAllByOrderId() {
        List<Orderdetail> orderDetails = Arrays.asList(new Orderdetail(1, 2));
        when(service.getAllByOrderId(1)).thenReturn(orderDetails);

        List<Orderdetail> result = controller.getAllByOrderId(1);
        assertEquals(1, result.size());
        verify(service, times(1)).getAllByOrderId(1);
    }

    @Test
    @DisplayName("Should create a new order detail")
    void testCreateOrderDetail() {
        Orderdetail orderDetail = new Orderdetail(1, 2);
        when(service.create(orderDetail)).thenReturn(orderDetail);

        ResponseEntity<Orderdetail> response = controller.createOrderDetail(orderDetail);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(service, times(1)).create(orderDetail);
    }

    @Test
    @DisplayName("Should update an existing order detail")
    void testUpdateOrderDetail() {
        Orderdetail orderDetail = new Orderdetail(1, 2);
        when(service.update(1, orderDetail)).thenReturn(orderDetail);

        ResponseEntity<Orderdetail> response = controller.updateOrderDetail(1, orderDetail);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
        verify(service, times(1)).update(1, orderDetail);
    }

    @Test
    @DisplayName("Should delete an order detail successfully")
    void testDeleteOrderDetail() {
        doNothing().when(service).delete(1);

        ResponseEntity<String> response = controller.deleteOrderDetail(1);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Delete Successfully", response.getBody());
        verify(service, times(1)).delete(1);
    }
}
