package com.emirdalgic.ecommerce.controller;

import com.emirdalgic.ecommerce.dto.DtoAddress;
import com.emirdalgic.ecommerce.dto.DtoAddressIU;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IAddressController {
    public ResponseEntity<List<DtoAddress>> getUserAddresses();
    public ResponseEntity<DtoAddress> saveAddress(DtoAddressIU dtoAddressIU);
    public ResponseEntity<DtoAddress> getAddressById(Long id);
    public ResponseEntity<DtoAddress> updateAddress(DtoAddressIU dtoAddressIU, Long id);
    public ResponseEntity<Void> deleteAddress(Long id);
}
