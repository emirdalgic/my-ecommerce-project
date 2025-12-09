package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoRegisterUI;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.dto.DtoUserUpdate;
import com.emirdalgic.ecommerce.entities.User;

import java.util.List;

public interface IUserService {
    public User saveUser(DtoRegisterUI dtoRegisterUI);
    public List<DtoUser> listUser();
    public void deleteUserById(Long id);
    public DtoUser getUserById(Long id);
    public DtoUser updateUsersEmail(String email);
}
