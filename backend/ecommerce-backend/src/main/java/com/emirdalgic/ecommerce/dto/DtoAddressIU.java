package com.emirdalgic.ecommerce.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoAddressIU {
    @NotEmpty(message = "title cannot be empty")
    @Size(min = 3, max = 30)
    private String title;
    @NotEmpty(message = "address cannot be empty")
    @Size(min = 3, max = 30)
    private String fullAddress;
}
