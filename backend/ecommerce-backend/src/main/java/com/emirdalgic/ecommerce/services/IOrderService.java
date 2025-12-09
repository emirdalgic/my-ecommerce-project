package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoCart;
import com.emirdalgic.ecommerce.dto.DtoOrder;
import com.emirdalgic.ecommerce.entities.Order;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IOrderService {
    public DtoOrder saveOrder(Long addressId);
    public List<DtoOrder> getAllUserOrders(Long userId);
    public Page<DtoOrder> getUserAllOrders(int page, int size);
}
