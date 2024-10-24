package com.clms.api.assignments;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Builder
@Getter
@Setter
public class AssignmentDetailsResponse {
    private Integer id;
    private String name;
    private String description;
    private Date dueDate;
    private Date startDate;
}
