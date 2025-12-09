package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.*;
import com.emirdalgic.ecommerce.entities.*;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.*;
import com.emirdalgic.ecommerce.services.IOrderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final OrderItemRepository orderItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;


    private DtoOrder mapToDto(Order order){
        DtoOrder dtoOrder = new DtoOrder();
        dtoOrder.setId(order.getId());
        dtoOrder.setOrderCode(order.getOrderCode());
        dtoOrder.setUserId(order.getUser().getId());

        dtoOrder.setCreatedDate(order.getCreatedDate());
        dtoOrder.setPurchasePrice(order.getPurchasePrice());

        List<DtoOrderItem> dtoOrderItems = new ArrayList<>();
        for(OrderItem orderItem : order.getOrderItems()){
            DtoOrderItem dtoOrderItem = new DtoOrderItem();
            dtoOrderItem.setId(orderItem.getId());
            dtoOrderItem.setQuantity(orderItem.getQuantity());
            dtoOrderItem.setPurchasePrice(orderItem.getPurchasePrice());

            Product product = orderItem.getProduct();
            DtoProduct dtoProduct = new DtoProduct();
            BeanUtils.copyProperties(product, dtoProduct);

            if(product.getCategory() != null){
                DtoCategory dtoCategory = new DtoCategory();
                BeanUtils.copyProperties(product.getCategory(), dtoCategory);
                dtoProduct.setCategory(dtoCategory);
            }

            if(product.getProductImages() != null && !product.getProductImages().isEmpty()){
                dtoProduct.setImageUrl(product.getProductImages().get(0).getImageUrl());
            }

            dtoOrderItem.setProduct(dtoProduct);
            dtoOrderItems.add(dtoOrderItem);
        }
        dtoOrder.setOrderItems(dtoOrderItems);
        return dtoOrder;
    }

    @Transactional
    @Override
    public DtoOrder saveOrder(Long addressId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
        Cart cart = user.getCart();
        if(cart == null || cart.getCartItems().isEmpty()){
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderCode(java.util.UUID.randomUUID().toString());
        order.setCreatedDate(java.time.LocalDateTime.now());
        order.setPurchasePrice(cart.getTotalPrice());

        order = orderRepository.save(order);

        List<OrderItem> orderItems = new ArrayList<>();
        for(CartItem cartItem : cart.getCartItems()){
            Product product = cartItem.getProduct();
            if(product.getStockAmount() < cartItem.getQuantity()){
                throw new RuntimeException("insufficient stock");
            }
            product.setStockAmount(product.getStockAmount() - cartItem.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPurchasePrice(product.getPrice());

            orderItems.add(orderItem);
        }
        orderItemRepository.saveAll(orderItems);
        cart.getCartItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(cart);

        order.setOrderItems(orderItems);

        return mapToDto(order);
    }

    //admin paneli eklediğimde buraya geri dönücem(admin rolune göre yetki vericem).
    @Override
    public List<DtoOrder> getAllUserOrders(Long userId) {
        return null;
    }

    @Override
    public Page<DtoOrder> getUserAllOrders(int page, int size) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Pageable pageable = PageRequest.of(page,size);
        Page<Order> orderPage = orderRepository.findAllByUserEmail(username, pageable);
        return orderPage.map(this::mapToDto);
    }


}
