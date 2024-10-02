package com.clms.api.courses;

import com.clms.api.common.domain.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode
@Entity
@Table(name="courses")
@Data
public class Course
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String description;
    //private int tutorId;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinTable(name ="course_members",
            joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id"))
    private List<User> members;
}
