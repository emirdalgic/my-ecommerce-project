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

    @PostMapping(path = "/{id}")
    @Override
    public ResponseEntity<DtoCart> addToCart(@PathVariable(name = "userId") Long userId,
                                            @RequestBody DtoAddToCartIU dtoAddToCartIU) {
        long mockUserId = 1L; //i will change here after make auth mechanism
        return ResponseEntity.ok(cartService.addToCart(mockUserId, dtoAddToCartIU));
    }
}
