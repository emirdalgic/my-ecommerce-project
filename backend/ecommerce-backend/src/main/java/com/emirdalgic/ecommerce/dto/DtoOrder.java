package com.emirdalgic.ecommerce.dto;

import com.emirdalgic.ecommerce.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoOrder {
    private Long id;
    private String orderCode;
    private LocalDateTime createdDate;
    private Long userId;
    private List<DtoOrderItem> orderItems;
}
