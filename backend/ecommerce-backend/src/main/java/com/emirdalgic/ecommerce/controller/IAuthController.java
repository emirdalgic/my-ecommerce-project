package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.*;
import org.springframework.http.ResponseEntity;

public interface IAuthController {
    public ResponseEntity<DtoToken> register(DtoRegisterUI dtoRegisterUI);
    public ResponseEntity<DtoToken> login(DtoLoginIU dtoLoginIU);
    public ResponseEntity<DtoUser> getCurrentUser(String token);
}
