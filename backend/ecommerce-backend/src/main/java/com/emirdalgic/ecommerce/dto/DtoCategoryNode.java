package com.emirdalgic.ecommerce.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoCategoryNode {
    private String categoryName;
    private Long categoryId;
    private List<DtoProduct> products;
}
