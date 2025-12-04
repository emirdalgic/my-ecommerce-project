package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoToken;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.entities.User;

import java.util.List;

public interface IUserService {
    public User saveUser(DtoUserIU dtoUserIU);
    public List<DtoUser> listUser();
    public void deleteUserById(Long id);
    public DtoUser getUserById(Long id);
}
