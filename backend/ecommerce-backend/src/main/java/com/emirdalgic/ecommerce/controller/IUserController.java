package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.dto.DtoUserUpdate;
import jakarta.validation.constraints.Email;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

public interface IUserController {
    public List<DtoUser> listUser();
    public ResponseEntity<Void> deleteUserById(Long id);
    public ResponseEntity<DtoUser> getUserById(Long id);
    public ResponseEntity<DtoUser> updateUsersEmail(String email);
}
