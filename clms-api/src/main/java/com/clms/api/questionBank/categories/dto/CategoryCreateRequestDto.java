package com.clms.api.questionBank.categories.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCreateRequestDto {
    private String categoryName;
    private Integer parentId;
}
