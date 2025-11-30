package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserController {
    public List<DtoUser> listUser();
    public ResponseEntity<Void> deleteUserById(Long id);
    public ResponseEntity<DtoUser> getUserById(Long id);
}
