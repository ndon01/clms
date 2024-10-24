package com.clms.api.assignments.projections;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Builder
@Getter
@Setter
public class AssignmentDetailsProjection {
    private Integer id;
    private String name;
    private String description;
    private Date dueDate;
    private Date startDate;
}
