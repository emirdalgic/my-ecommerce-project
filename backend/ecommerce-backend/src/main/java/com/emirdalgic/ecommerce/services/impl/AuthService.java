package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.DtoLoginIU;
import com.emirdalgic.ecommerce.dto.DtoToken;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;
import com.emirdalgic.ecommerce.entities.User;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.UserRepository;
import com.emirdalgic.ecommerce.security.JwtService;
import com.emirdalgic.ecommerce.services.IAuthService;
import com.emirdalgic.ecommerce.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {
    private final UserRepository userRepository;
    private final IUserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Override
    public DtoToken register(DtoUserIU dtoUserIU) {
        User user = userService.saveUser(dtoUserIU);
        String token = jwtService.generateToken(user);
        return new DtoToken(token); // we logged in the user after registration
    }//correct way is we could register them our db and let them login at login page after their mail verification
    //that obstructs to fake mail registrations and most important fake identity registrations

    @Override
    public DtoToken login(DtoLoginIU dtoLoginIU) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            dtoLoginIU.getEmail(),
                            dtoLoginIU.getPassword()
                    )
            );
        } catch (Exception e){
            throw new BaseException(MessageType.GENERAL_EXCEPTION);
        }
        User user = userRepository.findByEmail(dtoLoginIU.getEmail())
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));

        String token = jwtService.generateToken(user);

        return new DtoToken(token);
    }

    @Override
    public DtoUser getCurrentUser(String token) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(currentUsername)
                .orElseThrow(()-> new BaseException(MessageType.NO_RECORD_EXIST));

        DtoUser dtoUser = new DtoUser();
        BeanUtils.copyProperties(user, dtoUser);

        return dtoUser;
    }
}
