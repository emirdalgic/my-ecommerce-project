package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.DtoAddToCartIU;
import com.emirdalgic.ecommerce.dto.DtoCart;
import com.emirdalgic.ecommerce.entities.User;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.CartRepository;
import com.emirdalgic.ecommerce.repository.UserRepository;
import com.emirdalgic.ecommerce.services.ICartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public DtoCart addToCart(Long userId, DtoAddToCartIU dtoAddToCartIU) {
        return null;
    }
}
