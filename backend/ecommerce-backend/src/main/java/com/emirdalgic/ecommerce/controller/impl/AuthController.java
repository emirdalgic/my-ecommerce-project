package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IAuthController;
import com.emirdalgic.ecommerce.dto.*;
import com.emirdalgic.ecommerce.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController implements IAuthController {

    private final IAuthService authService;

    @PostMapping("/register")
    @Override
    public ResponseEntity<DtoToken> register(@RequestBody @Valid DtoRegisterUI dtoRegisterUI) {
        return ResponseEntity.ok(authService.register(dtoRegisterUI));
    }

    @PostMapping("/login")
    @Override
    public ResponseEntity<DtoToken> login(@RequestBody @Valid DtoLoginIU dtoLoginIU) {
        return ResponseEntity.ok(authService.login(dtoLoginIU));
    }

    @GetMapping("/me")
    @Override
    public ResponseEntity<DtoUser> getCurrentUser(@RequestHeader(name = "Authorization") String token) {
        return  ResponseEntity.ok(authService.getCurrentUser(token));
    }
}
