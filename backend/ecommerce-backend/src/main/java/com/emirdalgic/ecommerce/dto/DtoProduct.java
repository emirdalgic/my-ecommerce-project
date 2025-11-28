package com.emirdalgic.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoProduct {
    private Long id;
    private String name;
    private BigDecimal price;
    private int stockAmount;
    private String imageUrl;
    private  String description;

    private DtoCategory category;
    private DtoUser vendor;
    private List<DtoProductImage> productImages;
}
