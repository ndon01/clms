package com.clms.api.questionBank.categories.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryReparentRequestDto {
    private Integer categoryId;
    private Integer newParentId;
}
