package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IOrderController;
import com.emirdalgic.ecommerce.dto.DtoCart;
import com.emirdalgic.ecommerce.dto.DtoOrder;
import com.emirdalgic.ecommerce.services.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
@RequiredArgsConstructor
public class OrderController implements IOrderController {
    private final IOrderService orderService;

    @PostMapping(path = "/save/{addressId}")
    @Override
    public ResponseEntity<DtoOrder> saveOrder(@PathVariable(name = "addressId")Long addressId) {
        return ResponseEntity.ok(orderService.saveOrder(addressId));
    }

    @GetMapping(path = "/get/{userId}")
    @Override
    public List<DtoOrder> getAllUserOrders(@PathVariable(name = "userId") Long userId) {
        return orderService.getAllUserOrders(userId);
    }

    @GetMapping(path = "/my-orders")
    @Override
    public ResponseEntity<Page<DtoOrder>> getUserAllOrders(@RequestParam(defaultValue = "0") int page,
                                                                      @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(orderService.getUserAllOrders(page,size));
    }
}
