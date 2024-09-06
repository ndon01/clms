package com.clms.api.common.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Date;

@EqualsAndHashCode
@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int authenticationProfileId;

    private String firstName;
    private String lastName;
    @Column(unique = true)
    private String username;
    private Date dateOfBirth;
}
