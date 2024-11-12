package com.clms.api.courses;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClientCourseMemberDetailsProjection {
    public Integer userId;
    public Integer courseId;
    public Boolean isTutor;
}
