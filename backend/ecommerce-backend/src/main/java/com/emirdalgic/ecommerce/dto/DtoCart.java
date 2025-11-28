package com.emirdalgic.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoCart {
    private Long id;
    private BigDecimal totalPrice;
    private Long userId;
    private List<DtoCartItem> cartItems;
}
