package com.emirdalgic.ecommerce.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoProductIU {
    @NotEmpty(message = "name cannot be empty")
    @Size(min = 3, max = 30)
    private String name;
    @NotNull(message = "price cannot be empty")
    @Positive(message = "price must higher than zero")
    private BigDecimal price;
    @Min(value = 0,message = "stock cannot be negative")
    private int stockAmount;
    private String imageUrl;
    @Size(min = 10, max = 100)
    private  String description;

    @NotNull(message = "category must be selected")
    private Long categoryId;
    private List<String> productImages;
}
