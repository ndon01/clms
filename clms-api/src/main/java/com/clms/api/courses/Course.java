package com.clms.api.courses;

import com.clms.api.users.User;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "courses")
@Data
public class Course {

    @Id
    private long id;

    @ManyToMany
    @JoinColumn(name = "members", referencedColumnName = "id")
    private List<User> members;
}
