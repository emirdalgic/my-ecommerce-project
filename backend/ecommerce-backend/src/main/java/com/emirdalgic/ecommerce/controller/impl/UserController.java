package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IUserController;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.services.IUserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController implements IUserController {


    private final IUserService userService;

    @PostMapping(path = "/register")
    @Override
    public ResponseEntity<DtoUser> saveUser(@RequestBody @Valid DtoUserIU dtoUserIU) {
        DtoUser savedUser = userService.saveUser(dtoUserIU);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @GetMapping(path = "/list")
    @Override
    public List<DtoUser> listUser() {
        return userService.listUser();
    }

    @DeleteMapping(path = "/delete/{id}")
    @Override
    public ResponseEntity<Void> deleteUserById(@PathVariable(name = "id") Long id) {
        userService.deleteUserById(id);
        ResponseEntity.noContent().build();
    }

    @GetMapping(path = "/{id}")
    @Override
    public ResponseEntity<DtoUser> getUserById(@PathVariable(name = "id") Long id) {
        DtoUser user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
}
