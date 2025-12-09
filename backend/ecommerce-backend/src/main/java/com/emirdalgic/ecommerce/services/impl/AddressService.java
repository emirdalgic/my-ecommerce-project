package com.emirdalgic.ecommerce.services.impl;

import com.emirdalgic.ecommerce.dto.DtoAddress;
import com.emirdalgic.ecommerce.dto.DtoAddressIU;
import com.emirdalgic.ecommerce.entities.Address;
import com.emirdalgic.ecommerce.entities.User;
import com.emirdalgic.ecommerce.exception.BaseException;
import com.emirdalgic.ecommerce.exception.MessageType;
import com.emirdalgic.ecommerce.repository.AddressRepository;
import com.emirdalgic.ecommerce.repository.UserRepository;
import com.emirdalgic.ecommerce.services.IAddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService implements IAddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));
    }

    private void checkAccess(Address address, User user) {
        if (!address.getUser().getId().equals(user.getId())) {
            throw new BaseException(MessageType.UNAUTHORIZED_ACCESS);
        }
    }

    @Override
    public List<DtoAddress> getUserAddresses() {
        User user = getCurrentUser();
        List<Address> addresses = addressRepository.findByUserId(user.getId());

        return addresses.stream()
                .map(this::mapToDto)
                .toList();
    }

    @Override
    public DtoAddress saveAddress(DtoAddressIU dtoAddressIU) {
        User user = getCurrentUser();

        Address savedAddress = new Address();
        BeanUtils.copyProperties(dtoAddressIU, savedAddress);

        savedAddress.setUser(user);

        Address dbAddress = addressRepository.save(savedAddress);
        return mapToDto(dbAddress);
    }

    @Override
    public DtoAddress getAddressById(Long id) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));

        checkAccess(address, user);

        return mapToDto(address);
    }

    @Override
    public DtoAddress updateAddress(DtoAddressIU dtoAddressIU, Long id) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));

        checkAccess(address, user);

        BeanUtils.copyProperties(dtoAddressIU, address);
        Address updatedAddress = addressRepository.save(address);
        return mapToDto(updatedAddress);
    }

    @Override
    public void deleteAddress(Long id) {
        User user = getCurrentUser();
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new BaseException(MessageType.NO_RECORD_EXIST));

        checkAccess(address, user);

        addressRepository.deleteById(id);
    }

    private DtoAddress mapToDto(Address address){
        DtoAddress dto = new DtoAddress();
        BeanUtils.copyProperties(address, dto);
        return dto;
    }
}