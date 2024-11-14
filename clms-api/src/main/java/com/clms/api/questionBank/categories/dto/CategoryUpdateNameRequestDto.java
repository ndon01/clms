package com.clms.api.questionBank.categories.dto;

import lombok.Data;

@Data
public class CategoryUpdateNameRequestDto {
    private Integer categoryId;
    private String categoryName;
}
