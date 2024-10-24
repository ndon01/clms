package com.clms.api.courses.modules;

import com.clms.api.assignments.Assignment;
import jakarta.persistence.*;
import org.springframework.expression.spel.ast.Assign;

public class CourseModuleItemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_module_id")
    private CourseModuleEntity courseModule;

    @Column(name = "item_order")
    private int itemOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assignment_id")
    private Assignment assignment;
}
