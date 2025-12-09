package com.emirdalgic.ecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoUserUpdate {
    @NotEmpty(message = "email cannot be empty")
    @Email(message = "please enter a valid mail address")
    private String email;
}
