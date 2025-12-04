package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoLoginIU;
import com.emirdalgic.ecommerce.dto.DtoToken;
import com.emirdalgic.ecommerce.dto.DtoUser;
import com.emirdalgic.ecommerce.dto.DtoUserIU;

public interface IAuthService {
    public DtoToken register(DtoUserIU dtoUserIU);
    public DtoToken login(DtoLoginIU dtoLoginIU);
}
