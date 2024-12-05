package com.clms.api.courses.api;

import com.clms.api.assignments.api.entity.Assignment;
import com.clms.api.users.api.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Entity
@Table(name="courses")
@Getter
@Setter
public class Course
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name ="course_members",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> members;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "assignments",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "id"))
    private List<Assignment> assignments;
}
