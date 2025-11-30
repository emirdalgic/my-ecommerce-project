package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoCart;
import com.emirdalgic.ecommerce.dto.DtoOrder;
import com.emirdalgic.ecommerce.entities.Order;
import org.springframework.data.domain.Page;

import java.util.List;

public interface IOrderService {
    public DtoOrder saveOrder(Long addressId);
    public List<DtoOrder> getUserAllOrders(Long userId);
    public Page<DtoOrder> getUserAllOrderByPageFormat(int page, int size);
}
