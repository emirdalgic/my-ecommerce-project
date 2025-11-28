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
public class DtoUserIU {

    @NotEmpty(message = "name cannot be empty")
    @Size(min = 3, max = 50)
    private String firstName;

    @NotEmpty(message = "last name cannot be empty")
    @Size(min = 3, max = 50)
    private String lastName;

    @NotEmpty(message = "email cannot be empty")
    @Email(message = "please enter a valid mail address")
    private String email;

    @NotEmpty(message = "password cannot be empty")
    @Size(min = 6, message = "password must be at least six characters")
    private String password;
}