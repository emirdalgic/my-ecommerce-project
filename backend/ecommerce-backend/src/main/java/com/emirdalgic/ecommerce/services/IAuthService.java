package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.*;

public interface IAuthService {
    public DtoToken register(DtoRegisterUI dtoRegisterUI);
    public DtoToken login(DtoLoginIU dtoLoginIU);
    public DtoUser getCurrentUser(String token);
}
