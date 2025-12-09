package com.emirdalgic.ecommerce.services;

import com.emirdalgic.ecommerce.dto.DtoAddress;
import com.emirdalgic.ecommerce.dto.DtoAddressIU;

import java.util.List;

public interface IAddressService {
    public List<DtoAddress> getUserAddresses();
    public DtoAddress saveAddress(DtoAddressIU dtoAddressIU);
    public DtoAddress getAddressById(Long id);
    public DtoAddress updateAddress(DtoAddressIU dtoAddressIU, Long id);
    public void deleteAddress(Long id);
}
