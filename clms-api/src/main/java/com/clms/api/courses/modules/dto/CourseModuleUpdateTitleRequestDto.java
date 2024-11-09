package com.clms.api.courses.modules.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CourseModuleUpdateTitleRequestDto {
    private Integer moduleId;
    private String title;
}
