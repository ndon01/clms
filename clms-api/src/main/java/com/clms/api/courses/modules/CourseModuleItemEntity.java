package com.clms.api.courses.modules;

import com.clms.api.assignments.api.entity.Assignment;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "course_module_items")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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

