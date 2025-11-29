package com.emirdalgic.ecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoLoginIU {
    @NotEmpty
    @Email
    private String email;

    @NotEmpty
    private String password;
}
