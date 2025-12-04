package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.entities.Role;
import com.emirdalgic.ecommerce.entities.User;
import com.emirdalgic.ecommerce.repository.RoleRepository;
import com.emirdalgic.ecommerce.repository.UserRepository;
import com.emirdalgic.ecommerce.services.IUserService;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.exception.BaseException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(DtoUserIU dtoUserIU) {
        User user = new User();
        BeanUtils.copyProperties(dtoUserIU, user);

        user.setPassword(passwordEncoder.encode(dtoUserIU.getPassword()));

        Role customerRole = roleRepository.findByName("ROLE_CUSTOMER")
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));

        user.setRoles(List.of(customerRole));

        return userRepository.save(user);
    }

    //for debugs
    @Override
    public List<DtoUser> listUser() {
        List<User> userList = userRepository.findAll();
        List<DtoUser> dtoUserList = new ArrayList<>();
        for(User user : userList){
            DtoUser dtoUser = new DtoUser();
            BeanUtils.copyProperties(user, dtoUser);
            dtoUserList.add(dtoUser);
        }
        return dtoUserList;
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));
        userRepository.deleteById(id);
    }

    @Override
    public DtoUser getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));
        DtoUser dtoUser = new DtoUser();
        BeanUtils.copyProperties(user, dtoUser);
        return dtoUser;
    }
}
