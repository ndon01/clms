package com.clms.api.courses.performance.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TimestampedCategoryPerformanceDto {
    private Integer categoryId;
    private double performanceScore;
    private Instant timestamp;
}
