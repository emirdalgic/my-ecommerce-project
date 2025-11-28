package com.emirdalgic.ecommerce.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoAddToCartIU {
    @NotNull
    private Long productId;
    @Min(value = 1)
    private int quantity;
}
