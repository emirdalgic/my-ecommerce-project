package com.emirdalgic.ecommerce.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoRegisterUI {
    @NotEmpty(message = "firstname cannot be empty")
    @Size(min = 3, max = 20)
    private String firstName;
    @NotEmpty(message = "lastname cannot be empty")
    @Size(min = 3, max = 20)
    private String lastName;
    @NotEmpty(message = "email cannot be empty")
    @Email(message = "please enter a valid email format")
    private String email;

    @NotEmpty(message = "password cannot be empty")
    @Size(min = 6, max = 20)
    private String password;
}
