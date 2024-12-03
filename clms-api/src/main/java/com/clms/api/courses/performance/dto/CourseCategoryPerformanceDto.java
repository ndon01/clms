package com.clms.api.courses.performance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseCategoryPerformanceDto {
    private List<TimestampedCategoryPerformanceDto> categoryPerformances = new ArrayList<>();
}

