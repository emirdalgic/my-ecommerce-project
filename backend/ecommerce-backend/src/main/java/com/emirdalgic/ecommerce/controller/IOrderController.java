package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoCart;
import com.emirdalgic.ecommerce.dto.DtoOrder;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IOrderController {
    public ResponseEntity<DtoOrder> saveOrder(Long addressId);
    public List<DtoOrder> getUserAllOrders(Long userId);
    public ResponseEntity<Page<DtoOrder>> getUserAllOrderByPageFormat(int page, int size);

}
