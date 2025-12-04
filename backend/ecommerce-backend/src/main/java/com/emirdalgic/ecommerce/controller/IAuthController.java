package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoLoginIU;
import com.emirdalgic.ecommerce.dto.DtoToken;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import org.springframework.http.ResponseEntity;

public interface IAuthController {
    public ResponseEntity<DtoToken> register(DtoUserIU dtoUserIU);
    public ResponseEntity<DtoToken> login(DtoLoginIU dtoLoginIU);
}
