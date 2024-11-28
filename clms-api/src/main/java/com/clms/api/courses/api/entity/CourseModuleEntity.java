package com.clms.api.courses.modules;


import com.clms.api.courses.api.Course;
import com.clms.api.courses.api.projections.CourseDetailsProjection;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_modules")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseModuleEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id")
    private Course course;

    @Column(name = "module_order")
    private Integer moduleOrder;
}

