package com.emirdalgic.ecommerce.dto;

import com.emirdalgic.ecommerce.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoAddress {
    private Long id;
    private String title;
    private String fullAddress;
}
