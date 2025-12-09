package com.emirdalgic.ecommerce.controller.impl;

import com.emirdalgic.ecommerce.controller.IAddressController;
import com.emirdalgic.ecommerce.dto.DtoAddress;
import com.emirdalgic.ecommerce.dto.DtoAddressIU;
import com.emirdalgic.ecommerce.services.IAddressService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
public class AddressController implements IAddressController {
    private final IAddressService addressService;

    @GetMapping(path = "/list")
    @Override
    public ResponseEntity<List<DtoAddress>> getUserAddresses() {
        return ResponseEntity.ok(addressService.getUserAddresses());
    }

    @PostMapping(path = "/save")
    @Override
    public ResponseEntity<DtoAddress> saveAddress(@RequestBody @Valid DtoAddressIU dtoAddressIU) {
        DtoAddress dtoAddress = addressService.saveAddress(dtoAddressIU);
        return ResponseEntity.status(HttpStatus.CREATED).body(dtoAddress);
    }

    @GetMapping(path = "/list/{id}")
    @Override
    public ResponseEntity<DtoAddress> getAddressById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(addressService.getAddressById(id));
    }

    @PutMapping(path = "update/{id}")
    @Override
    public ResponseEntity<DtoAddress> updateAddress(@RequestBody @Valid DtoAddressIU dtoAddressIU,
                                                    @PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(addressService.updateAddress(dtoAddressIU, id));
    }

    @DeleteMapping(path = "delete/{id}")
    @Override
    public ResponseEntity<Void> deleteAddress(@PathVariable(name = "id") Long id) {
        addressService.deleteAddress(id);
        return ResponseEntity.noContent().build();
    }
}
