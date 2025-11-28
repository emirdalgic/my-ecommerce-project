package com.emirdalgic.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoCartItem {
    private Long id;
    private int quantity;
    private Long cartId;
    private DtoProduct product;
}
