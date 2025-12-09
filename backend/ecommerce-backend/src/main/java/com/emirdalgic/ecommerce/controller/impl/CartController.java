package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.ICartController;
import com.emirdalgic.ecommerce.dto.DtoAddToCartIU;
import com.emirdalgic.ecommerce.dto.DtoCart;
import com.emirdalgic.ecommerce.services.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController implements ICartController {
    private final ICartService cartService;

    @PostMapping(path = "/add-item")
    @Override
    public ResponseEntity<DtoCart> addToCart(@RequestBody DtoAddToCartIU dtoAddToCartIU) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addToCart(dtoAddToCartIU));
    }

    @DeleteMapping(path = "/delete-item/{productId}")
    @Override
    public ResponseEntity<Void> deleteCartItem(@PathVariable(name = "productId") Long productId) {
        cartService.deleteCartItem(productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/my-cart")
    @Override
    public ResponseEntity<DtoCart> getUserCart() {
        return ResponseEntity.ok(cartService.getUserCart());
    }
}
