package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoAddToCartIU;
import com.emirdalgic.ecommerce.dto.DtoCart;

public interface ICartService {
    public DtoCart addToCart(Long userId, DtoAddToCartIU dtoAddToCartIU);
}
