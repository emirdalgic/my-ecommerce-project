package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.*;
import com.emirdalgic.ecommerce.entities.*;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.CartItemRepository;
import com.emirdalgic.ecommerce.repository.CartRepository;
import com.emirdalgic.ecommerce.repository.ProductRepository;
import com.emirdalgic.ecommerce.repository.UserRepository;
import com.emirdalgic.ecommerce.services.ICartService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;


    private DtoCart mapToDto(Cart cart){
        DtoCart dtoCart = new DtoCart();
        dtoCart.setId(cart.getId());
        dtoCart.setTotalPrice(cart.getTotalPrice());
        dtoCart.setUserId(cart.getUser().getId());

        if(cart.getCartItems() != null && !cart.getCartItems().isEmpty()){
            List<DtoCartItem> dtoCartItems = new ArrayList<>();
            for(CartItem cartItem : cart.getCartItems()){
                DtoCartItem dtoCartItem = new DtoCartItem();
                dtoCartItem.setId(cartItem.getId());
                dtoCartItem.setQuantity(cartItem.getQuantity());

                Product product = cartItem.getProduct();
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
                dtoCartItem.setProduct(dtoProduct);
                dtoCartItems.add(dtoCartItem);
            }
            dtoCart.setCartItems(dtoCartItems);
        }
        return dtoCart;
    }

    @Transactional
    @Override
    public DtoCart addToCart(DtoAddToCartIU dtoAddToCartIU) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
        Cart cart = user.getCart();
        if(cart == null){
            cart = new Cart();
            cart.setUser(user);
            cart.setCartItems(new ArrayList<>());
            cart.setTotalPrice(BigDecimal.ZERO);

            cart = cartRepository.save(cart);
        }

        Product product = productRepository.findById(dtoAddToCartIU.getProductId())
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));

        Optional<CartItem> existingItem = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if(existingItem.isPresent()){
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + dtoAddToCartIU.getQuantity());
        }else{
            CartItem newItem = new CartItem();
            newItem.setProduct(product);
            newItem.setCart(cart);
            newItem.setQuantity(dtoAddToCartIU.getQuantity());

            cart.getCartItems().add(newItem);
        }

        Cart savedCart = cartRepository.save(cart);
        return mapToDto(savedCart);
    }

    @Transactional
    @Override
    public void deleteCartItem(Long productId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(username)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
        Cart cart = user.getCart();
        if(cart == null){
            throw new BaseException(MessageType.NO_RECORD_EXIST);
        }

        CartItem itemToDelete = cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));

        BigDecimal itemTotal = itemToDelete.getProduct().getPrice()
                .multiply(BigDecimal.valueOf(itemToDelete.getQuantity()));

        cart.setTotalPrice(cart.getTotalPrice().subtract(itemTotal));

        cart.getCartItems().remove(itemToDelete);
        cartItemRepository.deleteById(itemToDelete.getId());
        cartRepository.save(cart);
    }
}
