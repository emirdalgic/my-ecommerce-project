package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IAuthController;
import com.emirdalgic.ecommerce.dto.DtoLoginIU;
import com.emirdalgic.ecommerce.dto.DtoToken;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController implements IAuthController {

    private final IAuthService authService;

    @PostMapping("/register")
    @Override
    public ResponseEntity<DtoUser> register(@RequestBody @Valid DtoUserIU dtoUserIU) {
        return ResponseEntity.ok(authService.register(dtoUserIU));
    }

    @PostMapping("/login")
    @Override
    public ResponseEntity<DtoToken> login(@RequestBody @Valid DtoLoginIU dtoLoginIU) {
        return ResponseEntity.ok(authService.login(dtoLoginIU));
    }
}
