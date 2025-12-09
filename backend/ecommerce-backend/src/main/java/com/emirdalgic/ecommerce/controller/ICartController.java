package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoAddToCartIU;
import com.emirdalgic.ecommerce.dto.DtoCart;
import org.springframework.http.ResponseEntity;

public interface ICartController {
    public ResponseEntity<DtoCart> addToCart(DtoAddToCartIU dtoAddToCartIU);
    public ResponseEntity<Void> deleteCartItem(Long productId);
    public ResponseEntity<DtoCart> getUserCart();
}
